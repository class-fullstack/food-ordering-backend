const RBACModels = require("../app/v1/models/RBAC.models");
const rolesConstants = require("../constants/RBAC/roles.constants");
const {
  InternalServerErrorResponse,
  UnauthorizedResponse,
  ForbiddenResponse,
} = require("../cors/errorResponse.cors");

class RBACMiddlewares {
  // Role only Owner
  requireOwnerRole(roleCodes) {
    return async (req, res, next) => {
      try {
        const userId = req.userAccess?.sub;

        if (!userId) {
          return next(
            new UnauthorizedResponse({
              message: "User not authenticated.",
            })
          );
        }

        const userRoles = await RBACModels.getUserRoles(userId);

        const hasRequiredRole = userRoles.some((userRole) =>
          roleCodes.includes(userRole.code)
        );

        if (!hasRequiredRole) {
          return next(
            new ForbiddenResponse({
              message: "User does not have the required role.",
            })
          );
        }
        req.userRoles = userRoles;
        return next();
      } catch (error) {
        console.error("RBACMiddlewares.requireOwnerRole error:", error);
        return next(new InternalServerErrorResponse());
      }
    };
  }

  // Check all roles except Owner
  requireAtLeastOneRole(roleCodes) {
    return async (req, res, next) => {
      try {
        const userId = req.userAccess?.sub;

        if (!userId) {
          return next(
            new UnauthorizedResponse({
              message: "User not authenticated.",
            })
          );
        }

        const userRoles = await RBACModels.getUserRoles(userId);

        const hasAtLeastOneRole = userRoles.some((userRole) =>
          roleCodes.includes(userRole.code)
        );

        if (!hasAtLeastOneRole) {
          return next(
            new ForbiddenResponse({
              message: "User does not have any of the required roles.",
            })
          );
        }

        req.userRoles = userRoles;
        return next();
      } catch (error) {
        console.error("RBACMiddlewares.requireAtLeastOneRole error:", error);
        return next(new InternalServerErrorResponse());
      }
    };
  }

  requireAtLeastOnePermission(permissionCodes) {
    return async (req, res, next) => {
      try {
        const rolePermissionsMap = await RBACModels.getPermissionsByRoleIds(
          req.userRoles.map((role) => role.id)
        );

        const userPermissions = Object.values(rolePermissionsMap).flat();
        const hasAtLeastOnePermission = userPermissions.some((userPermission) =>
          permissionCodes.includes(userPermission.code)
        );

        if (!hasAtLeastOnePermission) {
          return next(
            new ForbiddenResponse({
              message: "User does not have any of the required permissions.",
            })
          );
        }

        console.log("User Permissions:", userPermissions);
        req.userPermissions = userPermissions;
        return next();
      } catch (error) {
        console.error(
          "RBACMiddlewares.requireAtLeastOnePermission error:",
          error
        );
        return next(new InternalServerErrorResponse());
      }
    };
  }
}

module.exports = new RBACMiddlewares();
