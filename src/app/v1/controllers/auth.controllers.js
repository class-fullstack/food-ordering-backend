const { Ok } = require("../../../cors/successResponse.cors");
const AuthServices = require("../services/auth.services");

class AuthControllers {
  //* STAFF (ADMIN + STAFF)

  //* USER
  async registerUser(req, res) {
    new Ok({
      metadata: await AuthServices.registerUser(req.body),
    }).send(res);
  }
}

module.exports = new AuthControllers();
