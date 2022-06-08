import React, { useEffect, useState } from "react";
import Controller from "./Controller/Controller";
import FinanceDiagram from "./FinanceDiagram/FinanceDiagram";
import MakeTransaction from "./MakeTransaction/MakeTransaction";
import BalanceDetails from "./FinanceDiagram/BalanceDetails/BalanceDetails";
import { Box, Typography } from "@mui/material";

const MiddleBlock = ({ categories, transactions }) => {
  const [addMode, setAddMode] = useState(false);
  const [kindTrans, setKindTrans] = useState(null);
  const [dataDiagram, setMyDataDiagram] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (!!categories) {
      setMyDataDiagram(() => {
        let resultArray = [];

        categories.forEach((category) => {
          if (category.isMine) {
            resultArray.push({
              ...category,
              hoverColor: category.color.replace("0.9", "0.6"),
              totalAmount: transactions
                .filter(
                  (transaction) =>
                    transaction.isSpend &&
                    transaction.category === category.category
                )
                .reduce((acc, transaction) => (acc += transaction.amount), 0),
            });
          }
        });
        let total = resultArray.reduce(
          (acc, category) => (acc += category.totalAmount),
          0
        );

        return resultArray.map((category) => {
          return {
            ...category,
            totalAmount: ((category.totalAmount * 100) / total).toFixed(1),
          };
        });
      });
    }
  }, [categories, transactions]);

  useEffect(() => {
    setColors(() => {
      return categories.map((category) => category.color);
    });
  }, [categories]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const modeOn = (boolState) => {
    setAddMode(true);
    setKindTrans(boolState);
  };

  const modeOff = () => {
    setAddMode(false);
  };

  console.log("render middle");

  return (
    <Box>
      <BalanceDetails />
      {dataDiagram && dataDiagram.length > 0 ? (
        <FinanceDiagram dataDiagram={dataDiagram} isFetching={isFetching} />
      ) : (
        <Box>
          <Typography sx={{ textAlign: "center" }}>
            there's no data yet...
          </Typography>
        </Box>
      )}
      <Controller
        modeOn={modeOn}
        onOpen={handleClickOpen}
        isFetching={isFetching}
      />
      {addMode ? (
        <MakeTransaction
          colors={colors}
          open={open}
          onClose={handleClose}
          reset={modeOff}
          mode={kindTrans}
          categories={categories}
          setFetching={setIsFetching}
          isFetching={isFetching}
        />
      ) : null}
    </Box>
  );
};

export default MiddleBlock;