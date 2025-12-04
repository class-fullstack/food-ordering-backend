const RandomHelpers = require("../../../helpers/random.helpers");
const { knex } = require("../../../inits/knex.inits");

class RBACModels {
  async getUserRoles(userId) {
    const rows = await knex("user_roles as ur")
      .join("roles as r", "r.id", "ur.role_id")
      .where("ur.user_id", userId)
      .andWhere("ur.is_deleted", false)
      .andWhere("r.is_deleted", false)
      .select(
        "r.id as role_id",
        "r.code as role_code",
        "r.name as role_name",
        "r.description as role_description",
        "r.is_system"
      );

    return rows.map((row) => ({
      id: row.role_id,
      code: row.role_code,
      name: row.role_name,
      description: row.role_description,
      is_system: row.is_system,
    }));
  }

  async getPermissionsByRoleIds(roleIds = []) {
    if (!Array.isArray(roleIds) || roleIds.length === 0) {
      return {};
    }

    const rows = await knex("role_permissions as rp")
      .join("permissions as p", "p.id", "rp.permission_id")
      .whereIn("rp.role_id", roleIds)
      .andWhere("rp.is_deleted", false)
      .andWhere("p.is_deleted", false)
      .select(
        "rp.role_id",
        "p.id as permission_id",
        "p.code as permission_code",
        "p.name as permission_name",
        "p.description as permission_description"
      );

    const map = {};

    for (const row of rows) {
      if (!map[row.role_id]) {
        map[row.role_id] = [];
      }

      map[row.role_id].push({
        id: row.permission_id,
        code: row.permission_code,
        name: row.permission_name,
        description: row.description,
      });
    }

    return map;
  }

  async getPermissionsByRoleId(roleId) {
    if (!roleId) return [];

    const rows = await knex("role_permissions as rp")
      .join("permissions as p", function () {
        this.on("p.id", "rp.permission_id").andOn(
          "p.is_deleted",
          knex.raw("false")
        );
      })
      .where("rp.role_id", roleId)
      .andWhere("rp.is_deleted", false)
      .distinct(
        "p.id as permission_id",
        "p.code as permission_code",
        "p.name as permission_name",
        "p.description as permission_description",
        "p.is_system"
      );

    const permissions = rows.map((row) => ({
      id: row.permission_id,
      code: row.permission_code,
      name: row.permission_name,
      description: row.permission_description,
      is_system: row.is_system,
    }));

    return permissions;
  }

  async assignPermissionsToRole(roleId, permissionId, returnFields) {
    const permissionIds = Array.isArray(permissionId)
      ? permissionId
      : permissionId
      ? [permissionId]
      : [];

    if (permissionIds.length === 0) {
      return [];
    }

    const fieldsToReturn =
      Array.isArray(returnFields) && returnFields.length > 0
        ? returnFields
        : ["id", "role_id", "permission_id", "is_deleted"];

    return knex.transaction(async (trx) => {
      const rowsToInsert = permissionIds.map((pid) => ({
        id: RandomHelpers.generateId(),
        role_id: roleId,
        permission_id: pid,
        is_deleted: false,
      }));

      const result = await trx("role_permissions")
        .insert(rowsToInsert)
        .onConflict(["role_id", "permission_id"])
        .merge({
          is_deleted: false,
        })
        .returning(fieldsToReturn);

      return result;
    });
  }

  async revokePermissionsFromRole(roleId, permissionId, returnFields) {
    const permissionIds = Array.isArray(permissionId)
      ? permissionId
      : permissionId
      ? [permissionId]
      : [];

    if (!roleId || permissionIds.length === 0) {
      return [];
    }

    const fieldsToReturn =
      Array.isArray(returnFields) && returnFields.length > 0
        ? returnFields
        : ["id", "role_id", "permission_id", "is_deleted"];

    return knex.transaction(async (trx) => {
      const result = await trx("role_permissions")
        .where("role_id", roleId)
        .whereIn("permission_id", permissionIds)
        .andWhere("is_deleted", false)
        .update(
          {
            is_deleted: true,
          },
          fieldsToReturn // returning
        );

      return result;
    });
  }
}

module.exports = new RBACModels();
