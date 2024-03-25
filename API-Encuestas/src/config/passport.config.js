import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import authController from "../controller/auth.controller.js";

process.loadEnvFile();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

export async function googleConfigAuth() {
    passport.use(
        new GoogleStrategy(
          {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL,
          },
          async function (accessToken, refreshToken, profile, done) {
            try {
              const token = await authController.findOrCreateUser(profile, 'google');
              done(null, token);
            } catch (error) {
              done(error);
            }
          }
        )
      );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await authController.findUserById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
}