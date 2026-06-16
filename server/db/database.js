import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'erp.db')

let db = null

export const initDatabase = () => {
  db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sku TEXT UNIQUE NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      address TEXT,
      city TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderNumber TEXT UNIQUE NOT NULL,
      customerName TEXT NOT NULL,
      orderDate DATE NOT NULL,
      status TEXT DEFAULT 'pending',
      totalAmount REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );
  `)

  // Check if data exists, if not insert sample data
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count
  if (productCount === 0) {
    insertSampleData()
  }

  console.log('✅ Database initialized at:', dbPath)
  return db
}

const insertSampleData = () => {
  // Sample Products
  const products = [
    { name: 'Laptop Pro', sku: 'LP-001', price: 1299.99, quantity: 12, description: 'High-performance laptop for professionals' },
    { name: 'Wireless Mouse', sku: 'WM-002', price: 49.99, quantity: 145, description: 'Ergonomic wireless mouse with long battery life' },
    { name: 'USB-C Hub', sku: 'UH-003', price: 79.99, quantity: 87, description: '7-in-1 USB-C hub with multiple ports' },
    { name: 'Mechanical Keyboard', sku: 'MK-004', price: 149.99, quantity: 34, description: 'RGB mechanical keyboard with custom switches' },
    { name: '4K Monitor', sku: 'MN-005', price: 399.99, quantity: 18, description: '32" 4K IPS display with HDR support' },
  ]

  const insertProduct = db.prepare(
    'INSERT INTO products (name, sku, price, quantity, description) VALUES (?, ?, ?, ?, ?)'
  )

  products.forEach(p => {
    insertProduct.run(p.name, p.sku, p.price, p.quantity, p.description)
  })

  // Sample Customers
  const customers = [
    { name: 'John Doe', email: 'john@example.com', phone: '555-0101', address: '123 Main St', city: 'New York' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', address: '456 Oak Ave', city: 'Los Angeles' },
    { name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0103', address: '789 Pine Rd', city: 'Chicago' },
    { name: 'Alice Brown', email: 'alice@example.com', phone: '555-0104', address: '321 Elm St', city: 'Houston' },
    { name: 'Charlie Wilson', email: 'charlie@example.com', phone: '555-0105', address: '654 Maple Dr', city: 'Phoenix' },
    { name: 'Diana Davis', email: 'diana@example.com', phone: '555-0106', address: '987 Birch Ln', city: 'Philadelphia' },
    { name: 'Edward Miller', email: 'edward@example.com', phone: '555-0107', address: '147 Cedar Way', city: 'San Antonio' },
    { name: 'Fiona Taylor', email: 'fiona@example.com', phone: '555-0108', address: '258 Spruce St', city: 'San Diego' },
    { name: 'George Anderson', email: 'george@example.com', phone: '555-0109', address: '369 Ash Ave', city: 'Dallas' },
    { name: 'Helen Thomas', email: 'helen@example.com', phone: '555-0110', address: '741 Walnut Dr', city: 'San Jose' },
  ]

  const insertCustomer = db.prepare(
    'INSERT INTO customers (name, email, phone, address, city) VALUES (?, ?, ?, ?, ?)'
  )

  customers.forEach(c => {
    insertCustomer.run(c.name, c.email, c.phone, c.address, c.city)
  })

  // Sample Orders
  const orders = [
    { orderNumber: 'ORD-001', customerName: 'John Doe', orderDate: '2026-06-10', status: 'completed', totalAmount: 1349.98 },
    { orderNumber: 'ORD-002', customerName: 'Jane Smith', orderDate: '2026-06-12', status: 'pending', totalAmount: 249.98 },
    { orderNumber: 'ORD-003', customerName: 'Bob Johnson', orderDate: '2026-06-14', status: 'completed', totalAmount: 79.99 },
    { orderNumber: 'ORD-004', customerName: 'Alice Brown', orderDate: '2026-06-15', status: 'pending', totalAmount: 399.99 },
    { orderNumber: 'ORD-005', customerName: 'Charlie Wilson', orderDate: '2026-06-16', status: 'processing', totalAmount: 529.98 },
    { orderNumber: 'ORD-006', customerName: 'Diana Davis', orderDate: '2026-06-13', status: 'completed', totalAmount: 1449.97 },
    { orderNumber: 'ORD-007', customerName: 'Edward Miller', orderDate: '2026-06-14', status: 'completed', totalAmount: 199.96 },
    { orderNumber: 'ORD-008', customerName: 'Fiona Taylor', orderDate: '2026-06-15', status: 'processing', totalAmount: 799.98 },
    { orderNumber: 'ORD-009', customerName: 'George Anderson', orderDate: '2026-06-11', status: 'completed', totalAmount: 1499.98 },
    { orderNumber: 'ORD-010', customerName: 'Helen Thomas', orderDate: '2026-06-16', status: 'pending', totalAmount: 349.99 },
    { orderNumber: 'ORD-011', customerName: 'John Doe', orderDate: '2026-06-16', status: 'pending', totalAmount: 99.98 },
    { orderNumber: 'ORD-012', customerName: 'Jane Smith', orderDate: '2026-06-15', status: 'completed', totalAmount: 599.97 },
    { orderNumber: 'ORD-013', customerName: 'Bob Johnson', orderDate: '2026-06-14', status: 'completed', totalAmount: 1299.99 },
    { orderNumber: 'ORD-014', customerName: 'Alice Brown', orderDate: '2026-06-13', status: 'completed', totalAmount: 449.97 },
    { orderNumber: 'ORD-015', customerName: 'Charlie Wilson', orderDate: '2026-06-12', status: 'completed', totalAmount: 229.98 },
  ]

  const insertOrder = db.prepare(
    'INSERT INTO orders (orderNumber, customerName, orderDate, status, totalAmount) VALUES (?, ?, ?, ?, ?)'
  )

  orders.forEach(o => {
    insertOrder.run(o.orderNumber, o.customerName, o.orderDate, o.status, o.totalAmount)
  })

  console.log('✅ Sample data inserted')
}

export const getDatabase = () => db
