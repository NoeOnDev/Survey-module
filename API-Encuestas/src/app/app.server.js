import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import authRoutes from "../routes/auth.routes.js";
import { sequelize } from "../database/db.config.js";
import { googleAuthCool } from "../controllers/auth.controller.js";
import "../models/assosiations.models.js";

export async function server() {
  try {
    const app = express();
    const PORT = process.env.PORT;

    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    app.use(cors());
    app.use(morgan("dev"));
    app.use(passport.initialize());
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(express.json());

    googleAuthCool();
    app.use(authRoutes);

    app.listen(PORT);
  } catch (error) {
    console.error("Error: ", error);
  }
}
