// In-memory cache middleware for GET routes with a 1-minute TTL.
const cache = new Map();
const TTL = 60 * 1000; // 60 seconds (1 minute)

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const entry = cache.get(key);
  const now = Date.now();

  if (entry) {
    if (now - entry.createdAt < TTL) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(entry.data);
    }
    // Expired entry - remove from cache
    cache.delete(key);
  }

  // Cache MISS
  res.setHeader('X-Cache', 'MISS');

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    // Only cache successful (200) responses
    if (res.statusCode === 200) {
      cache.set(key, {
        data,
        createdAt: Date.now()
      });
    }
    return originalJson(data);
  };

  next();
};

const clearCache = () => {
  cache.clear();
};

module.exports = {
  cacheMiddleware,
  clearCache
};
