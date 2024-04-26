import UserController from "../../controller/userController.js";
import userService from "../service/userServiceFactory.js";

const userController = new UserController(userService);
export default userController;
