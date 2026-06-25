import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

/**
 * Checkout Component
 * 
 * Hindi:
 * Authenticate gate control: check user login status, check cart items structure.
 * Address form input read karega, checkout total subtotal details display karega.
 * Success screen toggle standard order placement and clears cart context on completion.
 */
function Checkout() {
  const { user } = useAuth();
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!address.trim()) {
      return setError("Please provide a shipping address.");
    }

    // Success transition
    setOrderPlaced(true);
    clearCart();
  };

  // 1. Not Logged In Gate
  if (!user) {
    return (
      <div style={{ backgroundColor: "#f3f3f3", minHeight: "100vh", paddingBottom: "40px" }}>
        <Navbar />
        <div style={{
          maxWidth: "500px",
          margin: "80px auto 20px auto",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          <div style={{ fontSize: "50px", marginBottom: "16px" }}>🔒</div>
          <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#0F1111", margin: "0 0 12px 0" }}>
            Please login to proceed
          </h2>
          <p style={{ fontSize: "14px", color: "#565959", margin: "0 0 24px 0", lineHeight: "1.4" }}>
            You need to be signed in to checkout and complete your order.
          </p>
          <button
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "#febd69",
              borderColor: "#a88734 #9c7e31 #846a29",
              borderStyle: "solid",
              borderWidth: "1px",
              color: "#111",
              padding: "12px 24px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow: "0 2px 5px rgba(213,217,217,.5)",
              width: "100%"
            }}
          >
            Sign in to Checkout
          </button>
        </div>
      </div>
    );
  }

  // 2. Order Placed Success Screen
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
            fontSize: "40px",
            color: "#007600",
            backgroundColor: "#e7f4e7",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
            border: "2px solid #007600"
          }}>
            ✓
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#007600", margin: "0 0 12px 0" }}>
            Order Placed!
          </h1>
          <h3 style={{ fontSize: "16px", fontWeight: "500", color: "#0F1111", margin: "0 0 8px 0" }}>
            Thank you, {user.name}! Your order has been registered.
          </h3>
          <p style={{ fontSize: "14px", color: "#565959", margin: "0 0 28px 0", lineHeight: "1.4" }}>
            A confirmation will be sent shortly. We've received your shipment address and started processing.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#febd69",
              borderColor: "#a88734",
              borderStyle: "solid",
              borderWidth: "1px",
              padding: "10px 24px",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "500",
              boxShadow: "0 2px 5px rgba(213,217,217,.5)"
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // 3. Cart Empty Gate
  if (cartItems.length === 0) {
    return (
      <div style={{ backgroundColor: "#f3f3f3", minHeight: "100vh", paddingBottom: "40px" }}>
        <Navbar />
        <div style={{
          maxWidth: "500px",
          margin: "80px auto 20px auto",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#0F1111", margin: "0 0 12px 0" }}>
            Cart is empty
          </h2>
          <p style={{ fontSize: "14px", color: "#565959", margin: "0 0 24px 0" }}>
            You cannot proceed to checkout with an empty cart.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#febd69",
              borderColor: "#a88734",
              borderStyle: "solid",
              borderWidth: "1px",
              padding: "10px 20px",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Go to Store
          </button>
        </div>
      </div>
    );
  }

  // 4. Standard Checkout Layout
  return (
    <div style={{ backgroundColor: "#f3f3f3", minHeight: "100vh", paddingBottom: "40px" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "24px auto", padding: "0 20px" }}>
        <h1 style={{
          fontSize: "26px",
          fontWeight: "400",
          color: "#0F1111",
          marginBottom: "20px",
          textAlign: "left"
        }}>
          Checkout
        </h1>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {/* Left Panel: Address Input form */}
          <div style={{
            flex: "2 1 500px",
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxSizing: "border-box",
            textAlign: "left"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #ddd", paddingBottom: "8px", margin: "0 0 16px 0" }}>
              1. Delivery Address
            </h3>

            {error && (
              <p style={{ color: "#c40000", fontSize: "14px", fontWeight: "500", margin: "0 0 12px 0" }}>
                ⚠️ {error}
              </p>
            )}

            <form onSubmit={handlePlaceOrder}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", marginBottom: "6px" }}>
                  Shipping Address
                </label>
                <textarea
                  placeholder="Enter full shipping address (Street address, City, State, ZIP code)"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (e.target.value.trim()) setError("");
                  }}
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #a6a6a6",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    resize: "vertical"
                  }}
                  required
                />
              </div>

              <div style={{ borderTop: "1px solid #ddd", paddingTop: "16px", marginTop: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 12px 0" }}>
                  2. Review items and delivery
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {cartItems.map((item) => (
                    <div 
                      key={item._id} 
                      style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        fontSize: "14px",
                        borderBottom: "1px dashed #eee",
                        paddingBottom: "8px" 
                      }}
                    >
                      <span style={{ color: "#0F1111", fontWeight: "500" }}>
                        {item.title} <span style={{ color: "#565959" }}>x{item.qty}</span>
                      </span>
                      <span style={{ fontWeight: "600", marginLeft: "12px" }}>
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Right Panel: Order Summary & Placement Details */}
          <div style={{
            flex: "1 1 300px",
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxSizing: "border-box",
            height: "fit-content",
            textAlign: "left"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 16px 0" }}>
              Order Summary
            </h3>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
              <span>Items:</span>
              <span>₹{total}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
              <span>Shipping & handling:</span>
              <span style={{ color: "#007600" }}>FREE</span>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "18px",
              fontWeight: "700",
              color: "#B12704",
              borderTop: "1px solid #ddd",
              paddingTop: "12px",
              margin: "12px 0 20px 0"
            }}>
              <span>Order Total:</span>
              <span>₹{total}</span>
            </div>

            {/* Place Order Trigger */}
            <button
              onClick={handlePlaceOrder}
              style={{
                backgroundColor: "#febd69",
                borderColor: "#a88734 #9c7e31 #846a29",
                borderStyle: "solid",
                borderWidth: "1px",
                color: "#111",
                padding: "10px 14px",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                width: "100%",
                boxShadow: "0 2px 5px rgba(213,217,217,.5)",
                boxSizing: "border-box",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f3a847"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#febd69"}
            >
              Place your order
            </button>

            <p style={{ fontSize: "12px", color: "#565959", marginTop: "12px", lineHeight: "1.4", margin: "12px 0 0 0" }}>
              By placing your order, you agree to AmazonLite's privacy notice and conditions of use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
