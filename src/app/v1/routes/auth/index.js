const express = require("express");
const asyncHandlerUtils = require("../../../../utils/asyncHandler.utils");
const authControllers = require("../../controllers/auth.controllers");

const router = express.Router();

//* Method: POST
router.post("/register/user", asyncHandlerUtils(authControllers.registerUser));

module.exports = router;
