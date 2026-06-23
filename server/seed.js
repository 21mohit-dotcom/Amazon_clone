/**
 * @file seed.js (Database Seeder Utility)
 * @description Senior Developer Review:
 * This script seeds the MongoDB database with initial sample products.
 * It deletes existing entries in the products collection and bulk inserts clean mock data.
 * 
 * Hindi Guide:
 * Yeh script development environment ke liye mock products database me load karne ki service hai.
 * `npm run seed` command run karne par purane sare products remove ho jate hain aur ye 6 products fresh write ho jate hain.
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

// Load .env variables so MONGO_URI is accessible
dotenv.config();

// Array containing 6 initial products with realistic prices in rupees and curated image URLs from Unsplash CDN
const sampleProducts = [
  {
    title: "Wireless Headphones",
    price: 2999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    description: "Premium over-ear wireless headphones with active noise cancellation and 40-hour battery life.",
    category: "Electronics"
  },
  {
    title: "Smart Watch",
    price: 4999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    description: "Feature-packed smartwatch with heart rate monitoring, fitness tracking, and a high-resolution touch display.",
    category: "Electronics"
  },
  {
    title: "Running Shoes",
    price: 3499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    description: "Lightweight and breathable running shoes designed for ultimate comfort and high performance.",
    category: "Footwear"
  },
  {
    title: "Backpack",
    price: 1999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    description: "Durable and water-resistant laptop backpack with multiple compartments for daily travel and school.",
    category: "Accessories"
  },
  {
    title: "Sunglasses",
    price: 1299,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
    description: "Stylish polarized sunglasses providing 100% UV protection with a classic retro design.",
    category: "Fashion"
  },
  {
    title: "Bluetooth Speaker",
    price: 2499,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    description: "Portable waterproof bluetooth speaker offering rich, immersive sound and deep bass.",
    category: "Electronics"
  }
];

// Async function to run database operations
const seedDB = async () => {
  try {
    // 1. Establish connection to the DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding...");

    // 2. Clear old database products (Prevents infinite duplicates on re-run)
    // Hindi: Purane saare products list delete karenge pehle, taaki listing fresh aur clean ho
    await Product.deleteMany({});
    console.log("🧹 Deleted existing products from collection.");

    // 3. Bulk insert the seed product list
    await Product.insertMany(sampleProducts);
    console.log("🌱 Database seeded successfully with 6 sample products!");

    // 4. Safely close database connection when complete
    mongoose.connection.close();
    console.log("🔌 Database connection closed cleanly.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    // Exit process with failure code 1
    process.exit(1);
  }
};

// Execute seeder function
seedDB();
