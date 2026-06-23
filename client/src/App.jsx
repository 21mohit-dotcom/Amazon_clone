/**
 * @file App.jsx (Root Application Component)
 * @description Senior Developer Review:
 * Renders the primary user interface. Fetches seeded product list from the Node.js Express backend
 * using Axios wrapper (`api.js`) and presents it to the user as a grid of product cards.
 * 
 * Hindi Guide:
 * App.jsx frontend ka main layout hai.
 * Yahan `useEffect` hook ka use karke API call ke through products array fetch kiya jata hai.
 * products ko map kar ke individual card design (title, price, image, description) ke saath display kiya jata hai.
 */

import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";
import Navbar from "./components/Navbar";
import { useCart } from "./context/CartContext";

function App() {
  // Global cart state variables & functions from CartContext
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  // Temporary state for clicked product (provides active feedback visual click feeling)
  const [addingId, setAddingId] = useState(null);

  // Helper handler when user clicks "Add to Cart"
  const handleAddToCart = (product) => {
    setAddingId(product._id); // Mark product as currently adding
    addToCart(product);       // Add item to cart state
    setTimeout(() => {
      setAddingId(null);      // Reset indicator after 500ms
    }, 500);
  };

  // State hook to store the retrieved list of products
  const [products, setProducts] = useState([]);

  // Search box me jo user type karega usko store karega
  const [search, setSearch] = useState("");

  // Fetch product list when component loads on screen
  // Hindi: Mount hone par API call initiate hogi aur products load kiye jayenge
  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        console.log("Fetched Products:", res.data);
        setProducts(res.data); // Update state to trigger UI render
      })
      .catch((err) => {
        console.error("API Call error in App.jsx:", err);
      });
  }, []);

  // Search query ke basis par products filter karenge (Case-Insensitive search)
  // Hindi: User jo search box me likhega, us product title ko match karke products select honge.
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar
        // Current search text Navbar ko bhej rahe hain
        search={search}
        // Search update karne wala function Navbar ko bhej rahe hain
        setSearch={setSearch}
        // Backend se aaye products pass kar rahe hain dynamic suggestions ke liye
        products={products}
      />
      
      {/* Root Layout Header */}
      <h1>Amazon Clone</h1>

      {/* Product count display */}
      <p>Total Products: {filteredProducts.length}</p>

      {/* Grid container to hold product listings */}
      <div className="products-container">
        {filteredProducts.map((product) => {
          // Find if this product is already in the shopping cart
          const cartItem = cartItems.find((item) => item._id === product._id);

          return (
            // Product Card element with a unique key constraint
            <div className="product-card" key={product._id}>
              {/* Title of Product */}
              <h2>{product.title}</h2>

              {/* Product Cover Image from seeded Unsplash URL */}
              <img
                src={product.image}
                alt={product.title}
              />

              {/* Price formatted in INR (Rupees) */}
              <p>
                <strong>₹{product.price}</strong>
              </p>

              {/* Summary details */}
              <p>{product.description}</p>

              {/* Dynamic Action Area: Show Quantity controls if in cart, otherwise show Add to Cart */}
              {cartItem ? (
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => 
                      cartItem.qty === 1 
                        ? removeFromCart(product._id) 
                        : updateQuantity(product._id, cartItem.qty - 1)
                    }
                  >
                    {cartItem.qty === 1 ? (
                      // 🗑 Trash icon when quantity is exactly 1 (removes from cart)
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    ) : (
                      // - Minus icon when quantity is greater than 1
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    )}
                  </button>
                  <span className="qty-value">{cartItem.qty}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(product._id, cartItem.qty + 1)}
                  >
                    {/* + Plus icon to increase quantity */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <button 
                  className={`add-to-cart-btn ${addingId === product._id ? "btn-adding-active" : ""}`} 
                  onClick={() => handleAddToCart(product)}
                  disabled={addingId === product._id}
                >
                  {addingId === product._id ? "✓ Added" : "Add To Cart"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;