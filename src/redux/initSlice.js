import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configFirebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { setCurrentUser } from "./authSlice";
import { useDispatch } from "react-redux";

const initSlice = createSlice({
  name: "initSlice",
  initialState: {
    initialized: false,
  },
  reducers: {
    initApp(state, action) {
        state.initialized = true;
    },
  },
  extraReducers: (builder) => {
  },
});


export const { initApp } = initSlice.actions;
export default initSlice.reducer;