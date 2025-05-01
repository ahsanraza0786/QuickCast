const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

// =========================
// ROUTES FOR ROOM HANDLING
// =========================

// @route   POST /create
// @desc    Create a new room (private or public)
// @access  Protected
router.post("/create", auth, async (req, res) => {
  console.log(req.user);  // Logs authenticated user's decoded JWT

  try {
    const { name, isPrivate, password } = req.body;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate random 6-char code

    const room = new Room({
      name,
      code,
      presenter: req.user.id, // Get presenter ID from auth middleware
      isPrivate: isPrivate || false,
      password: isPrivate ? password : null,
      participants: [],
      messages: [],
      polls: [],
    });

    const savedRoom = await room.save();

    // Populate presenter's basic info
    const populatedRoom = await Room.findById(savedRoom._id).populate(
      "presenter",
      "name email"
    );

    res.status(201).json(populatedRoom);
  } catch (err) {
    console.error("Room creation error:", err);
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /presenter
// @desc    Get all rooms created by the authenticated presenter
// @access  Protected
router.get("/presenter", auth, async (req, res) => {
  try {
    const rooms = await Room.find({ presenter: req.user.id })
      .populate("presenter", "name email")
      .sort({ createdAt: -1 });

    res.json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

// @route   GET /:code
// @desc    Get details of a specific room by its code (for participants)
// @access  Protected
router.get("/:code", auth, async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({
      name: room.name,
      code: room.code,
      isPrivate: room.isPrivate,
      presenter: room.presenter,
      isChatEnabled: room.isChatEnabled,
      participants: room.participants,
    });
  } catch (err) {
    console.error("Room access error:", err);
    res.status(500).json({ message: "Error accessing room" });
  }
});

// @route   GET /:code/check
// @desc    Check if a room exists and whether it's private (public endpoint)
// @access  Public
router.get("/:code/check", async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code }).select("name code isPrivate");
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({
      name: room.name,
      code: room.code,
      isPrivate: room.isPrivate,
    });
  } catch (err) {
    console.error("Room check error:", err);
    res.status(500).json({ message: "Error checking room" });
  }
});

// @route   POST /join/:code
// @desc    Join a private room using password and add as a participant
// @access  Public
router.post("/join/:code", async (req, res) => {
  try {
    const { username, password } = req.body;
    const room = await Room.findOne({ code: req.params.code });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.isPrivate && password !== room.password) {
      return res.status(401).json({ message: "Invalid room password" });
    }

    // Add participant if not already added
    if (!room.participants.some((p) => p.name === username)) {
      room.participants.push({ name: username, joinedAt: new Date() });
      await room.save();
    }

    // Notify socket.io clients
    const io = req.app.get("io");
    io.to(room.code).emit("participantsUpdated", room.participants);

    res.json({
      name: room.name,
      code: room.code,
      isPrivate: room.isPrivate,
      isChatEnabled: room.isChatEnabled,
    });
  } catch (err) {
    console.error("Join room error:", err);
    res.status(500).json({ message: "Failed to join room" });
  }
});

// @route   GET /:code/participants
// @desc    Get list of room participants (only presenter)
// @access  Protected
router.get("/:code/participants", auth, async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Only the presenter is allowed to fetch participants
    if (room.presenter.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(room.participants);
  } catch (err) {
    console.error("Fetch participants error:", err);
    res.status(500).json({ message: "Failed to fetch participants" });
  }
});

// @route   GET /:code/polls
// @desc    Get all polls of a specific room
// @access  Public
router.get("/:code/polls", async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code }).populate("polls");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room.polls);
  } catch (err) {
    res.status(500).json({ message: "Error fetching polls" });
  }
});

// @route   DELETE /:code
// @desc    Delete a room (only presenter can do this)
// @access  Protected
router.delete("/:code", auth, async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const room = await Room.findOne({
      code,
      presenter: req.user.id,
    });
    
    if (!room) {
      return res.status(404).json({ message: "Room not found or unauthorized" });
    }

    await Room.deleteOne({ _id: room._id });

    // Notify all clients that the room was deleted
    const io = req.app.get("io");
    if (io) {
      io.to(code).emit("roomDeleted");
    }

    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    console.error("Delete room error:", err);
    res.status(500).json({ message: "Failed to delete room" });
  }
});

// @route   GET /:code/details
// @desc    Get full details of a room (only presenter can access)
// @access  Protected
router.get("/:code/details", auth, async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.presenter.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized as presenter" });
    }

    res.json({
      name: room.name,
      code: room.code,
      isPrivate: room.isPrivate,
      presenter: room.presenter,
      isChatEnabled: room.isChatEnabled,
      participants: room.participants,
      messages: room.messages,
    });
  } catch (err) {
    console.error("Room details error:", err);
    res.status(500).json({ message: "Error fetching room details" });
  }
});

// @route   GET /all
// @desc    Get a list of all rooms (for public listing or admin use)
// @access  Public
router.get("/all", async (req, res) => {
  try {
    const rooms = await Room.find({})
      .populate("presenter", "name email")
      .select("-password -messages")
      .sort({ createdAt: -1 });

    const formattedRooms = rooms.map(room => ({
      id: room._id,
      name: room.name,
      code: room.code,
      isPrivate: room.isPrivate,
      presenter: room.presenter,
      participantsCount: room.participants.length,
      createdAt: room.createdAt
    }));

    res.json(formattedRooms);
  } catch (err) {
    console.error("Error fetching all rooms:", err);
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

module.exports = router;
