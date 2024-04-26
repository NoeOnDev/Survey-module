class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await this.userService.createUser(email);
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
      const user = await this.userService.resendVerificationCode(email);
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
      const user = await this.userService.verifyUserCode(email, code);
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
