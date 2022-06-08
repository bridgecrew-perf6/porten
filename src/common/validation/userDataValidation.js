import React from "react";

export const validateUserData = ({
  newUserName = null,
  newPhoneNumber = null,
}) => {
  const errors = {};

  if (newUserName) {
    if (newUserName.length < 4) {
      errors.newUserName = "too short";
    } else if (newUserName.length > 20) {
      errors.newUserName = "too long";
    }

    return errors;
  }

  if (newPhoneNumber) {
    const phoneRegExp =
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;

    if (newPhoneNumber.length > 12) {
      errors.newPhoneNumber = "too many symbols!";
    } else if (newPhoneNumber.length < 12) {
      errors.newPhoneNumber = "too less symbols!";
    } else if (!newPhoneNumber.match(phoneRegExp)) {
      errors.newPhoneNumber = "invalid number!";
    }

    return errors;
  }

  return errors;
};
