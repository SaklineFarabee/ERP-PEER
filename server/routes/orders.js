import express from 'express'
import { getDatabase } from '../db/database.js'

const router = express.Router()

// Get all orders
router.get('/', (req, res) => {
  try {
    const db = getDatabase()
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all()
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single order with items
router.get('/:id', (req, res) => {
  try {
    const db = getDatabase()
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(req.params.id)
    res.json({ ...order, items })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create order
router.post('/', (req, res) => {
  try {
    const { customerName, orderDate, status, totalAmount, items } = req.body
    const db = getDatabase()
    
    // Generate order number
    const lastOrder = db.prepare('SELECT orderNumber FROM orders ORDER BY id DESC LIMIT 1').get()
    const orderNum = lastOrder ? parseInt(lastOrder.orderNumber.split('-')[1]) + 1 : 1
    const orderNumber = `ORD-${String(orderNum).padStart(3, '0')}`
    
    const result = db.prepare(
      'INSERT INTO orders (orderNumber, customerName, orderDate, status, totalAmount) VALUES (?, ?, ?, ?, ?)'
    ).run(orderNumber, customerName, orderDate, status || 'pending', totalAmount)
    
    // Add order items if provided
    if (items && items.length > 0) {
      const insertItem = db.prepare(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)'
      )
      items.forEach(item => {
        insertItem.run(result.lastInsertRowid, item.product_id, item.quantity, item.price)
      })
    }
    
    res.status(201).json({ 
      id: result.lastInsertRowid, 
      orderNumber, 
      customerName, 
      orderDate, 
      status: status || 'pending', 
      totalAmount,
      items: items || []
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update order
router.put('/:id', (req, res) => {
  try {
    const { customerName, orderDate, status, totalAmount } = req.body
    const db = getDatabase()
    const result = db.prepare(
      'UPDATE orders SET customerName = ?, orderDate = ?, status = ?, totalAmount = ? WHERE id = ?'
    ).run(customerName, orderDate, status, totalAmount, req.params.id)
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    res.json({ id: req.params.id, customerName, orderDate, status, totalAmount })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete order
router.delete('/:id', (req, res) => {
  try {
    const db = getDatabase()
    
    // Delete associated items first
    db.prepare('DELETE FROM order_items WHERE order_id = ?').run(req.params.id)
    
    // Delete order
    const result = db.prepare('DELETE FROM orders WHERE id = ?').run(req.params.id)
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    res.json({ message: 'Order deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
