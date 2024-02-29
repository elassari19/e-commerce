'use client'

import { ImageUrl, Product } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type cartType = Product & { images: ImageUrl[], qty: number};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as cartType[],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      state.items.push({ ...payload, qty: 1 });
    },
    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload.id);
    },
    incrementQuantity: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);

      if(index === -1) {
        // in case the item is not in the cart, we add it
        cartSlice.caseReducers.addToCart(state, cartSlice.actions.addToCart({ ...payload, qty: 1 }));
        state.items.sort((a, b) => a.id > b.id ? 1 : -1);
        return;
      }
      
      if (payload.value !== undefined) {
        // in case the value is defined, we set the qty to the value
        state.items.sort((a, b) => a.id > b.id ? 1 : -1);
        state.items[index].qty = payload.value;
        return;
      }
      state.items[index].qty = state.items[index].qty + 1;
      state.items.sort((a, b) => a.id > b.id ? 1 : -1);
    },
    decrementQuantity: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      // in case the item is not in the cart, we do nothing
      if(!state.items[index]) return;
      state.items[index].qty--;
      if (state.items[index].qty === 0) {
        // in case the qty is 0, we remove the item from the cart
        cartSlice.caseReducers.removeFromCart(state, cartSlice.actions.removeFromCart({ id: payload.id, price: payload.price, qty: 1 }));
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
