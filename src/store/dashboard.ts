"use client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export const initialState = {
  dashboardNav: false
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
  },
});

// Action creators are generated for each case reducer function
export const { dashboardHandler } = dashboardSlice.actions;

export default dashboardSlice.reducer;

// global state
export const selectState = (state: RootState) => state;
