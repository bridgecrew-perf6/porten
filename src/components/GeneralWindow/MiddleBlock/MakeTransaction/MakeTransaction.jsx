import { Box, Dialog } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChooseCategory from "./ChooseCategory/ChooseCategory";
import DescriptionPage from "./DescriptionPage/DescriptionsPage";
import { turnOnAlert } from "../../../../redux/alertSlice";
import {
  useAddTransactionMutation,
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../../API/api";
import AlertComponent from "../../../Alert/AlertComponent";

const MakeTransaction = ({
  mode,
  reset,
  onClose,
  open,
  setFetching,
  isFetching,
  categories,
  colors,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);

  const [
    addTransaction,
    {
      isLoading: isLoadingAddingTransaction,
      isSuccess: isSuccessAddingTransaction,
    },
  ] = useAddTransactionMutation();

  const [addNewCategory, { isLoading: isLoadingAddingCategory }] =
    useAddNewCategoryMutation();

  const [updateCategory, { isLoading: isLoadingUpdatingCategory }] =
    useUpdateCategoryMutation();

  const addTransactionSubmit = async (data) => {
    setFetching(true);
    if (mode) {
      await addTransaction({
        newTrans: { ...data, isSpend: false },
        uid,
      });

      dispatch(
        turnOnAlert({
          type: "info",
          title: "Success",
          text: "balance has been replenished",
        })
      );
    } else {
      if (data.category) {
        const color = getColor(colors);

        await addTransaction({
          newTrans: { ...data, isSpend: true },
          uid,
        });

        await addNewCategory({ category: data.category, color, uid });
      } else {
        await addTransaction({
          newTrans: {
            ...data,
            category: selectedCategory.category,
            isSpend: true,
          },
          uid,
        });
        await updateCategory({
          category: selectedCategory,
          uid,
        });
      }

      dispatch(
        turnOnAlert({
          type: "info",
          title: "Success",
          text: "balance has been increased",
        })
      );
    }

    setFetching(false);
    reset();
  };

  const handleCloseDialog = () => {
    onClose();
    setSelectedCategory(null);
  };

  console.log("make transactions");

  return (
    <Dialog onClose={handleCloseDialog} open={open}>
      {mode ? (
        <Box>
          <DescriptionPage
            mode={mode}
            changeBalance={addTransactionSubmit}
            back={reset}
            isFetching={isFetching}
          />
        </Box>
      ) : (
        <ChooseCategory
          categories={categories}
          mode={mode}
          reset={reset}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isFetching={isFetching}
          changeBalance={addTransactionSubmit}
        />
      )}
    </Dialog>
  );
};

export default MakeTransaction;

const getColor = (exists) => {
  let colors = [],
    alpha = "0.9";
  let resultColorString = "rgba(";

  colors = generateColors();

  colors.forEach((item, index) => {
    if (!(index === colors.length - 1)) {
      resultColorString += `${item}, `;
    } else {
      resultColorString += `${item}, ${alpha})`;
    }
  });

  if (exists.includes(resultColorString)) return getColor(exists);

  return resultColorString;
};

const generateColors = () => {
  let colorsArr = [];
  for (let i = 0; i < 3; i++) {
    colorsArr.push(getRandomNum().toString());
  }

  return colorsArr;
};

const getRandomNum = () => {
  return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
};
