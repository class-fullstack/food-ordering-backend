const {
  UnauthorizedResponse,
  InternalServerErrorResponse,
  ForbiddenResponse,
} = require("../cors/errorResponse.cors");
const JwtHelpers = require("../helpers/jwt.helpers");
const TokenHelpers = require("../helpers/token.helpers");

class AuthMiddlewares {
  verifyAccessToken(req, __, next) {
    try {
      const accessToken = TokenHelpers.getAccessTokenFromRequest(req);

      if (!accessToken) {
        return next(
          new UnauthorizedResponse({
            message: "Access token is missing.",
          })
        );
      }

      const decodedToken = JwtHelpers.verifyToken(accessToken);

      req.userAccess = decodedToken;
      return next();
    } catch (error) {
      return next(new InternalServerErrorResponse());
    }
  }

  verifyRefreshToken(req, __, next) {
    try {
      const refreshToken = TokenHelpers.getRefreshTokenFromRequest(req);

      if (!refreshToken) {
        return next(
          new ForbiddenResponse({
            message: "Refresh token is missing.",
          })
        );
      }

      const decodedToken = JwtHelpers.verifyToken(refreshToken);
      req.userRefresh = decodedToken;
      return next();
    } catch (error) {
      return next(new InternalServerErrorResponse());
    }
  }
}

module.exports = new AuthMiddlewares();
