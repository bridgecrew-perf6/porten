import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Dialog } from "@mui/material";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

const Preloader = () => {
  const open = useSelector(state => state.preloader.isFetching);


  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      open={open}
    >
      <Box sx={{ padding: ".5em" }}>
        <CircularProgress color="primary" />
      </Box>
    </Dialog>
  );
};

export default Preloader;
