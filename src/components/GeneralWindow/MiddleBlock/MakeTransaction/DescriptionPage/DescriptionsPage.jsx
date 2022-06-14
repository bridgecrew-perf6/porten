import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { transactionValidation } from "../../../../../common/validation/transactionValidation";
import MyTextField from "../../../../MyTextField/MyTextField";

const DescriptionPage = ({
  changeBalance,
  back,
  isNewCategory,
  mode,
  isFetching,
  categories,
}) => {
  const balance = useSelector((state) => state.userData.balance);

  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      categories,
      mode,
      balance,
      description: "",
    },
    validate: transactionValidation,
    onSubmit: ({ category, amount, description = "" }) => {
      const date = new Date();
      if (isNewCategory) {
        changeBalance({
          category: category,
          amount: Number(amount),
          description: description,
          date: date,
        });
      } else {
        changeBalance({
          amount: Number(amount),
          description: description,
          date: date,
        });
      }
    },
  });

  console.log("render description page");

  return (
    <Box
      sx={{
        padding: "2em",
        boxShadow: "0px 0px 10px black inset",
      }}
    >
      <Button sx={{ alignSelf: "flex-start" }} onClick={() => back()}>
        {"< back"}
      </Button>
      <Typography sx={{ textAlign: "center" }} variant="h5">
        {mode ? `you've got a good day!` : `need as well...`}
      </Typography>
      <form
        action=""
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexFlow: "column nowrap", gap: ".3em" }}
      >
        <Box sx={{ display: "flex", gap: ".3em" }}>
          {isNewCategory ? (
            <Box sx={{ flex: "1", display: "flex", flexFlow: "column nowrap" }}>
              <MyTextField
                autoFocus={isNewCategory}
                styles={{ display: "flex", flex: "1" }}
                value={formik.values.category}
                type="text"
                required={true}
                label="new category"
                formik={formik}
                name="category"
                error={{
                  text: formik.errors.category,
                  align: "right",
                }}
              />
            </Box>
          ) : null}
          <Box sx={{ flex: "1", display: "flex", flexFlow: "column nowrap" }}>
            <MyTextField
              autoFocus={!isNewCategory}
              styles={{ display: "flex", flex: "1" }}
              value={formik.values.amount}
              type="text"
              required={true}
              label="amount"
              name="amount"
              formik={formik}
              error={{
                text: formik.errors.amount,
                align: "right",
              }}
            />
          </Box>
        </Box>
        <TextField
          id="description"
          name="description"
          label="description"
          variant="outlined"
          multiline
          rows={2}
          placeholder="enter description"
          value={formik.values.description}
          onChange={formik.handleChange}
          sx={{ justifyContent: "stretch" }}
        />
        <Button type="submit" variant="outlined" disabled={isFetching}>
          submit
        </Button>
      </form>
    </Box>
  );
};

export default DescriptionPage;
