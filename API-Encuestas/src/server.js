import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB, syncDB } from "./database/database.js";

process.loadEnvFile();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.corsOptions = {
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        }
        this.config();
        this.routes();
    }

    config() {
        this.app.use(morgan("dev"));
        this.app.use(cors(this.corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {}

    async start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });

        await connectDB();
        await syncDB();
    }
}

export default Server;