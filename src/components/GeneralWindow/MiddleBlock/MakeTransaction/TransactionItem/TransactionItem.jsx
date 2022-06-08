import { ListItemText, MenuItem } from "@mui/material";
import React from "react";

const TransactionItem = ({ data, setSelectedCategory }) => {
  return (
    <>
      <MenuItem divider onClick={() => setSelectedCategory(data)}>
        <ListItemText>{data.category}</ListItemText>
      </MenuItem>
    </>
  );
};

export default TransactionItem;