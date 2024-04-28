import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

process.loadEnvFile();

const GOOGLE_STRATEGY = "google";
const GOOGLE_SCOPES = ["profile", "email"];

class GoogleAuthService {
  constructor(userModel, customError) {
    this.userModel = userModel;
    this.customError = customError;

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails[0].value;
            const googleId = profile.id;
            const name = profile.displayName;

            let user = await this.userModel.findOne({ where: { email } });

            if (user) {
              user.googleId = googleId;
              user.name = name;
              await user.save();
            } else {
              user = await this.userModel.create({ googleId, email, name });
            }

            done(null, user);
          } catch (error) {
            done(
              new this.customError(
                500,
                "Internal Server Error",
                "INTERNAL_ERROR",
                error
              )
            );
          }
        }
      )
    );
  }

  authenticate() {
    return passport.authenticate(GOOGLE_STRATEGY, { scope: GOOGLE_SCOPES });
  }

  callback() {
    return passport.authenticate(GOOGLE_STRATEGY, { failureRedirect: "http://localhost:5173/" });
  }
}

export default GoogleAuthService;