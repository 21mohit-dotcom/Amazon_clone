/**
 * Navbar Component
 *
 * Is component ka kaam:
 * 1. AmazonLite logo dikhana (leads to home)
 * 2. Search bar handle karna
 * 3. Search suggestions dikhana
 * 4. Cart count show karna
 * 5. User Account Status display karna (Hello, Sign In / Sign Out)
 * 
 * Hinglish Guide:
 * Navbar me ab global `useAuth()` hook connect kiya hai.
 * Agar user login nahi hai to use "Hello, sign in" dikhega jo "/login" page par redirect karega.
 * Agar user login hai to uska actual name (e.g. Mohit) aur "Sign Out" options render hote hain.
 */

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar({ search = "", setSearch = () => {}, products = [] }) {
  // Search box focus me hai ya nahi track karne ke liye
  const [isFocused, setIsFocused] = useState(false);

  // Search container ka DOM reference store karne ke liye
  const containerRef = useRef(null);

  // CartContext se cart ke products nikal rahe hain
  const { cartItems } = useCart();

  // AuthContext se auth stats nikal rahe hain
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  // Cart button me micro-animation bump add karne ke liye state
  const [bump, setBump] = useState(false);
  const cartCount = cartItems.length;

  // Jab bhi cart items ki count badhegi, tab animation class trigger hogi
  useEffect(() => {
    if (cartCount === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300); // 300ms ke baad class remove ho jayegi
    return () => clearTimeout(timer);
  }, [cartCount]);

  /**
   * Search Suggestions Logic
   * User jo type karega uske matching products nikalenge
   */
  const suggestions = search.trim()
    ? products
        .filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 8) // maximum 8 suggestions
    : [];

  /**
   * Outside Click Detection
   * Agar user search bar ke bahar click kare to suggestions dropdown band kar denge
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle click on User login widget
  const handleAccountClick = () => {
    if (user) {
      // Agar user login hai, to tap karne par sign out karenge
      logout();
      navigate("/");
    } else {
      // Agar user login nahi hai, to login route pe le jayenge
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      
      {/* Website Logo - click redirects to homepage */}
      <h2 className="logo" onClick={() => navigate("/")}>
        AmazonLite
      </h2>

      {/* Search Bar + Dropdown + Search Button */}
      <div
        className={`search-wrapper-outer ${
          isFocused ? "focused-outline" : ""
        }`}
        ref={containerRef}
      >
        {/* Category Selection Dropdown */}
        <div className="category-dropdown-box">
          <select defaultValue="all">
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="footwear">Footwear</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Search Input Section */}
        <div className="search-input-container">
          <input
            className="search-box-input"
            type="text"
            placeholder="Search products..."
            value={search}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Suggestions Dropdown */}
          {isFocused && search.trim() && suggestions.length > 0 && (
            <ul className="search-suggestions-dropdown">
              {suggestions.map((item) => (
                <li
                  key={item._id}
                  className="suggestion-item"
                  onMouseDown={() => {
                    setSearch(item.title);
                    setIsFocused(false);
                  }}
                >
                  {/* Product Thumbnail */}
                  <div className="suggestion-icon-container">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="thumb"
                        className="suggestion-thumb-img"
                      />
                    ) : (
                      <span>🔍</span>
                    )}
                  </div>

                  {/* Product Title */}
                  <div className="suggestion-text-box">
                    <span className="query-match">
                      {search.toLowerCase()}
                    </span>
                    <span className="query-rest">
                      {item.title.substring(search.length)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Button */}
        <button className="search-submit-btn" aria-label="Submit Search">
          🔍
        </button>
      </div>

      {/* Right Side Options: User Account & Lists / Sign In Section */}
      {/* Hindi: User status widget displays name or Sign in trigger link */}
      <div className="nav-account-widget" onClick={handleAccountClick}>
        <span className="nav-account-line-1">Hello, {user ? user.name : "sign in"}</span>
        <span className="nav-account-line-2">{user ? "Sign Out" : "Account & Lists ▾"}</span>
      </div>

      {/* Cart Count Button - Bump animation triggered on item addition */}
      <button className={`cart-btn ${bump ? "bump-animation" : ""}`}>
        Cart ({cartCount})
      </button>

    </nav>
  );
}

export default Navbar;