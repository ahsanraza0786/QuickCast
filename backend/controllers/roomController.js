const Room = require('../models/room');

const createRoom = async (req, res) => {
  try {
    const { name, isPrivate, password } = req.body;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const room = new Room({
      name,
      code,
      presenter: req.user.id,
      isPrivate: isPrivate || false,
      password: isPrivate ? password : null,
      participants: [],
      messages: [],
      polls: [],
    });

  const savedRoom = await room.save();
  const populatedRoom = await Room.findById(savedRoom._id).populate('presenter', 'name email');
    res.status(201).json(populatedRoom);
  } catch (err) {
    console.error('Room creation error:', err);
    res.status(500).json({ message: err.message });
  }
};

const getPresenterRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ presenter: req.user.id })
      .populate('presenter', 'name email')
      .sort({ createdAt: -1 });

    res.json(rooms);
  } catch (err) {
    console.error('Error fetching rooms:', err);
    res.status(500).json({ message: 'Error fetching rooms' });
  }
};

const getRoomByCode = async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({
      name: room.name,
      code: room.code,
      isPrivate: room.isPrivate,
      presenter: room.presenter,
      isChatEnabled: room.isChatEnabled,
      participants: room.participants,
      presentationUrl: room.presentationUrl,
    });
  } catch (err) {
    console.error('Room access error:', err);
    res.status(500).json({ message: 'Error accessing room' });
  }
};

const checkRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code }).select('name code isPrivate presentationUrl');
    if (!room) return res.status(404).json({ message: 'Room not found' });

    res.json({
      name: room.name,
      code: room.code,
      isPrivate: room.isPrivate,
      presentationUrl: room.presentationUrl,
    });
  } catch (err) {
    console.error('Room check error:', err);
    res.status(500).json({ message: 'Error checking room' });
  }
};

const joinRoom = async (req, res) => {
  try {
    const { username, password } = req.body;
    const room = await Room.findOne({ code: req.params.code });

    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (room.isPrivate && password !== room.password) return res.status(401).json({ message: 'Invalid room password' });

    if (!room.participants.some((p) => p.name === username)) {
      room.participants.push({ name: username, joinedAt: new Date() });
      await room.save();
    }

    const io = req.app.get('io');
    io.to(room.code).emit('participantsUpdated', room.participants);

    res.json({
      name: room.name,
      code: room.code,
      isPrivate: room.isPrivate,
      isChatEnabled: room.isChatEnabled,
      presentationUrl: room.presentationUrl,
    });
  } catch (err) {
    console.error('Join room error:', err);
    res.status(500).json({ message: 'Failed to join room' });
  }
};

const getParticipants = async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (room.presenter.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
    res.json(room.participants);
  } catch (err) {
    console.error('Fetch participants error:', err);
    res.status(500).json({ message: 'Failed to fetch participants' });
  }
};

const getRoomPolls = async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code }).populate('polls');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room.polls);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching polls' });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const room = await Room.findOne({ code, presenter: req.user.id });
    if (!room) return res.status(404).json({ message: 'Room not found or unauthorized' });
    await Room.deleteOne({ _id: room._id });
    const io = req.app.get('io');
    if (io) io.to(code).emit('roomDeleted');
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    console.error('Delete room error:', err);
    res.status(500).json({ message: 'Failed to delete room' });
  }
};

const getRoomDetails = async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (room.presenter.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized as presenter' });

    res.json({
      name: room.name,
      code: room.code,
      isPrivate: room.isPrivate,
      presenter: room.presenter,
      isChatEnabled: room.isChatEnabled,
      participants: room.participants,
      messages: room.messages,
      presentationUrl: room.presentationUrl,
    });
  } catch (err) {
    console.error('Room details error:', err);
    res.status(500).json({ message: 'Error fetching room details' });
  }
};

const updatePresentation = async (req, res) => {
  try {
    const { presentationUrl } = req.body;
    const room = await Room.findOne({ code: req.params.code, presenter: req.user.id });
    if (!room) return res.status(404).json({ message: 'Room not found or unauthorized' });
    room.presentationUrl = presentationUrl;
    await room.save();
    const io = req.app.get('io');
    if (io) io.to(room.code).emit('presentationUpdated', presentationUrl);
    res.json({ message: 'Presentation updated successfully' });
  } catch (err) {
    console.error('Update presentation error:', err);
    res.status(500).json({ message: 'Failed to update presentation' });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({})
      .populate('presenter', 'name email')
      .select('-password -messages')
      .sort({ createdAt: -1 });

    const formattedRooms = rooms.map((room) => ({
      id: room._id,
      name: room.name,
      code: room.code,
      isPrivate: room.isPrivate,
      presenter: room.presenter,
      participantsCount: room.participants.length,
      createdAt: room.createdAt,
    }));

    res.json(formattedRooms);
  } catch (err) {
    console.error('Error fetching all rooms:', err);
    res.status(500).json({ message: 'Error fetching rooms' });
  }
};

module.exports = {
  createRoom,
  getPresenterRooms,
  getRoomByCode,
  checkRoom,
  joinRoom,
  getParticipants,
  getRoomPolls,
  deleteRoom,
  getRoomDetails,
  updatePresentation,
  getAllRooms,
};
