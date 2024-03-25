import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import authController from "./controller/auth.controller.js";
import { googleConfigAuth } from "./config/passport.config.js";
import { authAndSync } from "./config/db.config.js";

process.loadEnvFile();

export async function startServer() {
    try {
        const app = express();
        const PORT = process.env.PORT || 3000;
        
        app.use(cors());
        app.use(morgan("dev"));
        app.use(express.json());
        app.use(passport.initialize());
        app.use(cookieParser());
        
        await authAndSync();
        await googleConfigAuth();

        app.get("/auth/google", authController.googleAuth);
        app.get("/auth/google/callback", authController.googleAuthCallback);
        app.post("/auth/local", authController.findOrCreateUserLocal);
        app.post("/auth/verify", authController.verifyCode);
        
        app.listen(PORT);
    } catch (error) {
        console.error("Unable to start the server:", error);
    }
}