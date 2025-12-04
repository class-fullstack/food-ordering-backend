const { Ok, Created } = require("../../../cors/successResponse.cors");
const PermissionsServices = require("../services/permissions.services");

class PermissionsControllers {
  async getAllPermissions(req, res) {
    new Ok({
      metadata: await PermissionsServices.getAllPermissions(req),
    }).send(res);
  }

  async getPermissionById(req, res) {
    new Ok({
      metadata: await PermissionsServices.getPermissionById(req),
    }).send(res);
  }

  async createPermission(req, res) {
    new Created({
      metadata: await PermissionsServices.createPermission(req),
    }).send(res);
  }

  async updatePermission(req, res) {
    new Ok({
      metadata: await PermissionsServices.updatePermission(req),
    }).send(res);
  }

  async deletePermission(req, res) {
    new Ok({
      metadata: await PermissionsServices.deletePermission(req),
    }).send(res);
  }
}

module.exports = new PermissionsControllers();
