
const requestLogger = (req, res, next) => {
  const method = req.method;
  const path = req.originalUrl;
  const time = (new Date()).toLocaleString();

  console.log(` ${method} ${path} - [${time}]`);
  next();
}

module.exports = requestLogger;