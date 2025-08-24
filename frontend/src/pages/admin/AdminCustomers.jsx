"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Search, Filter, Mail, Calendar, ShoppingBag, Eye, MoreVertical } from "lucide-react"
import { toast } from "react-hot-toast"
import { getAdminCustomers } from "../../services/api"

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchCustomers()
  }, [currentPage, searchTerm])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await getAdminCustomers({
        page: currentPage,
        limit: 10,
        search: searchTerm,
      })

      if (response.success) {
        setCustomers(response.data.customers)
        setTotalPages(response.data.pagination.totalPages)
      } else {
        // Mock data for demonstration
        const mockCustomers = [
          {
            _id: "1",
            email: "john.doe@example.com",
            createdAt: "2024-01-15T10:30:00Z",
            lastLogin: "2024-01-20T14:22:00Z",
            orders: ["order1", "order2", "order3"],
            isVerified: true,
          },
          {
            _id: "2",
            email: "jane.smith@example.com",
            createdAt: "2024-01-10T09:15:00Z",
            lastLogin: "2024-01-19T16:45:00Z",
            orders: ["order4", "order5"],
            isVerified: true,
          },
          {
            _id: "3",
            email: "mike.johnson@example.com",
            createdAt: "2024-01-08T11:20:00Z",
            lastLogin: "2024-01-18T12:30:00Z",
            orders: ["order6"],
            isVerified: false,
          },
        ]
        setCustomers(mockCustomers)
        setTotalPages(1)
      }
    } catch (error) {
      console.error("Customers fetch error:", error)
      toast.error("Failed to load customers")
    } finally {
      setLoading(false)
    }
  }

  const getCustomerName = (email) => {
    return email
      .split("@")[0]
      .replace(".", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (isVerified) => {
    return isVerified
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200"
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border-b animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0"
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-600">Manage your customer base and relationships</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search customers by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Orders</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Joined</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Last Login</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <motion.tr
                  key={customer._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-200 group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {getCustomerName(customer.email)
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {getCustomerName(customer.email)}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{customer.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold border ${getStatusColor(
                        customer.isVerified,
                      )}`}
                    >
                      {customer.isVerified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">{customer.orders?.length || 0}</span>
                      <span className="text-sm text-gray-500">orders</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">{formatDate(customer.createdAt)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600 font-medium">
                      {customer.lastLogin ? formatDate(customer.lastLogin) : "Never"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-600 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminCustomers
