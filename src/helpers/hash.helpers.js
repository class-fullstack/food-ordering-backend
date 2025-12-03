const bcrypt = require("bcrypt");

class HashHelpers {
  //* Pass
  static hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  //* Refresh Token
  static hashRefreshToken(token) {
    const saltRounds = 10;
    return bcrypt.hash(token, saltRounds);
  }

  static compareRefreshToken(token, hash) {
    return bcrypt.compare(token, hash);
  }
}

module.exports = HashHelpers;
