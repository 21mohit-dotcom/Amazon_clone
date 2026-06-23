/**
 * @file main.jsx (Vite Entry point)
 * @description Senior Developer Review:
 * Mounts the main React application into the browser DOM.
 * Integrates router context (BrowserRouter) and global state providers (AuthProvider, CartProvider).
 * 
 * Hindi Guide:
 * Yeh React frontend app ka main bootstrap file hai jo `index.html` ke `#root` div me React components mount karta hai.
 * Yahan `BrowserRouter` aur hamare custom Context Providers (`AuthProvider`, `CartProvider`) ko global access ke liye add kiya gaya hai.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

// Import global State Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Mount the React Application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provides client-side routing capabilities */}
    <BrowserRouter>
      {/* Provides global authentication states (user, login, logout) */}
      <AuthProvider>
        {/* Provides global cart states (cartItems, total, addToCart) */}
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);