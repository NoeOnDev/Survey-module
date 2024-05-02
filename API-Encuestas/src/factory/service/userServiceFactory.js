import database from "../../database/database.js";
import CustomError from "../../helper/customErrorHelper.js";
import codeGeneratorHelper from "../../helper/codeGeneratorHelper.js";
import emailService from "./emailServiceFactory.js";
import UserService from "../../service/userService.js";

const userService = new UserService(
  database.User,
  CustomError,
  codeGeneratorHelper,
  emailService
);
export default userService;
