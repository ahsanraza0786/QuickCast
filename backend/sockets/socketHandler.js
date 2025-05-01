const Room = require("../models/room");
const Poll = require("../models/poll");

function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log("Client connected");

    let currentRoom = null;
    let currentUser = null;

    socket.on('joinRoom', async ({ roomCode, username }) => {
      try {
        if (!username || username.trim() === '') {
          username = 'Guest';
        }
        socket.join(roomCode);
        const room = await Room.findOne({ code: roomCode });
        
        if (room) {
          socket.emit('previousMessages', room.messages || []);
          socket.emit('chatToggled', room.isChatEnabled);
          io.to(roomCode).emit('newMessage', {
            username: 'System',
            message: `${username} has joined the room`,
            timestamp: new Date()
          });
        }
      } catch (err) {
        console.error('Join room error:', err);
      }
    });

    socket.on('sendMessage', async ({ roomCode, username, message }) => {
      try {
        const room = await Room.findOne({ code: roomCode.toUpperCase() });
        if (room && room.isChatEnabled) {
          const newMessage = {
            username,
            message,
            timestamp: new Date()
          };
          room.messages = room.messages || [];
          room.messages.push(newMessage);
          await room.save();
          io.in(roomCode).emit('newMessage', newMessage);
        }
      } catch (err) {
        socket.emit('error', 'Failed to send message');
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
      socket.leave(roomCode);
      if (username) {
        io.to(roomCode).emit('newMessage', {
          username: 'System',
          message: `${username} has left the room`,
          timestamp: new Date()
        });
      }
    });

    socket.on('disconnect', async () => {
      if (currentRoom && currentUser) {
        try {
          const room = await Room.findOne({ code: currentRoom.toUpperCase() });
          if (room) {
            room.participants = room.participants.filter(p => p !== currentUser);
            await room.save();
            io.to(currentRoom).emit('updateParticipants', room.participants);

            const leaveMessage = {
              type: 'system',
              username: 'System',
              message: `${currentUser} has left the room`
            };
            room.messages.push(leaveMessage);
            await room.save();
            io.to(currentRoom).emit('receiveMessage', leaveMessage);
          }
        } catch (err) {
          console.error('Error handling disconnect:', err);
        }
      }
      console.log('User disconnected:', socket.id);
    });

    socket.on('vote', async ({ roomCode, pollId, optionIndex, voterId }) => {
      try {
        const poll = await Poll.findById(pollId);
        if (!poll) return socket.emit('error', 'Poll not found');

        const idx = parseInt(optionIndex, 10);
        if (isNaN(idx) || idx < 0 || idx >= poll.options.length) {
          return socket.emit('error', 'Invalid option index');
        }

        if (poll.options.some(opt => opt.voters?.includes(voterId))) {
          return socket.emit('error', 'You have already voted. Use changeVote to change your vote.');
        }

        poll.options[idx].votes += 1;
        poll.options[idx].voters = poll.options[idx].voters || [];
        poll.options[idx].voters.push(voterId);

        await poll.save();
        io.to(roomCode).emit('pollUpdated', poll);
      } catch (err) {
        console.error('Vote error:', err);
        socket.emit('error', 'Failed to register vote');
      }
    });

    socket.on('changeVote', async ({ roomCode, pollId, newOption, voterId }) => {
      try {
        const poll = await Poll.findById(pollId);
        if (!poll) return socket.emit('error', 'Poll not found');

        const newIdx = parseInt(newOption, 10);
        if (isNaN(newIdx) || newIdx < 0 || newIdx >= poll.options.length) {
          return socket.emit('error', 'Invalid option index');
        }

        poll.options.forEach(option => {
          if (option.voters?.includes(voterId)) {
            option.voters = option.voters.filter(id => id !== voterId);
            option.votes = option.voters.length;
          }
        });

        poll.options[newIdx].voters = poll.options[newIdx].voters || [];
        if (!poll.options[newIdx].voters.includes(voterId)) {
          poll.options[newIdx].voters.push(voterId);
        }
        poll.options[newIdx].votes = poll.options[newIdx].voters.length;

        await poll.save();
        io.to(roomCode).emit('pollUpdated', poll);
      } catch (err) {
        console.error('Change vote error:', err);
        socket.emit('error', 'Failed to change vote');
      }
    });
  });
}

module.exports = socketHandler;
