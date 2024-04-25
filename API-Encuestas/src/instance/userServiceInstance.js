import User from "../model/userModel.js";
import CustomError from "../helper/customErrorHelper.js";
import codeGeneratorHelper from "../helper/codeGeneratorHelper.js";
import emailService from "./emailServiceInstance.js";
import UserService from "../service/userService.js";

const userService = new UserService(User, CustomError, codeGeneratorHelper, emailService);
export default userService;