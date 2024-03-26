import express from "express";
import fs from "fs";
import cors from "cors";
import https from "https";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import authController from "./controller/auth.controller.js";
import { googleConfigAuth } from "./config/passport.config.js";
import { authAndSync } from "./config/db.config.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

process.loadEnvFile();

export async function startServer() {
    try {
        const app = express();
        const PORT = process.env.PORT || 3000;

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const httpsOptions = {
            key: fs.readFileSync(__dirname + '/server.key'),
            cert: fs.readFileSync(__dirname + '/server.cert')
        };
        
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
        
        https.createServer(httpsOptions, app).listen(PORT);
    } catch (error) {
        console.error("Unable to start the server:", error);
    }
}