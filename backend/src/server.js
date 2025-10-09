const { createServer } = require('http');
const { Server } = require('socket.io');
const createApp = require('./app');
const connectDB = require('./config/db');
const socketHandler = require('../sockets/socketHandler');

const startServer = async () => {
  await connectDB();

  const server = createServer();

  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://quick-cast.vercel.app'],
      methods: ['GET', 'POST'],
      credentials: true,
    }
  });

  const app = createApp(io);

  // attach express app to http server
  server.on('request', app);

  // initialize sockets
  socketHandler(io);

  const PORT = process.env.PORT || 8000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = startServer;
