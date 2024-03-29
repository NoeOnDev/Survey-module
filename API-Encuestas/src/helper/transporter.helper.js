export async function sendEmail(transporter, email, verificationCode) {
  const mailOptions = {
    from: "noeon",
    to: email,
    subject: "Verification code",
    text: `Your verification code is ${verificationCode}`,
  };

  await transporter.sendMail(mailOptions);
}
