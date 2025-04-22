const express = require('express');
const router = express.Router();
const { createRoom } = require('../controllers/roomController');

// Route to create a room
router.post('/create-room', createRoom);

module.exports = router;
