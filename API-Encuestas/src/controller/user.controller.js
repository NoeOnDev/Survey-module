import User from "../model/user.model.js";
import { transporter } from "../config/nodemailer.config.js";
import { sendEmail } from "../helper/transporter.helper.js";
import { generateCode } from "../helper/auth.helper.js";