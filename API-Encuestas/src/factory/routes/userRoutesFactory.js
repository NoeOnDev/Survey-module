import createUserRoutes from "../../routes/userRoutes.js";
import userController from "../../controller/userController.js";

const userRoutes = createUserRoutes(userController);
export default userRoutes;
