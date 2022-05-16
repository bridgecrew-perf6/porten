import React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";


const ItemTransaction = ({ category, amount, isSpend, date }) => {
  return (
    <>
      <MenuItem 
        divider
        sx={{ display: { xs: "flex", sm: "block", md: "block", lg: "flex" } }}
      >
        <ListItemText
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "flex-start" },
          }}
        >
          {!category ? (
            <Typography>
              top-up
            </Typography>
          ) : (
            <Typography>
              category: <b>{category}</b>
            </Typography>
          )}
        </ListItemText>
        <Box>
          <Typography
            sx={{ display: "flex", justifyContent: "flex-end" }}
            variant="body1"
            color="text.secondary"
          >
            amount: <b>{isSpend ? ` -${amount}` : ` +${amount}`}</b>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: { sm: "none", md: "none", xl: "block" } }}
          >
            Date: <b>{new Date(date * 1000).toLocaleString()}</b>
          </Typography>
        </Box>
      </MenuItem>
    </>
  );
};

export default ItemTransaction;