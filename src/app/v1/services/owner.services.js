const { BadRequestResponse } = require("../../../cors/errorResponse.cors");
const OwnerModels = require("../models/owner.models");
const HashHelpers = require("../../../helpers/hash.helpers");
const JwtHelpers = require("../../../helpers/jwt.helpers");
const { DURATION } = require("../../../constants/time.constants");
const CookieHelpers = require("../../../helpers/cookie.helpers");
const userDevicesModels = require("../models/userDevices.models");
const { knex } = require("../../../inits/knex.inits");
const DateHelpers = require("../../../helpers/date.helper");
const RandomHelpers = require("../../../helpers/random.helpers");
const sessionsConstants = require("../../../constants/sessions.constants");
const userSessionsModels = require("../models/userSessions.models");
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
    const password_hash = await HashHelpers.hashPassword(password);

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
      fingerprint,
      ipAddress,
      deviceId,
      deviceName,
      deviceOs,
      deviceModel,
      deviceType,
      userAgent,
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
    const isPasswordValid = await HashHelpers.comparePassword(
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
      device_fingerprint: fingerprint,
      is_inactive: true,
    };

    const queryField = {
      id: deviceId,
      user_id: owner.id,
    };
    const returnFields = {
      id: "id",
    };

    let resultDevice;

    // Find device old
    const existingDevice = await userDevicesModels.existsUserDevice({
      device_fingerprint: fingerprint,
      is_inactive: true,
    });

    if (existingDevice) {
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

    // Session
    const newRefreshTokenHash = await HashHelpers.hashRefreshToken(
      refreshToken
    );

    const newExpiredAt = DateHelpers.extendExpiration(
      DateHelpers.currentDate(),
      DURATION.SEVEN_DAYS
    );

    const insertField = {
      id: RandomHelpers.generateId(),
      device_id: resultDevice.id,
      user_agent: userAgent,
      refresh_token_hash: newRefreshTokenHash,
      expired_at: newExpiredAt,
      ip_address: ipAddress,
      auth_type: sessionsConstants.LOGIN_TYPE.LOCAL,
    };
    const result = await userSessionsModels.insertUserSessions(
      {
        ...insertField,
        user_id: owner.id,
        device_id: resultDevice.id,
      },
      { id: "id" }
    );

    return {
      message: "Login successful.",
      owner: {
        id: owner.id,
        email: owner.email,
      },
      deviceId: {
        id: resultDevice.id,
        fingerprint: fingerprint,
      },
      token: {
        access: accessToken,
        expireIn: DURATION.FIFTEEN_MINUTES, // 15 minutes
      },
    };
  }

  async logoutOwner(req, res) {
    return {
      message: "Logout successful.",
    };
  }
}

module.exports = new OwnerService();
