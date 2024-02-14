'use client'

import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as {id: string, price: number, quantity: number}[],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      state.items.push(payload);
    },
    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload.id);
    },
    incrementQuantity: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      state.items[index].quantity++;
    },
    decrementQuantity: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      if(!state.items[index]) return;
      state.items[index].quantity--;
      if (state.items[index].quantity === 0) {
        state.items = state.items.filter((item) => item.id !== payload.id);
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
