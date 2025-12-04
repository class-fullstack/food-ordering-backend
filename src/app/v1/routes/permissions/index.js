const express = require("express");
const asyncHandlerUtils = require("../../../../utils/asyncHandler.utils");
const PermissionsControllers = require("../../controllers/permissions.controllers");
const AuthMiddlewares = require("../../../../middlewares/auth.middlewares");
const RBACMiddlewares = require("../../../../middlewares/rbac.middlewares");
const rolesConstants = require("../../../../constants/RBAC/roles.constants");
const permissionsConstants = require("../../../../constants/RBAC/permissions.constants");

const router = express.Router();

//* Method: GET - list all permissions
router.get(
  "/",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([
    rolesConstants.OWNER,
    rolesConstants.ADMIN,
  ]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.PERMISSION_VIEW_ALL,
  ]),
  asyncHandlerUtils.asyncHandler(PermissionsControllers.getAllPermissions)
);

//* Method: GET - get permission by id
router.get(
  "/:permissionId",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([
    rolesConstants.OWNER,
    rolesConstants.ADMIN,
  ]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.PERMISSION_VIEW,
  ]),
  asyncHandlerUtils.asyncHandler(PermissionsControllers.getPermissionById)
);

//* Method: POST - create new permission
router.post(
  "/",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([rolesConstants.OWNER]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.PERMISSION_CREATE,
  ]),
  asyncHandlerUtils.asyncHandler(PermissionsControllers.createPermission)
);

//* Method: PATCH - update permission
router.patch(
  "/:permissionId",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([rolesConstants.OWNER]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.PERMISSION_UPDATE,
  ]),
  asyncHandlerUtils.asyncHandler(PermissionsControllers.updatePermission)
);

//* Method: DELETE - delete permission (soft delete)
router.delete(
  "/:permissionId",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([rolesConstants.OWNER]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.PERMISSION_DELETE,
  ]),
  asyncHandlerUtils.asyncHandler(PermissionsControllers.deletePermission)
);

module.exports = router;
