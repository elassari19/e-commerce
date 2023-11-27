"use client";

import { createSlice } from "@reduxjs/toolkit";
import { stateType } from "../types/rootTypes";

export const initialRootState = {
  country: {
    code: "",
    lang: "EN",
    city: "",
    currency: "US",
  },
  searchModal: {
    visible: false,
    value: "",
    history: []
  },
  authNav: {
    value: 0
  },
  openMenu: {
    visible: false,
  },
  openCategories: {
    visible: false,
  },
  toggleMenu: false
}

export const rootSlice = createSlice({
  name: "root",
  initialState: initialRootState,
  reducers: {
    rootHandler: (state: stateType, { payload }) => {
      return { ...state, ...payload };
    },
  }
})

// Action creators are generated for each case reducer function
export const { rootHandler } = rootSlice.actions;

export default rootSlice.reducer;
