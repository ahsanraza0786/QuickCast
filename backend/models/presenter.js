const mongoose = require("../db/connection");
const bcrypt = require("bcryptjs");

const PresenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
PresenterSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  //add
  next();
});

module.exports = mongoose.model("Presenter", PresenterSchema);