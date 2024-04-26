import { connectDB, syncDB } from "../database/database.js";
import userRoutes from "./routes/userRoutesFactory.js";
import errorHandling from "../middleware/errorHandlingMiddleware.js";
import Server from "../server.js";

const server = new Server(userRoutes, errorHandling, connectDB, syncDB);
export default server;
