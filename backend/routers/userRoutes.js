// // /routes/userRoutes.js
// const express = require("express");
// const { Model } = require("../models/User");
// const { registerUser } = require("../controllers/userController");
// const router = express.Router();

// // POST request to register a user
// router.post("/signup", registerUser);


// module.exports = router;

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/signup", registerUser,authMiddleware);
router.post("/login", loginUser,authMiddleware);

// Example protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

module.exports = router;
