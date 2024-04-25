import User from "../model/userModel.js";
import CustomError from "../helper/customErrorHelper.js";
import codeGeneratorHelper from "../helper/codeGeneratorHelper.js";
import emailService from "./emailService.js";

class UserService {
  constructor() {}

  async findOrCreateUser(user) {
    try {
      const verificationCode = codeGeneratorHelper.generate();

      let existingUser = await User.findOne({ where: { email: user.email } });
      if (existingUser) {
        existingUser.code = verificationCode;
        await existingUser.save();
      } else {
        user.code = verificationCode;
        existingUser = await User.create(user);
      }

      await emailService.sendVerificationEmail(user.email, verificationCode);

      return existingUser;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, "Error creating user", "INTERNAL_ERROR", {
          originalError: error.message,
        });
      }
    }
  }

  async verifyUserCode(email, code) {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw new CustomError(404, "User not found", "USER_NOT_FOUND", {
          email: email,
        });
      }

      if (user.code !== code) {
        throw new CustomError(
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
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(
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

export default new UserService();
