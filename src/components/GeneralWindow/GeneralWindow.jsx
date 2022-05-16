import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MiddleBlock from "./MiddleBlock/MIddleBlock";
import TransactionList from "./TransactionsList/TransactionsList";
import { useDispatch, useSelector } from "react-redux";
import {
  configureFinanceData,
  configureMyCategories,
  getUserCategories,
  getUserTransactions,
} from "../../redux/userDataSlice";
import { useNavigate } from "react-router-dom";
import { turnOnPreloader, turnOffPreloader } from "../../redux/preloaderSlice";

const GeneralWindow = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const uid = useSelector((state) => state.auth.uid);
  const isReady = useSelector((state) => state.auth.isReady);
  const transactions = useSelector((state) => state.userData.allTransactions);
  const categories = useSelector((state) => state.userData.myCategories);

  debugger

  useEffect(() => {
    if (!isLogged) return navigate("/sign");
  }, [isLogged, navigate]);

  useEffect(() => {
    if (
      uid &&
      isLogged &&
      isReady &&
      transactions === null &&
      categories === null
    ) {
      dispatch(turnOnPreloader());
      dispatch(getUserCategories(uid))
      dispatch(getUserTransactions(uid)).then(()=> {
        dispatch(turnOffPreloader());
      })
    }
  }, [isLogged, isReady, transactions, categories, uid]);

  useEffect(() => {
    if (isLogged && transactions && categories) {
      dispatch(configureFinanceData({ transactions, categories }));
    }
  }, [transactions, categories, isLogged]);


  console.log("render general middle");
  return (
    // <div>asdfsafsdaf</div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container columns={16} gap={1} sx={{ justifyContent: "center" }}>
        <Grid
          item
          xs={16}
          sm={0}
          md={4}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Box>xs=8first</Box>
        </Grid>
        <Grid
          item
          xs={16}
          sm={10}
          md={7}
          sx={{ padding: { xs: "1em" }, marginBottom: "1em" }}
        >
          {categories ? <MiddleBlock /> : null}
        </Grid>
        <Grid
          item
          xs={16}
          sm={5}
          md={4}
          sx={{
            display: { xs: "block", md: "block" },
            padding: "1em",
          }}
        >
          <Box>
            {transactions && <TransactionList transactions={transactions} />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralWindow;
