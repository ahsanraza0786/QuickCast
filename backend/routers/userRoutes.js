// /routes/userRoutes.js
const express = require("express");
const { Model } = require("../models/User");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

// POST request to register a user
router.post("/add", registerUser);

module.exports = router;
