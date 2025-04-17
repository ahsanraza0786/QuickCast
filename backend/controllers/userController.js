// /controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register a new user
exports.registerUser = async (req, res) => {
  console.log("Reached Registered ");

  const { name, email, password, role } = req.body;
  console.log("Incoming data:", req.body);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to DB
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
    console.log(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
