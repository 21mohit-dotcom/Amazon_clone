import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [ordering, setOrdering] = useState(false);

  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const savings = cartItems.reduce((acc, item) => {
    if (item.originalPrice) {
      return acc + (item.originalPrice - item.price) * item.qty;
    }
    return acc;
  }, 0);

  const handlePlaceOrder = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setOrdering(true);
    setTimeout(() => {
      setOrdering(false);
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div style={{ backgroundColor: "#f3f3f3", minHeight: "100vh", paddingBottom: "40px" }}>
        <Navbar />
        <div style={{
          maxWidth: "600px",
          margin: "60px auto 20px auto",
          backgroundColor: "#ffffff",
          padding: "36px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          <div style={{
            fontSize: "50px",
            color: "#007600",
            backgroundColor: "#e7f4e7",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
            border: "3px solid #007600",
            animation: "scaleIn 0.4s ease"
          }}>
            ✓
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#007600", margin: "0 0 12px 0" }}>
            Order Placed Successfully!
          </h1>
          <h3 style={{ fontSize: "16px", fontWeight: "500", color: "#0F1111", margin: "0 0 8px 0" }}>
            Thank you{user ? `, ${user.name}` : ""}! Your order has been confirmed.
          </h3>
          <p style={{ fontSize: "14px", color: "#565959", margin: "0 0 28px 0", lineHeight: "1.5" }}>
            Your order will be delivered within 3-5 business days. A confirmation email has been sent to your registered address.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#febd69",
              borderColor: "#a88734",
              borderStyle: "solid",
              borderWidth: "1px",
              padding: "12px 32px",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
              boxShadow: "0 2px 5px rgba(213,217,217,.5)"
            }}
          >
            Continue Shopping
          </button>
          <style>{`@keyframes scaleIn { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f3f3f3", minHeight: "100vh", paddingBottom: "40px" }}>
      <Navbar />

      <div style={{
        maxWidth: "1150px",
        margin: "24px auto",
        padding: "0 20px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        {/* Main Cart Panel */}
        <div style={{
          flex: "3 1 600px",
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          boxSizing: "border-box"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e7e7e7", paddingBottom: "12px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "400", color: "#0F1111", margin: 0 }}>
              Shopping Cart
            </h1>
            <span style={{ fontSize: "14px", color: "#565959" }}>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>

          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "60px", marginBottom: "16px" }}>🛒</div>
              <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#0F1111", margin: "0 0 8px 0" }}>
                Your cart is empty.
              </h2>
              <p style={{ fontSize: "14px", color: "#565959", margin: "0 0 24px 0" }}>
                Your shopping cart is waiting. Fill it up with amazing products!
              </p>
              <button
                onClick={() => navigate("/")}
                style={{
                  backgroundColor: "#febd69",
                  border: "1px solid #a88734",
                  padding: "10px 24px",
                  borderRadius: "20px",
                  fontWeight: "500",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    borderBottom: "1px solid #e7e7e7",
                    paddingBottom: "16px",
                    flexWrap: "wrap"
                  }}
                >
                  {/* Item Image */}
                  <div style={{
                    width: "140px",
                    height: "140px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                    backgroundColor: "#fcfcfc",
                    borderRadius: "8px",
                    border: "1px solid #f0f0f0"
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                  </div>

                  {/* Item Details */}
                  <div style={{ flex: "1", display: "flex", flexDirection: "column", textAlign: "left", minWidth: "200px" }}>
                    <Link to={`/product/${item._id}`} style={{ textDecoration: "none" }}>
                      <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#0F1111", margin: "0 0 4px 0", lineHeight: "1.3" }}>
                        {item.title}
                      </h4>
                    </Link>

                    <span style={{ fontSize: "12px", color: "#007600", fontWeight: "600", marginBottom: "4px" }}>
                      In Stock
                    </span>

                    {item.originalPrice && item.originalPrice > item.price && (
                      <span style={{ fontSize: "12px", color: "#cc0c39", marginBottom: "4px" }}>
                        You save: ₹{(item.originalPrice - item.price) * item.qty} ({Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off)
                      </span>
                    )}

                    {/* Quantity Controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #d5d9d9",
                        borderRadius: "8px",
                        backgroundColor: "#f0f2f2",
                        boxShadow: "0 2px 5px rgba(213,217,217,.3)",
                        overflow: "hidden",
                        height: "32px"
                      }}>
                        <button
                          onClick={() => item.qty === 1 ? removeFromCart(item._id) : updateQuantity(item._id, item.qty - 1)}
                          style={{
                            border: "none",
                            background: "transparent",
                            width: "32px",
                            height: "100%",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          {item.qty === 1 ? "🗑" : "−"}
                        </button>
                        <span style={{
                          padding: "0 14px",
                          backgroundColor: "#ffffff",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                          fontWeight: "600"
                        }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.qty + 1)}
                          style={{
                            border: "none",
                            background: "transparent",
                            width: "32px",
                            height: "100%",
                            cursor: "pointer",
                            fontSize: "18px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ width: "1px", height: "14px", backgroundColor: "#ddd" }} />

                      <button
                        onClick={() => removeFromCart(item._id)}
                        style={{ border: "none", background: "none", color: "#007185", cursor: "pointer", fontSize: "13px" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Item Price */}
                  <div style={{ textAlign: "right", minWidth: "100px" }}>
                    <span style={{ fontSize: "18px", fontWeight: "700", color: "#0F1111" }}>
                      ₹{item.price * item.qty}
                    </span>
                    {item.qty > 1 && (
                      <span style={{ display: "block", fontSize: "12px", color: "#565959" }}>
                        (₹{item.price} each)
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Subtotal */}
              <div style={{ textAlign: "right", paddingTop: "8px" }}>
                <span style={{ fontSize: "18px" }}>
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
                  <strong style={{ color: "#B12704" }}>₹{total}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        {cartItems.length > 0 && (
          <div style={{
            flex: "1 1 300px",
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxSizing: "border-box",
            height: "fit-content"
          }}>
            {/* Savings Banner */}
            {savings > 0 && (
              <div style={{
                backgroundColor: "#e7f4e7",
                border: "1px solid #007600",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "16px",
                textAlign: "left"
              }}>
                <span style={{ fontSize: "14px", color: "#007600", fontWeight: "600" }}>
                  🎉 Your savings: ₹{savings}
                </span>
              </div>
            )}

            {/* Total Bill */}
            <div style={{ textAlign: "left", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#0F1111", margin: "0 0 12px 0" }}>
                Order Summary
              </h3>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
                <span style={{ color: "#565959" }}>Items ({itemCount}):</span>
                <span>₹{total}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
                <span style={{ color: "#565959" }}>Shipping & handling:</span>
                <span style={{ color: "#007600" }}>FREE</span>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "12px 0" }} />

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "22px",
                fontWeight: "700",
                color: "#B12704"
              }}>
                <span>Order Total:</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={ordering}
              style={{
                backgroundColor: ordering ? "#2ec4b6" : "#00a650",
                border: ordering ? "1px solid #20a396" : "1px solid #008a43",
                color: "white",
                padding: "14px 20px",
                borderRadius: "20px",
                cursor: ordering ? "wait" : "pointer",
                fontSize: "16px",
                fontWeight: "600",
                width: "100%",
                boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px"
              }}
            >
              {ordering ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span style={{
                    width: "18px",
                    height: "18px",
                    border: "3px solid rgba(255,255,255,0.3)",
                    borderTop: "3px solid white",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                    display: "inline-block"
                  }} />
                  Processing...
                </span>
              ) : (
                `Place Your Order`
              )}
            </button>

            <p style={{ fontSize: "12px", color: "#565959", marginTop: "12px", lineHeight: "1.5", textAlign: "left" }}>
              By placing your order, you agree to AmazonLite's privacy notice and conditions of use.
            </p>

            {/* Delivery Info */}
            <div style={{
              marginTop: "16px",
              padding: "12px",
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
              textAlign: "left"
            }}>
              <p style={{ fontSize: "13px", color: "#565959", margin: "0 0 4px 0" }}>
                <strong style={{ color: "#0F1111" }}>Delivery:</strong> Free delivery on this order
              </p>
              <p style={{ fontSize: "13px", color: "#565959", margin: 0 }}>
                <strong style={{ color: "#0F1111" }}>Estimated:</strong> 3-5 business days
              </p>
            </div>

            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
