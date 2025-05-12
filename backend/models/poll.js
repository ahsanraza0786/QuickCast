// models/Poll.js
const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  roomCode: { type: String, required: true },
  options: [{
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    voters: { type: [String], default: [] }
  }],
  duration: { type: Number, required: true, default: 30 }, // Duration in seconds
  createdAt: { type: Date, default: Date.now }
  //add
});

module.exports = mongoose.model('Poll', PollSchema);