import React, { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();
const API_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  // 🛒 GET CART (backend se load)
  const loadCart = useCallback(() => {
    fetch(`${API_BASE_URL}/api/cart`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        // ⚠️ safety check
        setCart(data.items || []);
      })
      .catch(err => console.log(err));
  }, []);

  // ➕ ADD TO CART
  const addToCart = (product) => {
    fetch(`${API_BASE_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({ product })
    })
      .then(() => loadCart())
      .catch(err => console.log(err));
  };

  // ❌ REMOVE
  const removeFromCart = (id) => {
    fetch(`${API_BASE_URL}/api/cart/remove/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
      .then(() => loadCart())
      .catch(err => console.log(err));
  };

  return (
    <CartContext.Provider value={{ cart, loadCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};