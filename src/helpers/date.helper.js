class DateHelpers {
  static currentDate() {
    return new Date();
  }

  static extendExpiration(newExpiredAt, durationMs) {
    return new Date(newExpiredAt.getTime() + durationMs);
  }
}

module.exports = DateHelpers;
