import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

process.loadEnvFile();

class AuthController {
  async googleAuth(req, res, next) {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }

  async googleAuthCallback(req, res, next) {
    passport.authenticate(
      "google",
      { failureRedirect: "/login" },
      function (err, token, info) {
        if (err) {
          return next(err);
        }
        if (!token) {
          return res.redirect("/login");
        }

        res.cookie("auth_token", token, { httpOnly: true, secure: true });
        return res.redirect("http://localhost:5173/home");
      }
    )(req, res, next);
  }

  async findUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOrCreateUser(profile, done) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
          name: profile.displayName,
          email: profile.emails[0].value,
          registrationMethod: "google",
        },
      });

      const token = jwt.sign({ id: user.id }, "your-secret-key");

      return done(null, token);
    } catch (err) {
      return done(err);
    }
  }
}

export default new AuthController();