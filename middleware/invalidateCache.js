const { clearCache } = require('./cache')

const invalidateCache = (req, res, next) => {
  res.on('finish', () => {
    // only clear if the write actually worked
    if (res.statusCode >= 200 && res.statusCode < 300) {
      clearCache()
    }
  })
  next()
}

module.exports = invalidateCache
