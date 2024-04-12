import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { Sequelize } from "sequelize";

process.loadEnvFile();
const { DB_NAME, DB_USER, DB_PASSWORD , DB_HOST, DB_PORT } = process.env;
// Database configuration
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: "postgres",
    logging: false,
});
// Database connection
export async function  connectDataBase() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await  sequelize.sync({ force: false });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error(error);
    }
}
// Server configuration
export async function startServer() {
    try {
        const PORT = process.env.PORT;
        const app = express();

        app.use(cors(
            {
                origin: "http://localhost:5173",
                credentials: true,
            }
        ));
        app.use(express.json());
        app.use(morgan("dev"));
        app.use(cookieParser());
        app.use(passport.initialize());
        app.use(express.urlencoded({ extended: false }));

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}
// Start project
export async function startProject() {
    try {
        await connectDataBase();
        await startServer();
    } catch (error) {
        console.error(error);
    }
}

startProject().catch(error => console.error(error));