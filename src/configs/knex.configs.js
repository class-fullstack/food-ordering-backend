const knexConstants = require("../constants/knex.constants");
const AppHelpers = require("../helpers/app.helpers");

const Dev = {
  Client: knexConstants.DB_CLIENT,
  Connection: {
    Host: process.env.POSTGRES_HOST || knexConstants.HOST,
    Port: process.env.POSTGRES_PORT
      ? Number(process.env.POSTGRES_PORT)
      : knexConstants.PORT,
    Database: process.env.POSTGRES_DB || knexConstants.NAME_DB,
    User: process.env.POSTGRES_USER || knexConstants.USER,
    Password: process.env.POSTGRES_PASSWORD || knexConstants.PASSWORD,
  },
  Pool: {
    Min: 2,
    Max: 10,
  },
};

const Prod = {
  Client: knexConstants.DB_CLIENT,
  Connection: {
    Host: process.env.POSTGRES_HOST,
    Port: process.env.POSTGRES_PORT,
    Database: process.env.POSTGRES_DB,
    User: process.env.POSTGRES_USER,
    Password: process.env.POSTGRES_PASSWORD,
  },
  Pool: {
    Min: 2,
    Max: 10,
  },
};

const Config = {
  Dev,
  Prod,
};

const env = process.env.APP_ENV;

module.exports = AppHelpers.getConfig(env, Config);
