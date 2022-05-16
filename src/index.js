import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { Main } from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";



let theme = createTheme({
  typography: {
    fontFamily: ["Kalam", "cursive"].join(","),

  },
  palette: {
    success: {
      main: '#8CDD3A',
    },
    fail: {
      main: '#E52323'
    },
    normal: {
      main: '#0D7C41'
    },
    successHover: {
      main: '#ebeb34'
    },

    primary: {
      main: '#1d2936'
    }
  },
});

window.theme = theme;


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();