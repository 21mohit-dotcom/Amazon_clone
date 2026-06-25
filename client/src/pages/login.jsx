/**
 * @file login.jsx
 * @description AmazonLite Login Page.
 * Matches the official Amazon Login screen visual language.
 * 
 * Hinglish Guide:
 * Yeh file login screen ka view/component render karti hai.
 * Yahan email aur password states hooks handle karte hain.
 * Hum custom axios instance use kar ke backend route '/api/auth/login' par request bhejte hain.
 * AuthContext ka login function use kar ke login details local storage aur app state me save ho jati hain.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import "./login.css";

function Login() {
  // Input fields ke value store karne ke liye states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Backend se solid error control display show handle karega
  const [error, setError] = useState("");

  // Button disabled control dynamic indicator for user click feedback
  const [loading, setLoading] = useState(false);

  // Navigate hook page redirect control options ke liye
  const navigate = useNavigate();

  // AuthContext state variables ko update karne ke liye custom functions hook pull
  const { login } = useAuth();

  /**
   * Submit logic handler function
   * Hindi: Form submit hone par backend validate request execute hogi.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      // axios client ke dynamic endpoint hit
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      // credentials match success, extracts token & user info
      const { user, token } = res.data;

      // React global context wrapper to cache token inside localstorage
      login(user, token);

      // Homepage redirect on authorization success
      navigate("/");
    } catch (err) {
      console.error("Login failure trigger:", err);
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
      
      {/* Dynamic AmazonLite Logo with custom styling and arc smile */}
      {/* Hindi: Amazon style logo design details with custom smile curve */}
      <div className="login-logo-container" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <div className="login-logo-text">
          amazon<span className="lite-logo-span">lite</span>
        </div>
        <svg className="amazon-smile-svg" width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5C40 18 80 18 110 5" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M103 9L110 5L107 12" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Main Form card wrapper block */}
      {/* Hindi: Safed (White) content card jo user credentials form content display karta hai */}
      <div className="login-form-card">
        <h1 className="login-card-title">Login</h1>

        {/* Validation issues feedback alerts banner */}
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
          {/* Email / mobile text block wrapper label */}
          <div className="input-group-wrapper">
            <label className="input-label-field">Email or mobile phone number</label>
            <input
              type="email"
              className="auth-input-element"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Password row with right aligned forgot password link label */}
          <div className="input-group-wrapper">
            <div className="password-header-row">
              <label className="input-label-field">Password</label>
              <span className="forgot-password-anchor-link">Forgot Password</span>
            </div>
            <input
              type="password"
              className="auth-input-element"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Yellow gradient primary login execution button action */}
          <button
            type="submit"
            className="yellow-gradient-btn"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        {/* Keep me signed in helper option checkbox input */}
        <div className="keep-signed-in-row">
          <label className="checkbox-container">
            <input type="checkbox" defaultChecked />
            <span className="checkbox-label-text">Keep me signed in.</span>
          </label>
          <span className="details-dropdown-arrow">Details ▾</span>
        </div>

        {/* Horizontal separation layout with center label title */}
        <div className="signup-divider-container">
          <h5 className="divider-subtext">New to AmazonLite?</h5>
        </div>

        {/* Grey gradient secondary register redirect navigation btn */}
        <Link to="/signup" className="grey-silver-gradient-btn">
          Create your AmazonLite account
        </Link>
      </div>

      {/* Login Screen design bottom links footer */}
      {/* Hindi: Conditions of Use and Copy rights layout details */}
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