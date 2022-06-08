import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import { BrowserRouter, HashRouter } from "react-router-dom";

let theme = createTheme({
  typography: {
    fontFamily: ["Kalam", "cursive"].join(","),
  },
  palette: {
    success: {
      main: "#8CDD3A",
    },
    fail: {
      main: "#E52323",
    },
    normal: {
      main: "#0D7C41",
    },
    successHover: {
      main: "#ebeb34",
    },

    primary: {
      main: "#1d2936",
    },
    background: {
      paper: "rgba(113, 188, 147, .8)",
    },
  },
  leftBar: {
    left: {
      xs: "70vw",
      sm: "35vw",
      md: "25vw",
      lg: "15vw",
      xl: "15vw",
    },
    avatar: {},
  },
});

window.theme = theme;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
