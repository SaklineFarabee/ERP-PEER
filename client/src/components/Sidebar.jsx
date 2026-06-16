import { LayoutDashboard, Package, ShoppingCart, Users, Zap, X } from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'ai-helper', label: 'AI Helper', icon: Zap },
]

function Sidebar({ currentPage, onNavigate, isOpen }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      )}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white shadow-lg z-40 transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6" />
            ERP-PEER
          </h2>
          <p className="text-xs text-slate-400 mt-2">Business Management</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`.trim()}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-xs text-slate-300 mb-2">Database Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">Connected</span>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div className="hidden lg:block lg:w-64" />
      )}
    </>
  )
}

export default Sidebar
