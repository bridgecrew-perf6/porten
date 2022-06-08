import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { firebaseConfig } from "../configFirebase";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
});

export const initAPI = createApi({
  reducerPath: "initAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${firebaseConfig.projectId}-default-rtdb.europe-west1.firebasedatabase.app/`,
  }),
  tagTypes: "defaultCategories",
  endpoints: (builder) => ({
    getDefaultCategories: builder.query({
      query: () => `init/initCategories.json`,
      providesTags: (result) =>
        result
          ? [
              ...Object.entries(result).map((inner) => ({
                id: inner[0],
                type: "defaultCategories",
              })),
              { type: "defaultCategories", id: "LIST" },
            ]
          : [{ type: "defaultCategories", id: "LIST" }],
    }),
    setDefaultCategories: builder.mutation({
      query: (data) => ({
        url: `users.json`,
        method: "PATCH",
        body: {
          [data.uid]: {
            categories: data.defaultCategories,
          },
        },
      }),
      providesTags: [{ type: "defaultCategories", id: "LIST" }],
    }),
  }),
});

export const { useGetDefaultCategoriesQuery, useSetDefaultCategoriesMutation } =
  initAPI;

export const initUserDataAPI = createApi({
  reducerPath: "initUserDataAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${firebaseConfig.projectId}-default-rtdb.europe-west1.firebasedatabase.app/`,
  }),
  tagTypes: "initUserData",
  endpoints: (builder) => ({
    getInitUserData: builder.query({
      query: () => "init/userData.json",
      providesTags: (result) =>
        result
          ? [(result) => ({ type: "initUserData", id: result.id })]
          : [{ type: "initUserData", id: "LIST" }],
    }),
    setInitUserData: builder.mutation({
      query: ({ uid, defaultUserData }) => ({
        url: `users/${uid}.json`,
        method: "PATCH",
        body: {
          userData: defaultUserData,
        },
      }),
      providesTags: [{ type: "initUserData", id: "LIST" }],
    }),
  }),
});

export const { useGetInitUserDataQuery, useSetInitUserDataMutation } =
  initUserDataAPI;

export const { initApp } = initSlice.actions;
export default initSlice.reducer;
