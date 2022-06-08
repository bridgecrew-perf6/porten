import React, { useState, useEffect } from "react";
import { useFilter } from "../../../../../hooks/useFilter";
import TransactionItem from "../TransactionItem/TransactionItem";
import DescriptionPage from "../DescriptionPage/DescriptionsPage";
import { Box, Button, MenuList, TextField, Typography } from "@mui/material";

const ChooseCategory = ({
  selectedCategory,
  setSelectedCategory,
  reset,
  changeBalance,
  mode,
  isFetching,
  categories,
}) => {
  const [descriptionPageMode, setDescriptionPageMode] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [filterProp, setFilterProp, resultList] = useFilter(categories, "");

  useEffect(() => {
    if (selectedCategory) {
      setDescriptionPageMode(true);
    }
  }, [selectedCategory]);

  const onBack = () => {
    setSelectedCategory(null);
    setDescriptionPageMode(false);
    setIsNewCategory(false);
  };

  return isNewCategory ? (
    <DescriptionPage
      changeBalance={changeBalance}
      back={onBack}
      isNewCategory={isNewCategory}
      mode={mode}
      isFetching={isFetching}
      categories={categories}
    />
  ) : descriptionPageMode ? (
    <DescriptionPage
      changeBalance={changeBalance}
      back={onBack}
      isFetching={isFetching}
    />
  ) : (
    <Box sx={{ padding: "2em", boxShadow: "0px 0px 10px black inset" }}>
      <Button sx={{ alignSelf: "flex-end" }} onClick={() => reset()}>
        {"< back"}
      </Button>
      <Typography sx={{ textAlign: "center" }} variant="h5">
        choose a category or add custom
      </Typography>
      <Box sx={{ display: "flex", alignItems: "stretch", gap: ".5em" }}>
        <TextField
          id="outlined-basic"
          type="search"
          label="search category"
          variant="outlined"
          onChange={(e) => setFilterProp(e.target.value)}
        />
        <Typography sx={{ alignSelf: "center" }} variant="body1">
          or
        </Typography>
        <Button variant="outlined" onClick={() => setIsNewCategory(true)}>
          add custom
        </Button>
      </Box>
      <MenuList>
        {resultList.map((item, index) => (
          <TransactionItem
            setSelectedCategory={setSelectedCategory}
            key={item.id}
            data={item}
          />
        ))}
      </MenuList>
    </Box>
  );
};

export default ChooseCategory;
