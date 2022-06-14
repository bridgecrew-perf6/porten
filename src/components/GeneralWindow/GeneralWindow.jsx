import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MiddleBlock from "./MiddleBlock/MIddleBlock";
import TransactionList from "./TransactionsList/TransactionsList";
import { useDispatch, useSelector } from "react-redux";
import { configureFinanceData } from "../../redux/userDataSlice";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery, useGetTransactionsQuery } from "../../API/api";
import Preloader from "../Preloader/Preloadr";
import { turnOnAlert } from "../../redux/alertSlice";

const GeneralWindow = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const uid = useSelector((state) => state.auth.uid);

  let {
    data: userTransactions,
    isLoading: isLoadingTransactions,
    isError: isErrorLoadingTransactions,
  } = useGetTransactionsQuery(uid);

  let {
    data: userCategories,
    isLoading: isLoadingCategories,
    isError: isErrorLoadingCategories,
  } = useGetCategoriesQuery(uid);

  useEffect(() => {
    if (!isLogged) return navigate("/sign");
  }, [isLogged, navigate]);

  if (userCategories) {
    userCategories = Object.entries(userCategories).map((inner) => ({
      id: inner[0],
      ...inner[1],
    }));
  } else if (userCategories === null) {
    userCategories = [];
  }

  if (userTransactions) {
    userTransactions = Object.entries(userTransactions).map((inner) => ({
      id: inner[0],
      ...inner[1],
    }));
  } else if (userTransactions === null) {
    userTransactions = [];
  }

  useEffect(() => {
    if (Array.isArray(userCategories) && Array.isArray(userTransactions)) {
      dispatch(configureFinanceData({ userCategories, userTransactions }));
    }
  }, [userCategories, userTransactions]);


  if (isLoadingTransactions || isLoadingCategories) {
    return <Preloader />;
  }

  return (
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
          <Box></Box>
        </Grid>
        <Grid item xs={16} sm={10} md={7}>
          {userCategories && userTransactions ? (
            <MiddleBlock
              transactions={userTransactions}
              categories={userCategories}
            />
          ) : null}
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
            {userTransactions && (
              <TransactionList
                transactions={userTransactions}
                categories={userCategories}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralWindow;
