import User from "../model/userModel.js";
import CustomError from "../helper/customErrorHelper.js";
import codeGeneratorHelper from "../helper/codeGeneratorHelper.js";
import emailService from "./emailService.js";

class UserService {
  constructor() {}

  async findOrCreateUser(user) {
    try {
      const existingUser = await User.findOne({ where: { email: user.email } });
      if (existingUser) {
        throw new CustomError(
          400,
          "User with this email already exists",
          "USER_ALREADY_EXISTS",
          { email: user.email }
        );
      }

      const verificationCode = codeGeneratorHelper.generate();

      user.code = verificationCode;

      await emailService.sendVerificationEmail(user.email, verificationCode);

      return await User.create(user);
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
}

export default new UserService();