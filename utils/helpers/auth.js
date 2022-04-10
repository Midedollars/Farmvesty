const jwt = require('jsonwebtoken')



class AuthHelper {
  static generateToken (payload, expiresIn = '2d') {
    return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn })
  }
  static verifyToken (token) {
    return jwt.verify(token, process.env.SECRET_TOKEN)
  }
}

module.exports = AuthHelper
