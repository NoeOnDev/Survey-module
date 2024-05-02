import databaseManager from "../database/databaseFactory.js";
import CustomError from "../../helper/customErrorHelper.js";
import GoogleAuthService from "../../service/googleAuthService.js";

const googleAuthService = new GoogleAuthService(CustomError, databaseManager.User);
export default googleAuthService;
