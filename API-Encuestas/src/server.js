import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

process.loadEnvFile();

class Server {
  constructor(userRoutes, errorHandling, dbConnector, dbSyncer, swaggerConfig) {
    this.app = express();
    this.port = process.env.PORT;
    this.corsOptions = {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    };
    this.dbConnector = dbConnector;
    this.dbSyncer = dbSyncer;
    this.userRoutes = userRoutes;
    this.errorHandling = errorHandling;
    this.swaggerConfig = swaggerConfig;
    this.config();
    this.routes();
  }

  config() {
    this.app.use(morgan("dev"));
    this.app.use(cors(this.corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    const specs = swaggerJsdoc(this.swaggerConfig);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  routes() {
    this.app.use(this.userRoutes);

    this.app.use(this.errorHandling());
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });

    await this.dbConnector();
    await this.dbSyncer();
  }
}

export default Server;
