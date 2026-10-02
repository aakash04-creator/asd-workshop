// Middleware to invalidate all cache entries when a write request (POST, PUT, PATCH, DELETE) succeeds with a 2xx status.
const { clearCache } = require('./cache');

const invalidateCache = (req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      clearCache();
    }
  });
  next();
};

module.exports = invalidateCache;
