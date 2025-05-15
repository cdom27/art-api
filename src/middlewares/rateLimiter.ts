import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  message: {
    error: 'Too many request, please try again later or refer to the docs.',
  },
  statusCode: 429,
});
