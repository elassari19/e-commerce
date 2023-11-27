"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { type signupType } from "@/schema";
// import { signIn } from "next-auth/react";

export const createUser = createAsyncThunk(
  "signup/credintial",
  async (values: signupType, thunkApi) => {
    try {
      const res = fetch("/api/auth/user");

      console.log("data", res);
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const signinUser = createAsyncThunk(
  "signup/google",
  async (values: signupType, thunkApi) => {
    try {
      // const res = await signIn(values as any);
      // return res;
    } catch (error) {
      return error;
    }
  }
);

export const initialState = {
  email: "",
  password: "",
  isoCode: "",
};

const states = {
  ...initialState,
  loading: false,
  error: "",
  create: {},
};

export const userSlice = createSlice({
  name: "signup",
  initialState: states,
  reducers: {
    authHandle: (state: any, { payload }) => {
      return { ...state, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.create = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      });
  },
});

// Action creators are generated for each case reducer function
export const { authHandle } = userSlice.actions;

export default userSlice.reducer;

// global state
export const selectState = (state: RootState) => state;
