const bcrypt = require("bcrypt");

class PasswordHelpers {
  static hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}

module.exports = PasswordHelpers;
