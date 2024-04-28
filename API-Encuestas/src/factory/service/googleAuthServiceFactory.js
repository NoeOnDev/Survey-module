import { User } from "../../database/database.js";
import CustomError from "../../helper/customErrorHelper.js";
import GoogleAuthService from "../../service/googleAuthService.js";

const googleAuthService = new GoogleAuthService(User, CustomError);
export default googleAuthService;
