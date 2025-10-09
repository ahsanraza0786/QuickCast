const express = require('express');
const cors = require('cors');

// existing routers (kept in their original location)
const pollRoutes = require('../routers/pollRouter');
const roomRouter = require('../routers/roomRouter');
const authRouter = require('../routers/authRouter');
const contactRouter = require('../routers/contactRouter');

const createApp = (io) => {
  const app = express();

  app.use(cors({ 
    origin: [
      'http://localhost:3000',
      'https://quick-cast.vercel.app',
      'https://quickcast.onrender.com'
    ],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
  }));

  app.use(express.json());

  // expose socket.io instance to routes if needed
  if (io) app.set('io', io);

  // Mount routers
  app.use('/guest', roomRouter);
  app.use('/polls', pollRoutes);
  app.use('/auth', authRouter);
  app.use('/user', authRouter);
  app.use('/api/auth', authRouter);

  app.use('/api/contact', contactRouter);
  app.use('/contact', contactRouter);

  return app;
};

module.exports = createApp;
