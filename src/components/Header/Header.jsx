import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logOut } from "../../redux/authSlice";
import { turnOnAlert } from "../../redux/alertSlice";
import { resetUserData } from "../../redux/userDataSlice";
import NavBar from "../NavBar/NavBar";
import { useGetUserDataQuery } from "../../redux/userDataSlice";

const Header = ({ uid }) => {
  const { data: userData } = useGetUserDataQuery(uid);
  const dispatch = useDispatch();

  const { isLogged } = useSelector((state) => state.auth);
  const [isOpenBar, setIsOpenBar] = useState(false);

  const logout = () => {
    dispatch(logOut()).then((data) => {
      if (!data.error) {
        dispatch(resetUserData());
        dispatch(
          turnOnAlert({
            type: "success",
            title: data.meta.requestStatus,
            text: userData.userName + " is signed out",
          })
        );
      }
    });
  };

  const toggleOpenBar = () => {
    setIsOpenBar((oldState) => !oldState);
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
          onClick={toggleOpenBar}
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
      {userData && (
        <NavBar
          userData={userData}
          toggleOpenBar={toggleOpenBar}
          isOpenBar={isOpenBar}
        />
      )}
    </Box>
  );
};

export default Header;
