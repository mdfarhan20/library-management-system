exports.constants = {
  NOT_FOUND: 404,
  VALIDATION_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
}

exports.CACHE_EXPIRATION = 3600

exports.HOST_URL = process.env.HOST_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;