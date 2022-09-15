const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15 minutes
  max: 1000000, // you can make a maximum of 1000 requests from one IP
});

module.exports = {
  limiter,
};
