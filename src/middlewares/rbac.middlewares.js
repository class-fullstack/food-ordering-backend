const { InternalServerErrorResponse } = require("../cors/errorResponse.cors");

class RBACMiddlewares {
  requirePermission(...requiredPermission) {
    return async (req, res, next) => {
      try {
        console.log("Required Permissions:", requiredPermission);
        return next();
      } catch (error) {
        return next(new InternalServerErrorResponse());
      }
    };
  }
}

module.exports = new RBACMiddlewares();
