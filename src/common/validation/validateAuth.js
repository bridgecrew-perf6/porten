import React from "react";
import * as EmailValidator from "email-validator";

export const validateAuth = ({ email, password, repeatPassword, userName }) => {
  const errors = {};

  if(!email) {
    errors.email = "required";
  } else if (!EmailValidator.validate(email)) {
    errors.email = "invalid mail";
  }

  if (!password) {
    errors.password = "required";
  } else if (password.length < 7) {
    errors.password = "must be more than 6 symbols";
  }

  if(repeatPassword) {
    if(repeatPassword === '') {
      errors.repeatPassword = "required";
    } else if (repeatPassword !== password) {
        errors.repeatPassword = "passwords must be equal";
      }
  }

  if(userName) {
    if(userName === '') {
      errors.userName = "required";
    } else if (userName.length < 4) {
      errors.userName = "must be more than 3 symbols";
    }
  }

  return errors;
};
