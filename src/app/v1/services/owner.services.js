const { BadRequestResponse } = require("../../../cors/errorResponse.cors");
const OwnerModels = require("../models/owner.models");
const PasswordHelpers = require("../../../helpers/password.helpers");
const JwtHelpers = require("../../../helpers/jwt.helpers");
const { DURATION } = require("../../../constants/time.constants");
const CookieHelpers = require("../../../helpers/cookie.helpers");
const userDevicesModels = require("../models/userDevices.models");
const { knex } = require("../../../inits/knex.inits");
const DateHelpers = require("../../../helpers/date.helper");
const RandomHelpers = require("../../../helpers/random.helpers");
class OwnerService {
  async bootstrapOwner(req) {
    const { email, password } = req.body;

    // 1. Check đã có Owner chưa
    const existingOwner = await OwnerModels.existingOwner();
    if (existingOwner) {
      throw new BadRequestResponse({
        message: "Owner account already exists.",
      });
    }

    // 2. Check email đã được dùng chưa
    const existingUser = await OwnerModels.findUserByEmail({ email });
    if (existingUser) {
      throw new BadRequestResponse({
        message: "Email is already in use.",
      });
    }

    // 3. Hash password
    const password_hash = await PasswordHelpers.hashPassword(password);

    // 4. Tạo owner + role + gán role (all-in-one, có transaction)
    const { owner } = await OwnerModels.createOwnerWithRole({
      email,
      password_hash,
    });

    return {
      message: "Owner account created successfully.",
      owner: {
        id: owner.id,
        email: owner.email,
      },
    };
  }

  async loginOwner(req, res) {
    const { email, password } = req.body;

    const {
      ipAddress,
      deviceId,
      deviceName,
      deviceOs,
      deviceModel,
      deviceType,
    } = req.deviceContext;

    // 1. Tìm owner theo email
    const owner = await OwnerModels.findUserByEmail({ email });
    if (!owner) {
      throw new BadRequestResponse({
        message: "Invalid email or password.",
      });
    }

    // 1.5. Kiểm tra đúng là Owner không
    const fullOwner = await OwnerModels.existingOwner();
    if (owner.id !== fullOwner.user_id) {
      throw new BadRequestResponse({
        message: "Invalid email or password.",
      });
    }

    // 2. So sánh password
    const isPasswordValid = await PasswordHelpers.comparePassword(
      password,
      owner.password_hash
    );
    if (!isPasswordValid) {
      throw new BadRequestResponse({
        message: "Invalid email or password.",
      });
    }

    const role = {
      role_id: fullOwner.role_id,
      role_code: fullOwner.code,
      role_name: fullOwner.name,
    };

    const { accessToken, refreshToken } = JwtHelpers.createAuthTokens(
      owner,
      role
    );

    CookieHelpers.setAuthCookies(res, {
      refreshToken,
      refreshTokenMaxAge: DURATION.SEVEN_DAYS, // 7 days
    });

    const dataUpsertField = {
      id: RandomHelpers.generateId(),
      user_id: owner.id,
      last_login_at: DateHelpers.currentDate(),
      last_ip_address: ipAddress,
      device_name: deviceName,
      device_type: deviceType,
      device_os: deviceOs,
      device_model: deviceModel,
    };
    const queryField = {
      id: deviceId,
      user_id: owner.id,
    };
    const returnFields = {
      id: "id",
    };

    let resultDevice;
    if (deviceId) {
      const dataUpsertFieldWithoutId = (({ id, ...rest }) => rest)(
        dataUpsertField
      );
      resultDevice = await userDevicesModels.updateUserDevice(
        dataUpsertFieldWithoutId,
        queryField,
        returnFields
      );
    } else {
      resultDevice = await userDevicesModels.insertUserDevice(
        dataUpsertField,
        returnFields
      );
      CookieHelpers.setDeviceCookie(res, resultDevice.id);
    }

    return {
      message: "Login successful.",
      owner: {
        id: owner.id,
        email: owner.email,
      },
      deviceId: resultDevice.id,
      token: {
        access: accessToken,
        expireIn: DURATION.FIFTEEN_MINUTES, // 15 minutes
      },
    };
  }
}

module.exports = new OwnerService();
