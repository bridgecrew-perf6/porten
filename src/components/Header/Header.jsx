import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logOut } from "../../redux/authSlice";
import { turnOnAlert } from "../../redux/alertSlice";
import { resetUserData } from "../../redux/userDataSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const userName = useSelector((state) => state.auth.displayName);

  const logout = () => {
    dispatch(logOut()).then((data) => {
      if (!data.error) {
        dispatch(resetUserData());
        dispatch(
          turnOnAlert({
            type: "success",
            title: data.meta.requestStatus,
            text: userName + " is signed out",
          })
        );
      }
    });
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: !isLogged ? "center" : "unset" }}
    >
      {isLogged ? (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      ) : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ".2em",
          marginLeft: isLogged ? "auto" : "0",
        }}
      >
        <Typography
          component="header"
          sx={{ typography: { xs: "h6", sm: "h4" } }}
        >
          control of your money
        </Typography>
        <CurrencyExchangeRoundedIcon sx={{ transform: "rotate(10deg)" }} />
      </Box>
      {isLogged ? (
        <Button onClick={() => logout()} sx={{ marginLeft: "auto" }}>
          log out
        </Button>
      ) : null}
    </Box>
  );
};

export default Header;
