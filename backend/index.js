// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// // const userRoutes = require('./routers/userRoutes');
// const pollRoutes = require("./routers/pollRouter"); 
// const Room = require("./models/room");
// const roomRouter = require("./routers/roomRouter");
// const authRouter = require('./routers/authRouter');
// const Poll = require("./models/poll");

// dotenv.config();

// const app = express();
// app.use(cors(
//   {
//     origin: "*"
//   }
// ));
// app.use(express.json());

// const server = createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });
// // Attach the io instance to the app
// app.set("io", io);

// // Your routes here:
// // app.use("/user",userRoutes);
// app.use("/rooms", roomRouter);
// app.use("/polls", pollRoutes);
// app.use("/auth", authRouter);

// io.on('connection', (socket) => {
//   console.log("Client connected");

//   let currentRoom = null;
//   let currentUser = null;

//   socket.on('joinRoom', async ({ roomCode, username }) => {
//     try {
//       if (!username || username.trim() === '') {
//         username = 'Guest';
//       }
//       socket.join(roomCode);
//       const room = await Room.findOne({ code: roomCode });
      
//       if (room) {
//         socket.emit('previousMessages', room.messages || []);
//         socket.emit('chatToggled', room.isChatEnabled);
//         io.to(roomCode).emit('newMessage', {
//           username: 'System',
//           message: `${username} has joined the room`,
//           timestamp: new Date()
//         });
//       }
//     } catch (err) {
//       console.error('Join room error:', err);
//     }
//   });

//   socket.on('sendMessage', async ({ roomCode, username, message }) => {
//     try {
//       const room = await Room.findOne({ code: roomCode.toUpperCase() });
//       if (room) {
//         const newMessage = { 
//           type: 'user',
//           username, 
//           message,
//           timestamp: new Date()
//         };
//         room.messages.push(newMessage);
//         await room.save();
//         io.to(roomCode).emit('receiveMessage', newMessage);
//       }
//     } catch (err) {
//       socket.emit('error', 'Failed to send message');
//     }
//   });

//   socket.on('sendMessage', async ({ roomCode, message, username }) => {
//     try {
//       const room = await Room.findOne({ code: roomCode });
//       if (room && room.isChatEnabled) {
//         const newMessage = {
//           username,
//           message,
//           timestamp: new Date()
//         };
        
//         room.messages = room.messages || [];
//         room.messages.push(newMessage);
//         await room.save();
        
//         io.in(roomCode).emit('newMessage', newMessage);
//       }
//     } catch (err) {
//       console.error('Send message error:', err);
//     }
//   });

//   socket.on('toggleChat', async ({ roomCode }) => {
//     try {
//       const room = await Room.findOne({ code: roomCode });
//       if (room) {
//         room.isChatEnabled = !room.isChatEnabled;
//         await room.save();
        
//         io.in(roomCode).emit('chatToggled', room.isChatEnabled);
//         io.in(roomCode).emit('newMessage', {
//           username: 'System',
//           message: `Chat has been ${room.isChatEnabled ? 'enabled' : 'disabled'} by the presenter`,
//           timestamp: new Date()
//         });
//       }
//     } catch (err) {
//       console.error('Toggle chat error:', err);
//     }
//   });

//   socket.on('leaveRoom', ({ roomCode, username }) => {
//     socket.leave(roomCode);
//     if (username) {
//       io.to(roomCode).emit('newMessage', {
//         username: 'System',
//         message: `${username} has left the room`,
//         timestamp: new Date()
//       });
//     }
//   });

//   socket.on('disconnect', async () => {
//     if (currentRoom && currentUser) {
//       try {
//         const room = await Room.findOne({ code: currentRoom.toUpperCase() });
//         if (room) {
//           room.participants = room.participants.filter(p => p !== currentUser);
//           await room.save();
//           io.to(currentRoom).emit('updateParticipants', room.participants);
          
