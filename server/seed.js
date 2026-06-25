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
  },
  {
    title: "Face Cream",
    price: 399,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
    description: "Premium skin brightening face cream with SPF 30 protection. Enriched with vitamin C, hyaluronic acid, and natural extracts for glowing hydrated skin.",
    category: "Accessories",
    rating: 4.5,
    numReviews: 892,
    inStock: true
  },
  {
    title: "Mechanical Keyboard",
    price: 3999,
    originalPrice: 6499,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800",
    description: "RGB backlit mechanical gaming keyboard with blue switches. Full n-key rollover, programmable macros, and durable ABS keycaps rated for 50 million keystrokes.",
    category: "Electronics",
    rating: 4.6,
    numReviews: 1567,
    inStock: true
  },
  {
    title: "Yoga Mat",
    price: 899,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800",
    description: "Premium non-slip yoga mat with 6mm thickness for joint protection. Eco-friendly TPE material, alignment lines, and carrying strap included.",
    category: "Sports",
    rating: 4.4,
    numReviews: 2134,
    inStock: true
  },
  {
    title: "Denim Jacket",
    price: 2499,
    originalPrice: 4499,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800",
    description: "Classic blue denim jacket with a modern slim fit. Made from premium cotton denim with button closure, chest pockets, and adjustable waist tabs.",
    category: "Fashion",
    rating: 4.3,
    numReviews: 1245,
    inStock: true
  },
  {
    title: "Gaming Mouse",
    price: 1999,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
    description: "High-precision wireless gaming mouse with 16000 DPI optical sensor. RGB lighting, 8 programmable buttons, and 60-hour battery life.",
    category: "Electronics",
    rating: 4.7,
    numReviews: 3421,
    inStock: true
  },
  {
    title: "Water Bottle",
    price: 699,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
    description: "Double-wall insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof lid with wide mouth design.",
    category: "Accessories",
    rating: 4.5,
    numReviews: 4532,
    inStock: true
  },
  {
    title: "Wireless Charger",
    price: 999,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
    description: "15W fast wireless charging pad compatible with all Qi-enabled devices. LED indicator, anti-slip surface, and overheat protection built in.",
    category: "Electronics",
    rating: 4.2,
    numReviews: 1876,
    inStock: true
  },
  {
    title: "Cotton T-Shirt",
    price: 599,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    description: "Premium 100% organic cotton crew neck t-shirt. Pre-shrunk fabric, reinforced stitching, and available in multiple colors. Perfect for everyday wear.",
    category: "Fashion",
    rating: 4.1,
    numReviews: 5678,
    inStock: true
  },
  {
    title: "Desk Lamp",
    price: 1799,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800",
    description: "LED desk lamp with adjustable brightness and color temperature. Touch control, USB charging port, flexible gooseneck, and 50000-hour lifespan.",
    category: "Home",
    rating: 4.6,
    numReviews: 1234,
    inStock: true
  },
  {
    title: "Fitness Tracker Band",
    price: 1999,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800",
    description: "Slim fitness tracker with heart rate monitor, sleep tracking, and step counter. IP68 waterproof, 14-day battery life, and call/message notifications.",
    category: "Electronics",
    rating: 4.3,
    numReviews: 2345,
    inStock: true
  },
  {
    title: "Ceramic Coffee Mug",
    price: 449,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
    description: "Handcrafted ceramic coffee mug with 350ml capacity. Microwave and dishwasher safe, ergonomic handle, and lead-free glaze finish.",
    category: "Home",
    rating: 4.4,
    numReviews: 3211,
    inStock: true
  },
  {
    title: "Canvas Sneakers",
    price: 1299,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
    description: "Classic canvas sneakers with vulcanized rubber sole. Breathable cotton upper, cushioned insole, and timeless design that goes with everything.",
    category: "Footwear",
    rating: 4.5,
    numReviews: 2876,
    inStock: true
  },
  {
    title: "Wireless Earbuds",
    price: 1799,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b7c0b0?w=800",
    description: "True wireless earbuds with active noise cancellation. IPX5 sweatproof, 30-hour total playtime with case, touch controls, and transparent mode.",
    category: "Electronics",
    rating: 4.6,
    numReviews: 4567,
    inStock: true
  },
  {
    title: "Travel Duffel Bag",
    price: 2299,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    description: "Large capacity travel duffel bag with shoe compartment. Water-resistant material, padded shoulder strap, and multiple zip pockets for organization.",
    category: "Accessories",
    rating: 4.4,
    numReviews: 1678,
    inStock: true
  },
  {
    title: "Action Camera",
    price: 4999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
    description: "4K waterproof action camera with image stabilization. 170-degree wide angle, WiFi connectivity, and Includes mounting accessories for sports and adventures.",
    category: "Electronics",
    rating: 4.5,
    numReviews: 1987,
    inStock: true
  },
  {
    title: "Casual Hoodie",
    price: 1799,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800",
    description: "Comfortable pullover hoodie made from premium fleece. Kangaroo pocket, adjustable drawstring hood, ribbed cuffs, and pre-shrunk fabric.",
    category: "Fashion",
    rating: 4.3,
    numReviews: 3456,
    inStock: true
  },
  {
    title: "Portable Power Bank",
    price: 1499,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800",
    description: "20000mAh high-capacity portable charger with dual USB output. Fast charging support, LED digital display, and compact design for on-the-go power.",
    category: "Electronics",
    rating: 4.6,
    numReviews: 5432,
    inStock: true
  },
  {
    title: "Soccer Ball",
    price: 799,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
    description: "FIFA-approved machine-stitched soccer ball. Butyl bladder for excellent air retention, durable PU leather cover, and all-surface play capability.",
    category: "Sports",
    rating: 4.4,
    numReviews: 1876,
    inStock: true
  },
  {
    title: "Plant Pot Set",
    price: 1199,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    description: "Set of 3 minimalist ceramic plant pots in assorted sizes. Drainage holes included, matte finish, and modern geometric design for home decor.",
    category: "Home",
    rating: 4.2,
    numReviews: 987,
    inStock: true
  },
  {
    title: "Noise Cancelling Earbuds Pro",
    price: 3499,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800",
    description: "Premium ANC earbuds with spatial audio. 35-hour battery with case, IPX5 water resistant, multipoint connection, and crystal clear call quality.",
    category: "Electronics",
    rating: 4.8,
    numReviews: 3211,
    inStock: true
  },
  {
    title: "Leather Wallet",
    price: 899,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800",
    description: "Genuine leather bifold wallet with RFID blocking. 8 card slots, bill compartment, and slim profile design. Fits comfortably in front or back pocket.",
    category: "Accessories",
    rating: 4.3,
    numReviews: 1543,
    inStock: true
  },
  {
    title: "MS Dhoni IPL Jersey",
    price: 999,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800",
    description: "Official MS Dhoni CSK yellow IPL jersey. Premium breathable polyester fabric with printed name and number. Available in all sizes for true cricket fans.",
    category: "Home",
    rating: 4.5,
    numReviews: 2876,
    inStock: true
  },
  {
    title: "Baseball Cap",
    price: 599,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800",
    description: "Classic adjustable baseball cap with curved brim. Breathable cotton fabric, moisture-wicking sweatband, and metal clasp closure. One size fits all.",
    category: "Fashion",
    rating: 4.1,
    numReviews: 1987,
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
    console.log(`Database seeded successfully with ${sampleProducts.length} products!`);

    mongoose.connection.close();
    console.log("Database connection closed cleanly.");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
