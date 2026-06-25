import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar({ search = "", setSearch = () => {}, products = [] }) {
  const [isFocused, setIsFocused] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const containerRef = useRef(null);
  const cartDropdownRef = useRef(null);

  const { cartItems, removeFromCart, updateQuantity, total } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [bump, setBump] = useState(false);
  const [location, setLocation] = useState(localStorage.getItem("userLocation") || "Select location");
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    if (cartCount === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(timer);
  }, [cartCount]);

  const suggestions = search.trim()
    ? products
        .filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 8)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setShowCartDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAccountClick = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      {/* Logo + Location Section */}
      <div className="nav-left-section">
        <h2 className="logo" onClick={() => navigate("/")}>
          <span className="logo-amazon">amazon</span>
          <span className="logo-lite">Lite</span>
          <span className="logo-dot">.in</span>
        </h2>
        <div className="nav-location" onClick={() => {
          const loc = prompt("Enter your delivery location:");
          if (loc && loc.trim()) {
            localStorage.setItem("userLocation", loc.trim());
            setLocation(loc.trim());
          }
        }}>
          <span className="nav-location-icon">📍</span>
          <div className="nav-location-text">
            <span className="nav-location-label">Deliver to</span>
            <span className="nav-location-value">{location}</span>
          </div>
        </div>
      </div>

      <div
        className={`search-wrapper-outer ${isFocused ? "focused-outline" : ""}`}
        ref={containerRef}
      >
        <div className="category-dropdown-box">
          <select defaultValue="all">
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="footwear">Footwear</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <div className="search-input-container">
          <input
            className="search-box-input"
            type="text"
            placeholder="Search products..."
            value={search}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearch(e.target.value)}
          />

          {isFocused && search.trim() && suggestions.length > 0 && (
            <ul className="search-suggestions-dropdown">
              {suggestions.map((item) => (
                <li
                  key={item._id}
                  className="suggestion-item"
                  onMouseDown={() => {
                    setSearch(item.title);
                    setIsFocused(false);
                    navigate("/");
                  }}
                >
                  <div className="suggestion-icon-container">
                    {item.image ? (
                      <img src={item.image} alt="thumb" className="suggestion-thumb-img" />
                    ) : (
                      <span>🔍</span>
                    )}
                  </div>
                  <div className="suggestion-text-box">
                    <span className="query-match">{search.toLowerCase()}</span>
                    <span className="query-rest">{item.title.substring(search.length)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="search-submit-btn" aria-label="Submit Search">🔍</button>
      </div>

      <div className="nav-account-widget" onClick={handleAccountClick}>
        <span className="nav-account-line-1">Hello, {user ? user.name : "sign in"}</span>
        <span className="nav-account-line-2">{user ? "Sign Out" : "Account & Lists ▾"}</span>
      </div>

      {/* Cart Icon with Dropdown */}
      <div className="cart-wrapper" ref={cartDropdownRef}>
        <button
          className={`cart-icon-btn ${bump ? "bump-animation" : ""}`}
          onClick={() => setShowCartDropdown(!showCartDropdown)}
          aria-label="Shopping Cart"
        >
          <svg className="cart-svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="white" stroke="white" strokeWidth="2"/>
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="white" stroke="white" strokeWidth="2"/>
            <path d="M1 1H5L7.68 14.39C7.77 14.8504 8.02 15.264 8.38 15.5583C8.74 15.8526 9.19 16.0084 9.65 16H19.4C19.8604 16.0084 20.3099 15.8526 20.6699 15.5583C21.0299 15.264 21.28 14.8504 21.37 14.39L23 6H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {cartCount > 0 && (
            <span className="cart-count-badge">{cartCount}</span>
          )}
        </button>

        {/* Mini Cart Dropdown */}
        {showCartDropdown && (
          <div className="cart-dropdown">
            <div className="cart-dropdown-header">
              <h3>Shopping Cart ({cartCount} {cartCount === 1 ? "item" : "items"})</h3>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-dropdown-empty">
                <div className="cart-empty-icon">🛒</div>
                <p>Your cart is empty</p>
                <button
                  className="cart-dropdown-shop-btn"
                  onClick={() => { setShowCartDropdown(false); navigate("/"); }}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-dropdown-items">
                  {cartItems.map((item) => (
                    <div key={item._id} className="cart-dropdown-item">
                      <div className="cart-dropdown-item-img" onClick={() => { setShowCartDropdown(false); navigate(`/product/${item._id}`); }}>
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="cart-dropdown-item-info">
                        <p
                          className="cart-dropdown-item-title"
                          onClick={() => { setShowCartDropdown(false); navigate(`/product/${item._id}`); }}
                        >
                          {item.title}
                        </p>
                        <span className="cart-dropdown-item-price">₹{item.price}</span>
                        <div className="cart-dropdown-qty-controls">
                          <button
                            className="cart-dropdown-qty-btn"
                            onClick={() => item.qty === 1 ? removeFromCart(item._id) : updateQuantity(item._id, item.qty - 1)}
                          >
                            {item.qty === 1 ? "🗑" : "−"}
                          </button>
                          <span className="cart-dropdown-qty-value">{item.qty}</span>
                          <button
                            className="cart-dropdown-qty-btn"
                            onClick={() => updateQuantity(item._id, item.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="cart-dropdown-item-right">
                        <span className="cart-dropdown-item-total">₹{item.price * item.qty}</span>
                        <button
                          className="cart-dropdown-item-remove"
                          onClick={() => removeFromCart(item._id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-dropdown-footer">
                  <div className="cart-dropdown-subtotal">
                    <span>Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"}):</span>
                    <strong>₹{total}</strong>
                  </div>
                  <button
                    className="cart-dropdown-order-btn"
                    onClick={() => {
                      setShowCartDropdown(false);
                      if (user) {
                        navigate("/cart");
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    {user ? "Proceed to Checkout" : "Sign in to Checkout"}
                  </button>
                  <button
                    className="cart-dropdown-view-btn"
                    onClick={() => { setShowCartDropdown(false); navigate("/cart"); }}
                  >
                    View Full Cart
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
