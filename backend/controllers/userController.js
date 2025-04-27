const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register (Signup) a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

    // 👇 Optional: If you want to auto-login after signup
    // const token = jwt.sign(
    //   { id: newUser._id, role: newUser.role },
    //   process.env.SECRETE_KEY,
    //   { expiresIn: "1d" }
    // );
    // res.status(201).json({
    //   message: "User registered and logged in",
    //   token,
    //   user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    // });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRETE_KEY,
      { expiresIn: "1d" }
    );

    // console.log("Token:", token);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Logout User
// exports.logoutUser = (req, res) => {
//   // Clear the token from cookies
//   res.clearCookie("token", {
//     httpOnly: true,
//     sameSite: "Lax",
//     secure: process.env.NODE_ENV === "production",
//   });

//   res.status(200).json({ message: "Logged out successfully" });
// };
