import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import GeneralWindow from "./components/GeneralWindow/GeneralWindow";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm/LoginForm";
import SignForm from "./components/Auth/SignForm/SignForm";
import AlertComponent from "./components/Alert/AlertComponent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logOut, setCurrentUser } from "./redux/authSlice";
import { initApp } from "./redux/initSlice";

function App() {
  const dispatch = useDispatch();
  const isAlert = useSelector((state) => state.alert.isTurned);
  const initialized = useSelector((state) => state.init.initialized);
  const uid = useSelector((state) => state.auth.uid);

  if (!initialized) {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        let { uid, email } = user;
        dispatch(setCurrentUser({ uid, email }));
      } else {
        dispatch(logOut());
      }

      dispatch(initApp());
    });

    return;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        pr: "1rem",
        pl: "1rem",
        maxWidth: 1500,
        margin: "0 auto",
      }}
    >
      <Header sx={{ paddingBottom: "1rem" }} uid={uid} />
      <Routes>
        <Route path="/" element={<GeneralWindow />} />

        <Route path="/sign/*" element={<SignForm />} />
        <Route path="/login/*" element={<LoginForm />} />

        <Route path="/window/*" element={<GeneralWindow />} />
      </Routes>
      {isAlert ? <AlertComponent /> : null}
    </Box>
  );
}

export default App;
