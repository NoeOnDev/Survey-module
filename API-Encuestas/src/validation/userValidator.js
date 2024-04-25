import { check, validationResult } from "express-validator";
import CustomError from "../helper/customErrorHelper.js";

export const validateUser = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new CustomError(400, "Invalid input", "INVALID_INPUT", {
          errors: errors.array(),
        })
      );
    }
    next();
  },
];
