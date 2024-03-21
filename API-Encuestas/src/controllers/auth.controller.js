import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { User } from "../models/user.model.js";

export function googleAuth(req, res, next) {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
}

export function googleAuthCallback(req, res, next) {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("http://localhost:5173/");
      });
    }
  )(req, res, next);
}

async function findOrCreateUser(profile, done) {
  try {
    const [user, created] = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: {
        name: profile.displayName,
        email: profile.emails[0].value,
        registrationMethod: "google",
      },
    });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

export async function googleAuthCool() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        findOrCreateUser(profile, done);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
