// middleware/auth.js
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization Required'));
  }

  const token = authorization.replace('Bearer ', '');

  console.log(token);
  console.log(NODE_ENV);
  console.log(JWT_SECRET);

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Authorization Required'));
  }

  req.user = payload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};
