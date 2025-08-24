"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Calendar } from "lucide-react"

const SalesChart = ({ salesData = [] }) => {
  const [chartData, setChartData] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (salesData && salesData.length > 0) {
      const formattedData = salesData.map((item) => ({
        month: new Date(item._id.year, item._id.month - 1).toLocaleDateString("en-US", { month: "short" }),
        sales: item.sales,
        orders: item.orders,
      }))
      setChartData(formattedData)
    } else {
      // Mock data for demonstration
      const mockData = [
        { month: "Jan", sales: 45000, orders: 120 },
        { month: "Feb", sales: 38000, orders: 95 },
        { month: "Mar", sales: 52000, orders: 140 },
        { month: "Apr", sales: 48000, orders: 125 },
        { month: "May", sales: 61000, orders: 165 },
        { month: "Jun", sales: 58000, orders: 155 },
      ]
      setChartData(mockData)
    }
    setIsLoading(false)
  }, [salesData])

  const maxSales = Math.max(...chartData.map((item) => item.sales))
  const totalRevenue = chartData.reduce((sum, item) => sum + item.sales, 0)
  const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0)

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-96">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
                <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-gray-900">Sales Overview</h3>
            <p className="text-sm text-gray-500">Revenue trends over time</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
          >
            <option value="6months">Last 6 months</option>
            <option value="12months">Last 12 months</option>
            <option value="year">This year</option>
          </select>
        </div>
      </div>

      <div className="space-y-5">
        {chartData.map((item, index) => (
          <motion.div
            key={item.month}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-14 text-sm font-semibold text-gray-700">{item.month}</div>
                <div className="text-xs text-gray-500">{item.orders} orders</div>
              </div>
              <div className="text-sm font-bold text-gray-900">₹{item.sales.toLocaleString()}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden group-hover:h-5 transition-all duration-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.sales / maxSales) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 h-full rounded-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-700">Total Revenue</span>
            </div>
            <div className="text-2xl font-bold text-green-800">₹{totalRevenue.toLocaleString()}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-5 w-5 text-blue-600 mr-1" />
              <span className="text-sm font-medium text-blue-700">Total Orders</span>
            </div>
            <div className="text-2xl font-bold text-blue-800">{totalOrders.toLocaleString()}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600 mr-1" />
              <span className="text-sm font-medium text-purple-700">Avg Order</span>
            </div>
            <div className="text-2xl font-bold text-purple-800">
              ₹{Math.round(totalRevenue / totalOrders).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SalesChart
