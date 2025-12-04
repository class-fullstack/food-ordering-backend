const permissionsConstants = require("./permissions.constants");
const rolesConstants = require("./roles.constants");

const RBACConstants = {
  //* OWNER
  [rolesConstants.OWNER]: [
    permissionsConstants.ROLE_VIEW_ALL,
    permissionsConstants.ROLE_VIEW,
    permissionsConstants.ROLE_CREATE,
    permissionsConstants.ROLE_UPDATE,
    permissionsConstants.ROLE_DELETE,

    permissionsConstants.PERMISSION_VIEW_ALL,
    permissionsConstants.PERMISSION_VIEW,
    permissionsConstants.PERMISSION_CREATE,
    permissionsConstants.PERMISSION_UPDATE,
    permissionsConstants.PERMISSION_DELETE,

    permissionsConstants.ASSIGN_ROLE_PERMISSIONS,
  ],

  //* Admin
  [rolesConstants.ADMIN]: [
    permissionsConstants.ROLE_VIEW_ALL,
    permissionsConstants.ROLE_VIEW,

    permissionsConstants.PERMISSION_VIEW_ALL,
    permissionsConstants.PERMISSION_VIEW,
  ],
};

module.exports = RBACConstants;
