import { Router } from "express";
import { validateUser, validateUserVerification } from "../validation/userValidator.js";
import userController from "../controller/userController.js";

const router = Router();

router.post("/users", validateUser, userController.createUser);
router.post("/users/verify", validateUserVerification, userController.verifyUser);

export default router;