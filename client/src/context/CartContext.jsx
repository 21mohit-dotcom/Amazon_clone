/**
 * @file CartContext.jsx (Shopping Cart Global State Provider)
 * @description Senior Developer Review:
 * Manages the shopping cart items list, quantity updates, total cost calculation,
 * and handles direct synchronization with browser localStorage.
 * 
 * Hindi Guide:
 * Yeh file shopping cart ki state (items, unka count, prices) ko handle karti hai.
 * Add to cart, remove from cart, and total calculation utilities globally expose kiye gaye hain.
 * LocalStorage ka use kar ke items tabs refresh hone par bhi save rahenge.
 */

import { createContext, useContext, useEffect, useState } from "react";

// Create Cart Context instance
const CartContext = createContext();

// Provider Component wraps root tree
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 1. Initial Load Effect
  // Hindi: Jab page load hoga, tab browser localStorage se saved items read karenge
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 2. Synchronize State to LocalStorage on item mutations
  // Hindi: Jab bhi cart state badlegi, to use automatically localStorage me update kar denge
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Action: Add item to cart
   * Hindi: Product ko select kar ke cart list me add karta hai. Agar product pehle se present hai to uski qty badha deta hai.
   */
  const addToCart = (product) => {
    setCartItems((prev) => {
      // Find if item is already added to cart
      const existingItem = prev.find((item) => item._id === product._id);

      if (existingItem) {
        // Increase quantity of existing item
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      // Add as new entry to cart with default qty 1
      return [...prev, { ...product, qty: 1 }];
    });
  };

  /**
   * Action: Remove item from cart by _id
   */
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  /**
   * Action: Update item count/quantity directly
   */
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: quantity }
          : item
      )
    );
  };

  /**
   * Action: Clear cart completely (e.g. after successful checkout)
   */
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculates subtotal price by multiplying each item's price with its quantity
  // Hindi: Har product ke price aur qty ko multiply kar ke cart total compute karta hai
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use Cart Context utilities
export const useCart = () => {
  return useContext(CartContext);
};