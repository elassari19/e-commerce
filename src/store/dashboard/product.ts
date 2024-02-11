"use client";

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { useDispatch } from "react-redux";

export const initialState = {
  name: "",
  description: "",
  images: [],
  colors: [],
  categoryId: "",
  price: "",
  properties: [{ public_id: "", secure_url: "", color: "", quantity: "" }],
};

const states = {
  ...initialState,
};

export const productSlice = createSlice({
  name: "product",
  initialState: states,
  reducers: {
    productHandler: (state: any, { payload }) => {
      return { ...state, ...payload };
    },
    deleteProductHandler: (state: any) => {
      return { ...state, products: [{  }] }
    },
  },
});

// Action creators are generated for each case reducer function
export const { productHandler, deleteProductHandler } = productSlice.actions;

export default productSlice.reducer;

// global state
export const selectState = (state: RootState) => state;
