import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { authAPI, userActionsAPI } from "../API/api";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLogged: false,
    uid: null,
    email: null,
    displayName: "",
    authError: null,
    isReady: true
  },
  reducers: {
    setCurrentUser(state, action) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.isLogged = true;
    },
    setReady(state, action) {
      state.isReady = false
    },
    remReady(state, action) {
      state.isReady = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
      })
      
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLogged = false;
        state.uid = 0;
        state.email = null;
        state.displayName = "";
      });
  },
});

export const { setCurrentUser, setReady, remReady } = authSlice.actions;
export default authSlice.reducer;

export const getUserData = createAsyncThunk(
  "getUserData",
  async ({ email, password }) => {
    const response = await authAPI.signIn(email, password);
    if (response.user) {
      let { uid, displayName, email } = { ...response.user };
      return { uid, displayName, email };
    } else {
      return response
    }
  }
);

export const createUser = createAsyncThunk(
  "createUser",
  async ({ email, password, userName }) => {
    const auth = getAuth();

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (response.user) {
      await userActionsAPI.updateUserName(userName)

      return response.user.uid
    } else {
      return response
    }
  }
);

export const logOut = createAsyncThunk("logOut", async () => {
  const response = await authAPI.logOut();
  return response;
});
