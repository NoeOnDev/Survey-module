import userService from "../factory/userServiceFactory.js";

class UserController {
  constructor() {}

  async createUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.findOrCreateUser(email);
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async resendVerificationCode(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.resendVerificationCode(email);
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyUser(req, res, next) {
    try {
      const { email, code } = req.body;
      const user = await userService.verifyUserCode(email, code);
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
