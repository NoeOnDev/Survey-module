import userService from "../service/userServiceFactory.js";
import UserController from "../../controller/userController.js";

const userController = new UserController(userService);
export default userController;