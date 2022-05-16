import React from "react";
import ListController from "./ListController/ListController";
import { useSort } from "../../../hooks/useSort";
import { useFilter } from "../../../hooks/useFilter";
import ItemTransaction from "./ItemTransaction/ItemTransaction";
import { useSelector } from "react-redux";
import MenuList from "@mui/material/MenuList";
import { Box, Typography } from "@mui/material";

const TransactionList = ({ transactions }) => {
  const myCategories = useSelector((state) => state.userData.myCategories);
  const [filterProp, setFilterProp, resultTransactions] = useFilter(
    transactions,
    ""
  );
  const [sortMode, setSortMode, sortedTransactions] =
    useSort(resultTransactions);

  return transactions.length < 1 ? (
    <Box>
      <Typography>there's no transactions yet...</Typography>
    </Box>
  ) : (
    <Box>
      {myCategories && (
        <ListController
          myCategories={myCategories}
          setSortMode={setSortMode}
          setFilterProp={setFilterProp}
          sortMode={sortMode}
        />
      )}
      <MenuList>
        {sortedTransactions.map((item, index) => (
          <ItemTransaction
            date={item.date}
            category={item.category}
            key={index}
            amount={item.amount}
            isSpend={item.isSpend}
            description={item.description}
          />
        ))}
      </MenuList>
      {filterProp !== "" ? (
        <Typography sx={{ display: "flex" }}>
          total:{" "}
          <b>
            {sortedTransactions.reduce((acc, item) => (acc += item.amount), 0)}
          </b>
        </Typography>
      ) : null}
    </Box>
  );
};

export default TransactionList;
