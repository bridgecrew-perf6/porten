import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  createUser,
  setReady,
  remReady,
  setCurrentUser,
} from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import { InputLabel } from "@mui/material";
import { validateAuth } from "../../../common/validation/validateAuth";
import { turnOnAlert } from "../../../redux/alertSlice";
import {
  getDefaultCategories,
  setDefaultCategories,
} from "../../../redux/userDataSlice";
import {
  turnOnPreloader,
  turnOffPreloader,
} from "../../../redux/preloaderSlice";
import { getAuth } from "firebase/auth";

const LoginForm = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) return navigate("/window");
  }, [isLogged]);

  const navigateToSign = () => {
    return navigate("/sign");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
      userName: "",
    },
    validate: validateAuth,
    onSubmit: ({ email, password, userName }, submitProps) => {
      dispatch(turnOnPreloader());

      dispatch(setReady());
      dispatch(createUser({ email, password, userName })).then((response) => {
        debugger;
        if (!response.error) {
          dispatch(getDefaultCategories())
            .then((data) => {
              const categories = { ...data.payload.data };
              const userId = response.payload;
              dispatch(setDefaultCategories({ userId, categories }))
                .then((response) => {
                  if (!response.error) {
                    const user = getAuth().currentUser;
                    const { uid, displayName, email } = user;
                    dispatch(remReady());
                    dispatch(turnOffPreloader());
                    dispatch(setCurrentUser({ uid, displayName, email }));
                    dispatch(
                      turnOnAlert({
                        type: "success",
                        title: response.meta.requestStatus,
                        text: "you are logged in",
                      })
                    );
                  } else {
                    dispatch(turnOffPreloader());
                    dispatch(
                      turnOnAlert({
                        type: "error",
                        title: response.error.message,
                        text: "smt went wrong",
                      })
                    );
                  }
                })
            })
        } else {
          dispatch(turnOffPreloader());
          dispatch(
            turnOnAlert({
              type: "error",
              title: response.meta.requestStatus,
              text: response.error.message,
            })
          );
          setTimeout(() => {
            submitProps.resetForm();
          }, 3000);
        }
      });
    },
  });

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
          <TextField
            sx={{ flex: 2 }}
            type="text"
            onBlur={formik.handleBlur}
            id="userName"
            name="userName"
            required
            variant="outlined"
            value={formik.values.userName}
            onChange={formik.handleChange}
          />
          {formik.errors.userName ? (
            <Typography
              sx={{
                color: "red",
                fontSize: "small",
                flexBasis: "100%",
                textAlign: "right",
              }}
            >
              {formik.errors.userName}
            </Typography>
          ) : null}
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
          <TextField
            sx={{ flex: 2 }}
            type="email"
            placeholder="example@mail.com"
            onBlur={formik.handleBlur}
            id="email"
            name="email"
            required
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <Typography
              sx={{
                color: "red",
                fontSize: "small",
                flexBasis: "100%",
                textAlign: "right",
              }}
            >
              {formik.errors.email}
            </Typography>
          ) : null}
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
          <TextField
            sx={{ flex: 2 }}
            type="password"
            onBlur={formik.handleBlur}
            id="password"
            name="password"
            required
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <Typography
              sx={{
                color: "red",
                fontSize: "small",
                flexBasis: "100%",
                textAlign: "right",
              }}
            >
              {formik.errors.password}
            </Typography>
          ) : null}
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
          <TextField
            sx={{ flex: 2 }}
            type="password"
            onBlur={formik.handleBlur}
            id="repeatPassword"
            name="repeatPassword"
            required
            variant="outlined"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.repeatPassword ? (
            <Typography
              sx={{
                color: "red",
                fontSize: "small",
                flexBasis: "100%",
                textAlign: "right",
              }}
            >
              {formik.errors.repeatPassword}
            </Typography>
          ) : null}
        </Box>
        <Button type="submit" variant="outlined">
          submit
        </Button>
        <Typography sx={{ textAlign: "center" }}>or</Typography>
        <Button variant="outlined" onClick={() => navigateToSign()}>
          log in
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
