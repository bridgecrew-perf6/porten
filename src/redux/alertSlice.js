import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "authSlice",
  initialState: {
    isTurned: false,
    type: null,
    typography: {
      title: "",
      text: "",
    },
  },
  reducers: {
    turnOnAlert(state, action) {
      state.isTurned = true;
      state.type = action.payload.type;
      state.typography.text = action.payload.text;
      state.typography.title = action.payload.title;
    },
    turnOfAlert(state, action) {
      state.isTurned = false;
      state.type = null;
      state.typography.text = "";
      state.typography.title = "";
    },
  },
});

export const { turnOnAlert, turnOfAlert } = alertSlice.actions;
export default alertSlice.reducer;
