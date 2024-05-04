import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.config();
        this.routes();
    }

    config() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use(passport.initialize());
    }

    routes() {}

    async start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}

export default Server;