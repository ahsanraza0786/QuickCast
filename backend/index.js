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

app.use(cors({ 
  origin: "https://quick-cast.vercel.app/" || "*" ,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.set("io", io);

app.use("/guest", roomRouter);
app.use("/polls", pollRoutes);
app.use("/auth", authRouter);
app.use("/user", authRouter);

socketHandler(io);// Initialize socket handlers

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
