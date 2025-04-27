const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  presenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Presenter',
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  password: String,
  isChatEnabled: {
    type: Boolean,
    default: true
  },
  participants: [{
    name: String,
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  messages: [{
    username: String,
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
      //add
    }
  }]
});

module.exports = mongoose.model('chatRoom', RoomSchema);