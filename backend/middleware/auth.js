const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Presenter = require('../models/presenter');

const auth = async (req, res, next) => {
  try {
    console.log(req.header('Authorization'));
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token:', token);  // Debugging line

    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    
    // Try to find either a User or a Presenter
    const presenter = await Presenter.findOne({ _id: decoded.id });
    const user = await User.findOne({ _id: decoded.id });

    if (!presenter && !user) {
      throw new Error('Authentication failed');
    }

    // Add the authenticated entity to the request object
    req.presenter = presenter;
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = auth;