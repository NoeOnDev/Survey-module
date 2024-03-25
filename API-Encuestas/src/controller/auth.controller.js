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

  async findOrCreateUser(profile, registrationMethod, res) {
    try {
      let condition;
      let defaults;
  
      if (registrationMethod === 'google') {
        condition = { googleId: profile.id };
        defaults = {
          name: profile.displayName,
          email: profile.emails[0].value,
          registrationMethod: 'google',
        };
      } else if (registrationMethod === 'local') {
        condition = { email: profile.email };
        defaults = {
          registrationMethod: 'local',
        };
      }
  
      const [user, created] = await User.findOrCreate({
        where: condition,
        defaults,
      });
  
      if (registrationMethod === 'local') {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        user.code = verificationCode;
        await user.save();
  
        const mailOptions = {
          from: "noeon",
          to: user.email,
          subject: "Verification code",
          text: `Your verification code is ${verificationCode}`,
        };
  
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Verification code has been sent to your email." });
      } else {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return token;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthController();
