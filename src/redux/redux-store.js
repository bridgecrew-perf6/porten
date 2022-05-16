import { configureStore } from "@reduxjs/toolkit";
// import transactionSlice from "./transactionsSlice";
// import allCategoriesSlice from "./allCategoriesSlice";
import userDataSlice from "./userDataSlice";
import authSlice, { verifyAuth } from "./authSlice";
import alertSlice from "./alertSlice";
import initSlice from "./initSlice";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configFirebase";
import preloaderSlice from "./preloaderSlice";

const store = configureStore({
  reducer: {
    userData: userDataSlice,
    auth: authSlice,
    alert: alertSlice,
    init: initSlice,
    preloader: preloaderSlice,
  },
});

export default store;

initializeApp(firebaseConfig);
