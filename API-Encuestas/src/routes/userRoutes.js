import { Router } from "express";
import { validateUser } from "../validation/userValidator.js";
import userController from "../controller/userController.js";

const router = Router();

router.post("/users", validateUser, userController.createUser);

export default router;
