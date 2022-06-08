import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getUserData } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { InputLabel } from "@mui/material";
import { validateAuth } from "../../../common/validation/validateAuth";
import { turnOnAlert } from "../../../redux/alertSlice";
import Preloader from "../../Preloader/Preloadr";
import MyTextField from "../../MyTextField/MyTextField";

const SignForm = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navigateToLogin, setNavigateToLogin] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isLogged) {
      return navigate("/window");
    } else if (navigateToLogin) {
      return navigate("/login");
    }
  }, [isLogged, navigate, navigateToLogin]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateAuth,
    onSubmit: async ({ email, password }, submitProps) => {
      setIsFetching(true);
      const userData = await dispatch(getUserData({ email, password }));
      setIsFetching(false);
      if (!userData.payload.uid) {
        dispatch(
          turnOnAlert({
            type: "error",
            title: "reject",
            text: userData.payload.code,
          })
        );
      } else {
        dispatch(
          turnOnAlert({
            type: "success",
            title: userData.meta.requestStatus,
            text: "you were sign in",
          })
        );
        setTimeout(() => {
          submitProps.resetForm();
        }, 3000);
      }
    },
  });

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <Box
      sx={{
        margin: "0 auto",
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2em",
        minWidth: 350,
        maxWidth: 450,
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          gap: ".3em",
          padding: "2em",
          display: "flex",
          flexFlow: "column nowrap",
          width: "100%",
        }}
      >
        <Typography
          sx={{ typography: { xs: "h6", sm: "h4" }, textAlign: "center" }}
        >
          welcome to us
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: ".3em",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <InputLabel sx={{ flex: 1 }} htmlFor="email">
            enter email
          </InputLabel>
          <MyTextField
            styles={{ flex: 2 }}
            value={formik.values.email}
            type="email"
            ph="example@mail.host"
            name="email"
            required={true}
            formik={formik}
            error={{
              text: formik.errors.email,
              align: "right",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: ".3em",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <InputLabel htmlFor="password" sx={{ flex: 1 }}>
            enter password
          </InputLabel>
          <MyTextField
            styles={{ flex: 2 }}
            value={formik.values.password}
            type="password"
            name="password"
            required={true}
            formik={formik}
            error={{
              text: formik.errors.password,
              align: "right",
            }}
          />
        </Box>
        <Button type="submit" variant="outlined">
          submit
        </Button>
        <Typography sx={{ textAlign: "center" }}>or</Typography>
        <Button variant="outlined" onClick={() => setNavigateToLogin(true)}>
          registry now
        </Button>
      </form>
    </Box>
  );
};

export default SignForm;
