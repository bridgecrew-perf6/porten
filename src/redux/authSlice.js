import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { authAPItest } from "../API/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLogged: false,
    uid: null,
    email: null,
    isReady: true,
    user: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.isLogged = true;
    },
    setReady(state, action) {
      state.isReady = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        if (action.code === "auth/wrong-password") return;
        state.uid = action.payload.uid;
        state.email = action.payload.email;
      })

      .addCase(logOut.fulfilled, (state, action) => {
        state.isLogged = false;
        state.uid = 0;
        state.email = null;
      });
  },
});

export const { setCurrentUser, setReady, remReady } = authSlice.actions;
export default authSlice.reducer;

export const getUserData = createAsyncThunk(
  "getUserData",
  async ({ email, password }) => {
    const response = await authAPItest.signIn(email, password);
    if (response.user) {
      let { uid, email } = { ...response.user };
      return { uid, email };
    } else {
      return response;
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
      return response.user.uid;
    } else {
      return response;
    }
  }
);

export const logOut = createAsyncThunk("logOut", async () => {
  const response = await authAPItest.logOut();
  return response;
});
