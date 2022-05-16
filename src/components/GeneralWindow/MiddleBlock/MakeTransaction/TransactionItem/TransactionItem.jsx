import { ListItemText, MenuItem } from "@mui/material";
import React from "react";

const TransactionItem = ({ img, category, setSelectedCategory }) => {
  return (
    <>
      <MenuItem divider onClick={() => setSelectedCategory(category)}>
        <ListItemText>{category}</ListItemText>
      </MenuItem>
    </>
  );
};

export default TransactionItem;