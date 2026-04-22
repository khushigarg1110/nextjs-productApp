"use client";
import { createSlice } from "@reduxjs/toolkit";

let storedCart = [];

if (typeof window !== "undefined") {
  const data = localStorage.getItem("cart");
  storedCart = data ? JSON.parse(data) : [];
}

const initialState = {
  items: storedCart || []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      const item = action.payload;

      const existingItem = state.items.find(
        i => i.id === item.id
      );

      if (existingItem) {
        state.items = state.items.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        state.items = [...state.items, { ...item, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
      

    },

    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;

      if (quantity === undefined || quantity === null) return;

      const existingItem = state.items.find(item => item.id === id);

      if (!existingItem) return;
      
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;