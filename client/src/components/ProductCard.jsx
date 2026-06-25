import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = cartItems.find((item) => item._id === product._id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i - rating < 1 && i - rating > 0) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-card-content">
        <Link to={`/product/${product._id}`} className="product-card-image-link">
          <img
            src={product.image}
            alt={product.title}
            className="product-card-image"
          />
        </Link>

        <h2 className="product-card-title">
          <Link to={`/product/${product._id}`} className="product-card-title-link">
            {product.title}
          </Link>
        </h2>

        <div className="product-card-rating">
          <span className="stars">{renderStars(product.rating || 0)}</span>
          <span className="rating-count">{product.numReviews || 0}</span>
        </div>

        <div className="product-card-price-row">
          <span className="product-card-price">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="product-card-original-price">₹{product.originalPrice}</span>
              <span className="product-card-discount">-{discountPercent}%</span>
            </>
          )}
        </div>
      </div>

      <div className="product-card-actions">
        <Link to={`/product/${product._id}`} className="view-details-btn">
          View Details
        </Link>

        {cartItem ? (
          <div className="quantity-controls">
            <button
              className="qty-btn"
              onClick={() =>
                cartItem.qty === 1
                  ? removeFromCart(product._id)
                  : updateQuantity(product._id, cartItem.qty - 1)
              }
              aria-label="Decrease quantity"
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
              aria-label="Increase quantity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        ) : (
          <button
            className={`add-to-cart-btn ${isAdding ? "btn-adding-active" : ""}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "✓ Added" : "Add To Cart"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
