"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, Package, Truck, CheckCircle, Clock, ArrowRight, Filter } from "lucide-react"

const RecentOrders = ({ orders = [] }) => {
  const [ordersList, setOrdersList] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (orders && orders.length > 0) {
      const formattedOrders = orders.map((order) => ({
        id: order.orderNumber || order._id,
        customer: order.customerInfo?.name || "Unknown Customer",
        email: order.customerInfo?.email || "",
        total: order.totalAmount,
        status: order.orderStatus,
        date: new Date(order.createdAt).toLocaleDateString(),
        items: order.items?.length || 0,
      }))
      setOrdersList(formattedOrders)
    } else {
      // Mock data for demonstration
      const mockOrders = [
        {
          id: "ORD001",
          customer: "John Doe",
          email: "john@example.com",
          total: 12999,
          status: "pending",
          date: "2024-01-15",
          items: 3,
        },
        {
          id: "ORD002",
          customer: "Jane Smith",
          email: "jane@example.com",
          total: 8950,
          status: "processing",
          date: "2024-01-15",
          items: 2,
        },
        {
          id: "ORD003",
          customer: "Mike Johnson",
          email: "mike@example.com",
          total: 19999,
          status: "shipped",
          date: "2024-01-14",
          items: 1,
        },
        {
          id: "ORD004",
          customer: "Sarah Wilson",
          email: "sarah@example.com",
          total: 4500,
          status: "delivered",
          date: "2024-01-14",
          items: 2,
        },
        {
          id: "ORD005",
          customer: "Tom Brown",
          email: "tom@example.com",
          total: 29999,
          status: "confirmed",
          date: "2024-01-13",
          items: 4,
        },
      ]
      setOrdersList(mockOrders)
    }
    setIsLoading(false)
  }, [orders])

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "confirmed":
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredOrders =
    statusFilter === "all" ? ordersList : ordersList.filter((order) => order.status === statusFilter)

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4">
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
                <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-500">{filteredOrders.length} orders found</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <motion.button
            whileHover={{ x: 2 }}
            className="text-orange-600 hover:text-orange-700 text-sm font-semibold flex items-center space-x-1 px-3 py-2 rounded-xl hover:bg-orange-50 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Order ID</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Customer</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Items</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Total</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Date</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 group"
                >
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {order.id}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700 font-medium">{order.items} items</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-gray-900">₹{order.total.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold border ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-1.5 capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600 font-medium">{order.date}</span>
                  </td>
                  <td className="py-4 px-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-orange-600 hover:text-orange-700 p-2 rounded-xl hover:bg-orange-50 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-900">{order.id}</span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(
                    order.status,
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  <span className="ml-1 capitalize">{order.status}</span>
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Customer:</span>
                  <span className="text-sm font-medium text-gray-900">{order.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Items:</span>
                  <span className="text-sm font-medium text-gray-900">{order.items} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="text-sm font-bold text-gray-900">₹{order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-gray-500">{order.date}</span>
                  <button className="text-orange-600 hover:text-orange-700 p-1">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default RecentOrders
