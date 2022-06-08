import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { Tooltip } from "@mui/material";

const Controller = ({ modeOn, onOpen }) => {
  const theme = useTheme();

  const handleClickAddTrans = (value) => {
    modeOn(value);
    onOpen();
  };

  console.log("render controller");

  return (
    <Box
      sx={{
        mb: "2em",
        display: "flex",
        justifyContent: "space-evenly",
        mt: "2em",
        p: { xs: "0em 4em", sm: "0em 1em", md: "0em 3em" },
      }}
    >
      <Tooltip
        title="balance was spent"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <AddCircleOutlineIcon
          color="success"
          sx={{
            cursor: "pointer",
            transform: { xs: "scale(3)", sm: "scale(3)" },
          }}
          onClick={() => handleClickAddTrans(true)}
        ></AddCircleOutlineIcon>
      </Tooltip>
      <Tooltip title="balance was added">
        <RemoveCircleOutlineIcon
          color="fail"
          sx={{
            cursor: "pointer",
            transform: { xs: "scale(3)", sm: "scale(3)" },
          }}
          onClick={() => handleClickAddTrans(false)}
        ></RemoveCircleOutlineIcon>
      </Tooltip>
    </Box>
  );
};

export default Controller;
