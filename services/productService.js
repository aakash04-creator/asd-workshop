const products = require('../database/db')

function getAll() {
  return products
}

function getById(id) {
  const product = products.find(p => p.id === id)
  return product || null
}

function create(data) {
  const ids = products.map(p => p.id)
  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1

  const product = {
    id: newId,
    name: data.name,
    price: data.price
  }

  products.push(product)
  return product
}

function update(id, data) {
  const idx = products.findIndex(p => p.id === id)
  if (idx === -1) return null

  products[idx] = { id, name: data.name, price: data.price }
  return products[idx]
}

function patch(id, data) {
  const idx = products.findIndex(p => p.id === id)
  if (idx === -1) return null

  const current = products[idx]
  products[idx] = {
    id,
    name: data.name ?? current.name,
    price: data.price ?? current.price
  }

  return products[idx]
}

function remove(id) {
  const idx = products.findIndex(p => p.id === id)
  if (idx === -1) return false

  products.splice(idx, 1)
  return true
}

module.exports = { getAll, getById, create, update, patch, remove }
