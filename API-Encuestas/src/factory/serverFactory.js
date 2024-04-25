import userRoutes from "./userRoutesFactory.js";
import errorHandling from "../middleware/errorHandlingMiddleware.js";
import Server from "../server.js";

const server = new Server(userRoutes, errorHandling);
export default server;