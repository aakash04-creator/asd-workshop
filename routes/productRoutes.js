const express = require('express')
const router = express.Router()
const controller = require('../controllers/productController')
const { cacheMiddleware } = require('../middleware/cache')
const invalidateCache = require('../middleware/invalidateCache')

router.get('/', cacheMiddleware, controller.getAll)
router.get('/:id', cacheMiddleware, controller.getById)

router.post('/', invalidateCache, controller.create)
router.put('/:id', invalidateCache, controller.update)
router.patch('/:id', invalidateCache, controller.patch)
router.delete('/:id', invalidateCache, controller.remove)

module.exports = router
