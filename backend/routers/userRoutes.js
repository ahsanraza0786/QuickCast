const express = require('express');
const Model = require('../models/User');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.get('/getall', (req, res) => {
  Model.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// Signup Route
router.post('/signup', registerUser);

// Login Route
router.post('/login', loginUser);

module.exports = router;
