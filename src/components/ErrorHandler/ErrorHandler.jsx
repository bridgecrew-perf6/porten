import React from "react";
import { Typography } from "@mui/material";

const ErrorHandler = ({ align, text }) => {
  return (
    <Typography
      sx={{
        color: "red",
        fontSize: "small",
        flexBasis: "100%",
        textAlign: align,
      }}
    >
      {text}
    </Typography>
  );
};

export default ErrorHandler;
