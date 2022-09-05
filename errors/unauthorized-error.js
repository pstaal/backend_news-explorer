// errors/unauthorized-error.js

const { AUTHORIZATION_ERROR_CODE } = require('../utils/errors');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTHORIZATION_ERROR_CODE;
  }
}

module.exports = UnauthorizedError;
