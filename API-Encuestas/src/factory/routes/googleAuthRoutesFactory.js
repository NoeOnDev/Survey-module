import createGoogleAuthRoutes from "../../routes/googleAuthRoutes.js";
import googleAuthController from "../controller/googleAuthControllerFactory.js";

const googleAuthRoutes = createGoogleAuthRoutes(googleAuthController);
export default googleAuthRoutes;
