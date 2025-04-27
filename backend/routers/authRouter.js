const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Presenter = require('../models/presenter');
require('dotenv').config();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingPresenter = await Presenter.findOne({ email });
    
    if (existingPresenter) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const presenter = new Presenter({ name, email, password });
    await presenter.save();

    const token = jwt.sign({ id: presenter._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, presenter: { id: presenter._id, name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find presenter by email
    const presenter = await Presenter.findOne({ email });
    if (!presenter) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, presenter.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create token
    const token = jwt.sign(
      { id: presenter._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      token,
      presenter: {
        id: presenter._id,
        name: presenter.name,
        email: presenter.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;