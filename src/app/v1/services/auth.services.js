const { BadRequestResponse } = require("../../../cors/errorResponse.cors");

class AuthServices {
  //* Owner
  async LoginOwner(ownerData) {
    return { message: "Owner logged in successfully", data: ownerData };
  }

  //* Users
  async registerUser(userData) {
    // if (userData) {
    //   throw new BadRequestResponse();
    // }
    return { message: "User registered successfully", data: userData };
  }
}
module.exports = new AuthServices();
