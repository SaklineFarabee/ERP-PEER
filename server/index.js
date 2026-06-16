import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initDatabase } from './db/database.js'
import { initAI } from './routes/ai.js'
import productsRouter from './routes/products.js'
import customersRouter from './routes/customers.js'
import ordersRouter from './routes/orders.js'
import dashboardRouter from './routes/dashboard.js'
import aiRouter from './routes/aiRouter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize database and AI
initDatabase()
initAI()

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ERP-PEER Server is running' })
})

// API Routes
app.use('/api/products', productsRouter)
app.use('/api/customers', customersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/ai', aiRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!', message: err.message })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`)
  console.log('🚀 ERP-PEER Server')
  console.log(`${'='.repeat(50)}`)
  console.log(`✅ Server running at http://localhost:${PORT}`)
  console.log(`✅ Client should be running at http://localhost:5173`)
  console.log(`\n📝 API Endpoints:`)
  console.log('  GET  /health           - Health check')
  console.log('  GET  /api/dashboard    - Dashboard metrics')
  console.log('  GET  /api/products     - List products')
  console.log('  GET  /api/customers    - List customers')
  console.log('  GET  /api/orders       - List orders')
  console.log('  POST /api/ai/ask       - Ask AI question')
  console.log(`${'='.repeat(50)}\n`)
})
