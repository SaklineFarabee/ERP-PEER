import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import axios from 'axios'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', sku: '', price: '', quantity: '', description: '' })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/products')
      setProducts(response.data)
    } catch (err) {
      console.error('Error fetching products:', err)
      // Set sample data
      setProducts([
        { id: 1, name: 'Laptop Pro', sku: 'LP-001', price: 1299.99, quantity: 12, description: 'High-performance laptop' },
        { id: 2, name: 'Wireless Mouse', sku: 'WM-002', price: 49.99, quantity: 145, description: 'Ergonomic wireless mouse' },
        { id: 3, name: 'USB-C Hub', sku: 'UH-003', price: 79.99, quantity: 87, description: '7-in-1 USB-C hub' },
        { id: 4, name: 'Mechanical Keyboard', sku: 'MK-004', price: 149.99, quantity: 34, description: 'RGB mechanical keyboard' },
        { id: 5, name: '4K Monitor', sku: 'MN-005', price: 399.99, quantity: 18, description: '32" 4K display' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, formData)
      } else {
        await axios.post('/api/products', formData)
      }
      fetchProducts()
      setFormData({ name: '', sku: '', price: '', quantity: '', description: '' })
      setShowForm(false)
      setEditingId(null)
    } catch (err) {
      console.error('Error saving product:', err)
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`)
      fetchProducts()
    } catch (err) {
      console.error('Error deleting product:', err)
    }
  }

  const handleEditProduct = (product) => {
    setFormData(product)
    setEditingId(product.id)
    setShowForm(true)
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-2">Manage your product inventory</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null)
            setFormData({ name: '', sku: '', price: '', quantity: '', description: '' })
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-1 md:col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="col-span-1 md:col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 h-24"
            />
            <div className="col-span-1 md:col-span-2 flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                {editingId ? 'Update Product' : 'Add Product'}
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

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-slate-700 text-sm">Product Name</th>
                <th className="text-left py-3 px-6 font-semibold text-slate-700 text-sm">SKU</th>
                <th className="text-right py-3 px-6 font-semibold text-slate-700 text-sm">Price</th>
                <th className="text-right py-3 px-6 font-semibold text-slate-700 text-sm">Quantity</th>
                <th className="text-center py-3 px-6 font-semibold text-slate-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-6 text-slate-900 font-medium">{product.name}</td>
                  <td className="py-4 px-6 text-slate-600">{product.sku}</td>
                  <td className="text-right py-4 px-6 text-slate-900 font-semibold">${product.price.toFixed(2)}</td>
                  <td className="text-right py-4 px-6 text-slate-600">{product.quantity}</td>
                  <td className="py-4 px-6 text-center flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
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

export default Products
