import React, { useEffect, useState } from "react";
import Controller from "./Controller/Controller";
import FinanceDiagram from "./FinanceDiagram/FinanceDiagram";
import MakeTransaction from "./MakeTransaction/MakeTransaction";
import { useSelector } from "react-redux";
import BalanceDetails from "./FinanceDiagram/BalanceDetails/BalanceDetails";
import { Box, Typography } from "@mui/material";

const MiddleBlock = () => {
  const [addMode, setAddMode] = useState(false);
  const [kindTrans, setKindTrans] = useState(null);
  const [dataDiagram, setMyDataDiagram] = useState(null);
  const [open, setOpen] = useState(false);

  const myCategories = useSelector((state) => state.userData.myCategories);
  const transactions = useSelector((state) => state.userData.allTransactions);



  useEffect(() => {
    if (!!myCategories) {
      setMyDataDiagram(() => {
        let amounts = [];

        const names = myCategories
          .filter((item) => item.isMine)
          .map((item) => item.category);

        myCategories
          .filter(category => category.isMine)
          .forEach((item) => {
          const categoryTotalAmount = transactions
            .filter(trans => trans.isSpend)
            .filter((trans) => trans.category === item.category)
            .reduce((acc, trans) => (acc += trans.amount), 0);

          amounts.push(categoryTotalAmount);
        });

        debugger
        amounts = getPercent(amounts);

        console.log(names, 'names')
        console.log(amounts, 'amounts')
        return {
          names,
          amounts,
        };
      });
    }
  }, [myCategories, transactions]);

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
      {dataDiagram && dataDiagram.names.length > 0 ? (
        <FinanceDiagram dataDiagram={dataDiagram} />
      ) : (
        <Box>
          <Typography sx={{textAlign: 'center'}}>there's no data yet...</Typography>
        </Box>
      )}
      <Controller modeOn={modeOn} onOpen={handleClickOpen} />
      {addMode ? (
        <MakeTransaction
          open={open}
          onClose={handleClose}
          reset={modeOff}
          mode={kindTrans}
        />
      ) : null}
    </Box>
  );
};

export default MiddleBlock;

const getPercent = (list) => {
  let total = list.reduce((acc, item) => (acc += item), 0);

  if (total === 0) {
    return [];
  }
  return list.map((item) => {
    return ((item * 100) / total).toFixed(1);
  });
};
