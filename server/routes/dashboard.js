import express from 'express'
import { getDatabase } from '../db/database.js'

const router = express.Router()

// Get dashboard metrics
router.get('/', (req, res) => {
  try {
    const db = getDatabase()
    
    // Calculate metrics
    const totalRevenue = db.prepare(
      'SELECT SUM(totalAmount) as total FROM orders WHERE status IN ("completed", "processing")'
    ).get().total || 0
    
    const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count
    const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get().count
    const totalCustomers = db.prepare('SELECT COUNT(*) as count FROM customers').get().count
    
    // Calculate changes (mock data - in real app, compare with previous period)
    const revenueChange = 12.5
    const ordersChange = 8.3
    const productsChange = 2.1
    const customersChange = 5.6
    
    // Sales data for charts (mock)
    const salesData = [
      { month: 'Jan', sales: 4000, revenue: 2400 },
      { month: 'Feb', sales: 3000, revenue: 1398 },
      { month: 'Mar', sales: 2000, revenue: 9800 },
      { month: 'Apr', sales: 2780, revenue: 3908 },
      { month: 'May', sales: 1890, revenue: 4800 },
      { month: 'Jun', sales: 2390, revenue: 3800 },
    ]
    
    // Order status breakdown
    const orderStatus = [
      { name: 'Completed', value: db.prepare('SELECT COUNT(*) as count FROM orders WHERE status = "completed"').get().count, color: '#10b981' },
      { name: 'Pending', value: db.prepare('SELECT COUNT(*) as count FROM orders WHERE status = "pending"').get().count, color: '#f59e0b' },
      { name: 'Cancelled', value: db.prepare('SELECT COUNT(*) as count FROM orders WHERE status = "cancelled"').get().count, color: '#ef4444' },
    ]
    
    // Top products by orders
    const topProducts = [
      { name: 'Laptop Pro', orders: 24, revenue: 31199.76 },
      { name: 'Wireless Mouse', orders: 45, revenue: 2249.55 },
      { name: 'USB-C Hub', orders: 38, revenue: 3039.62 },
    ]
    
    res.json({
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalOrders,
      totalProducts,
      totalCustomers,
      revenueChange,
      ordersChange,
      productsChange,
      customersChange,
      salesData,
      orderStatus,
      topProducts,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
