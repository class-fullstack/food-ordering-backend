const { knex } = require("../../../inits/knex.inits");

class UserSessionsModel {
  async getUserSessions(queryField = {}, returnFields = {}) {
    return await knex("user_sessions")
      .select(Object.keys(returnFields))
      .where({
        ...queryField,
        is_deleted: false,
      });
  }

  async insertUserSessions(insertField = {}, returnFields = {}) {
    const [userSession] = await knex("user_sessions")
      .insert(insertField)
      .returning(returnFields);
    return userSession;
  }

  async updateUserSessions(
    updateField = {},
    queryField = {},
    returnFields = {}
  ) {
    const [userSession] = await knex("user_sessions")
      .where({
        ...queryField,
        is_deleted: false,
      })
      .update(updateField)
      .returning(returnFields);
    return userSession;
  }

  async deleteUserSessions(queryField = {}) {
    return await knex("user_sessions")
      .where({
        ...queryField,
        is_deleted: false,
      })
      .update({
        is_deleted: true,
      });
  }
}

module.exports = new UserSessionsModel();
