import passport from "passport";
import User from "../model/user.model.js";
import { transporter } from "../config/nodemailer.config.js";
import { sendEmail } from "../helper/transporter.helper.js";
import {
  generateCode,
  generateTokenAndSetCookie,
} from "../helper/auth.helper.js";

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
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect("http://localhost:5173/");
        }

        generateTokenAndSetCookie(user, res);
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
      let user = await User.findOne({
        where: { email: profile.emails[0].value },
      });

      if (user) {
        user.googleId = profile.id;
        user.name = user.name || profile.displayName;
        await user.save();
      } else {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email: email } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOrCreateUserLocal(req, res, next) {
    try {
      const { email } = req.body;
      let user = await this.findUserByEmail(email);

      const verificationCode = generateCode();

      if (user) {
        user.code = verificationCode;
      } else {
        user = await User.create({
          email: email,
          code: verificationCode,
        });
      }

      await user.save();
      await this.sendVerificationEmail(email, verificationCode, res, next);
    } catch (error) {
      next(error);
    }
  }

  async resendCode(req, res, next) {
    try {
      const { email } = req.body;
      const user = await this.findUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const verificationCode = generateCode();
      user.code = verificationCode;
      await user.save();

      await this.sendVerificationEmail(email, verificationCode, res, next);
    } catch (error) {
      next(error);
    }
  }

  async sendVerificationEmail(email, code, res, next) {
    try {
      await sendEmail(transporter, email, code);
      res.status(200).json({ message: "Verification code has been sent to your email." });
    } catch (error) {
      console.error("Failed to send email:", error);
      next(new Error("Failed to send verification code"));
    }
  }

  async verifyCode(req, res) {
    try {
      const { email, code } = req.body;
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.code !== code) {
        return res.status(400).json({ message: "Invalid code" });
      }

      user.code = null;
      await user.save();

      generateTokenAndSetCookie(user, res);
      res.status(200).json({ message: "Code verified" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new AuthController();