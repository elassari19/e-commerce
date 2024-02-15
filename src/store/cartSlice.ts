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
      if(index === -1) {
        // in case the item is not in the cart, we add it
        cartSlice.caseReducers.addToCart(state, cartSlice.actions.addToCart({ id: payload.id, price: payload.price, quantity: 1 }));
        state.items.sort((a, b) => a.id > b.id ? 1 : -1);
        return;
      }
      
      if (payload.value !== undefined) {
        // in case the value is defined, we set the quantity to the value
        state.items.sort((a, b) => a.id > b.id ? 1 : -1);
        state.items[index].quantity = payload.value;
        return;
      }
      state.items[index].quantity++;
      state.items.sort((a, b) => a.id > b.id ? 1 : -1);
    },
    decrementQuantity: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      // in case the item is not in the cart, we do nothing
      if(!state.items[index]) return;
      state.items[index].quantity--;
      if (state.items[index].quantity === 0) {
        // in case the quantity is 0, we remove the item from the cart
        cartSlice.caseReducers.removeFromCart(state, cartSlice.actions.removeFromCart({ id: payload.id, price: payload.price, quantity: 1 }));
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
