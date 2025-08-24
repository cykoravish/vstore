"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DollarSign, Package, ShoppingCart, AlertCircle } from "lucide-react"
import { toast } from "react-hot-toast"
import { getDashboardStats } from "../../services/api"
import StatsCard from "../../components/admin/StatsCard"
import SalesChart from "../../components/admin/SalesChart"
import RecentOrders from "../../components/admin/RecentOrders"
import PopularProducts from "../../components/admin/PopularProducts"

const   AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalRevenue: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalCustomers: 0,
      pendingOrders: 0,
    },
    recentOrders: [],
    popularProducts: [],
    monthlySales: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await getDashboardStats()

      if (response.success) {
        setDashboardData(response.data)
      } else {
        toast.error("Failed to load dashboard data")
      }
    } catch (error) {
      console.error("Dashboard data fetch error:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    {
      title: "Total Revenue",
      value: `₹${dashboardData.stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Total Orders",
      value: dashboardData.stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
      change: "+8.2%",
      changeType: "positive",
    },
    {
      title: "Total Products",
      value: dashboardData.stats.totalProducts.toLocaleString(),
      icon: Package,
      color: "from-purple-500 to-purple-600",
      change: "+3.1%",
      changeType: "positive",
    },
    {
      title: "Pending Orders",
      value: dashboardData.stats.pendingOrders.toLocaleString(),
      icon: AlertCircle,
      color: "from-orange-500 to-orange-600",
      change: "+15.3%",
      changeType: "positive",
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SalesChart salesData={dashboardData.monthlySales} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <PopularProducts products={dashboardData.popularProducts} />
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <RecentOrders orders={dashboardData.recentOrders} />
      </motion.div>
    </div>
  )
}

export default AdminDashboard
