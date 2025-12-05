const { BadRequestResponse } = require("../../../cors/errorResponse.cors");
const RandomHelpers = require("../../../helpers/random.helpers");
const PermissionsModel = require("../models/permissions.models");
const RolePermissionsModels = require("../models/rolePermissions.models");

class PermissionsServices {
  async getAllPermissions(req) {
    const { page, limit, search, sortBy, sortOrder, ...rest } = req.query;

    const filters = { ...rest };

    const PermissionsData = await PermissionsModel.getAllPermissions({
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      search: search || "",
      sortBy: sortBy || "id",
      sortOrder: sortOrder === "desc" ? "desc" : "asc",
      filters,
    });

    return PermissionsData;
  }

  async getPermissionById(req) {
    const { permissionId } = req.params;

    const permission = await PermissionsModel.getPermissionById(permissionId, [
      "id",
      "code",
      "description",
      "created_at",
      "updated_at",
    ]);

    if (!permission) {
      throw new BadRequestResponse({
        message: "permission not found.",
      });
    }

    return permission;
  }

  async createPermission(req) {
    const { code, module, description } = req.body;

    if (!code) {
      throw new BadRequestResponse({
        message: "Permission code is required.",
      });
    }

    if (!module) {
      throw new BadRequestResponse({
        message: "Permission name is required.",
      });
    }

    const newPermission = await PermissionsModel.insertPermission(
      {
        id: RandomHelpers.generateId(),
        code,
        module,
        description,
      },
      ["id", "description", "code", "module"]
    );

    return newPermission;
  }

  async updatePermission(req) {
    const { permissionId } = req.params;
    const { module, description } = req.body;

    if (!permissionId) {
      throw new BadRequestResponse({
        message: "PermissionId ID is required.",
      });
    }

    const existingPermission = await PermissionsModel.getPermissionById(
      permissionId,
      ["id"]
    );
    if (!existingPermission) {
      throw new BadRequestResponse({
        message: "Permission not found.",
      });
    }

    const updatedPermission = await PermissionsModel.updatePermission(
      permissionId,
      {
        module,
        description,
      },
      ["id", "description"]
    );

    return updatedPermission;
  }

  async deletePermission(req) {
    const { permissionId } = req.params;

    if (!permissionId) {
      throw new BadRequestResponse({
        message: "Permission ID is required.",
      });
    }

    const existingPermission = await PermissionsModel.getPermissionById(
      permissionId,
      ["id"]
    );

    if (!existingPermission) {
      throw new BadRequestResponse({
        message: "Permission not found.",
      });
    }

    const isUsedPermission =
      await RolePermissionsModels.existRolesByPermissionId(permissionId);
    if (isUsedPermission) {
      throw new BadRequestResponse({
        message: "You need revoke all permission",
      });
    }

    await PermissionsModel.softDeletePermission(permissionId);

    return { message: "Permission deleted successfully." };
  }
}

module.exports = new PermissionsServices();
