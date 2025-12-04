const express = require("express");
const asyncHandlerUtils = require("../../../../utils/asyncHandler.utils");
const RolesControllers = require("../../controllers/roles.controllers");
const AuthMiddlewares = require("../../../../middlewares/auth.middlewares");
const RBACMiddlewares = require("../../../../middlewares/rbac.middlewares");
const rolesConstants = require("../../../../constants/RBAC/roles.constants");
const permissionsConstants = require("../../../../constants/RBAC/permissions.constants");
const router = express.Router();

//* Method: GET
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
  asyncHandlerUtils(RolesControllers.getAllRoles)
);

router.get(
  "/:roleId",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([
    rolesConstants.OWNER,
    rolesConstants.ADMIN,
  ]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.PERMISSION_VIEW,
  ]),
  asyncHandlerUtils(RolesControllers.getRoleById)
);

//* Method: POST
router.post(
  "/",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([rolesConstants.OWNER]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.PERMISSION_CREATE,
  ]),
  asyncHandlerUtils(RolesControllers.createRole)
);

router.post(
  "/:roleId",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([rolesConstants.OWNER]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.PERMISSION_UPDATE,
  ]),
  asyncHandlerUtils(RolesControllers.updateRole)
);

router.post(
  "/:roleId",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([rolesConstants.OWNER]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.PERMISSION_DELETE,
  ]),
  asyncHandlerUtils(RolesControllers.deleteRole)
);

module.exports = router;
