/**
 * @file Signup.jsx
 * @description AmazonLite Signup Page.
 * Matches the official Amazon Create Account page visual style, reusing login.css.
 * 
 * Hinglish Guide:
 * Is component ke through user new account register kar sakta hai.
 * Hum Name, Email aur Password collect kar ke `/api/auth/signup` backend API call karte hain.
 * Agar signup success hota hai, to user automatically login ho jata hai aur profile update ho jati hai.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import "./login.css"; // We reuse login.css since the forms are styled identically

function Signup() {
  // Input fields hook states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error message display alert
  const [error, setError] = useState("");

  // Loading click indicator
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  /**
   * Submit registration form handler
   * Hindi: Form submit hone par fields validate kar ke backend signup API hit karte hain.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client side matching validations
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    try {
      setError("");
      setLoading(true);

      // Call Express signup endpoint
      const res = await api.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const { user, token } = res.data;

      // Authenticate globally using session tokens
      login(user, token);

      // Success register page redirection
      navigate("/");
    } catch (err) {
      console.error("Signup error details:", err);
      setError(
        err.response?.data?.message ||
          "Registration failed. Email might already be taken."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      
      {/* AmazonLite Logo branding */}
      <div className="login-logo-container" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <div className="login-logo-text">
          amazon<span className="lite-logo-span">lite</span>
        </div>
        <svg className="amazon-smile-svg" width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5C40 18 80 18 110 5" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M103 9L110 5L107 12" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Main card panel box */}
      <div className="login-form-card">
        <h1 className="login-card-title">Create Account</h1>

        {/* Display validation issues if any exist */}
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
          {/* Your Name field input */}
          <div className="input-group-wrapper">
            <label className="input-label-field">Your name</label>
            <input
              type="text"
              className="auth-input-element"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First and last name"
              required
              autoFocus
            />
          </div>

          {/* Email field input */}
          <div className="input-group-wrapper">
            <label className="input-label-field">Email</label>
            <input
              type="email"
              className="auth-input-element"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password field input */}
          <div className="input-group-wrapper">
            <label className="input-label-field">Password</label>
            <input
              type="password"
              className="auth-input-element"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
            />
          </div>

          {/* Re-enter Password validation field */}
          <div className="input-group-wrapper">
            <label className="input-label-field">Re-enter password</label>
            <input
              type="password"
              className="auth-input-element"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Yellow gradient registration submission button action */}
          <button
            type="submit"
            className="yellow-gradient-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create your AmazonLite account"}
          </button>
        </form>

        <p style={{ fontSize: "12px", margin: "14px 0 0 0", color: "#111", lineHeight: "1.4" }}>
          By creating an account, you agree to AmazonLite's <span style={{ color: "#0066c0", cursor: "pointer" }}>Conditions of Use</span> and <span style={{ color: "#0066c0", cursor: "pointer" }}>Privacy Notice</span>.
        </p>

        {/* Divider separation block */}
        <div className="signup-divider-container" style={{ margin: "18px 0" }}>
          <h5 className="divider-subtext">Already have an account?</h5>
        </div>

        {/* Link back to login screen */}
        <Link to="/login" className="grey-silver-gradient-btn">
          Sign in ▾
        </Link>
      </div>

      {/* Auth footer links */}
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

export default Signup;
