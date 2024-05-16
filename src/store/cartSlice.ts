'use client'

import { ImageUrl } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { IProductData } from "../types/products";

type cartType = IProductData & { images: ImageUrl[], qty: number, color: string, size: string};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as cartType[],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.items[index].qty++;
        return;
      }
      state.items.push({ ...payload, qty: 1 });
      return;
    },
    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload.id || !payload.id);
    },
    removeAllFromCart: (state) => {
      state.items = [];
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
      const { quantity, qty } = state.items[index];
      // in case the qty is equal to the quantity, we do nothing
      state.items[index].qty = qty == quantity ? quantity : qty + 1;
      // state.items.sort((a, b) => a.id > b.id ? 1 : -1);
    },
    decrementQuantity: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      // in case the item is not in the cart, we do nothing
      if(!state.items[index]) return;
      state.items[index].qty--;
      if (state.items[index].qty === 0) {
        // in case the qty is 0, we remove the item from the cart
        cartSlice.caseReducers.removeFromCart(state, cartSlice.actions.removeFromCart({
          id: payload.id, price: payload.price, qty: 0
        }));
      }
    },
    selectProductOptions: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      if (index === -1) {
        cartSlice.caseReducers.addToCart(state, cartSlice.actions.addToCart({ ...payload, qty: 1 }));
        state.items.sort((a, b) => a.id > b.id ? 1 : -1);
        return;
      }
      state.items[index].color = payload.color ? payload.color : state.items[index].color;
      state.items[index].size = payload.size ? payload.size : state.items[index].size;
    }
  },
});

export const { addToCart, removeFromCart, removeAllFromCart, incrementQuantity, decrementQuantity, selectProductOptions } = cartSlice.actions;
export default cartSlice.reducer;
