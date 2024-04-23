import { Router } from "express";
import userController from "../controller/userController.js";

const router = Router();

router.get("/users", userController.getUsers);

export default router;