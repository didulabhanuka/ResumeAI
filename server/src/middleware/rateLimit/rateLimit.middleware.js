const rateLimit = require('express-rate-limit');

// General API rate limiter — applied to all /api routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // max 100 requests per window per IP
  standardHeaders: true,     // return rate limit info in RateLimit-* headers
  legacyHeaders: false,      // disable X-RateLimit-* headers
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.',
  },
});

// Stricter limiter for auth routes — prevents brute force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // max 10 login/register attempts per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many auth attempts, please try again in 15 minutes.',
  },
});

module.exports = { apiLimiter, authLimiter };