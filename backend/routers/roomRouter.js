const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

// Create room
router.post("/create", auth, async (req, res) => {
  console.log(req.body);
  
  try {
    const { name, isPrivate, password } = req.body;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

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

    // Populate presenter details if needed
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

// Get presenter's rooms
router.get("/presenter", auth, async (req, res) => {
  try {
    const rooms = await Room.find({ presenter: req.user._id })
      .populate("presenter", "name email")
      .sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

// Protected route for room details
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

// Public room check
router.get("/:code/check", async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code }).select(
      "name code isPrivate"
    );
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

// Join private room
router.post("/join/:code", async (req, res) => {
  try {
    const { username, password } = req.body;
    const room = await Room.findOne({ code: req.params.code });
    if (!room) {
      console.error("Join room error: Room not found");
      return res.status(404).json({ message: "Room not found" });
    }
    if (room.isPrivate && password !== room.password) {
      console.error("Join room error: Invalid room password");
      return res.status(401).json({ message: "Invalid room password" });
    }
    // Check if guest already exists (optional)
    if (!room.participants.some((p) => p.name === username)) {
      room.participants.push({ name: username, joinedAt: new Date() });
      console.log(`Adding participant ${username}`);
      await room.save();
    } else {
      console.log(`Participant ${username} already joined`);
    }
    // Optionally notify sockets:
    const io = req.app.get("io");
    io.to(room.code).emit("participantsUpdated", room.participants);
    // Return basic room data for guest view.
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

// Get participants (admin only)
router.get("/:code/participants", auth, async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Only allow presenter to see participants
    if (room.presenter.toString() !== req.presenter.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(room.participants);
  } catch (err) {
    console.error("Fetch participants error:", err);
    res.status(500).json({ message: "Failed to fetch participants" });
  }
});

router.get("/:code/polls", async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code }).populate(
      "polls"
    );

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room.polls);
  } catch (err) {
    res.status(500).json({ message: "Error fetching polls" });
  }
});

// Add this route to handle room deletion
router.delete("/:code", auth, async (req, res) => {
  try {
    // Convert provided code to uppercase for consistency
    const code = req.params.code.toUpperCase();
    const room = await Room.findOne({
      code,
      presenter: req.presenter.id,
    });

    if (!room) {
      return res
        .status(404)
        .json({ message: "Room not found or unauthorized" });
    }

    // Delete associated poll
    // await Poll.deleteMany({ roomCode: code });

    // Delete the room
    await Room.deleteOne({ _id: room._id });

    // Notify connected clients
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

// Protected room details for presenter
router.get("/:code/details", auth, async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    // Verify that the requester is the presenter
    if (room.presenter.toString() !== req.presenter.id) {
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

module.exports = router;
