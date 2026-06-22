const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const app = express();

app.use(cors());

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

// Test Route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend Connected Successfully!",
  });
});

// DB Test Route
app.get("/testdb", async (req, res) => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    res.json(collections);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Products Route
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});