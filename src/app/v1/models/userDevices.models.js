const { knex } = require("../../../inits/knex.inits");

class UserDevicesModels {
  async existsUserDevice(
    queryField = {},
    returnFields = {
      id: "id",
    }
  ) {
    return await knex("user_devices")
      .select(Object.keys(returnFields))
      .where({
        ...queryField,
        is_deleted: false,
      })
      .first();
  }

  async insertUserDevice(insertField = {}, returnFields = {}) {
    const [userDevice] = await knex("user_devices")
      .insert(insertField)
      .returning(returnFields);
    return userDevice;
  }

  async updateUserDevice(updateField = {}, queryField = {}, returnFields = {}) {
    const [userDevice] = await knex("user_devices")
      .where({
        ...queryField,
        is_deleted: false,
      })
      .update(updateField)
      .returning(returnFields);
    return userDevice;
  }

  async getUserDevices(queryField = {}, returnFields = {}) {
    return await knex("user_devices")
      .select(Object.keys(returnFields))
      .where({
        ...queryField,
        is_deleted: false,
      });
  }

  async deleteUserDevice(queryField = {}) {
    return await knex("user_devices")
      .where({
        ...queryField,
        is_deleted: false,
      })
      .update({
        is_deleted: true,
      });
  }

  async markTrustedDevice(queryField = {}, updateField = {}) {
    return await knex("user_devices")
      .where({
        ...queryField,
        is_deleted: false,
      })
      .update(updateField);
  }
}

module.exports = new UserDevicesModels();
