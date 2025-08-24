"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Menu, X, Bell, Search } from "lucide-react"

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if admin is authenticated
    const adminToken = localStorage.getItem("adminToken")
    if (!adminToken) {
      navigate("/admin")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin")
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="relative">
        {/* Mobile sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">V</span>
                    </div>
                    <span className="font-heading font-bold text-xl text-gray-900">VStore Admin</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="h-6 w-6 text-gray-400" />
                  </button>
                </div>

                <nav className="flex-1 px-3 py-6 overflow-y-auto">
                  <div className="space-y-1">
                    {navigation.map((item) => {
                      const isActive = location.pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                            isActive
                              ? "bg-orange-50 text-orange-600 border-r-2 border-orange-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon
                            className={`mr-3 h-5 w-5 ${isActive ? "text-orange-600" : "text-gray-400 group-hover:text-gray-500"}`}
                          />
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="group flex items-center w-full px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                      Sign Out
                    </button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white shadow-xl">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">VStore Admin</span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-6 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-orange-50 text-orange-600 border-r-2 border-orange-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${isActive ? "text-orange-600" : "text-gray-400 group-hover:text-gray-500"}`}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="group flex items-center w-full px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Mobile search button */}
              <button className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 relative rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 lg:p-6 max-w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
