// Service layer containing business logic for product operations.
const products = require('../database/db');

// Retrieve all products
const getAllProducts = () => {
  return products;
};

// Retrieve a single product by ID
const getProductById = (id) => {
  return products.find((p) => p.id === id) || null;
};

// Create a new product with auto-generated ID
const createProduct = (data) => {
  const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
  const newProduct = {
    id: maxId + 1,
    name: data.name,
    price: data.price
  };
  products.push(newProduct);
  return newProduct;
};

// Full replacement of product data
const updateProduct = (id, data) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedProduct = {
    id,
    name: data.name,
    price: data.price
  };
  products[index] = updatedProduct;
  return updatedProduct;
};

// Partial update of product data
const patchProduct = (id, data) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = products[index];
  const updatedProduct = {
    id,
    name: data.name !== undefined ? data.name : existing.name,
    price: data.price !== undefined ? data.price : existing.price
  };
  products[index] = updatedProduct;
  return updatedProduct;
};

// Delete product by ID
const deleteProduct = (id) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;

  products.splice(index, 1);
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};
