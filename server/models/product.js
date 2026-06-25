/**
 * @file Product.js (Model Schema)
 * @description Senior Developer Review:
 * This file defines the Mongoose schema for the Products.
 * Every product is required to have a title, price, description, image URL, and category.
 * 
 * Hindi Guide:
 * Yeh model Amazon store ke products ka database design define karta hai.
 * Isme har product ke liye title, price, image link, description, aur category properties honi zaroori (required) hain.
 */

const mongoose = require("mongoose");

// Schema declaration for products
const productSchema = new mongoose.Schema({
  // Product Title (e.g., iPhone 15, Smart Watch)
  title: {
    type: String,
    required: [true, "Product title is required"],
    trim: true
  },

  // Product Price in numbers (Rupees)
  price: {
    type: Number,
    required: [true, "Product price is required"] // Hindi: Numbers format me store hoga (e.g., 2999)
  },

  // Image URL from CDN/Unsplash
  image: {
    type: String,
    required: [true, "Product image URL is required"] // Hindi: Image ka absolute URL string save hota hai yahan
  },

  // Detailed description of the product
  description: {
    type: String,
    required: [true, "Product description is required"]
  },

  // Category classification (e.g., Electronics, Footwear, Fashion)
  category: {
    type: String,
    required: [true, "Product category is required"],
    trim: true
  },

  // Product rating out of 5
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },

  // Number of reviews
  numReviews: {
    type: Number,
    default: 0
  },

  // Original price before discount (if applicable)
  originalPrice: {
    type: Number,
    default: null
  },

  // Whether product is in stock
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  // Automatically manage 'createdAt' and 'updatedAt' fields
  timestamps: true
});

// Compile and export the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;