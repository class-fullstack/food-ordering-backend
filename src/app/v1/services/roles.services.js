const rolesConstants = require("../../../constants/RBAC/roles.constants");
const { BadRequestResponse } = require("../../../cors/errorResponse.cors");
const RandomHelpers = require("../../../helpers/random.helpers");
const RolesModels = require("../../v1/models/roles.models");
const rolePermissionsModels = require("../models/rolePermissions.models");

class RolesServices {
  async getAllRoles(req) {
    const { page, limit, search, sortBy, sortOrder } = req.query;

    const rolesData = await RolesModels.getAllRoles({
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      search: search || "",
      sortBy: sortBy || "id",
      sortOrder: sortOrder === "desc" ? "desc" : "asc",
    });

    return rolesData;
  }

  async getRoleById(req) {
    const { roleId } = req.params;

    const role = await RolesModels.getRoleById(roleId, [
      "id",
      "name",
      "description",
      "created_at",
      "updated_at",
    ]);

    if (!role) {
      throw new BadRequestResponse({
        message: "Role not found.",
      });
    }

    return role;
  }

  async createRole(req) {
    const { name, description } = req.body;

    if (!name) {
      throw new BadRequestResponse({
        message: "Role name is required.",
      });
    }

    const newRole = await RolesModels.insertRole(
      {
        id: RandomHelpers.generateId(),
        name,
        description,
      },
      ["id", "name", "description"]
    );

    return newRole;
  }

  async updateRole(req) {
    const { roleId } = req.params;
    const { name, description } = req.body;

    if (!roleId) {
      throw new BadRequestResponse({
        message: "Role ID is required.",
      });
    }

    const existingRole = await RolesModels.getRoleById(roleId, ["id"]);
    if (!existingRole) {
      throw new BadRequestResponse({
        message: "Role not found.",
      });
    }

    const updatedRole = await RolesModels.updateRoleById(
      roleId,
      {
        name,
        description,
      },
      ["id", "name", "description"]
    );

    return updatedRole;
  }

  async deleteRole(req) {
    const { roleId } = req.params;

    if (!roleId) {
      throw new BadRequestResponse({
        message: "Role ID is required.",
      });
    }

    const existingRole = await RolesModels.getRoleById(roleId, ["id", "code"]);
    if (!existingRole) {
      throw new BadRequestResponse({
        message: "Role not found.",
      });
    }

    if (existingRole.code === rolesConstants.OWNER) {
      throw new BadRequestResponse({
        message: "Role cannot deleted.",
      });
    }

    const isUsedRole = await rolePermissionsModels.existRolePermissions(roleId);

    if (isUsedRole) {
      throw new BadRequestResponse({
        message: "You need revoke role",
      });
    }

    await RolesModels.softDeleteRoleById(roleId);

    return { message: "Role deleted successfully." };
  }
}

module.exports = new RolesServices();
