const { v4: uuidv4 } = require("uuid");

class RandomHelpers {
  static generateId() {
    return uuidv4();
  }
}

module.exports = RandomHelpers;
