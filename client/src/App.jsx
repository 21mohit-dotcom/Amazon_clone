/**
 * @file App.jsx
 * @description Main routing component. Configures paths for Storefront, Login, and Signup.
 * 
 * Hinglish Guide:
 * Yeh frontend entry layout router hai.
 * Yahan react-router-dom se Routes aur Route import kar ke hum urls mapped components render kar rahe hain.
 * Humne Home Page (/), Login Page (/login), aur Signup Page (/signup) ke routes configure kiye hain.
 */

import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      {/* Home / Product catalog Route */}
      <Route path="/" element={<ProductList />} />
      
      {/* Product Detail Route */}
      <Route path="/product/:id" element={<ProductDetail />} />
      
      {/* Shopping Cart Route */}
      <Route path="/cart" element={<Cart />} />
      
      {/* Login Screen Route */}
      <Route path="/login" element={<Login />} />
      
      {/* Create Account Route */}
      <Route path="/signup" element={<Signup />} />
      
      {/* Checkout Screen Route */}
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;