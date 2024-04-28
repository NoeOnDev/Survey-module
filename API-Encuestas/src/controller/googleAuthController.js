class GoogleAuthController {
    constructor(googleAuthService, jwtHelper, cookieHelper) {
        this.googleAuthService = googleAuthService;
        this.jwtHelper = jwtHelper;
        this.cookieHelper = cookieHelper;
    }
}

export default GoogleAuthController;