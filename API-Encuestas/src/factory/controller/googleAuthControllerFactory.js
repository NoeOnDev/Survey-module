import googleAuthService from "../service/googleAuthServiceFactory.js";
import JwtHelper from "../../helper/jwtHelper.js";
import CookieHelper from "../../helper/cookieHelper.js";
import GoogleAuthController from "../../controller/googleAuthController.js";

const jwtHelper = new JwtHelper();
const cookieHelper = new CookieHelper();

const googleAuthController = new GoogleAuthController(googleAuthService, jwtHelper, cookieHelper);
export default googleAuthController;
