class UserService {
  constructor(userModel, customError, codeGenerator, emailService) {
    this.userModel = userModel;
    this.customError = customError;
    this.codeGenerator = codeGenerator;
    this.emailService = emailService;
  }

  async findOrCreateUser(email) {
    try {
      const verificationCode = this.codeGenerator.generate();

      let existingUser = await this.userModel.findOne({ where: { email: email } });
      if (existingUser) {
        existingUser.code = verificationCode;
        await existingUser.save();
      } else {
        const user = { email: email, code: verificationCode };
        existingUser = await this.userModel.create(user);
      }

      await this.emailService.sendVerificationEmail(email, verificationCode);

      return existingUser;
    } catch (error) {
      if (error instanceof this.customError) {
        throw error;
      } else {
        throw new this.customError(500, "Error creating user", "INTERNAL_ERROR", {
          originalError: error.message,
        });
      }
    }
  }

  async resendVerificationCode(email) {
    try {
      const user = await this.userModel.findOne({ where: { email: email } });
      if (!user) {
        throw new this.customError(404, "User not found", "USER_NOT_FOUND", {
          email: email,
        });
      }

      const newVerificationCode = this.codeGenerator.generate();
      user.code = newVerificationCode;
      await user.save();

      await this.emailService.sendVerificationEmail(email, newVerificationCode);

      return user;
    } catch (error) {
      if (error instanceof this.customError) {
        throw error;
      } else {
        throw new this.customError(
          500,
          "Error resending verification code",
          "INTERNAL_ERROR",
          {
            originalError: error.message,
          }
        );
      }
    }
  }

  async verifyUserCode(email, code) {
    try {
      const user = await this.userModel.findOne({ where: { email: email } });
      if (!user) {
        throw new this.customError(404, "User not found", "USER_NOT_FOUND", {
          email: email,
        });
      }

      if (user.code !== code) {
        throw new this.customError(
          400,
          "Invalid verification code",
          "INVALID_VERIFICATION_CODE",
          { code: code }
        );
      }

      user.code = null;
      await user.save();

      return user;
    } catch (error) {
      if (error instanceof this.customError) {
        throw error;
      } else {
        throw new this.customError(
          500,
          "Error verifying user code",
          "INTERNAL_ERROR",
          {
            originalError: error.message,
          }
        );
      }
    }
  }
}

export default UserService;