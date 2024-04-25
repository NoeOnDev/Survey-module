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
}

export default new UserService();