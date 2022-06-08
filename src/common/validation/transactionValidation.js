import React from "react";

export const transactionValidation = ({
  amount,
  category,
  categories,
  balance,
  mode,
}) => {
  const errors = {};

  if (!amount) {
    errors.amount = "required field";
  } else if (!amount.match(/^\d+$/)) {
    errors.amount = "must be only numbers!";
  } else if (amount.length > 7 && mode) {
    errors.amount = "you are over rich to use this app";
  } else if (Number(amount) === 0) {
    errors.amount = "nice try :)";
  } else if (!mode && balance - amount < 0) {
    errors.amount = "balance will be negative!";
  }

  if (category) {
    if (!category) {
      errors.category = "required field";
    } else if (category.length >= 10) {
      errors.category = "try to dream a smaller name";
    } else if (category) {
      category = category.trim();

      const isOkName = categories.every((item) => item.category !== category);
      if (!isOkName) {
        errors.category = "name is already in use";
      }
    }
  }

  return errors;
};
