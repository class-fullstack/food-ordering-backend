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

  //- Middleware isUsed
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
    const rows = await knex("role_permissions as rp")
      .join("permissions as p", function () {
        this.on("p.id", "rp.permission_id").andOn(
          "p.is_deleted",
          knex.raw("false")
        );
      })
      .join("roles as r", function () {
        this.on("r.id", "rp.role_id").andOn("r.is_deleted", knex.raw("false"));
      })
      .where("rp.role_id", roleId)
      .andWhere("rp.is_deleted", false)
      .distinct(
        // Role fields
        "r.id as role_id",
        "r.code as role_code",
        "r.name as role_name",
        "r.description as role_description",
        "r.is_system as role_is_system",

        // Permission fields
        "p.id as permission_id",
        "p.code as permission_code",
        "p.description as permission_description",
        // nếu có module:
        "p.module as permission_module"
      );

    if (rows.length === 0) {
      // Không có permission nào nhưng vẫn trả role cho FE nếu anh muốn
      const role = await knex("roles")
        .where({ id: roleId, is_deleted: false })
        .first(
          "id as role_id",
          "code as role_code",
          "name as role_name",
          "description as role_description",
          "is_system as role_is_system"
        );

      return {
        role: role || null,
        permissions: [],
      };
    }
    const first = rows[0];
    const role = {
      id: first.role_id,
      code: first.role_code,
      name: first.role_name,
      description: first.role_description,
      is_system: first.role_is_system,
    };

    // Map permissions
    const permissions = rows.map((row) => ({
      id: row.permission_id,
      code: row.permission_code,
      description: row.permission_description,
      // module: row.permission_module, // nếu có
    }));

    return {
      role,
      permissions,
    };
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
