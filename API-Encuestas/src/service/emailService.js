class EmailService {
  constructor(transporter, customError) {
    this.transporter = transporter;
    this.customError = customError;
  }

  async sendVerificationEmail(email, verificationCode) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `
        <h1>Verify your email</h1>
        <p>Verify code is ${verificationCode} to verify your email</p>
      `,
    };
  
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new this.customError(
        500,
        "Error sending verification email",
        "EMAIL_SENDING_ERROR",
        {
          originalError: error.message,
        }
      );
    }
  }
}

export default EmailService;
