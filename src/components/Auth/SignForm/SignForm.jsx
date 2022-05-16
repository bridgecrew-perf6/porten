import React, { useEffect } from "react";
import { useFormik } from "formik";
import { getUserData } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import { InputLabel } from "@mui/material";
import { validateAuth } from "../../../common/validation/validateAuth";
import { turnOnAlert } from "../../../redux/alertSlice";
import { turnOnPreloader, turnOffPreloader } from "../../../redux/preloaderSlice";

const SignForm = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (isLogged) return navigate("/window");
  }, [isLogged]);

  const navigateToLogin = () => {
    return navigate("/login");
  };


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateAuth,
    onSubmit: ({ email, password }, submitProps) => {
      dispatch(turnOnPreloader())
      dispatch(getUserData({ email, password })).then((data) => {
        if (!data.payload.uid) {
          dispatch(turnOffPreloader())
          dispatch(turnOnAlert({
            type: 'error',
            title: 'reject',
            text: data.payload.code,
          }))
        } else {
          dispatch(turnOffPreloader())
          dispatch(turnOnAlert({
            type: 'success',
            title: data.meta.requestStatus,
            text: data.payload.displayName + ' is signed in'
          }))
          setTimeout(() => {
            submitProps.resetForm()
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
          sx={{ typography: { xs: "h6", sm: "h4" }, textAlign: 'center'}}
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
        <Button type="submit" variant="outlined" >
          submit
        </Button>
        <Typography sx={{ textAlign: "center" }}>or</Typography>
        <Button variant="outlined" onClick={() => navigateToLogin()}>
          registry now
        </Button>
      </form>
    </Box>
  );
};

export default SignForm;