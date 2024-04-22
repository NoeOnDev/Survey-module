import express from "express";
import morgan from "morgan";
import cors from "cors";

process.loadEnvFile();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.config();
        this.routes();
    }

    config() {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {}

    start() {
        this.app.listen(this.port);
    }
}

export default Server;