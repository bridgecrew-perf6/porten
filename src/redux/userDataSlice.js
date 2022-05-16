import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initAPI, userActionsAPI } from "../API/api";


const userDataSlice = createSlice({
  name: "myCategories",
  initialState: {
    myCategories: null,
    allTransactions: null,
    topUps: 0,
    spent: 0,
    balance: 0,
  },
  reducers: {
    resetUserData(state, action) {
      state.myCategories = null;
      state.allTransactions = null;
      state.topUps = 0;
      state.spent = 0;
      state.balance = 0;
    },
    configureFinanceData(state, action) {
      state.topUps = action.payload.transactions
        .filter((item) => !item.isSpend)
        .reduce((acc, item) => (acc += item.amount), 0);

      state.spent = action.payload.categories
        .filter((category) => category.isMine)
        .reduce((acc, item) => {
          action.payload.transactions.forEach((trans) => {
            if (trans.category === item.category && trans.isSpend) {
              acc += trans.amount;
            }
          });
          return acc;
        }, 0);

      state.balance = state.topUps - state.spent;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.allTransactions = [...action.payload];
      })
      .addCase(getUserCategories.fulfilled, (state, action) => {
        state.myCategories = [...action.payload];
      })
  },
});

export const { configureFinanceData, resetUserData } = userDataSlice.actions;

//// сервер инит
export const setDefaultCategories = createAsyncThunk(
  "setDefaultCategories",
  async ({ userId, categories }) => {
    const response = await initAPI.setCategories(userId, categories)
    return response;
  }
);

export const getDefaultCategories = createAsyncThunk(
  "getDefaultCategories",
  async () => {
    const response = await initAPI.getCategories()
    return response
  }
);
//// сервер инит

export const getUserTransactions = createAsyncThunk(
  "getUserTransactions",
  async (userId) => {
    const response = await userActionsAPI.getAllTransactions(userId);
    return response;
  }
);


export const getUserCategories = createAsyncThunk(
  "getUserCategories",
  async (userId) => {
    const response = await userActionsAPI.getAllCategories(userId);
    return response;
  }
);

export const addTransaction = createAsyncThunk(
  "users/addTransaction",
  async (transaction) => {

    await userActionsAPI.addTransaction(transaction)

  }
);

export const updateCategories = createAsyncThunk(
  "updateCategories",
  async (category) => {
    await userActionsAPI.updateCategories(category)
  }
);

export const addNewCategory = createAsyncThunk(
  "addNewCategory",
  async (category) => {

    await userActionsAPI.addNewCategory(category)
  }
);

export default userDataSlice.reducer;
