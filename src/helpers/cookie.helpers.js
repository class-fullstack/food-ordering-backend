const appConstants = require("../constants/app.constants");
const { DURATION } = require("../constants/time.constants");
const AppHelpers = require("./app.helpers");

class CookieHelpers {
  static setCookie(res, name, value, options = {}) {
    const defaultOptions = {
      httpOnly: true,
      secure: AppHelpers.isProduction(),
      sameSite: "strict",
      path: "/",
    };

    return res.cookie(name, value, { ...defaultOptions, ...options });
  }

  static clearCookie(res, name, options = {}) {
    const defaultOptions = {
      httpOnly: true,
      secure: AppHelpers.isProduction(),
      sameSite: "strict",
      path: "/",
    };

    return res.clearCookie(name, { ...defaultOptions, ...options });
  }

  static setAuthCookies(res, tokens = {}) {
    const {
      refreshToken,
      refreshTokenMaxAge = DURATION.SEVEN_DAYS, // 7 days
    } = tokens;

    if (refreshToken) {
      CookieHelpers.setCookie(
        res,
        appConstants.KEY_TOKEN_TYPE.REFRESH,
        refreshToken,
        {
          maxAge: refreshTokenMaxAge,
        }
      );
    }
  }

  static setDeviceCookie(res, deviceId) {
    CookieHelpers.setCookie(res, appConstants.KEY_DEVICE_ID, deviceId, {
      maxAge: DURATION.ONE_YEAR, // 1 year
    });
  }

  static clearAuthCookies(res) {
    return CookieHelpers.clearCookie(res, appConstants.KEY_TOKEN_TYPE.REFRESH);
  }

  static clearDeviceCookie(res) {
    return CookieHelpers.clearCookie(res, appConstants.KEY_DEVICE_ID);
  }
}

module.exports = CookieHelpers;
