import { Menu, LogOut } from 'lucide-react'

function Header({ onToggleSidebar }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg transition"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">ERP-PEER</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">Welcome!</p>
          <p className="text-xs text-slate-500">Business Manager</p>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition">
          <LogOut className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </header>
  )
}

export default Header
