import EmailService from "../../service/emailService.js";
import CustomError from "../../helper/customErrorHelper.js";
import transporter from "../../config/transporterConfig.js";

const emailService = new EmailService(transporter, CustomError);
export default emailService;
