class GoogleAuthController {
  constructor(googleAuthService, jwtHelper, cookieHelper) {
    this.googleAuthService = googleAuthService;
    this.jwtHelper = jwtHelper;
    this.cookieHelper = cookieHelper;
  }

  authenticate = (req, res, next) => {
    try {
      const authenticate = this.googleAuthService.authenticate();
      authenticate(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  callback = (req, res, next) => {
    try {
      const callback = this.googleAuthService.callback();
      callback(req, res, async (error) => {
        if (error) {
          next(error);
        } else {
          const token = this.jwtHelper.generateToken(
            req.user.id,
            req.user.email
          );
          this.cookieHelper.setTokenCookie(res, token);
          res.redirect("http://localhost:5173/home");
        }
      });
    } catch (error) {
      next(error);
    }
  };
}

export default GoogleAuthController;
