import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { createUser, setCurrentUser } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { InputLabel } from "@mui/material";
import { validateAuth } from "../../../common/validation/validateAuth";
import { turnOnAlert } from "../../../redux/alertSlice";
import { getAuth } from "firebase/auth";
import {
  useGetDefaultCategoriesQuery,
  useGetInitUserDataQuery,
  useSetDefaultCategoriesMutation,
  useSetInitUserDataMutation,
} from "../../../redux/initSlice";
import Preloader from "../../Preloader/Preloadr";
import { useSetUserDataMutation } from "../../../redux/userDataSlice";
import MyTextField from "../../MyTextField/MyTextField";

const LoginForm = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [navigateToSign, setNavigateToSign] = useState(false);
  //
  const { data: defaultCategories, isError: isErrorGetDefCat } =
    useGetDefaultCategoriesQuery();
  const [setDefaultCategories, { isError: isErrorSetDefCat }] =
    useSetDefaultCategoriesMutation();
  const { data: defaultUserData, isError: isErrorGetUserData } =
    useGetInitUserDataQuery();
  const [setDefaultUserData, { isError: isErrorSetInitUserData }] =
    useSetInitUserDataMutation();
  const [setUserData, { isError: isErrorSetUserData }] =
    useSetUserDataMutation();

  useEffect(() => {
    if (isLogged) {
      return navigate("/window");
    } else if (navigateToSign) {
      return navigate("/sign");
    }
  }, [isLogged, navigate, navigateToSign]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
      userName: "",
    },
    validate: validateAuth,
    onSubmit: async ({ email, password, userName }, submitProps) => {
      setIsFetching(true);
      const isUserCreated = await dispatch(
        createUser({ email, password, userName })
      );

      if (!isUserCreated.error) {
        const { uid } = getAuth().currentUser;
        dispatch(setCurrentUser({ uid, email }));
        await setDefaultCategories({ uid, defaultCategories });
        await setDefaultUserData({ uid, defaultUserData });
        await setUserData({ uid, field: "userName", fillField: userName });

        dispatch(
          turnOnAlert({
            type: "success",
            title: isUserCreated.meta.requestStatus,
            text: "you are logged in",
          })
        );
      } else {
        dispatch(
          turnOnAlert({
            type: "error",
            title: isUserCreated.meta.requestStatus,
            text: isUserCreated.error.message,
          })
        );
        setTimeout(() => {
          submitProps.resetForm();
        }, 3000);
      }
      setIsFetching(false);
    },
  });

  if (isFetching) {
    return <Preloader />;
  }

  if (
    isErrorGetDefCat ||
    isErrorGetUserData ||
    isErrorSetUserData ||
    isErrorSetInitUserData ||
    isErrorSetDefCat
  ) {
    dispatch(
      turnOnAlert({
        type: "error",
        title: "reject",
        text: "smt went wrong",
      })
    );
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
          let's know to each other
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
          <InputLabel sx={{ flex: 1 }} htmlFor="userName">
            enter username
          </InputLabel>
          <MyTextField
            styles={{ flex: 2 }}
            value={formik.values.userName}
            type="text"
            ph="new name"
            name="userName"
            required={true}
            formik={formik}
            error={{
              text: formik.errors.userName,
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: ".3em",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <InputLabel htmlFor="repeatPassword" sx={{ flex: 1 }}>
            repeat password
          </InputLabel>
          <MyTextField
            styles={{ flex: 2 }}
            value={formik.values.repeatPassword}
            type="password"
            name="repeatPassword"
            required={true}
            formik={formik}
            error={{
              text: formik.errors.repeatPassword,
              align: "right",
            }}
          />
        </Box>
        <Button type="submit" variant="outlined">
          submit
        </Button>
        <Typography sx={{ textAlign: "center" }}>or</Typography>
        <Button variant="outlined" onClick={() => setNavigateToSign(true)}>
          log in
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
