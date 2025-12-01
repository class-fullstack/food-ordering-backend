const { BadRequestResponse } = require("../../../cors/errorResponse.cors");
const OwnerModels = require("../models/owner.models");
const PasswordHelpers = require("../../../helpers/password.helpers");

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
}

module.exports = new OwnerService();
