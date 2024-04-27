import userService from "../service/userServiceFactory.js";
import UserController from "../../controller/userController.js";
import JwtHelper from "../../helper/jwtHelper.js";
import CookieHelper from "../../helper/cookieHelper.js";

const jwtHelper = new JwtHelper();
const cookieHelper = new CookieHelper();

const userController = new UserController(userService, jwtHelper, cookieHelper);
export default userController;
