const express = require("express");
const devicesMiddlewares = require("../../../middlewares/devices.middlewares");

const router = express.Router();

router.get("/", (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  return res.status(200).json(healthCheck);
});

router.use(devicesMiddlewares.attachDeviceContext);

router.use("/owner", require("./owner"));

//* Auth Routes
router.use("/auth", require("./auth"));

module.exports = router;
