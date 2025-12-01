const appConstants = require("../constants/app.constants");
const AppHelpers = require("../helpers/app.helpers");

const Dev = {
  App: {
    Port: process.env.APP_PORT || appConstants.APP_PORT,
    AppEnvs: process.env.APP_ENV || appConstants.APP_ENVS[0],
    Account: {
      Owner: {
        Name: process.env.OWNER_NAME,
        Email: process.env.OWNER_EMAIL,
        Password: process.env.OWNER_PASSWORD,
        PhoneNumber: process.env.OWNER_PHONE_NUMBER,
      },
    },
  },
};

const Prod = {
  App: {
    Port: process.env.APP_PORT || appConstants.APP_PORT,
    AppEnvs: process.env.APP_ENV || appConstants.APP_ENVS[1],
    Account: {
      Owner: {
        Name: process.env.OWNER_NAME,
        Email: process.env.OWNER_EMAIL,
        Password: process.env.OWNER_PASSWORD,
        PhoneNumber: process.env.OWNER_PHONE_NUMBER,
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
