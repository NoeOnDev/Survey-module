import express from "express";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.config();
        this.routes();
    }

    config() {
        this.app.use(express.json());
    }

    routes() {
        this.app.get("/", (req, res) => {
            res.send("Hello World");
        });
    }

    async start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}

export default Server;