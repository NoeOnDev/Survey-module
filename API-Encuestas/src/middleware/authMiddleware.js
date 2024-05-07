import jwt from "jsonwebtoken";
import CustomError from "../helper/customErrorHelper.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME];
  if (!token) {
    return next(
      new CustomError(401, "Unauthorized", "UNAUTHORIZED", "No token provided")
    );
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(
          new CustomError(401, "Unauthorized", "UNAUTHORIZED", "Token expired")
        );
      }
      return next(
        new CustomError(403, "Forbidden", "FORBIDDEN", "Invalid token")
      );
    }
    req.user = user;
    next();
  });
};
