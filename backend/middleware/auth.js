const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'your-secret-key');
    // const user = await User.findOne({ _id: decoded.id });

    // if (!user) {
    //   throw new Error('User not found');
    // }

    // Add user info to request object
    req.user = decoded;
    console.log(decoded);

    // req.token = token;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = auth;