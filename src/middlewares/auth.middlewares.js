const {
  UnauthorizedResponse,
  InternalServerErrorResponse,
} = require("../cors/errorResponse.cors");

class AuthMiddlewares {
  verifyAccessToken(req, __, next) {
    try {
      return next();
    } catch (error) {
      return next(new InternalServerErrorResponse());
    }
  }
}

module.exports = new AuthMiddlewares();
