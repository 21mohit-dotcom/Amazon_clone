const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
console.log("===== MY SERVER FILE IS RUNNING =====");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use((req, res, next) => {
  console.log(`\n--- Incoming Request: ${req.method} ${req.url} ---`);
  console.log(`Content-Type: ${req.headers["content-type"]}`);
  console.log(`Headers:`, JSON.stringify(req.headers, null, 2));
  next();
});
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:");
    console.error(err);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("Amazon Clone Backend Running");
});

// Debug Route
app.get("/debug", (req, res) => {
  res.json({
    message: "DEBUG ROUTE WORKING",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/mohit-test", (req, res) => {
  res.send("MOHIT TEST ROUTE");
});
// Start Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});