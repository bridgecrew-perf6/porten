import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const preloaderSlice = createSlice({
  name: "preloader",
  initialState: {
    isFetching: false,
  },
  reducers: {
    turnOnPreloader(state, action) {
      state.isFetching = true;
    },
    turnOffPreloader(state, action) {
      state.isFetching = false;
    },
  },
});

export default preloaderSlice.reducer;
export const { turnOnPreloader, turnOffPreloader } = preloaderSlice.actions;
