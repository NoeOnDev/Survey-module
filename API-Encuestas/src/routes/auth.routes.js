import { Router } from "express";
import {
  googleAuth,
  googleAuthCallback,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);

export default router;
