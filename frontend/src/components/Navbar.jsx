"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import SignInModal from "./auth/SignInModal"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()
  const { getCartItemsCount } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">VStore</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200">
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>

              {/* User Authentication */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    <User className="h-6 w-6" />
                  </button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm text-gray-600 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setIsSignInOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200"
              >
                <div className="py-4 space-y-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="px-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </form>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2 px-4">
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      to="/products"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
                    >
                      Products
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Sign In Modal */}
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </>
  )
}

export default Navbar
