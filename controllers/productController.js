const service = require('../services/productService')

const getAll = (req, res) => {
  const data = service.getAll()
  res.json(data)
}

const getById = (req, res) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) return res.status(404).json({ message: 'product not found' })

  const product = service.getById(id)
  if (!product) return res.status(404).json({ message: 'product not found' })

  res.json(product)
}

const create = (req, res) => {
  const { name, price } = req.body

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'name is required and must be a string' })
  }
  if (price === undefined || typeof price !== 'number') {
    return res.status(400).json({ message: 'price is required and must be a number' })
  }

  const product = service.create({ name, price })
  res.status(201).json(product)
}

const update = (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) return res.status(404).json({ message: 'product not found' })

  const { name, price } = req.body

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'name is required and must be a string' })
  }
  if (price === undefined || typeof price !== 'number') {
    return res.status(400).json({ message: 'price is required and must be a number' })
  }

  const updated = service.update(id, { name, price })
  if (!updated) return res.status(404).json({ message: 'product not found' })

  res.json(updated)
}

const patch = (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) return res.status(404).json({ message: 'product not found' })

  const result = service.patch(id, req.body)
  if (!result) return res.status(404).json({ message: 'product not found' })

  res.json(result)
}

const remove = (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) return res.status(404).json({ message: 'product not found' })

  const deleted = service.remove(id)
  if (!deleted) return res.status(404).json({ message: 'product not found' })

  res.status(204).send()
}

module.exports = { getAll, getById, create, update, patch, remove }
