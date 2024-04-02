'use client'

import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    items: [] as string[],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.items.indexOf(action.payload);
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
    }
  }
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
