import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory } from "../../../../../redux/allCategoriesSlice";
import { useFormik } from "formik";
import { transactionValidation } from "../../../../../common/validation/transactionValidation";

const DescriptionPage = ({ changeBalance, back, isNewCategory, mode }) => {
  const balance = useSelector((state) => state.userData.balance);
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.userData.myCategories);

  const formik = useFormik({
    initialValues: {
      amount: '',
      category: '',
      allCategories,
      mode,
      balance,
      description: ''
    },
    validate: transactionValidation,
    onSubmit: ({ category, amount, description = "" }) => {
      const date = new Date();
      if (isNewCategory) {
        dispatch(addNewCategory(category));
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
        backgroundColor: "#71BC93",
      }}
    >
      <Button sx={{ alignSelf: "flex-start" }} onClick={() => back()}>
        {"< back"}
      </Button>
      <Typography sx={{ textAlign: "center" }} variant="h5">
        {mode ? `you've got a good day!` : `need as well...`}
      </Typography>
      <form action="" onSubmit={formik.handleSubmit} style={{display: 'flex', flexFlow: 'column nowrap', gap: '.3em'}}>
        <Box sx={{ display: "flex", gap: ".3em" }}>
          {isNewCategory ? (
            <Box sx={{flex: '1', display: 'flex', flexFlow: 'column nowrap'}}>
              <TextField
                sx={{display: 'flex', flex: '1'}}
                id="category"
                name="category"
                required
                label="new category"
                variant="outlined"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.category ? (
                <Typography sx={{ color: "red", fontSize: "small" }}>
                  {formik.errors.category}
                </Typography>
              ) : null}
            </Box>
          ) : null}
          <Box sx={{flex: '1', display: 'flex', flexFlow: 'column nowrap'}}>
            <TextField
              sx={{flex: '1'}}
              onBlur={formik.handleBlur}
              id="amount"
              name="amount"
              label="amount"
              required
              variant="outlined"
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
            {formik.errors.amount ? (
              <Typography sx={{ color: "red", fontSize: "small" }}>
                {formik.errors.amount}
              </Typography>
            ) : null}
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
        <Button
          type="submit"
          variant="outlined"
        >
          submit
        </Button>
      </form>
    </Box>
  );
};

export default DescriptionPage;
