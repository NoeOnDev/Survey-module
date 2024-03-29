import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../model/user.model.js";
import { transporter } from "../config/nodemailer.config.js";
import { sendEmail } from "../helper/transporter.helper.js";
import { generateCode } from "../helper/auth.helper.js";

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

        res.cookie("auth_token_google", token, {
          httpOnly: true,
          secure: true,
        });
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

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      return done(null, token);
    } catch (error) {
      return done(error);
    }
  }

  async findOrCreateUserLocal(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email: email } });

      const verificationCode = generateCode();

      if (user) {
        user.code = verificationCode;
        await user.save();
      } else {
        await User.create({
          email: email,
          code: verificationCode,
        });
      }

      await sendEmail(transporter, email, verificationCode);

      res
        .status(200)
        .json({ message: "Verification code has been sent to your email." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async resendCode(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const verificationCode = generateCode();
      user.code = verificationCode;
      await user.save();

      await sendEmail(transporter, email, verificationCode);

      res
        .status(200)
        .json({ message: "Verification code has been resent to your email." });
    } catch (error) {
      res.status(500).json({ message: error.message });
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

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.cookie("auth_token_local", token, { httpOnly: true, secure: true });

      res.status(200).json({ message: "Code verified" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new AuthController();
