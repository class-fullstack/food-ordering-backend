const { NotFoundResponse } = require("../cors/errorResponse.cors");

const notFoundHandlerUtils = (_, __, next) => {
  const error = new NotFoundResponse();
  next(error);
};

const errorHandlerUtils = (error, __, res, ____) => {
  const statusCode = error.status;
  const errorCode = error.code;
  const errorMessage = error.message;
  const errorTime = error.timestamp || new Date().getTime();

  const response = {
    status: statusCode,
    code: errorCode,
    message: errorMessage,
    timestamp: errorTime,
  };

  response.stack = error.stack;

  return res.status(statusCode).json(response);
};

module.exports = {
  errorHandlerUtils,
  notFoundHandlerUtils,
};
