// Product router mapping endpoints to cache/invalidation middlewares and controllers.
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { cacheMiddleware } = require('../middleware/cache');
const invalidateCache = require('../middleware/invalidateCache');

// GET routes with caching middleware
router.get('/', cacheMiddleware, productController.getAll);
router.get('/:id', cacheMiddleware, productController.getById);

// Write routes with cache invalidation middleware
router.post('/', invalidateCache, productController.create);
router.put('/:id', invalidateCache, productController.update);
router.patch('/:id', invalidateCache, productController.patch);
router.delete('/:id', invalidateCache, productController.remove);

module.exports = router;
