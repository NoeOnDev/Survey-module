import { validationResult } from "express-validator";
import CustomError from "../helper/customErrorHelper.js";

export const handleValidationErrors = (req, res, next) => {
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