/**
 * @file auth.js (Authentication Router)
 * @description Senior Developer Review:
 * Express router handling registration (/signup) and authentication (/login).
 * Uses bcryptjs for robust, salted password hashing, and jsonwebtoken (JWT) for stateless token authentication.
 * 
 * Hindi Guide:
 * Yeh router users ke Signup aur Login functionality ko handle karta hai.
 * Signup ke waqt password ko bcrypt se hash (secure lock) kiya jata hai.
 * Login ke waqt password check karke authorization ke liye JWT token user ko return kiya jata hai.
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Create Express Router instance
const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user & return JWT token
 * @access  Public
 */
router.post("/signup", async (req, res) => {
  // Debug log: Logs the incoming body from headers/request
  console.log("SIGNUP BODY RECEIVED:", req.body);

  try {
    const { name, email, password } = req.body || {};

    // 1. Validation: Ensure all fields are filled
    // Hindi: Check kar rahe hain ki saari user credentials aayi hain ya nahi
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // 2. Check duplicate email in DB
    // Hindi: Database me check karenge ki is email se koi aur user to nahi hai
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 3. Password Hashing (Security Best Practice)
    // Salt rounds = 10. Hindi: Passwords ko database me readable format me save karna dangerous hai, isliye secure hash me badla.
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save new user to the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Storing hash instead of plain text
    });

    // 5. Generate JSON Web Token (JWT)
    // Sign payload with user ID and secret key, valid for 30 Days.
    // Hindi: JWT Token se server user ki identity verify karta hai user ke login rehne tak.
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // 6. Return response containing token and non-sensitive user info
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal server error occurred",
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & return JWT token
 * @access  Public
 */
router.post("/login", async (req, res) => {
  console.log("LOGIN BODY RECEIVED:", req.body);

  try {
    const { email, password } = req.body || {};

    // 1. Validation: Ensure both fields are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Retrieve user from Database by Email
    const user = await User.findOne({ email });
    if (!user) {
      // Security Tip: Keep error messages generic so hackers don't guess emails
      // Hindi: Invalid error message generic rakha jata hai taaki hackers ko exact info na mile.
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 3. Compare input password with database hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 4. Generate JSON Web Token (JWT)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // 5. Send login token and user summary info
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error occurred",
      error: error.message,
    });
  }
});

module.exports = router;
