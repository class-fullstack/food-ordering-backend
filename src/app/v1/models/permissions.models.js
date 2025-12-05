const { knex } = require("../../../inits/knex.inits");

class PermissionsModels {
  async getAllPermissions({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "id",
    sortOrder = "asc",
    filters = {},
  }) {
    const offset = (page - 1) * limit;

    const allowedFilterFields = [
      "id",
      "code",
      "description",
      "module",
      "is_system",
      "is_deleted",
    ];
    const baseQuery = knex("permissions").where((builder) => {
      // Search theo code / description
      if (search && search.trim() !== "") {
        builder.where((qb) => {
          qb.where("code", "like", `%${search}%`).orWhere(
            "description",
            "like",
            `%${search}%`
          );
        });
      }

      // Dynamic filters từ query
      Object.entries(filters).forEach(([field, value]) => {
        if (!allowedFilterFields.includes(field)) return;
        if (value === undefined || value === "") return;

        // convert boolean nếu cần
        if (["is_system", "is_deleted"].includes(field)) {
          const boolValue =
            value === true || value === "true" || value === 1 || value === "1";
          builder.andWhere(field, boolValue);
        } else {
          builder.andWhere(field, value);
        }
      });
    });

    const dataQuery = baseQuery
      .clone()
      .orderBy(sortBy, sortOrder)
      .limit(limit)
      .offset(offset);

    const [totalRow] = await baseQuery.clone().count({ count: "*" });

    const total = parseInt(totalRow.count, 10) || 0;
    const data = await dataQuery;

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getPermissionById(permissionId, returnFields) {
    const permission = await knex("permissions")
      .where({ id: permissionId, is_deleted: false })
      .first(returnFields);

    return permission;
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

  async softDeletePermission(permissionId) {
    const affectedRows = await knex("permissions")
      .where({ id: permissionId, is_deleted: false })
      .update({ is_deleted: true });

    // affectedRows = 0  -> không có permission nào phù hợp
    // affectedRows = 1+ -> xoá (soft) thành công
    return affectedRows;
  }
}

module.exports = new PermissionsModels();
