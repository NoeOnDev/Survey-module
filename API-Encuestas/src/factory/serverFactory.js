import databaseManager from "./database/databaseFactory.js";
import userRoutes from "./routes/userRoutesFactory.js";
import googleAuthRoutes from "./routes/googleAuthRoutesFactory.js";
import errorHandling from "../middleware/errorHandlingMiddleware.js";
import swaggerConfig from "../config/swaggerConfig.js";
import Server from "../server.js";

const server = new Server(
  userRoutes,
  googleAuthRoutes,
  errorHandling,
  databaseManager,
  swaggerConfig
);
export default server;
