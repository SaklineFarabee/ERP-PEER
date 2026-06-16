import express from 'express'
import { getDatabase } from '../db/database.js'

const router = express.Router()

// Get all customers
router.get('/', (req, res) => {
  try {
    const db = getDatabase()
    const customers = db.prepare('SELECT * FROM customers ORDER BY created_at DESC').all()
    res.json(customers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single customer
router.get('/:id', (req, res) => {
  try {
    const db = getDatabase()
    const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id)
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    res.json(customer)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create customer
router.post('/', (req, res) => {
  try {
    const { name, email, phone, address, city } = req.body
    const db = getDatabase()
    const result = db.prepare(
      'INSERT INTO customers (name, email, phone, address, city) VALUES (?, ?, ?, ?, ?)'
    ).run(name, email, phone, address, city)
    
    res.status(201).json({ id: result.lastInsertRowid, name, email, phone, address, city })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update customer
router.put('/:id', (req, res) => {
  try {
    const { name, email, phone, address, city } = req.body
    const db = getDatabase()
    const result = db.prepare(
      'UPDATE customers SET name = ?, email = ?, phone = ?, address = ?, city = ? WHERE id = ?'
    ).run(name, email, phone, address, city, req.params.id)
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    
    res.json({ id: req.params.id, name, email, phone, address, city })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete customer
router.delete('/:id', (req, res) => {
  try {
    const db = getDatabase()
    const result = db.prepare('DELETE FROM customers WHERE id = ?').run(req.params.id)
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    
    res.json({ message: 'Customer deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
