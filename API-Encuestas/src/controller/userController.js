class UserController {
  constructor(userService, jwtHelper, cookieHelper) {
    this.userService = userService;
    this.jwtHelper = jwtHelper;
    this.cookieHelper = cookieHelper;
  }

  createUser = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await this.userService.findOrCreateUser(email);
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  resendVerificationCode = async (req, res, next) => {
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
  };

  verifyUser = async (req, res, next) => {
    try {
      const { email, code } = req.body;
      const user = await this.userService.verifyUserCode(email, code);
      const token = this.jwtHelper.generateToken(user.id, user.email);
      this.cookieHelper.setTokenCookie(res, token);
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
