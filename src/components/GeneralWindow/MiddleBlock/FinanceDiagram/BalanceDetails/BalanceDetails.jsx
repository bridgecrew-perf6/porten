import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const BalanceDetails = () => {
  const { topUps, balance, spent } = useSelector((state) => state.userData);
  
  console.log("render detalis");
  return (
    <Box sx={{fontWeight: {xs: 300, sm: 700}}}>
      <Typography color={'success.main'}>all top-ups: <b>{topUps}</b></Typography>
      <Typography color={'fail.main'}>used up: <b>{spent}</b></Typography>
      <Typography color={'normal.main'}>balance: <b>{balance}</b></Typography>
    </Box>
  );
};

export default BalanceDetails;