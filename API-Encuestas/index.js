import userRoutes from "./src/routes/userRoutes.js";
import errorHandling from "./src/middleware/errorHandlingMiddleware.js";
import Server from "./src/server.js";

const server = new Server(userRoutes, errorHandling);

server.start();
