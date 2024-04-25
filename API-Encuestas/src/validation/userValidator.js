import { check, validationResult } from "express-validator";
import { handleValidationErrors } from "../middleware/validationErrorHandler.js";

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