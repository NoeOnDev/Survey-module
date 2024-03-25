import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../model/user.model.js";
import { transporter } from "../config/nodemailer.config.js";

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
      { failureRedirect: "http://localhost:5173/" },
      function (err, token, info) {
        if (err) {
          return next(err);
        }
        if (!token) {
          return res.redirect("http://localhost:5173/");
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

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      return done(null, token);
    } catch (error) {
      return done(error);
    }
  }

  async findOrCreateUserLocal(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      if (user) {
        user.code = verificationCode;
        await user.save();
      } else {
        const newUser = await User.create({
          email,
          code: verificationCode,
          registrationMethod: "local",
        });
        user = newUser;
      }

      const mailOptions = {
        from: "noeon",
        to: email,
        subject: "Verification code",
        text: `Your verification code is ${verificationCode}`,
      };

      await transporter.sendMail(mailOptions);

      const token = jwt.sign(
        { email, userId: user.id },
        process.env.JWT_SECRET
      );

      res
        .status(200)
        .cookie("auth_token", token, { httpOnly: true, secure: true })
        .json({ message: "Verification code has been sent to your email." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new AuthController();
