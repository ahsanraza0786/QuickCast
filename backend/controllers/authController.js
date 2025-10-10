const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Presenter = require('../models/presenter');
require('dotenv').config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingPresenter = await Presenter.findOne({ email });

    if (existingPresenter) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const presenter = new Presenter({ name, email, password });
    await presenter.save();

    const token = jwt.sign({ id: presenter._id }, process.env.SECRET_KEY);
    res.status(201).json({ token, presenter: { id: presenter._id, name, email } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const presenter = await Presenter.findOne({ email });
    if (!presenter) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, presenter.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: presenter._id }, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.json({
      token,
      presenter: {
        id: presenter._id,
        name: presenter.name,
        email: presenter.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const presenters = await Presenter.find();
    res.status(200).json(presenters);
  } catch (err) {
    console.error('Error fetching presenters:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, login, getAll };
