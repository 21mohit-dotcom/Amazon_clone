/**
 * @file AuthContext.jsx (Authentication Global State Provider)
 * @description Senior Developer Review:
 * Uses React Context API to manage user session state (login, logout, active user details) globally.
 * Persists token and user summary in localStorage so sessions remain active after page reloads.
 * 
 * Hindi Guide:
 * React Context ka use kar ke hum authentication state ko globally manage kar rahe hain.
 * User user-info aur login token refresh hone par localstorage se load kiye jate hain.
 * Isse pure frontend app me `useAuth()` call kar ke current logged-in user details fetch kar sakte hain.
 */

import { createContext, useContext, useEffect, useState } from "react";

// Create Context instance
const AuthContext = createContext();

// Provider Component wraps the entire app to expose auth utilities
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect triggers once when app mounts to restore existing session
  // Hindi: Jab page first time load hoga, to local storage check karenge session resume karne ke liye
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * Action: Sets the current active session
   * @param {Object} userData - User record details (id, name, email)
   * @param {String} token - JWT authentication token from backend
   */
  const login = (userData, token) => {
    setUser(userData);
    // Persist details in browser storage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  /**
   * Action: Clears current active session
   * Hindi: Logout hone par active state clear hogi aur localstorage values reset honge
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Expose global state properties & control functions to children
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext state properties inside any component easily
export const useAuth = () => {
  return useContext(AuthContext);
};