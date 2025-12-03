const appConstants = require("../constants/app.constants");
const AppHelpers = require("../helpers/app.helpers");

const Dev = {
  App: {
    Port: process.env.APP_PORT || appConstants.APP_PORT,
    AppEnvs: process.env.APP_ENV || appConstants.APP_ENVS[0],
    //* Owner account bootstrap info
    Account: {
      Owner: {
        Name: process.env.OWNER_NAME,
        Email: process.env.OWNER_EMAIL,
        Password: process.env.OWNER_PASSWORD,
        PhoneNumber: process.env.OWNER_PHONE_NUMBER,
      },
    },

    //* JWT
    JWT: {
      Secret: process.env.JWT_SECRET || appConstants.JWT_SECRET,
      Access: {
        ExpiresIn:
          process.env.JWT_EXPIRES_IN_ACCESS ||
          appConstants.JWT_EXPIRES_IN_ACCESS,
      },
      Refresh: {
        ExpiresIn:
          process.env.JWT_EXPIRES_IN_REFRESH ||
          appConstants.JWT_EXPIRES_IN_REFRESH,
      },
    },
  },
};

const Prod = {
  App: {
    Port: process.env.APP_PORT || appConstants.APP_PORT,
    AppEnvs: process.env.APP_ENV || appConstants.APP_ENVS[1],
    //* Owner account bootstrap info
    Account: {
      Owner: {
        Name: process.env.OWNER_NAME,
        Email: process.env.OWNER_EMAIL,
        Password: process.env.OWNER_PASSWORD,
        PhoneNumber: process.env.OWNER_PHONE_NUMBER,
      },
    },
    //* JWT
    JWT: {
      Secret: process.env.JWT_SECRET || appConstants.JWT_SECRET,
      Access: {
        ExpiresIn: process.env.JWT_EXPIRES_IN_ACCESS,
      },
      Refresh: {
        ExpiresIn: process.env.JWT_EXPIRES_IN_REFRESH,
      },
    },
  },
};

const Config = {
  Dev,
  Prod,
};

const env = process.env.APP_ENV;

module.exports = AppHelpers.getConfig(env, Config);
