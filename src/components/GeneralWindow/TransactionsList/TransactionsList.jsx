import React from "react";
import ListController from "./ListController/ListController";
import { useSort } from "../../../hooks/useSort";
import { useFilter } from "../../../hooks/useFilter";
import ItemTransaction from "./ItemTransaction/ItemTransaction";
import MenuList from "@mui/material/MenuList";
import { Box, Typography } from "@mui/material";

const TransactionList = ({ transactions, categories }) => {
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
      {categories && (
        <ListController
        categories={categories}
          setSortMode={setSortMode}
          setFilterProp={setFilterProp}
          sortMode={sortMode}
        />
      )}
      <MenuList>
        {sortedTransactions.map((item, index) => (
          <ItemTransaction
          data={item}
          key={item.id}
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
