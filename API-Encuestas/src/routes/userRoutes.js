import { Router } from "express";
import {
  validateUser,
  validateUserVerification,
} from "../validation/userValidator.js";

function createUserRoutes(userController) {
  const router = Router();

router.post("/users", validateUser, userController.createUser);
  router.post(
    "/users/resend",
    validateUser,
    userController.resendVerificationCode
  );
  router.post(
    "/users/verify",
    validateUserVerification,
    userController.verifyUser
  );

  return router;
}

export default createUserRoutes;
