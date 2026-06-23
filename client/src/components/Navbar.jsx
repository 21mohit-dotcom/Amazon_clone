/**
 * Navbar Component
 *
 * Is component ka kaam:
 * 1. AmazonLite logo dikhana
 * 2. Search bar handle karna
 * 3. Search suggestions dikhana
 * 4. Cart count show karna
 */

import { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { useCart } from "../context/CartContext";

function Navbar({ search, setSearch, products = [] }) {

  // Search box focus me hai ya nahi track karne ke liye
  const [isFocused, setIsFocused] = useState(false);

  // Search container ka DOM reference store karne ke liye
  const containerRef = useRef(null);

  // CartContext se cart ke products nikal rahe hain
  const { cartItems } = useCart();

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
   *
   * User jo type karega uske matching products nikalenge
   * Example:
   * search = "wat"
   *
   * Result:
   * Smart Watch
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
   *
   * Agar user search bar ke bahar click kare
   * to suggestions dropdown band kar denge
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
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <nav className="navbar">

      {/* Website Logo */}
      <h2 className="logo">
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
            <option value="electronics">
              Electronics
            </option>
            <option value="fashion">
              Fashion
            </option>
            <option value="footwear">
              Footwear
            </option>
            <option value="accessories">
              Accessories
            </option>
          </select>
        </div>

        {/* Search Input Section */}
        <div className="search-input-container">

          <input
            className="search-box-input"
            type="text"
            placeholder="Search products..."

            // Search state ko input me show karega
            value={search}

            // Input par click karte hi dropdown allow hoga
            onFocus={() => setIsFocused(true)}

            // User jo type karega wo search state me save hoga
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {/* Suggestions Dropdown */}
          {isFocused &&
            search.trim() &&
            suggestions.length > 0 && (

              <ul className="search-suggestions-dropdown">

                {suggestions.map((item) => (

                  <li
                    key={item._id}
                    className="suggestion-item"

                    onMouseDown={() => {
                      // Suggestion select karne par
                      // search box me title fill kar do
                      setSearch(item.title);

                      // Dropdown band kar do
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

                        // Agar image na mile to fallback icon
                        <span>🔍</span>

                      )}

                    </div>

                    {/* Product Title */}
                    <div className="suggestion-text-box">

                      <span className="query-match">
                        {search.toLowerCase()}
                      </span>

                      <span className="query-rest">
                        {item.title.substring(
                          search.length
                        )}
                      </span>

                    </div>

                  </li>

                ))}

              </ul>

            )}

        </div>

        {/* Search Button */}
        <button
          className="search-submit-btn"
          aria-label="Submit Search"
        >
          🔍
        </button>

      </div>

      {/* Cart Count - Bump class add hogi jab unique items badhenge */}
      <button className={`cart-btn ${bump ? "bump-animation" : ""}`}>
        Cart ({cartCount})
      </button>

    </nav>
  );
}

export default Navbar;