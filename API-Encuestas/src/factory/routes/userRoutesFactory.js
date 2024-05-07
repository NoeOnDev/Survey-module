import createUserRoutes from "../../routes/userRoutes.js";
import userController from "../controller/userControllerFactory.js";

const userRoutes = createUserRoutes(userController);
export default userRoutes;
