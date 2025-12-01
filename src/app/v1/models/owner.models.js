const appConfigs = require("../../../configs/app.configs");
const RolesConstants = require("../../../constants/roles.constants");
const { knex } = require("../../../inits/knex.inits");

class OwnerModels {
  async existingOwner() {
    return await knex("users")
      .join("user_roles", "users.id", "user_roles.user_id")
      .join("roles", "roles.id", "user_roles.role_id")
      .where("roles.code", RolesConstants.OWNER)
      .first();
  }

  async findUserByEmail({ email }) {
    return await knex("users").select("id", "email").where({ email }).first();
  }

  async ownerRole() {
    return await knex("roles").where({ code: RolesConstants.OWNER }).first();
  }

  async createRoleOwner() {
    const [role] = await knex("roles")
      .insert({
        id: knex.raw("gen_random_uuid()"),
        name: "Owner",
        code: RolesConstants.OWNER,
        description: "Owner role with full access",
      })
      .returning("*");

    return role;
  }

  async createOwner({ email, password_hash }) {
    const [owner] = await knex("users")
      .insert({
        id: knex.raw("gen_random_uuid()"),
        full_name: appConfigs.App.Account.Owner.Name,
        password_hash: password_hash,
        email,
        is_active: true,
      })
      .returning(["id", "email"]);

    return owner;
  }

  async assignRoleToOwner({ user_id, role_id }) {
    const [userRole] = await knex("user_roles")
      .insert({
        id: knex.raw("gen_random_uuid()"),
        user_id,
        role_id,
      })
      .returning("*");
    return userRole;
  }

  async createOwnerWithRole({ email, password_hash }) {
    return knex.transaction(async (trx) => {
      // 1. Tạo user Owner
      const owner = await this.createOwner({ email, password_hash }, trx);

      // 2. Lấy role OWNER, nếu chưa có thì tạo
      let role = await this.ownerRole(trx);
      if (!role) {
        role = await this.createRoleOwner(trx);
      }

      // 3. Gán role OWNER cho user
      await this.assignRoleToOwner(
        { user_id: owner.id, role_id: role.id },
        trx
      );

      return { owner, role };
    });
  }
}

module.exports = new OwnerModels();
