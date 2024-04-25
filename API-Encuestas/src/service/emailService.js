import transporter from "../config/transporterConfig.js";

process.loadEnvFile();

class EmailService {
    constructor() {}

    async sendVerificationEmail(email, code) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verification code",
            text: `Your verification code is ${code}`,
        };
        await transporter.sendMail(mailOptions);
    }
}

export default new EmailService();