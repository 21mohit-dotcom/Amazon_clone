/**
 * @file server.js (Express Application Entry point)
 * @description Senior Developer Review:
 * Initializes Express, mounts global middlewares (CORS, body parser),
 * connects to MongoDB Atlas, and binds the server to a network port.
 * 
 * Hindi Guide:
 * Yeh pure project ka entry point hai. Sabse pehle execution isi file se start hoti hai.
 * Yahan middleware setup kiya gaya hai, routes register kiye gaye hain, aur database setup connection trigger kiya jata hai.
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

console.log("===== MY SERVER FILE IS RUNNING =====");

// Import Route Handlers
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

// Load Environment variables from .env file into process.env
dotenv.config();

// Create Express Application instance
const app = express();

/**
 * =======================================================
 *                    MIDDLEWARES
 * =======================================================
 */

// 1. Enable Cross-Origin Resource Sharing (CORS)
// Hindi: React Frontend ko Express Backend se connect aur interact karne ki permission deta hai.
app.use(cors());

// 2. Request Inspector (Debug Middleware)
// Senior Dev Tip: Logs incoming requests, headers, and Content-Type to make debugging issues like bad JSON payloads easy.
// Hindi: Har incoming API call ke methods aur headers console me print karega debugging ke liye.
app.use((req, res, next) => {
  console.log(`\n--- Incoming Request: ${req.method} ${req.url} ---`);
  console.log(`Content-Type Header: ${req.headers["content-type"] || "NONE"}`);
  next();
});

// 3. Built-in body parser for JSON payloads
// Hindi: Express.json client se aane wale raw JSON body data ko read karke `req.body` object me populate karta hai.
app.use(express.json());

/**
 * =======================================================
 *                    DATABASE CONNECTION
 * =======================================================
 */

// Connect to MongoDB Atlas cluster using URI specified in .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected successfully.");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });

/**
 * =======================================================
 *                       ROUTES
 * =======================================================
 */

// Root Home Endpoint
app.get("/", (req, res) => {
  res.send("Amazon Clone Backend Running");
});

// Debug verification endpoint
app.get("/debug", (req, res) => {
  res.json({
    message: "DEBUG ROUTE WORKING",
  });
});

// Custom test endpoint
app.get("/mohit-test", (req, res) => {
  res.send("MOHIT TEST ROUTE");
});

// Mount modular sub-routers
app.use("/api/auth", authRoutes);       // Mounts registration and login routes
app.use("/api/products", productRoutes); // Mounts product search routes

/**
 * =======================================================
 *                  START SERVER LISTEN
 * =======================================================
 */

// Bind Express server to defined port (Default: 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});