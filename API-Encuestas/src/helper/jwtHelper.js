import jwt from 'jsonwebtoken';

class JwtHelper {
  constructor(secret) {
    this.secret = secret;
  }

  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email
    };
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }
}

export default JwtHelper;