import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCarousel.css";

function ProductCarousel({ products }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const featured = products.slice(0, 8);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 3000);
  }, [featured.length]);

  useEffect(() => {
    if (featured.length === 0) return;
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, startTimer, featured.length]);

  if (featured.length === 0) return null;

  const product = featured[current];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-main">
        <button className="carousel-arrow left" onClick={() => { setCurrent((prev) => (prev - 1 + featured.length) % featured.length); startTimer(); }}>‹</button>

        <div className="carousel-slide-container">
          <div className="carousel-slide" key={current} onClick={() => navigate(`/product/${product._id}`)}>
            <div className="carousel-image-box">
              <img src={product.image} alt={product.title} className="carousel-image" />
            </div>
            <div className="carousel-info">
              <span className="carousel-category">{product.category}</span>
              <h2 className="carousel-title">{product.title}</h2>
              <p className="carousel-desc">{product.description.substring(0, 100)}...</p>
              <div className="carousel-price-row">
                <span className="carousel-price">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="carousel-original">₹{product.originalPrice}</span>
                )}
                {discount > 0 && <span className="carousel-discount">{discount}% off</span>}
              </div>
              <div className="carousel-rating">
                <span className="carousel-stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                <span className="carousel-reviews">{product.numReviews} ratings</span>
              </div>
              <button className="carousel-cta" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product._id}`); }}>
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <button className="carousel-arrow right" onClick={() => { setCurrent((prev) => (prev + 1) % featured.length); startTimer(); }}>›</button>
      </div>

      {/* Thumbnails - scrolling strip */}
      <div className="carousel-thumb-strip">
        <div
          className="carousel-thumb-track"
          style={{ transform: `translateX(-${Math.max(0, current - 2) * 70}px)` }}
        >
          {featured.map((item, index) => (
            <div
              key={item._id}
              className={`carousel-thumb ${index === current ? "active" : ""}`}
              onClick={() => { setCurrent(index); startTimer(); }}
            >
              <img src={item.image} alt={item.title} className="carousel-thumb-img" />
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="carousel-progress-track">
        <div
          className="carousel-progress-bar"
          key={current}
          style={{ animationDuration: isPaused ? '0s' : '3s' }}
        />
      </div>
    </div>
  );
}

export default ProductCarousel;
