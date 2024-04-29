class EmailService {
  constructor(transporter) {
    this.transporter = transporter;
  }

  async sendVerificationEmail(email, verificationCode) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verification code",
      text: `Your verification code is ${verificationCode}`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailService;
