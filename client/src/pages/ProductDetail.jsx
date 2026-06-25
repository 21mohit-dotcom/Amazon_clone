import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get(`/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch product details:", err);
        setError("Could not load product information.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      navigate("/cart");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i} style={{ color: "#de7921", fontSize: "18px" }}>★</span>);
      } else if (i - rating < 1 && i - rating > 0) {
        stars.push(<span key={i} style={{ color: "#de7921", fontSize: "18px" }}>★</span>);
      } else {
        stars.push(<span key={i} style={{ color: "#d0d0d0", fontSize: "18px" }}>★</span>);
      }
    }
    return stars;
  };

  const discountPercent = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", paddingBottom: "40px" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "24px auto", padding: "0 20px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "#007185",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            padding: "8px 0",
            marginBottom: "16px"
          }}
        >
          ‹ Back to products
        </button>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", flexDirection: "column" }}>
            <div style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #febd69",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite"
            }} />
            <p style={{ marginTop: "16px", color: "#565959", fontSize: "14px" }}>Loading details...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error || !product ? (
          <div style={{ textAlign: "center", padding: "40px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3 style={{ color: "#c40000" }}>{error || "Product not found"}</h3>
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "16px",
                backgroundColor: "#f7ca00",
                border: "1px solid #a88734",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Go Home
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginTop: "20px" }}>
            {/* Left: Image Section */}
            <div style={{
              flex: "1 1 400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fcfcfc",
              border: "1px solid #f0f0f0",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
            }}>
              <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: "100%", maxHeight: "450px", objectFit: "contain" }}
              />
            </div>

            {/* Right: Info Section */}
            <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", textAlign: "left" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "500", lineHeight: "1.3", color: "#0F1111", margin: "0 0 4px 0" }}>
                {product.title}
              </h1>

              {/* Brand placeholder */}
              <p style={{ fontSize: "14px", color: "#565959", margin: "0 0 8px 0" }}>
                Visit the AmazonLite Store
              </p>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "4px 0 12px 0" }}>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#007185" }}>{product.rating} out of 5</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {renderStars(product.rating || 0)}
                </div>
                <span style={{ fontSize: "14px", color: "#007185" }}>{product.numReviews || 0} ratings</span>
              </div>

              {/* Divider */}
              <hr style={{ border: "none", borderTop: "1px solid #e7e7e7", margin: "0 0 12px 0" }} />

              {/* Price Section */}
              <div style={{ margin: "0 0 12px 0" }}>
                {discountPercent > 0 && (
                  <span style={{
                    fontSize: "13px",
                    color: "#cc0c39",
                    backgroundColor: "#FDEBEB",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontWeight: "600",
                    display: "inline-block",
                    marginBottom: "6px"
                  }}>
                    {discountPercent}% off
                  </span>
                )}
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontSize: "28px", color: "#B12704", fontWeight: "500" }}>₹{product.price}</span>
                  {product.originalPrice && (
                    <span style={{ fontSize: "14px", color: "#565959", textDecoration: "line-through" }}>₹{product.originalPrice}</span>
                  )}
                </div>
                <p style={{ fontSize: "12px", color: "#565959", margin: "4px 0 0 0" }}>Inclusive of all taxes</p>
              </div>

              {/* Description */}
              <div style={{ marginBottom: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F1111", margin: "0 0 8px 0" }}>About this item</h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#333333", margin: 0 }}>{product.description}</p>
              </div>

              {/* Category */}
              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "14px", color: "#565959" }}>
                  <strong>Category:</strong> {product.category}
                </span>
              </div>

              {/* Stock Status */}
              <div style={{ marginBottom: "20px" }}>
                <span style={{
                  fontSize: "14px",
                  color: product.inStock !== false ? "#007600" : "#c40000",
                  fontWeight: "600"
                }}>
                  {product.inStock !== false ? "✓ In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Buy Box Card */}
              <div style={{
                border: "1px solid #d5d9d9",
                borderRadius: "8px",
                padding: "18px",
                backgroundColor: "#fcfcfc",
                width: "100%",
                maxWidth: "340px",
                boxSizing: "border-box",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
              }}>
                <span style={{ fontSize: "20px", color: "#B12704", fontWeight: "500", display: "block", marginBottom: "8px" }}>
                  ₹{product.price}
                </span>

                <span style={{ fontSize: "14px", color: "#007600", fontWeight: "600", display: "block", marginBottom: "12px" }}>
                  In stock
                </span>

                <p style={{ fontSize: "12px", color: "#565959", margin: "0 0 12px 0", lineHeight: "1.4" }}>
                  Fast delivery available. Standard transaction policies apply.
                </p>

                {/* Quantity Selector */}
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ fontSize: "13px", color: "#565959", display: "block", marginBottom: "4px" }}>Qty:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid #d5d9d9",
                      fontSize: "14px",
                      backgroundColor: "#f0f2f2",
                      cursor: "pointer"
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  style={{
                    backgroundColor: addedToCart ? "#2ec4b6" : "#febd69",
                    borderColor: addedToCart ? "#20a396" : "#a88734 #9c7e31 #846a29",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    color: addedToCart ? "white" : "#111",
                    padding: "10px 18px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    width: "100%",
                    boxShadow: "0 2px 5px rgba(213,217,217,.5)",
                    transition: "all 0.2s",
                    marginBottom: "10px"
                  }}
                >
                  {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  style={{
                    backgroundColor: "#ffa41c",
                    borderColor: "#ff8f00",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    color: "#111",
                    padding: "10px 18px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    width: "100%",
                    boxShadow: "0 2px 5px rgba(213,217,217,.5)",
                    transition: "all 0.2s"
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
