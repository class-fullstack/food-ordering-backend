const { Ok } = require("../../../cors/successResponse.cors");
const RBACService = require("../services/RBAC.services");

class RBACControllers {
  async assignPermissionsToRole(req, res) {
    new Ok({
      metadata: await RBACService.assignPermissionsToRole(req),
    }).send(res);
  }

  async revokePermissionsFromRole(req, res) {
    new Ok({
      metadata: await RBACService.revokePermissionsFromRole(req),
    }).send(res);
  }
}

module.exports = new RBACControllers();
