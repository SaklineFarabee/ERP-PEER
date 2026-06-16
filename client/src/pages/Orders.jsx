import { useState, useEffect } from 'react'
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react'
import axios from 'axios'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    customerName: '',
    orderDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    totalAmount: '',
    items: []
  })

  useEffect(() => {
    fetchOrders()
    fetchCustomers()
    fetchProducts()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/orders')
      setOrders(response.data)
    } catch (err) {
      console.error('Error fetching orders:', err)
      setOrders([
        { id: 1, orderNumber: 'ORD-001', customerName: 'John Doe', orderDate: '2026-06-10', status: 'completed', totalAmount: 1349.98 },
        { id: 2, orderNumber: 'ORD-002', customerName: 'Jane Smith', orderDate: '2026-06-12', status: 'pending', totalAmount: 249.98 },
        { id: 3, orderNumber: 'ORD-003', customerName: 'Bob Johnson', orderDate: '2026-06-14', status: 'completed', totalAmount: 79.99 },
        { id: 4, orderNumber: 'ORD-004', customerName: 'Alice Brown', orderDate: '2026-06-15', status: 'pending', totalAmount: 399.99 },
        { id: 5, orderNumber: 'ORD-005', customerName: 'Charlie Wilson', orderDate: '2026-06-16', status: 'processing', totalAmount: 529.98 },
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers')
      setCustomers(response.data)
    } catch (err) {
      console.error('Error fetching customers:', err)
      setCustomers([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' },
      ])
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products')
      setProducts(response.data)
    } catch (err) {
      console.error('Error fetching products:', err)
    }
  }

  const handleAddOrder = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/orders', formData)
      fetchOrders()
      setFormData({ customerName: '', orderDate: new Date().toISOString().split('T')[0], status: 'pending', totalAmount: '', items: [] })
      setShowForm(false)
    } catch (err) {
      console.error('Error creating order:', err)
    }
  }

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`)
      fetchOrders()
    } catch (err) {
      console.error('Error deleting order:', err)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return badges[status] || badges.pending
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
          <p className="text-slate-600 mt-2">Manage customer orders</p>
        </div>
        <button
          onClick={() => {
            setFormData({ customerName: '', orderDate: new Date().toISOString().split('T')[0], status: 'pending', totalAmount: '', items: [] })
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          <Plus className="w-5 h-5" />
          New Order
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Create New Order</h2>
          <form onSubmit={handleAddOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={formData.orderDate}
              onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              type="number"
              placeholder="Total Amount"
              value={formData.totalAmount}
              onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <div className="col-span-1 md:col-span-2 flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Create Order
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-slate-700 text-sm">Order #</th>
                <th className="text-left py-3 px-6 font-semibold text-slate-700 text-sm">Customer</th>
                <th className="text-left py-3 px-6 font-semibold text-slate-700 text-sm">Date</th>
                <th className="text-right py-3 px-6 font-semibold text-slate-700 text-sm">Amount</th>
                <th className="text-left py-3 px-6 font-semibold text-slate-700 text-sm">Status</th>
                <th className="text-center py-3 px-6 font-semibold text-slate-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-6 text-slate-900 font-medium">{order.orderNumber}</td>
                  <td className="py-4 px-6 text-slate-600">{order.customerName}</td>
                  <td className="py-4 px-6 text-slate-600">{order.orderDate}</td>
                  <td className="text-right py-4 px-6 text-slate-900 font-semibold">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center flex items-center justify-center gap-2">
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-orange-100 rounded-lg transition">
                      <Edit2 className="w-4 h-4 text-orange-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders
