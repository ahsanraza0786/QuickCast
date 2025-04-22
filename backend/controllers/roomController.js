const Room = require('../models/Room');

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const roomId = 'room-' + Math.floor(Math.random() * 10000); // Simple random room ID
    const newRoom = new Room({ roomId });

    await newRoom.save();
    res.status(201).json({ roomId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room', error });
  }
};
