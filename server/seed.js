const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");

dotenv.config();

const sampleProducts = [
  {
    title: "Wireless Headphones",
    price: 2999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    description: "Premium over-ear wireless headphones with active noise cancellation and 40-hour battery life. Features include Bluetooth 5.0, built-in microphone, and comfortable memory foam ear cushions for extended listening sessions.",
    category: "Electronics",
    rating: 4.5,
    numReviews: 2341,
    inStock: true
  },
  {
    title: "Smart Watch",
    price: 4999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    description: "Feature-packed smartwatch with heart rate monitoring, fitness tracking, and a high-resolution touch display. Water resistant up to 50m with 7-day battery life and GPS tracking.",
    category: "Electronics",
    rating: 4.3,
    numReviews: 1876,
    inStock: true
  },
  {
    title: "Running Shoes",
    price: 3499,
    originalPrice: 5499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    description: "Lightweight and breathable running shoes designed for ultimate comfort and high performance. Features responsive cushioning, flexible sole, and moisture-wicking mesh upper.",
    category: "Footwear",
    rating: 4.6,
    numReviews: 3102,
    inStock: true
  },
  {
    title: "Backpack",
    price: 1999,
    originalPrice: 3299,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    description: "Durable and water-resistant laptop backpack with multiple compartments for daily travel and school. Padded laptop sleeve fits up to 15.6 inch devices with USB charging port.",
    category: "Accessories",
    rating: 4.4,
    numReviews: 1543,
    inStock: true
  },
  {
    title: "Sunglasses",
    price: 1299,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
    description: "Stylish polarized sunglasses providing 100% UV protection with a classic retro design. Lightweight titanium frame with scratch-resistant lenses.",
    category: "Fashion",
    rating: 4.2,
    numReviews: 987,
    inStock: true
  },
  {
    title: "Bluetooth Speaker",
    price: 2499,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    description: "Portable waterproof bluetooth speaker offering rich, immersive sound and deep bass. IPX7 rated with 24-hour playtime and TWS pairing support for stereo sound.",
    category: "Electronics",
    rating: 4.7,
    numReviews: 2789,
    inStock: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Product.deleteMany({});
    console.log("Deleted existing products from collection.");

    await Product.insertMany(sampleProducts);
    console.log("Database seeded successfully with 6 sample products!");

    mongoose.connection.close();
    console.log("Database connection closed cleanly.");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
