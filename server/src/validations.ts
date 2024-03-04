import { check, checkSchema } from "express-validator";

export const newLoanValidation = [
  // check("id").not().isEmpty().withMessage("id is required"),
  check("loanType")
    .not()
    .isEmpty()
    .withMessage("loanType is required")
    .isIn(["CASH", "BUSINESS", "SALARY", "PROPERTY"])
    .withMessage("loanType must be one of CASH, BUSINESS, SALARY, PROPERTY"),
  check("officerId").not().isEmpty().withMessage("officerId is required"),
  check("debtorId").not().isEmpty().withMessage("debtorId is required"),
  check("amount").not().isEmpty().withMessage("amount is required"),
  check("purpose").not().isEmpty().withMessage("purpose is required"),
  check("terms")
    .not()
    .isEmpty()
    .withMessage("term is required")
    .isIn(["3 months", "6 months", "12 months"])
    .withMessage("term must be one of 3 months, 6 months, 12 months"),
  check("status")
    .optional()
    .isIn([
      "submitted",
      "verified",
      "approved",
      "declined",
      "active",
      "cleared",
    ])
    .withMessage("Invalid status value"),
];

export const loginValidation = checkSchema({
  surname: {
    isString: {
      errorMessage: "must be a valid surname",
    },
    notEmpty: true,
  },
  pin: {
    notEmpty: true,
    matches: {
      options: /^\d{4}$/,
      errorMessage: "[pin] must be 4 digit pin.",
    },
  },
});

export const newPaymentValidation = checkSchema({
  id: {
    isString: {
      errorMessage: "must be a valid id",
    },
    notEmpty: true,
  },
  collector_id: { isString: true, notEmpty: true },
  amount: {
    isNumeric: {
      errorMessage: "must be a valid amount",
    },
    notEmpty: true,
  },
  comment: {
    isString: {
      errorMessage: "must be a valid comment",
    },
    notEmpty: true,
  },
});

export const newAddressValidation = checkSchema({
  id: {
    isString: {
      errorMessage: "must be a valid address id",
    },
    notEmpty: true,
  },
  houseNumber_alias: { isString: true, notEmpty: true },
  barangay: { isString: true, notEmpty: true },
  town_city: { isString: true, notEmpty: true },
  province: { isString: true, notEmpty: true },
  length: { isString: true, notEmpty: true },
  comments: { isString: true, notEmpty: true },
});

export const updateAddressValidation = checkSchema({
  houseNumber_alias: { isString: true, notEmpty: true },
  barangay: { isString: true, notEmpty: true },
  town_city: { isString: true, notEmpty: true },
  province: { isString: true, notEmpty: true },
  length: { isString: true, notEmpty: true },
  comments: { isString: true, notEmpty: true },
});
