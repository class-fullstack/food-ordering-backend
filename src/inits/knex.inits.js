const knexLib = require("knex");
const knexConfig = require("../configs/knex.configs");

class KnexConnection {
  constructor() {
    if (!KnexConnection.instance) {
      this.knex = knexLib({
        client: knexConfig.Client,
        connection: {
          host: knexConfig.Connection.Host,
          port: knexConfig.Connection.Port,
          database: knexConfig.Connection.Database,
          user: knexConfig.Connection.User,
          password: knexConfig.Connection.Password,
        },
        pool: {
          min: knexConfig.Pool.Min,
          max: knexConfig.Pool.Max,
        },
      });
      KnexConnection.instance = this;
    }
    return KnexConnection.instance;
  }

  getClient() {
    return this.knex;
  }

  testConnection() {
    try {
      this.knex.raw("SELECT 1+1 AS result").then(() => {
        console.log("Database connection successful ✅");
      });
    } catch (error) {
      console.error("Database connection failed", error);
    }
  }
}

const knex = new KnexConnection().getClient();
const testConnection = new KnexConnection().testConnection();

module.exports = { knex, testConnection };
