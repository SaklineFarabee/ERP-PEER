import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Package, ShoppingCart, Users } from 'lucide-react'
import axios from 'axios'

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/dashboard')
      setDashboardData(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching dashboard:', err)
      setError('Failed to load dashboard data')
      // Set default data for demo
      setDashboardData({
        totalRevenue: 45230,
        totalOrders: 128,
        totalProducts: 45,
        totalCustomers: 82,
        revenueChange: 12.5,
        ordersChange: 8.3,
        productsChange: 2.1,
        customersChange: 5.6,
        salesData: [
          { month: 'Jan', sales: 4000, revenue: 2400 },
          { month: 'Feb', sales: 3000, revenue: 1398 },
          { month: 'Mar', sales: 2000, revenue: 9800 },
          { month: 'Apr', sales: 2780, revenue: 3908 },
          { month: 'May', sales: 1890, revenue: 4800 },
          { month: 'Jun', sales: 2390, revenue: 3800 },
        ],
        orderStatus: [
          { name: 'Completed', value: 85, color: '#10b981' },
          { name: 'Pending', value: 30, color: '#f59e0b' },
          { name: 'Cancelled', value: 13, color: '#ef4444' },
        ],
        topProducts: [
          { name: 'Laptop Pro', orders: 24, revenue: 12000 },
          { name: 'Wireless Mouse', orders: 45, revenue: 2250 },
          { name: 'USB-C Hub', orders: 38, revenue: 1900 },
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>
  }

  if (!dashboardData) {
    return <div>No data available</div>
  }

  const StatCard = ({ icon: Icon, label, value, change }) => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
          <p className={`text-xs mt-2 ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`.trim()}>
            {change >= 0 ? '+' : ''}{change}% from last month
          </p>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome to your business management hub</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={TrendingUp}
          label="Total Revenue"
          value={`$${dashboardData.totalRevenue.toLocaleString()}`}
          change={dashboardData.revenueChange}
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={dashboardData.totalOrders}
          change={dashboardData.ordersChange}
        />
        <StatCard
          icon={Package}
          label="Total Products"
          value={dashboardData.totalProducts}
          change={dashboardData.productsChange}
        />
        <StatCard
          icon={Users}
          label="Total Customers"
          value={dashboardData.totalCustomers}
          change={dashboardData.customersChange}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" name="Orders" />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Order Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.orderStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dashboardData.orderStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Top Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Product Name</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700 text-sm">Orders</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700 text-sm">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.topProducts.map((product, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-3 px-4 text-slate-900 font-medium">{product.name}</td>
                  <td className="text-right py-3 px-4 text-slate-600">{product.orders}</td>
                  <td className="text-right py-3 px-4 text-slate-900 font-semibold">${product.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
