const appConstants = require("../constants/app.constants");
const { InternalServerErrorResponse } = require("../cors/errorResponse.cors");
const DevicesHelpers = require("../helpers/devices.helpers");

class DevicesMiddlewares {
  attachDeviceContext(req, res, next) {
    try {
      const userAgent = req.headers["user-agent"] || "";
      const fingerprint = req.headers["x-client-fingerprint"] || "";
      const ipAddress = DevicesHelpers.getClientIp(req);
      const parsedUa = DevicesHelpers.parseUserAgent(userAgent);

      const {
        device_name: deviceNameFromBody = "Unknown device",
        device_os: deviceOsFromBody = null,
        device_model: deviceModelFromBody = null,
      } = req.body || {};

      const deviceIdFromCookie =
        req.cookies[appConstants.KEY_DEVICE_ID] || null;

      const deviceName =
        deviceNameFromBody || DevicesHelpers.buildDeviceName(parsedUa);

      const deviceOs =
        deviceOsFromBody ||
        (parsedUa.osName && parsedUa.osVersion
          ? `${parsedUa.osName} ${parsedUa.osVersion}` // "iOS 18.0"
          : parsedUa.osName || null);

      const deviceModel = deviceModelFromBody || parsedUa.deviceModel;

      req.deviceContext = {
        fingerprint,
        ipAddress,
        userAgent,
        deviceId: deviceIdFromCookie,
        deviceName,
        deviceOs,
        deviceModel,
        deviceType: parsedUa.deviceType, // map sang 0/1/2/3
        uaParsed: parsedUa.raw, // nếu sau này cần debug
      };

      return next();
    } catch (error) {
      return next(new InternalServerErrorResponse());
    }
  }
}

module.exports = new DevicesMiddlewares();
