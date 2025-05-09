const Room = require('../models/room');
const Poll = require('../models/poll');

function socketHandler(io) {
  let connectedUsers = new Map();

  io.on('connection', (socket) => {
    // Store current room and user info
    let currentRoom = null;
    let currentUser = null;

    socket.on('joinRoom', async ({ roomCode, username }) => {
      try {
        currentRoom = roomCode;
        currentUser = username;

        // Join the socket room
        socket.join(roomCode);

        // Add user to connected users map
        connectedUsers.set(socket.id, { room: roomCode, username });

        // Notify others in the room
        socket.to(roomCode).emit('participantJoined', { username });

        // Get room state and send initial chat state
        const room = await Room.findOne({ code: roomCode.toUpperCase() });
        if (room) {
          socket.emit('chatToggled', room.isChatEnabled);
        }
      } catch (err) {
        console.error('Join room error:', err);
      }
    });

    socket.on('sendMessage', async ({ roomCode, message, sender, timestamp }) => {
      try {
        const room = await Room.findOne({ code: roomCode });
        if (room && room.isChatEnabled) {
          const newMessage = {
            username: sender,  // Use the sender as username
            message,
            timestamp: timestamp || new Date()
          };

          // Save message to room
          room.messages.push(newMessage);
          await room.save();

          // Broadcast message to all users in the room
          io.in(roomCode).emit('newMessage', newMessage);
        }
      } catch (err) {
        console.error('Send message error:', err);
      }
    });

    socket.on('toggleChat', async ({ roomCode }) => {
      try {
        const room = await Room.findOne({ code: roomCode });
        if (room) {
          room.isChatEnabled = !room.isChatEnabled;
          await room.save();

          io.in(roomCode).emit('chatToggled', room.isChatEnabled);
          io.in(roomCode).emit('newMessage', {
            username: 'System',
            message: `Chat has been ${room.isChatEnabled ? 'enabled' : 'disabled'} by the presenter`,
            timestamp: new Date()
          });
        }
      } catch (err) {
        console.error('Toggle chat error:', err);
      }
    });

    socket.on('leaveRoom', ({ roomCode, username }) => {
      if (roomCode && username) {
        socket.leave(roomCode);
        io.to(roomCode).emit('participantLeft', { username });
        connectedUsers.delete(socket.id);
      }
    });

    socket.on('disconnect', () => {
      const userInfo = connectedUsers.get(socket.id);
      if (userInfo) {
        io.to(userInfo.room).emit('participantLeft', { username: userInfo.username });
        connectedUsers.delete(socket.id);
      }
    });

    socket.on('vote', async ({ roomCode, pollId, optionIndex, voterId }) => {
      try {
        const poll = await Poll.findById(pollId);
        if (!poll) return socket.emit('error', 'Poll not found');

        const idx = parseInt(optionIndex, 10);
        if (isNaN(idx) || idx < 0 || idx >= poll.options.length) {
          return socket.emit('error', 'Invalid option index');
        }

        // Check if user has already voted
        const hasVoted = poll.options.some(opt => opt.voters?.includes(voterId));
        if (hasVoted) {
          return socket.emit('error', 'You have already voted. Use changeVote to change your vote.');
        }

        // Add vote and voter
        poll.options[idx].votes += 1;
        poll.options[idx].voters = poll.options[idx].voters || [];
        poll.options[idx].voters.push(voterId);

        await poll.save();
        
        // Calculate total votes
        const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
        
        // Emit updated poll data with total votes
        io.to(roomCode).emit('pollUpdated', {
          ...poll.toObject(),
          totalVotes
        });
      } catch (err) {
        console.error('Vote error:', err);
        socket.emit('error', 'Failed to register vote');
      }
    });

    socket.on('changeVote', async ({ roomCode, pollId, newOption: newOptionIndex, voterId }) => {
      try {
        const poll = await Poll.findById(pollId);
        if (!poll) return socket.emit('error', 'Poll not found');

        const newIdx = parseInt(newOptionIndex, 10);
        if (isNaN(newIdx) || newIdx < 0 || newIdx >= poll.options.length) {
          return socket.emit('error', 'Invalid option index');
        }

        // Remove vote from previous option
        let oldVoteRemoved = false;
        poll.options.forEach(option => {
          if (option.voters?.includes(voterId)) {
            option.voters = option.voters.filter(id => id !== voterId);
            option.votes = Math.max(0, option.votes - 1);
            oldVoteRemoved = true;
          }
        });

        if (!oldVoteRemoved) {
          return socket.emit('error', 'No previous vote found');
        }

        // Add vote to new option
        poll.options[newIdx].voters = poll.options[newIdx].voters || [];
        if (!poll.options[newIdx].voters.includes(voterId)) {
          poll.options[newIdx].voters.push(voterId);
          poll.options[newIdx].votes += 1;
        }

        await poll.save();

        // Calculate total votes
        const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
        
        // Emit updated poll data
        io.to(roomCode).emit('pollUpdated', {
          ...poll.toObject(),
          totalVotes
        });
      } catch (err) {
        console.error('Change vote error:', err);
        socket.emit('error', 'Failed to change vote');
      }
    });

    socket.on('startPoll', async ({ roomCode, question, options, duration }) => {
      try {
        const newPoll = new Poll({
          question,
          roomCode,
          options: options.map(opt => ({
            text: opt.text,
            votes: 0,
            voters: []
          }))
        });

        await newPoll.save();
        
        // Emit initial poll data with totalVotes
        io.to(roomCode).emit('pollStarted', {
          ...newPoll.toObject(),
          totalVotes: 0
        });

        if (duration) {
          setTimeout(async () => {
            const poll = await Poll.findById(newPoll._id);
            if (poll) {
              const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
              io.to(roomCode).emit('pollEnded', {
                ...poll.toObject(),
                totalVotes
              });
            }
          }, duration * 1000);
        }
      } catch (err) {
        console.error('Start poll error:', err);
        socket.emit('error', 'Failed to start poll');
      }
    });

    socket.on('endPoll', async ({ roomCode }) => {
      try {
        const poll = await Poll.findOne({ roomCode }).sort({ createdAt: -1 });
        if (poll) {
          const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
          io.to(roomCode).emit('pollEnded', {
            ...poll.toObject(),
            totalVotes
          });
        }
      } catch (err) {
        console.error('End poll error:', err);
        socket.emit('error', 'Failed to end poll');
      }
    });

    socket.on('slideChanged', ({ roomCode, slideNumber }) => {
      if (roomCode && typeof slideNumber === 'number') {
        // Broadcast slide change to all users in the room except sender
        socket.to(roomCode).emit('slideChanged', { slideNumber });
      }
    });

    socket.on('presentationUpdated', ({ roomCode, url }) => {
      if (roomCode && url) {
        // Broadcast presentation update to all users in the room
        io.in(roomCode).emit('presentationUpdated', url);
      }
    });
  });
}

module.exports = socketHandler;
