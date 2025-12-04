const { knex } = require("../../../inits/knex.inits");

class RolesModels {
  async getAllRoles({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "id",
    sortOrder = "asc",
  }) {
    const offset = (page - 1) * limit;
    const query = knex("roles")
      .where(function () {
        this.where("name", "like", `%${search}%`).orWhere(
          "description",
          "like",
          `%${search}%`
        );
      })
      .andWhere("is_deleted", false)
      .orderBy(sortBy, sortOrder)
      .limit(limit)
      .offset(offset);

    const [total] = await knex("roles")
      .where(function () {
        this.where("name", "like", `%${search}%`).orWhere(
          "description",
          "like",
          `%${search}%`
        );
      })
      .andWhere("is_deleted", false)
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

  async getRoleById(roleId, returnFields) {
    const role = await knex("roles")
      .where("id", roleId)
      .andWhere("is_deleted", false)
      .first(returnFields);
    return role;
  }

  async insertRole(insertField = {}, returnFields) {
    const [newRole] = await knex("roles")
      .insert(insertField)
      .returning(returnFields);
    return newRole;
  }

  async updateRoleById(roleId, updateField = {}, returnFields) {
    const [updatedRole] = await knex("roles")
      .where("id", roleId)
      .andWhere("is_deleted", false)
      .update(updateField)
      .returning(returnFields);
    return updatedRole;
  }

  async softDeleteRoleById(roleId) {
    const result = await knex("roles")
      .where("id", roleId)
      .andWhere("is_deleted", false)
      .update({ is_deleted: true });
    return result;
  }
}

module.exports = new RolesModels();
