const { Ok, Created } = require("../../../cors/successResponse.cors");
const OwnerServices = require("../services/owner.services");

class OwnerControllers {
  async bootstrapOwner(req, res) {
    new Created({
      metadata: await OwnerServices.bootstrapOwner(req),
    }).send(res);
  }

  async loginOwner(req, res) {
    new Ok({
      metadata: await OwnerServices.loginOwner(req, res),
    }).send(res);
  }

  async logoutOwner(req, res) {
    new Ok({
      metadata: await OwnerServices.logoutOwner(req, res),
    }).send(res);
  }
}

module.exports = new OwnerControllers();