//           const leaveMessage = {
//             type: 'system',
//             username: 'System',
//             message: `${currentUser} has left the room`
//           };
//           room.messages.push(leaveMessage);
//           await room.save();
//           io.to(currentRoom).emit('receiveMessage', leaveMessage);
//         }
//       } catch (err) {
//         console.error('Error handling disconnect:', err);
//       }
//     }
//     console.log('User disconnected:', socket.id);
//   });

//   socket.on('vote', async ({ roomCode, pollId, optionIndex, voterId }) => {
//     try {
//       const poll = await Poll.findById(pollId);
//       if (!poll) {
//         socket.emit('error', 'Poll not found');
//         return;
//       }
//       const idx = parseInt(optionIndex, 10);
//       if (isNaN(idx) || idx < 0 || idx >= poll.options.length) {
//         socket.emit('error', 'Invalid option index');
//         return;
//       }
      
//       // Check if this voterId already exists in any option voters list.
//       let alreadyVoted = false;
//       poll.options.forEach(opt => {
//         if(opt.voters && opt.voters.includes(voterId)) {
//           alreadyVoted = true;
//         }
//       });
      
//       if (alreadyVoted) {
//         socket.emit('error', 'You have already voted. Use changeVote to change your vote.');
//         return;
//       }

//       // Proceed to register the vote:
//       poll.options[idx].votes += 1;
//       // Ensure voters array exists
//       if (!poll.options[idx].voters) {
//         poll.options[idx].voters = [];
//       }
//       poll.options[idx].voters.push(voterId);
//       await poll.save();

//       io.to(roomCode).emit('pollUpdated', poll);
//       console.log(`Vote registered for poll ${pollId} on option ${idx} by voter ${voterId}`);
//     } catch (err) {
//       console.error('Vote error:', err);
//       socket.emit('error', 'Failed to register vote');
//     }
//   });

//   socket.on('changeVote', async ({ roomCode, pollId, newOption, voterId }) => {
//     try {
//       const poll = await Poll.findById(pollId);
//       if (!poll) {
//         socket.emit('error', 'Poll not found');
//         return;
//       }
//       const newIdx = parseInt(newOption, 10);
//       if (isNaN(newIdx) || newIdx < 0 || newIdx >= poll.options.length) {
//         socket.emit('error', 'Invalid option index');
//         return;
//       }
      
//       // Remove this voter from ALL options in this poll
//       poll.options.forEach(option => {
//         if (option.voters && option.voters.includes(voterId)) {
//           option.voters = option.voters.filter(id => id !== voterId);
//           // Reset vote count to the number of remaining voters
//           option.votes = option.voters.length;
//         }
//       });

//       // Add the voter to the new option (if not already present)
//       if (!poll.options[newIdx].voters) {
//         poll.options[newIdx].voters = [];
//       }
//       if (!poll.options[newIdx].voters.includes(voterId)) {
//         poll.options[newIdx].voters.push(voterId);
//       }
//       // Update vote count based on the voters array
//       poll.options[newIdx].votes = poll.options[newIdx].voters.length;

//       await poll.save();
//       io.to(roomCode).emit('pollUpdated', poll);
//       console.log(`Vote changed for poll ${pollId} for voter ${voterId} to option ${newIdx}`);
//     } catch (err) {
//       console.error('Change vote error:', err);
//       socket.emit('error', 'Failed to change vote');
//     }
//   });

// });

// server.listen(process.env.PORT || 8000, () => {
//   console.log(`Server is running on port ${process.env.PORT || 8000}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const pollRoutes = require("./routers/pollRouter");
const roomRouter = require("./routers/roomRouter");
const authRouter = require("./routers/authRouter");
const socketHandler = require("./sockets/socketHandler");

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.set("io", io);

app.use("/quest", roomRouter);
app.use("/polls", pollRoutes);
app.use("/auth", authRouter);

socketHandler(io);// Initialize socket handlers

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
