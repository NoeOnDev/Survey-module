import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

process.loadEnvFile();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

export async function googleConfigAuth() {
    passport.use(
        new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL
        }, function (accessToken, refreshToken, profile, done) {
            findOrCreateUser(profile, done);
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
}