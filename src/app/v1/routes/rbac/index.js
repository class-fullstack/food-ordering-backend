// src/modules/.../routes/role-permissions.routes.js
const express = require("express");
const asyncHandlerUtils = require("../../../../utils/asyncHandler.utils");
const RBACControllers = require("../../controllers/RBAC.controllers");
const AuthMiddlewares = require("../../../../middlewares/auth.middlewares");
const RBACMiddlewares = require("../../../../middlewares/rbac.middlewares");
const rolesConstants = require("../../../../constants/RBAC/roles.constants");
const permissionsConstants = require("../../../../constants/RBAC/permissions.constants");

const router = express.Router();
router.post(
  "/roles/:roleId/permissions/assign",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([rolesConstants.OWNER]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.ASSIGN_ROLE_PERMISSIONS,
  ]),
  asyncHandlerUtils(RBACControllers.assignPermissionsToRole)
);

router.post(
  "/roles/:roleId/permissions/revoke",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requireAtLeastOneRole([rolesConstants.OWNER]),
  RBACMiddlewares.requireAtLeastOnePermission([
    permissionsConstants.REVOKE_ROLE_PERMISSIONS,
  ]),
  asyncHandlerUtils(RBACControllers.revokePermissionsFromRole)
);

module.exports = router;
