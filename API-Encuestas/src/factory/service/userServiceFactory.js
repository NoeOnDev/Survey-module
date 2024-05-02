import databaseManager from "../database/databaseFactory.js";
import CustomError from "../../helper/customErrorHelper.js";
import codeGeneratorHelper from "../../helper/codeGeneratorHelper.js";
import emailService from "./emailServiceFactory.js";
import UserService from "../../service/userService.js";

const userService = new UserService(
  databaseManager.User,
  CustomError,
  codeGeneratorHelper,
  emailService
);
export default userService;
