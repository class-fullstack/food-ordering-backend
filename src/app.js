const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const {
  errorHandlerUtils,
  notFoundHandlerUtils,
} = require("./utils/errorHandler.utils");

const app = express();

//* Use Libraries
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

//* Group Versions
const apiRouter = express.Router();

//* V1
const v1Router = require("./app/v1/routes");

apiRouter.use("/v1", v1Router);

//* Use API Router
app.use("/api", apiRouter);

//* Error Handlers
app.use(notFoundHandlerUtils);
app.use(errorHandlerUtils);

module.exports = app;
