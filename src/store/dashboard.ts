"use client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export const initialState = {
  panel: 0,
  rootSearch: "",
  active: false,
};

const states = {
  ...initialState,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: states,
  reducers: {
    handlePanel: (state: any, { payload }) => {
      return { ...state, ...payload };
    },
    handleDashboardSchange: (state: any, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { handlePanel, handleDashboardSchange } = dashboardSlice.actions;

export default dashboardSlice.reducer;

// global state
export const selectState = (state: RootState) => state;
