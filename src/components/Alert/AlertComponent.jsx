import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useSelector, useDispatch } from "react-redux";
import { turnOfAlert } from "../../redux/alertSlice";

const AlertComponent = () => {
  const { type, typography } = useSelector((state) => state.alert);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setToggle(true);
  }, [type]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      dispatch(turnOfAlert());
    }, 3000);

    return () => clearTimeout(timerId);
  }, [toggle]);

  return (
    <Alert
      severity={type}
      sx={{ position: "sticky", bottom: 0, maxWidth: "60%" }}
    >
      <AlertTitle>{type}</AlertTitle>
      {typography.title} — <strong>{typography.text}</strong>
    </Alert>
  );
};

export default AlertComponent;
