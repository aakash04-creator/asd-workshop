const cache = new Map()
const TTL = 60 * 1000 // 1 min

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl
  const hit = cache.get(key)

  if (hit) {
    const age = Date.now() - hit.createdAt
    if (age < TTL) {
      res.setHeader('X-Cache', 'HIT')
      return res.json(hit.data)
    }
    // expired, drop it
    cache.delete(key)
  }

  res.setHeader('X-Cache', 'MISS')

  // intercept res.json to store the response
  const originalJson = res.json.bind(res)
  res.json = (body) => {
    if (res.statusCode === 200) {
      cache.set(key, { data: body, createdAt: Date.now() })
    }
    return originalJson(body)
  }

  next()
}

const clearCache = () => cache.clear()

module.exports = { cacheMiddleware, clearCache }
