/**
 * @file products.js (Products Router)
 * @description Senior Developer Review:
 * Express router handling product retrieval APIs.
 * Includes fetching all seeded products and fetching a single product using its unique ID.
 * 
 * Hindi Guide:
 * Yeh router products data ko backend se read karne ke endpoints control karta hai.
 * GET '/' se saare products retrieve honge.
 * GET '/:id' se kisi ek specific product ki description aur details uske unique ID ke basis par milegi.
 */

const express = require("express");
const Product = require("../models/product");

// Create Express Router instance
const router = express.Router();

// Logger console to prove the routes file is compiled correctly during server startup
console.log("Products Route Loaded");

/**
 * @route   GET /api/products
 * @desc    Get a list of all products in the database
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    // Hindi: Database se bina kisi filter ke saare products find kar ke fetch kar rahe hain
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get details of a single product by its MongoDB _id
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    // Hindi: Request parameters se product ID nikaal kar database me query kar rahe hain
    const product = await Product.findById(req.params.id);

    // 1. If product is null, it means it doesn't exist
    // Hindi: Agar database me is ID ka koi product nahi mila to 404 error code return karenge
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // 2. Return product data if found
    res.json(product);
  } catch (error) {
    console.error("Fetch single product error:", error);
    
    // Hindi: Agar ID ka structure invalid ho (Mongoose cast error), to validation block handle karta hai
    res.status(500).json({
      message: "Invalid product ID or database query error",
      error: error.message,
    });
  }
});

module.exports = router;