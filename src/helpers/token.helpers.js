const { KEY_TOKEN_TYPE } = require("../constants/app.constants");

class TokenHelpers {
  static getAccessTokenFromRequest(req) {
    if (!req) return null;

    const authHeader = req.headers?.authorization;

    if (authHeader && typeof authHeader === "string") {
      const [scheme, token] = authHeader.trim().split(" ");

      if (scheme && token && scheme.toLowerCase() === "bearer") {
        return token;
      }
    }

    return null;
  }

  static getRefreshTokenFromRequest(req) {
    if (!req) return null;

    const refreshToken = req.cookies[KEY_TOKEN_TYPE.REFRESH];

    return refreshToken || null;
  }
}

module.exports = TokenHelpers;
