import { check, validationResult } from "express-validator";
import CustomError from "../helper/customErrorHelper.js";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new CustomError(400, "Invalid input", "INVALID_INPUT", {
        errors: errors.array(),
      })
    );
  }
  next();
};

export const validateUser = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  handleValidationErrors
];

export const validateUserVerification = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("code")
    .trim()
    .isNumeric()
    .withMessage("Must be a number")
    .isLength({ min: 6, max: 6 })
    .withMessage("Must be a 6 digit code"),
  handleValidationErrors
];