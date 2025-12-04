const { Created, Ok } = require("../../../cors/successResponse.cors");
const RolesServices = require("../services/roles.services");

class RolesControllers {
  async getAllRoles(req, res) {
    new Ok({
      metadata: await RolesServices.getAllRoles(req),
    }).send(res);
  }

  async getRoleById(req, res) {
    new Ok({
      metadata: await RolesServices.getRoleById(req),
    }).send(res);
  }

  async createRole(req, res) {
    new Created({
      metadata: await RolesServices.createRole(req),
    }).send(res);
  }

  async updateRole(req, res) {
    new Ok({
      metadata: await RolesServices.updateRole(req),
    }).send(res);
  }

  async deleteRole(req, res) {
    new Ok({
      metadata: await RolesServices.deleteRole(req),
    }).send(res);
  }
}

module.exports = new RolesControllers();
