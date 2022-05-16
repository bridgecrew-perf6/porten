import { Box, Dialog } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  turnOnPreloader,
  turnOffPreloader,
} from "../../../../redux/preloaderSlice";
import {
  addNewCategory,
  getUserCategories,
  updateCategories,
  getUserTransactions,
} from "../../../../redux/userDataSlice";
import { addTransaction } from "../../../../redux/userDataSlice";
import ChooseCategory from "./ChooseCategory/ChooseCategory";
import DescriptionPage from "./DescriptionPage/DescriptionsPage";
import { turnOnAlert } from "../../../../redux/alertSlice";

const MakeTransaction = ({ mode, reset, onClose, open }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.userData.myCategories);
  const uid = useSelector((state) => state.auth.uid);

  const addTransactionSubmit = (data) => {
    dispatch(turnOnPreloader());
    if (mode) {
      dispatch(
        addTransaction({
          ...data,
          isSpend: false,
        })
      ).then(() => {
        dispatch(getUserTransactions(uid)).then((response) => {
          dispatch(turnOffPreloader());
          dispatch(
            turnOnAlert({
              type: "info",
              title: response.meta.requestStatus,
              text: "balance has been replenished",
            })
          );
        });
      })
    } else {
      if (data.category) {
        Promise.all([
          dispatch(
            addTransaction({
              ...data,
              isSpend: true,
            })
          ),
          dispatch(addNewCategory(data.category)),
        ]).then(() => {
          Promise.all([
            dispatch(getUserCategories(uid)),
            dispatch(getUserTransactions(uid)),
          ]).then((response) => {
            dispatch(turnOffPreloader());
            if (response.every((item) => item.meta.requestStatus)) {
              dispatch(
                turnOnAlert({
                  type: "info",
                  title: "fulfilled",
                  text: "balance has been replenished",
                })
              );
            }
          });
        });
      } else {
        Promise.all([
          dispatch(
            addTransaction({
              ...data,
              category: selectedCategory,
              isSpend: true,
            })
          ),
          dispatch(updateCategories(selectedCategory)),
        ]).then((data) => {
          if (data.every((item) => item.meta.requestStatus === "fulfilled")) {
            Promise.all([
              dispatch(getUserCategories(uid)),
              dispatch(getUserTransactions(uid)),
            ]).then((response) => {
              if (
                data.every((item) => item.meta.requestStatus === "fulfilled")
              ) {
                dispatch(turnOffPreloader());
                if (response.every((item) => item.meta.requestStatus)) {
                  dispatch(
                    turnOnAlert({
                      type: "info",
                      title: "fulfilled",
                      text: "balance has been reduced",
                    })
                  );
                } else {
                  dispatch(
                    turnOnAlert({
                      type: "info",
                      title: "error",
                      text: "smth went wrong",
                    })
                  );
                }
              }
            });
          } else {
            dispatch(
              turnOnAlert({
                type: "info",
                title: "error",
                text: "smth went wrong",
              })
            );
          }
        });
      }
    }

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
          />
        </Box>
      ) : (
        <ChooseCategory
          mode={mode}
          reset={reset}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          changeBalance={addTransactionSubmit}
        />
      )}
    </Dialog>
  );
};

export default MakeTransaction;
