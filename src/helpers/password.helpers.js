const bcrypt = require("bcrypt");

class PasswordHelpers {
  static hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = PasswordHelpers;
