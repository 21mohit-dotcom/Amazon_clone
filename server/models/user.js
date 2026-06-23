/**
 * @file User.js (Model Schema)
 * @description Senior Developer Review: 
 * This file defines the User schema for MongoDB using Mongoose.
 * It handles the user credentials and constraints like uniqueness for emails.
 * 
 * Hindi Guide: 
 * Yeh model database ke 'users' collection ka structure define karta hai.
 * Isme name, email (unique aur valid format), aur password fields hain jo sign up/login ke liye mandatory hain.
 */

const mongoose = require("mongoose");

// Defining the schema for User collection
const userSchema = new mongoose.Schema({
  // Name of the user - Required field
  name: {
    type: String,
    required: [true, "Name is required"], // Hindi: Name empty nahi ho sakta
    trim: true // Hindi: Extra spaces to starting aur end se automatically remove ho jayenge
  },

  // Unique email of the user - Required field
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Hindi: Ek email se sirf ek hi account banega, duplicate error trigger karega
    trim: true,
    lowercase: true // Hindi: Email ko automatic lowercase convert karega taaki unique validation perfectly chale
  },

  // Hashed password of the user - Required field
  password: {
    type: String,
    required: [true, "Password is required"] // Hindi: Password database me plain text me nahi, hash format me save hoga (handled in auth.js)
  }
}, {
  // Automatically creates 'createdAt' and 'updatedAt' timestamps in database
  timestamps: true 
});

// Create and export the User model to use in auth routes
const User = mongoose.model("User", userSchema);

module.exports = User;