const { knex } = require("../../../inits/knex.inits");

class PermissionsModels {
  async getAllPermissions({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "id",
    sortOrder = "asc",
  }) {
    const offset = (page - 1) * limit;
    const query = knex("permissions")
      .where("name", "like", `%${search}%`)
      .orWhere("description", "like", `%${search}%`)
      .orderBy(sortBy, sortOrder)
      .limit(limit)
      .offset(offset);

    const [total] = await knex("permissions")
      .where("name", "like", `%${search}%`)
      .orWhere("description", "like", `%${search}%`)
      .count({ count: "*" });

    const data = await query;

    return {
      data,
      pagination: {
        total: parseInt(total.count, 10),
        page,
        limit,
        totalPages: Math.ceil(total.count / limit),
      },
    };
  }

  async getPermissionById(permissionId, returnFields) {
    const permission = await knex("permissions")
      .where({ id: permissionId, is_deleted: false })
      .first(returnFields);

    return permission;
  }

  async existRolesByPermissionId(permissionId) {
    if (!permissionId) return false;

    const row = await knex("role_permissions")
      .where("permission_id", permissionId)
      .andWhere("is_deleted", false)
      .first("id");

    return !!row;
  }

  async insertPermission(insertField = {}, returnFields) {
    const [newPermission] = await knex("permissions")
      .insert(insertField)
      .returning(returnFields);

    return newPermission;
  }

  async updatePermission(permissionId, updateField = {}, returnFields) {
    const [updatedPermission] = await knex("permissions")
      .where({ id: permissionId, is_deleted: false })
      .update(updateField)
      .returning(returnFields);

    return updatedPermission;
  }

  async softDeletePermission(permissionId, returnFields) {
    const [deletedPermission] = await knex("permissions")
      .where({ id: permissionId, is_deleted: false })
      .update({ is_deleted: true })
      .returning(returnFields);

    return deletedPermission;
  }
}

module.exports = new PermissionsModels();
