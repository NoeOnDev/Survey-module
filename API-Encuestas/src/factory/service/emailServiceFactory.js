import EmailService from "../../service/emailService.js";
import transporter from "../../config/transporterConfig.js";

const emailService = new EmailService(transporter);
export default emailService;
