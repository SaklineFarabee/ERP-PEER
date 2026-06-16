import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Mail, Phone } from 'lucide-react'
import axios from 'axios'

function Customers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '' })

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/customers')
      setCustomers(response.data)
    } catch (err) {
      console.error('Error fetching customers:', err)
      setCustomers([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0101', address: '123 Main St', city: 'New York' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', address: '456 Oak Ave', city: 'Los Angeles' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0103', address: '789 Pine Rd', city: 'Chicago' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '555-0104', address: '321 Elm St', city: 'Houston' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', phone: '555-0105', address: '654 Maple Dr', city: 'Phoenix' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleAddCustomer = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`/api/customers/${editingId}`, formData)
      } else {
        await axios.post('/api/customers', formData)
      }
      fetchCustomers()
      setFormData({ name: '', email: '', phone: '', address: '', city: '' })
      setShowForm(false)
      setEditingId(null)
    } catch (err) {
      console.error('Error saving customer:', err)
    }
  }

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`/api/customers/${id}`)
      fetchCustomers()
    } catch (err) {
      console.error('Error deleting customer:', err)
    }
  }

  const handleEditCustomer = (customer) => {
    setFormData(customer)
    setEditingId(customer.id)
    setShowForm(true)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-600 mt-2">Manage your customer database</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null)
            setFormData({ name: '', email: '', phone: '', address: '', city: '' })
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">{editingId ? 'Edit Customer' : 'Add New Customer'}</h2>
          <form onSubmit={handleAddCustomer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-1 md:col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="col-span-1 md:col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="col-span-1 md:col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <div className="col-span-1 md:col-span-2 flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                {editingId ? 'Update Customer' : 'Add Customer'}
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

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(customer => (
          <div key={customer.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{customer.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{customer.city}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCustomer(customer)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="w-4 h-4" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4" />
                <span>{customer.phone}</span>
              </div>
              <p className="text-sm text-slate-600 mt-3">{customer.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Customers
