import { TextField } from "@mui/material";
import React from "react";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

const MyTextField = ({
  styles = null,
  value,
  ph,
  name,
  type,
  formik,
  required = false,
  autoFocus = false,
  error = null,
  label = null,
}) => {
  if (label) {
    ph = false;
  }

  return (
    <>
      <TextField
        sx={{ ...styles }}
        value={value}
        placeholder={ph}
        label={label}
        name={name}
        id={name}
        type={type}
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required={required && true}
        autoFocus={autoFocus && true}
      />
      {error ? <ErrorHandler text={error.text} align={error.align} /> : null}
    </>
  );
};

export default MyTextField;
