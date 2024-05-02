import database from "../../database/database.js";
import CustomError from "../../helper/customErrorHelper.js";
import GoogleAuthService from "../../service/googleAuthService.js";

const googleAuthService = new GoogleAuthService(CustomError, database.User);
export default googleAuthService;
