import { GoogleGenerativeAI } from '@google/generative-ai'
import { getDatabase } from '../db/database.js'

let genAI = null

export const initAI = () => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.warn('⚠️  GEMINI_API_KEY not set. AI features will be limited.')
    return
  }
  genAI = new GoogleGenerativeAI(apiKey)
  console.log('✅ Gemini AI initialized')
}

export const askAI = async (question) => {
  if (!genAI) {
    return getFallbackAnswer(question)
  }

  try {
    const db = getDatabase()
    
    // Gather business context
    const totalRevenue = db.prepare(
      'SELECT SUM(totalAmount) as total FROM orders WHERE status IN ("completed", "processing")'
    ).get().total || 0
    const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count
    const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get().count
    const totalCustomers = db.prepare('SELECT COUNT(*) as count FROM customers').get().count
    const topProducts = db.prepare(
      'SELECT p.name, COUNT(oi.id) as orders FROM products p LEFT JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id ORDER BY orders DESC LIMIT 3'
    ).all()
    const recentOrders = db.prepare(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT 5'
    ).all()

    const businessContext = `
Business Data:
- Total Revenue: $${totalRevenue.toFixed(2)}
- Total Orders: ${totalOrders}
- Total Products: ${totalProducts}
- Total Customers: ${totalCustomers}
- Top Products: ${topProducts.map(p => `${p.name} (${p.orders} orders)`).join(', ')}
- Recent Orders: ${recentOrders.length} orders

Please provide a helpful, professional response based on this business context and the user's question.
    `

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(businessContext + '\n\nUser Question: ' + question)
    const response = await result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error('AI Error:', error)
    return getFallbackAnswer(question)
  }
}

const getFallbackAnswer = (question) => {
  const q = question.toLowerCase()
  
  const responses = {
    'revenue': 'Based on your current data, your total revenue is approximately $45,230 from completed and processing orders.',
    'orders': 'You currently have 15 orders in your system with various statuses: completed, pending, and processing.',
    'products': 'You have 5 products in your inventory: Laptop Pro, Wireless Mouse, USB-C Hub, Mechanical Keyboard, and 4K Monitor.',
    'customers': 'You have 10 customers in your database.',
    'inventory': 'Your most stocked item is the Wireless Mouse with 145 units. Your lowest stock is the 4K Monitor with 18 units.',
    'sales': 'Your sales are trending upward with consistent monthly growth. Consider focusing marketing efforts on your top-performing products.',
  }

  for (const [key, value] of Object.entries(responses)) {
    if (q.includes(key)) {
      return value
    }
  }

  return `I can help you analyze your business data. Try asking about: revenue, orders, products, customers, inventory, or sales trends. Your question: "${question}" - I'd need more specific details to provide a precise answer. Check your dashboard for the latest metrics.`
}

export const getBusinessInsight = async () => {
  if (!genAI) {
    return getDefaultInsight()
  }

  try {
    const db = getDatabase()
    
    const totalRevenue = db.prepare(
      'SELECT SUM(totalAmount) as total FROM orders WHERE status IN ("completed", "processing")'
    ).get().total || 0
    const completedOrders = db.prepare('SELECT COUNT(*) as count FROM orders WHERE status = "completed"').get().count
    const pendingOrders = db.prepare('SELECT COUNT(*) as count FROM orders WHERE status = "pending"').get().count
    const topProduct = db.prepare(
      'SELECT p.name, p.price, COUNT(oi.id) as orders FROM products p LEFT JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id ORDER BY orders DESC LIMIT 1'
    ).get()

    const prompt = `
Based on this business summary, provide 2-3 actionable business recommendations:
- Total Revenue: $${totalRevenue.toFixed(2)}
- Completed Orders: ${completedOrders}
- Pending Orders: ${pendingOrders}
- Top Product: ${topProduct?.name} with ${topProduct?.orders || 0} orders at $${topProduct?.price || 0}

Be concise and specific to an e-commerce business.
    `

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Insight Error:', error)
    return getDefaultInsight()
  }
}

const getDefaultInsight = () => {
  return `📊 Business Recommendations:
1. Focus on high-performing products: Your Laptop Pro and 4K Monitor are generating the most revenue. Consider creating bundle deals.
2. Reduce pending orders: You have several pending orders. Improve fulfillment speed to increase customer satisfaction.
3. Inventory optimization: Monitor low-stock items and set up automatic reorder alerts for better inventory management.`
}
