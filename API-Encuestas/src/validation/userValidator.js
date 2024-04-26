import { check } from "express-validator";
import { handleValidationErrors } from "../middleware/validationErrorHandlerMiddleware.js";

export const validateUser = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  handleValidationErrors,
];

export const validateUserVerification = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("code")
    .trim()
    .notEmpty()
    .withMessage("Code is required")
    .isNumeric()
    .withMessage("Must be a number")
    .isLength({ min: 6, max: 6 })
    .withMessage("Must be a 6 digit code"),
  handleValidationErrors,
];
