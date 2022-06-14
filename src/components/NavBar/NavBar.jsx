import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckIcon from "@mui/icons-material/Check";
import { useFormik } from "formik";
import { Avatar, Divider, Drawer, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useSetUserDataMutation } from "../../redux/userDataSlice";
import { getAuth } from "firebase/auth";
import { validateUserData } from "../../common/validation/userDataValidation";
import MyTextField from "../MyTextField/MyTextField";

const NavBar = ({ isOpenBar, toggleOpenBar, userData }) => {
  const [editModeUser, setEditModeUser] = useState(false);
  const [isApplyModeUser, setIsApplyModeUser] = useState(false);
  const [isApplyModeInformation, setIsApplyModeInformation] = useState(false);
  const [editModeInformation, setEditInformation] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const barSize = theme.leftBar.left;
  const { email } = useSelector((state) => state.auth);
  const [
    setNewUserName,
    { isLoading: isLoadingSettingNewName, isError: isErrorSettingName },
  ] = useSetUserDataMutation();
  const [
    setNewUserPhone,
    { isLoading: isLoadingSettingNewPhone, isError: isErrorSettingPhone },
  ] = useSetUserDataMutation();

  const resetState = (setMode, setApply, ...other) => {
    setMode(false);
    setApply(false);

    if (other.length > 0) {
      other.forEach((func) => func(false));
    }
  };

  const handleCloseNav = () => {
    toggleOpenBar();
    resetState(
      setEditModeUser,
      setIsApplyModeUser,
      setEditInformation,
      setIsApplyModeInformation
    );
  };

  const formikUserData = useFormik({
    initialValues: {
      newUserName: userData.userName,
    },
    validate: validateUserData,
    onSubmit: async ({ newUserName }, submitProps) => {
      const { uid } = getAuth().currentUser;

      if (newUserName !== userData.userName && newUserName !== "") {
        await setNewUserName({
          uid,
          field: "userName",
          fillField: newUserName,
        });
      }

      resetState(setEditModeUser, setIsApplyModeUser);

      submitProps.resetForm();
    },
  });

  const formikUserInformation = useFormik({
    initialValues: {
      newPhoneNumber: userData.userNumber,
    },
    validate: validateUserData,
    onSubmit: async ({ newPhoneNumber }, submitProps) => {
      const { uid } = getAuth().currentUser;
      if (newPhoneNumber !== userData.userNumber && newPhoneNumber !== "") {
        await setNewUserPhone({
          uid,
          field: "userNumber",
          fillField: newPhoneNumber,
        });
      }

      resetState(setEditInformation, setIsApplyModeInformation);

      submitProps.resetForm();
    },
  });

  useEffect(() => {
    formikUserData.initialValues.newUserName = userData.userName;
    formikUserInformation.initialValues.newPhoneNumber = userData.userNumber;
  }, [userData]);

  useEffect(() => {
    if (!isOpenBar) {
      formikUserData.resetForm();
      formikUserInformation.resetForm();
    }
  }, [isOpenBar, formikUserData, formikUserInformation]);

  return (
    <Drawer open={isOpenBar} onClose={handleCloseNav}>
      <Box sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            width: {
              xs: barSize.xs,
              sm: barSize.sm,
              md: barSize.md,
              lg: barSize.lg,
              xl: barSize.xl,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1em",
          }}
        >
          <Avatar sx={{ mr: "1em" }} src={null} alt={"photo profile"} />
          {!editModeUser ? (
            <Typography
              sx={{
                typography: {
                  xs: "h5",
                  sm: "body1",
                  md: "body2",
                  lg: "body2",
                },
              }}
            >
              {userData ? userData.userName : "no entered"}
            </Typography>
          ) : (
            <form onSubmit={formikUserData.handleSubmit}>
              <MyTextField
                type="text"
                value={formikUserData.values.newUserName}
                ph="new name"
                name="newUserName"
                formik={formikUserData}
                autoFocus={true}
                error={{
                  text: formikUserData.errors.newUserName,
                  align: "center",
                }}
              />
            </form>
          )}
          <EditIcon
            onSubmit={formikUserData.handleSubmit}
            setMode={setEditModeUser}
            isApply={isApplyModeUser}
            setIsApply={setIsApplyModeUser}
            isFetching={isLoadingSettingNewName}
            isError={formikUserData.errors.newUserName}
          />
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: "1em" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              typography: { xs: "h5", sm: "body1", md: "body2", lg: "body1" },
            }}
          >
            my information:
          </Typography>
          <EditIcon
            onSubmit={formikUserInformation.handleSubmit}
            setMode={setEditInformation}
            isApply={isApplyModeInformation}
            setIsApply={setIsApplyModeInformation}
            isFetching={isLoadingSettingNewPhone}
            isError={formikUserInformation.errors.newPhoneNumber}
          />
        </Box>
        {!editModeInformation ? (
          <Box>
            <Typography variant="body1">
              phone number:
              <b>
                {userData && userData.userNumber
                  ? userData.userNumber
                  : "no entered"}
              </b>
            </Typography>
            <Typography>
              email:
              <b>{email || "no entered"}</b>
            </Typography>
          </Box>
        ) : (
          <form onSubmit={formikUserInformation.handleSubmit}>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
            >
              <Typography>phone number:</Typography>
              <MyTextField
                type="text"
                ph="375()XXXXXXX"
                value={formikUserInformation.values.newPhoneNumber}
                name="newPhoneNumber"
                formik={formikUserInformation}
                autoFocus={true}
                error={{
                  text: formikUserInformation.errors.newPhoneNumber,
                  align: "center",
                }}
              />
            </Box>
          </form>
        )}
      </Box>
      <Divider />
      <Box sx={{ p: "1em" }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          receipts:
        </Typography>
      </Box>
    </Drawer>
  );
};

export default NavBar;

const EditIcon = ({
  setMode,
  isApply,
  setIsApply,
  isFetching,
  onSubmit,
  isError = false,
}) => {
  const [isEditHovered, setEditHovered] = useState(false);

  const handleClick = () => {
    if (isError) return;
    setMode((isEdit) => !isEdit);
    setEditHovered((editHovered) => !editHovered);

    setIsApply((isApply) => !isApply);

    if (isApply) {
      onSubmit();
    }
  };

  if (isFetching) {
    return <CircularProgress color="primary" />;
  }

  return (
    <Box
      sx={{ cursor: "pointer" }}
      onMouseEnter={() => setEditHovered(true)}
      onMouseLeave={() => setEditHovered(false)}
      onClick={handleClick}
    >
      {isApply ? (
        <CheckIcon />
      ) : isEditHovered ? (
        <EditRoundedIcon />
      ) : (
        <EditOutlinedIcon />
      )}
    </Box>
  );
};
