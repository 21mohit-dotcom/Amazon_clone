import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import "./login.css";

/**
 * Login Component
 * 
 * Hindi:
 * Email aur password values capture karke backend API /api/auth/login par submit karta hai.
 * Success hone par token register karta hai aur client home page par redirect karta hai.
 */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { user, token } = res.data;
      login(user, token);
      navigate("/");
    } catch (err) {
      console.error("Login failure:", err);
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* Brand logo branding */}
      <div className="login-logo-container" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <div className="login-logo-text">
          amazon<span className="lite-logo-span">lite</span>
        </div>
        <svg className="amazon-smile-svg" width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5C40 18 80 18 110 5" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M103 9L110 5L107 12" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Login Credentials Box */}
      <div className="login-form-card">
        <h1 className="login-card-title">Sign in</h1>

        {/* Error notification alert */}
        {error && (
          <div className="login-error-alert">
            <div className="error-alert-icon">⚠️</div>
            <div className="error-alert-content">
              <h4>There was a problem</h4>
              <p>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-tag">
          {/* Email input field */}
          <div className="input-group-wrapper">
            <label className="input-label-field">Email</label>
            <input
              type="email"
              className="auth-input-element"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Password input field */}
          <div className="input-group-wrapper">
            <div className="password-header-row">
              <label className="input-label-field">Password</label>
            </div>
            <input
              type="password"
              className="auth-input-element"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="yellow-gradient-btn"
            style={{ backgroundColor: "#febd69", borderColor: "#a88734" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p style={{ fontSize: "12px", margin: "14px 0 0 0", color: "#111", lineHeight: "1.4" }}>
          By continuing, you agree to AmazonLite's Conditions of Use and Privacy Notice.
        </p>

        {/* New user layout line divider */}
        <div className="signup-divider-container">
          <h5 className="divider-subtext">New to AmazonLite?</h5>
        </div>

        {/* Switch back to Signup path */}
        <Link to="/signup" className="grey-silver-gradient-btn">
          Create your AmazonLite account
        </Link>
      </div>

      {/* Footer Branding Links */}
      <div className="auth-footer-container">
        <div className="footer-links-row">
          <a href="#" className="footer-link">Conditions of Use</a>
          <a href="#" className="footer-link">Privacy Notice</a>
          <a href="#" className="footer-link">Help</a>
        </div>
        <p className="footer-copyright-text">
          © 1996-2026, AmazonLite.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}

export default Login;