const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const userRoutes = require('./routers/userRoutes.js');
// const connectDB = require('./db/connection.js'); // Optional DB connection

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/user', userRoutes);

// Create HTTP server and bind with socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// In-memory storage
const rooms = {}; // roomId => { users: [], poll: { question, options, votes }, capacity }

app.post('/create-room', (req, res) => {
  const roomId = uuidv4();
  rooms[roomId] = {
    users: [],
    poll: null,
    capacity: 10
  };
  res.json({ roomId });
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log(`🔌 New socket connected: ${socket.id}`);

  socket.on('join-room', ({ roomId, username }) => {
    const room = rooms[roomId];
    if (!room) return;

    if (room.users.length >= room.capacity) {
      socket.emit('room-full');
      return;
    }

    socket.join(roomId);
    room.users.push({ id: socket.id, username });

    const userList = room.users.map((u) => u.username);
    io.to(roomId).emit('user-list', userList);
    socket.to(roomId).emit('user-joined', username);
  });

  socket.on('send-message', ({ roomId, username, message }) => {
    io.to(roomId).emit('receive-message', { username, message });
  });

  socket.on('create-poll', ({ roomId, poll }) => {
    if (rooms[roomId]) {
      rooms[roomId].poll = poll;
      io.to(roomId).emit('poll-updated', poll);
    }
  });

  socket.on('vote', ({ roomId, optionIndex }) => {
    const room = rooms[roomId];
    if (!room || !room.poll) return;
    room.poll.votes[optionIndex]++;
    io.to(roomId).emit('poll-updated', room.poll);
  });

  socket.on('disconnect', () => {
    for (const roomId in rooms) {
      const room = rooms[roomId];
      const index = room.users.findIndex((u) => u.id === socket.id);
      if (index !== -1) {
        const [leftUser] = room.users.splice(index, 1);
        io.to(roomId).emit('user-list', room.users.map((u) => u.username));
        io.to(roomId).emit('receive-message', {
          username: 'System',
          message: `${leftUser.username} left the room.`
        });
        break;
      }
    }
  });
});

// Start server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
