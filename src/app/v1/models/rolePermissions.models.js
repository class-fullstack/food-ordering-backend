const { knex } = require("../../../inits/knex.inits");

class RolePermissions {
  async existRolePermissions(roleId) {
    if (!roleId) return false;

    const row = await knex("role_permissions")
      .where("role_id", roleId)
      .andWhere("is_deleted", false)
      .first("id");

    return !!row;
  }

  async existRolesByPermissionId(permissionId) {
    if (!permissionId) return false;

    const row = await knex("role_permissions")
      .where("permission_id", permissionId)
      .andWhere("is_deleted", false)
      .first("id");

    return !!row;
  }

  async softDeleteRolePermissions(roleId, permissionId) {
    const permissionIds = Array.isArray(permissionId)
      ? permissionId
      : permissionId
      ? [permissionId]
      : [];

    if (!roleId || permissionIds.length === 0) {
      return [];
    }

    const rows = await knex("role_permissions")
      .where("role_id", roleId)
      .whereIn("permission_id", permissionIds)
      .andWhere("is_deleted", false)
      .update(
        {
          is_deleted: true,
          updated_at: knex.fn.now(),
        },
        ["id", "role_id", "permission_id", "is_deleted", "updated_at"] // returning
      );

    return rows;
  }
}

module.exports = new RolePermissions();
