/**
 * @file Home.jsx
 * @description AmazonLite Storefront Home Page.
 * Is page par saare products database se fetch hote hain aur hum criteria basis par unhe search/filter kar sakte hain.
 * 
 * Hinglish Guide:
 * Yeh hamara main landing storefront page hai.
 * Yahan standard product listing grid display kiya gaya hai.
 * Navbar ko custom state functions pass kiye gaye hain taaki live filter functionality handle ho sake.
 */

import { useEffect, useState } from "react";
import api from "../api";
import "../App.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Home() {
  // CartContext se functions aur state extract kar rahe hain taaki items modify kar sakein
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  // state variable jo click add indicator ko control karega (micro animation state)
  const [addingId, setAddingId] = useState(null);

  // Product load storage state
  const [products, setProducts] = useState([]);

  // Live filter query stream text tracker
  const [search, setSearch] = useState("");

  // Server database se products call pull fetch logic
  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        console.log("Products loaded in Home.jsx:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Home.jsx API fetch error:", err);
      });
  }, []);

  // Cart helper add validation callback trigger
  const handleAddToCart = (product) => {
    setAddingId(product._id);
    addToCart(product);
    setTimeout(() => {
      setAddingId(null);
    }, 500);
  };

  // User input matches list structure
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar
        search={search}
        setSearch={setSearch}
        products={products}
      />
      
      {/* Root Layout Header */}
      <h1>Amazon Clone</h1>

      {/* Product count indicator display banner */}
      <p>Total Products: {filteredProducts.length}</p>

      {/* Grid wrapper for styling layout cards items list */}
      <div className="products-container">
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find((item) => item._id === product._id);

          return (
            <div className="product-card" key={product._id}>
              <h2>{product.title}</h2>

              <img
                src={product.image}
                alt={product.title}
              />

              <p>
                <strong>₹{product.price}</strong>
              </p>

              <p>{product.description}</p>

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
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    ) : (
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

export default Home;