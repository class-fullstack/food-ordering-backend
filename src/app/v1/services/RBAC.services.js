const { BadRequestResponse } = require("../../../cors/errorResponse.cors");
const RBACModels = require("../models/RBAC.models");

class RBACServices {
  async getPermissionsByRoleId(req) {
    const { roleId } = req.params;

    if (!roleId) {
      throw new BadRequestResponse({
        message: "RoleId not found",
      });
    }

    const permissions = await RBACModels.getPermissionsByRoleId(roleId);

    return permissions;
  }

  async assignPermissionsToRole(req) {
    const { roleId } = req.params;
    const { permission_ids, permission_id } = req.body;

    // Ưu tiên mảng permission_ids, fallback sang permission_id đơn
    const permissionInput = permission_ids ?? permission_id;

    // Gọi xuống model, model đã tự xử lý chuyện array / single rồi
    const result = await RBACModels.assignPermissionsToRole(
      roleId,
      permissionInput,
      ["id", "role_id", "permission_id", "is_deleted"] // fields trả về
    );

    return {
      message: "Assign permissions to role successfully.",
      data: result,
    };
  }

  async revokePermissionsFromRole(req) {
    const { roleId } = req.params;
    const { permission_ids, permission_id } = req.body;

    const permissionInput = permission_ids ?? permission_id;

    const result = await RBACModels.revokePermissionsFromRole(
      roleId,
      permissionInput,
      ["id", "role_id", "permission_id", "is_deleted"]
    );

    return {
      message: "Revoke permissions from role successfully.",
      data: result,
    };
  }
}

module.exports = new RBACServices();
