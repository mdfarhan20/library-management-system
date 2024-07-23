const {constants} = require("../constant");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
      case constants.NOT_FOUND:
          res.json({ title: "Not Found", msg: err.message, stackTrace: err.stack });
          break;
      case constants.VALIDATION_ERROR:
          res.json({ title: "Validation Error", msg: err.message, stackTrace: err.stack });
          break;
      case constants.UNAUTHORIZED:
          res.json({ title: "Unauthorized", msg: err.message, stackTrace: err.stack });
          break;
      case constants.FORBIDDEN:
          res.json({ title: "Forbidden", msg: err.message, stackTrace: err.stack });
          break;
      case constants.SERVER_ERROR:
          res.json({ title: "Server Error", msg: err.message, stackTrace: err.stack });
          break;
      case constants.BAD_REQUEST:
          res.json({ title: "Bad Request", msg: err.message, stackTrace: err.stack });
          break;
      default:
          res.json({ title: "Error", msg: err.message, stackTrace: err.stack })
  }
}

module.exports = errorHandler;