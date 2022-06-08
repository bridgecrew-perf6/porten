import { firebaseConfig } from "../configFirebase.js";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  updateProfile,
} from "firebase/auth";

function me() {
  return getAuth();
}

export const authAPItest = {
  signIn(email, password) {
    return signInWithEmailAndPassword(me(), email, password)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  logOut() {
    return signOut(me())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
};

export const userActionsAPI = {
  updateUserName(newUserName) {
    return updateProfile(me().currentUser, {
      displayName: newUserName,
    });
  },
};

export const transactionsAPI = createApi({
  reducerPath: "transactionsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${firebaseConfig.projectId}-default-rtdb.europe-west1.firebasedatabase.app/users/`,
  }),
  providesTags: "transactions",
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (uid) => ({
        url: `${uid}/transactions.json`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...Object.entries(result).map((inner) => ({
                id: inner[0],
                type: "transactions",
              })),
              { type: "transactions", id: "LIST" },
            ]
          : [{ type: "transactions", id: "LIST" }],
    }),
    addTransaction: builder.mutation({
      query: ({ newTrans, uid }) => ({
        url: `${uid}/transactions.json`,
        method: "POST",
        body: {
          ...newTrans,
        },
      }),
      invalidatesTags: [{ type: "transactions", id: "LIST" }],
    }),
  }),
});

export const { useGetTransactionsQuery, useAddTransactionMutation } =
  transactionsAPI;

export const categoriesAPI = createApi({
  reducerPath: "categoriesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${firebaseConfig.projectId}-default-rtdb.europe-west1.firebasedatabase.app/users/`,
  }),
  providesTags: "categories",
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (uid) => ({
        url: `${uid}/categories.json`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...Object.entries(result).map((inner) => ({
                id: inner[0],
                type: "categories",
              })),
              { type: "categories", id: "LIST" },
            ]
          : [{ type: "categories", id: "LIST" }],
    }),

    addNewCategory: builder.mutation({
      query: ({ category, uid, color }) => ({
        url: `${uid}/categories.json`,
        method: "POST",
        body: {
          category,
          img: "",
          isMine: true,
          color,
        },
      }),
      invalidatesTags: [{ type: "categories", id: "LIST" }],
    }),

    updateCategory: builder.mutation({
      query: ({ category, uid }) => ({
        url: `${uid}/categories/${category.id}.json`,
        method: "PATCH",
        body: {
          isMine: true,
        },
      }),
      invalidatesTags: [{ type: "categories", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesAPI;
