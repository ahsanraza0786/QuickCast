const { Schema, model } = require('../db/connection');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    required: false,
    default: 'presentor',
    enum: ['presentor', 'user'],
    set: v => v.toLowerCase()
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = model('users', userSchema);
