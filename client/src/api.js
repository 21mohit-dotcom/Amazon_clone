/**
 * @file api.js (Axios API Client instance)
 * @description Senior Developer Review:
 * Configures a global Axios instance with a base URL dynamically read from the environment configuration (`.env`).
 * This isolates network call configs and makes shifting between local dev and production staging simple.
 * 
 * Hindi Guide:
 * Yeh Axios client ki central config file hai.
 * Yahan standard baseURL configuration defined hai jo `.env` (VITE_API_URL) se set hoti hai.
 * Is instance ko import kar ke hum short endpoints ke through (e.g. api.get("/api/products")) easy server requests bhej sakte hain.
 */

import axios from "axios";

// Creating configured axios instance
const api = axios.create({
  // Dynamically uses API URL (e.g., http://localhost:5000) based on environment
  baseURL: import.meta.env.VITE_API_URL || "https://amazonlite-backend-01ud.onrender.com",
});

export default api;