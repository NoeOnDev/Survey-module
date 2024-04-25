import transporter from "../config/transporterConfig.js";

process.loadEnvFile();

class EmailService {
  constructor() {}

  async sendVerificationEmail(email, verificationCode) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verification code",
      text: `Your verification code is ${verificationCode}`,
    };
    await transporter.sendMail(mailOptions);
  }
}

export default new EmailService();
