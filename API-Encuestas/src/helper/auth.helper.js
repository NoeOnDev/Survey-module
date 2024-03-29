import jwt from "jsonwebtoken";

process.loadEnvFile();

export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function generateToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
}

export function generateTokenAndSetCookie(user, res) {
  const token = generateToken(user.id);
  res.cookie("auth_token", token, { httpOnly: true, secure: true });
}