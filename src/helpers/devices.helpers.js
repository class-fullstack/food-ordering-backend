const UAParser = require("ua-parser-js");
const requestIp = require("request-ip");
const devicesConstants = require("../constants/devices.constants");

class DevicesHelpers {
  static getClientIp(req) {
    // request-ip hỗ trợ proxy, x-forwarded-for...
    return requestIp.getClientIp(req); // có thể trả '::ffff:127.0.0.1'
  }

  static parseUserAgent(userAgent = "") {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    // result.device.type: 'mobile' | 'tablet' | 'smarttv' | 'console' | 'wearable' | 'embedded' | undefined
    // result.os: { name, version }
    // result.device: { model, vendor, type }
    // result.browser: { name, version }

    const deviceType = (() => {
      const t = result.device.type;
      if (t === "mobile") return devicesConstants.MOBILE;
      if (t === "tablet") return devicesConstants.TABLET;
      if (
        t === "smarttv" ||
        t === "console" ||
        t === "wearable" ||
        t === "embedded"
      ) {
        return devicesConstants.OTHER;
      }
      // nếu không xác định, coi như desktop
      return devicesConstants.DESKTOP;
    })();

    const osName = result.os.name || null; // "iOS", "Android", "Windows", "macOS"
    const osVersion = result.os.version || null; // "18.0", "15", "11"
    const deviceModel = result.device.model || null; // "iPhone 15 Pro Max"
    const deviceVendor = result.device.vendor || null; // "Apple", "Samsung"
    const browserName = result.browser.name || null; // "Chrome", "Safari"

    return {
      raw: result,
      deviceType,
      osName,
      osVersion,
      deviceModel,
      deviceVendor,
      browserName,
    };
  }

  static buildDeviceName(parsedUa) {
    const { deviceVendor, deviceModel, browserName } = parsedUa;

    if (deviceVendor && deviceModel) {
      return `${deviceVendor} ${deviceModel}`; // "Apple iPhone 15 Pro Max"
    }

    if (browserName) {
      return `${browserName} Browser`; // fallback: "Chrome Browser"
    }

    return "Unknown device";
  }
}

module.exports = DevicesHelpers;
