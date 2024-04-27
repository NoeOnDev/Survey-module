import jwt from 'jsonwebtoken';

class JwtHelper {
  generateToken(id, email) {
    const payload = { id, email };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secret, options);
  }
}

export default JwtHelper;