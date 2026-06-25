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
import Home from "./pages/Home";
import Login from "./pages/login"; // client/src/pages/login.jsx
import Signup from "./pages/Signup"; // client/src/pages/Signup.jsx

function App() {
  return (
    <Routes>
      {/* Home / Product catalog Route */}
      <Route path="/" element={<Home />} />
      
      {/* Login Screen Route */}
      <Route path="/login" element={<Login />} />
      
      {/* Create Account Route */}
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;