const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const pollRoutes = require("./routers/pollRouter");
const roomRouter = require("./routers/roomRouter");
const authRouter = require("./routers/authRouter");
const resetPasswordRouter = require("./routers/resetPasswordRouter");
const contactRouter = require("./routers/contactRouter");
const socketHandler = require("./sockets/socketHandler");

dotenv.config();
const app = express();

app.use(cors({ 
  origin: ["http://localhost:3000", "https://quick-cast.vercel.app", "https://quickcast.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: { 
    origin: ["http://localhost:3000", "https://quick-cast.vercel.app"], 
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.set("io", io);

app.use("/guest", roomRouter);
app.use("/polls", pollRoutes);
app.use("/auth", authRouter);
app.use("/user", authRouter);
// Reset password routes (request, validate token, reset)
app.use('/auth', resetPasswordRouter);
// Also support common API prefix used by some deployments (e.g. /api/auth/*)
app.use('/api/auth', authRouter);
app.use('/api/auth', resetPasswordRouter);
// Contact form route
app.use('/api/contact', contactRouter);
app.use('/contact', contactRouter);

socketHandler(io);// Initialize socket handlers

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
