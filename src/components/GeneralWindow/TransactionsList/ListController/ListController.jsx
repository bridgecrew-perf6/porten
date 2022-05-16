import React, { useEffect, useRef, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/system";

const ListController = ({
  myCategories,
  setSortMode,
  setFilterProp,
  sortMode,
}) => {
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    setFilterProp(event.target.value)
  };


  return (
    <Box sx={{display: 'flex', mb: '1em'}}>
      <Button variant="outlined" sx={{mr: '1em'}} onClick={() => setSortMode((prevMode) => !prevMode)}>
        date {sortMode ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </Button>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-standard-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleChange}
          label="sort by category"
        >
          <MenuItem value="">
            <em>all</em>
          </MenuItem>
          {myCategories.map((item, index) => (
            item.isMine ? <MenuItem value={item.category} key={index}>
            {item.category}
          </MenuItem> : null
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ListController;
