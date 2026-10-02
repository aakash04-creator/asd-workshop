// Controller handling HTTP requests, input validation, and HTTP status codes.
const productService = require('../services/productService');

// Handle GET /products
const getAll = (req, res) => {
  const products = productService.getAllProducts();
  return res.json(products);
};

// Handle GET /products/:id
const getById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const product = productService.getProductById(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(product);
};

// Handle POST /products
const create = (req, res) => {
  const { name, price } = req.body || {};

  if (typeof name !== 'string' || name.trim() === '' || typeof price !== 'number' || isNaN(price)) {
    return res.status(400).json({ error: 'Validation failed: name (string) and price (number) are required' });
  }

  const newProduct = productService.createProduct({ name: name.trim(), price });
  return res.status(201).json(newProduct);
};

// Handle PUT /products/:id
const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, price } = req.body || {};
  if (typeof name !== 'string' || name.trim() === '' || typeof price !== 'number' || isNaN(price)) {
    return res.status(400).json({ error: 'Validation failed: name (string) and price (number) are required' });
  }

  const updatedProduct = productService.updateProduct(id, { name: name.trim(), price });
  if (!updatedProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(updatedProduct);
};

// Handle PATCH /products/:id
const patch = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, price } = req.body || {};

  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    return res.status(400).json({ error: 'Validation failed: name must be a valid string' });
  }

  if (price !== undefined && (typeof price !== 'number' || isNaN(price))) {
    return res.status(400).json({ error: 'Validation failed: price must be a valid number' });
  }

  const patchedData = {};
  if (name !== undefined) patchedData.name = name.trim();
  if (price !== undefined) patchedData.price = price;

  const patchedProduct = productService.patchProduct(id, patchedData);
  if (!patchedProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(patchedProduct);
};

// Handle DELETE /products/:id
const remove = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deleted = productService.deleteProduct(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  patch,
  remove
};
