import React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";

const ItemTransaction = ({ data }) => {
  return (
    <>
      <Tooltip
        title={`${!data.description ? "no description" : data.description}`}
      >
        <MenuItem
          divider
          sx={{ display: { xs: "flex", sm: "block", md: "block", lg: "flex" } }}
        >
          <ListItemText
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", sm: "flex-start" },
            }}
          >
            {!data.category ? (
              <Typography>top-up</Typography>
            ) : (
              <Typography>
                category: <b>{data.category}</b>
              </Typography>
            )}
          </ListItemText>
          <Box>
            <Typography
              sx={{ display: "flex", justifyContent: "flex-end", mb: ".5em" }}
              variant="body1"
              color="text.secondary"
            >
              amount:{" "}
              <b>
                {data.isSpend
                  ? ` -${data.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumSignificantDigits: 2,
                    })}`
                  : ` +${data.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumSignificantDigits: 2,
                    })}`}
              </b>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { sm: "none", md: "none", lg: "block" } }}
            >
              Date: <b>{new Date(data.date).toLocaleString()}</b>
            </Typography>
          </Box>
        </MenuItem>
      </Tooltip>
    </>
  );
};

export default ItemTransaction;
