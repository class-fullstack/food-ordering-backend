const appConstants = {
  APP_ENVS: ["dev", "prod", "test", "staging"],
  MORGAN_FORMATS: ["dev", "combined"],
  APP_PORT: 5001,

  // JWT
  JWT_SECRET: "code_web_khong_kho",
  JWT_EXPIRES_IN_ACCESS: "15m",
  JWT_EXPIRES_IN_REFRESH: "7d",
  KEY_TOKEN_TYPE: {
    REFRESH: "refresh",
    ACCESS: "access",
  },

  // Device
  KEY_DEVICE_ID: "device_id",
};

module.exports = appConstants;
