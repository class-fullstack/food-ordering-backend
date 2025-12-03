const jwt = require("jsonwebtoken");

const appConfigs = require("../configs/app.configs");
const appConstants = require("../constants/app.constants");

class JwtHelpers {
  static buildPayload(user, role = {}, extra = {}) {
    return {
      sub: user.id,
      email: user.email,
      full_name: user.full_name,
      role,
      ...extra,
    };
  }

  static createAccessToken(payload) {
    return jwt.sign(payload, appConfigs.App.JWT.Secret, {
      expiresIn: appConfigs.App.JWT.Access.ExpiresIn,
    });
  }

  static createRefreshToken(payload) {
    const refreshPayload = {
      sub: payload.sub,
      token_type: appConstants.KEY_TOKEN_TYPE.REFRESH,
    };

    return jwt.sign(refreshPayload, appConfigs.App.JWT.Secret, {
      expiresIn: appConfigs.App.JWT.Refresh.ExpiresIn,
    });
  }

  static createAuthTokens(user, role = {}, extra = {}) {
    const basePayload = JwtHelpers.buildPayload(user, role, extra);

    const accessToken = JwtHelpers.createAccessToken({
      ...basePayload,
      token_type: appConstants.KEY_TOKEN_TYPE.ACCESS,
    });

    const refreshToken = JwtHelpers.createRefreshToken(basePayload);

    return { accessToken, refreshToken };
  }

  static verifyToken(token) {
    return jwt.verify(token, appConfigs.App.JWT.Secret);
  }
}

module.exports = JwtHelpers;
