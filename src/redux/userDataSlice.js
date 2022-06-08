import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseConfig } from "../configFirebase";

const userDataSlice = createSlice({
  name: "myCategories",
  initialState: {
    topUps: 0,
    spent: 0,
    balance: 0,
  },
  reducers: {
    resetUserData(state, action) {
      state.topUps = 0;
      state.spent = 0;
      state.balance = 0;
    },
    configureFinanceData(state, action) {
      state.topUps = action.payload.userTransactions
        .filter((item) => !item.isSpend)
        .reduce((acc, item) => (acc += item.amount), 0);

      state.spent = action.payload.userCategories
        .filter((category) => category.isMine)
        .reduce((acc, item) => {
          action.payload.userTransactions.forEach((trans) => {
            if (trans.category === item.category && trans.isSpend) {
              acc += trans.amount;
            }
          });

          return acc;
        }, 0);

      state.balance = state.topUps - state.spent;
    },
  },

  extraReducers: (builder) => {},
});

export const { configureFinanceData, resetUserData } = userDataSlice.actions;

export default userDataSlice.reducer;

export const userDataActionsAPI = createApi({
  reducerPath: "userDataActionsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${firebaseConfig.projectId}-default-rtdb.europe-west1.firebasedatabase.app/users/`,
  }),
  tagTypes: "userData",
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: (uid) => `${uid}/userData.json`,
      providesTags: (result) =>
        result
          ? [
              (result) => ({ type: "userData", id: result.id }),
              { type: "userData", id: "LIST" },
            ]
          : [{ type: "userData", id: "LIST" }],
    }),

    setUserData: builder.mutation({
      query: (data) => ({
        url: `${data.uid}/userData.json`,
        method: "PATCH",
        body: {
          [data.field]: data.fillField,
        },
      }),
      invalidatesTags: [{ type: "userData", id: "LIST" }],
    }),
  }),
});

export const { useSetUserDataMutation, useGetUserDataQuery } =
  userDataActionsAPI;
