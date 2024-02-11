"use client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export const initialState = {
  dashboardNav: false,
  categories: {
    remove: [] as any[],
    export: [] as any[]
  },
  attributes: {
    remove: [] as any[],
    export: [] as any[]
  },
};

const states = {
  ...initialState,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: states,
  reducers: {
    dashboardHandler: (state: any, { payload }) => {
      return { ...state, ...payload };
    },
    deleteProductHandler: (state: any, { payload }) => {
      return { ...state, products: { ...state.products, remove: payload } }
    },
  },
});

// Action creators are generated for each case reducer function
export const { dashboardHandler, deleteProductHandler } = dashboardSlice.actions;

export default dashboardSlice.reducer;

// global state
export const selectState = (state: RootState) => state;
