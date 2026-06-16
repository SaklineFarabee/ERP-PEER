import express from 'express'
import { getDatabase } from '../db/database.js'

const router = express.Router()

// Get all products
router.get('/', (req, res) => {
  try {
    const db = getDatabase()
    const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single product
router.get('/:id', (req, res) => {
  try {
    const db = getDatabase()
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create product
router.post('/', (req, res) => {
  try {
    const { name, sku, price, quantity, description } = req.body
    const db = getDatabase()
    const result = db.prepare(
      'INSERT INTO products (name, sku, price, quantity, description) VALUES (?, ?, ?, ?, ?)'
    ).run(name, sku, price, quantity, description)
    
    res.status(201).json({ id: result.lastInsertRowid, name, sku, price, quantity, description })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update product
router.put('/:id', (req, res) => {
  try {
    const { name, sku, price, quantity, description } = req.body
    const db = getDatabase()
    const result = db.prepare(
      'UPDATE products SET name = ?, sku = ?, price = ?, quantity = ?, description = ? WHERE id = ?'
    ).run(name, sku, price, quantity, description, req.params.id)
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json({ id: req.params.id, name, sku, price, quantity, description })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete product
router.delete('/:id', (req, res) => {
  try {
    const db = getDatabase()
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id)
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
