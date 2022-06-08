import { configureStore } from "@reduxjs/toolkit";
import userDataSlice, { userDataActionsAPI } from "./userDataSlice";
import authSlice from "./authSlice";
import alertSlice from "./alertSlice";
import initSlice from "./initSlice";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configFirebase";
import preloaderSlice from "./preloaderSlice";
import { transactionsAPI, categoriesAPI } from "../API/api";
import { initAPI, initUserDataAPI } from "../redux/initSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    userData: userDataSlice,
    auth: authSlice,
    alert: alertSlice,
    init: initSlice,
    preloader: preloaderSlice,
    [initAPI.reducerPath]: initAPI.reducer,
    [initUserDataAPI.reducerPath]: initUserDataAPI.reducer,
    [transactionsAPI.reducerPath]: transactionsAPI.reducer,
    [categoriesAPI.reducerPath]: categoriesAPI.reducer,
    [userDataActionsAPI.reducerPath]: userDataActionsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      initAPI.middleware,
      transactionsAPI.middleware,
      categoriesAPI.middleware,
      initUserDataAPI.middleware,
      userDataActionsAPI.middleware
    ),
});

setupListeners(store.dispatch);

export default store;

initializeApp(firebaseConfig);
