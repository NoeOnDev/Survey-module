import CustomError from "../../helper/customErrorHelper.js";
import userService from "./userServiceFactory.js";
import GoogleAuthService from "../../service/googleAuthService.js";

const googleAuthService = new GoogleAuthService(CustomError, userService);
export default googleAuthService;
