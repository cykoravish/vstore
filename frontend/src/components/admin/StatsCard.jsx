"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

const StatsCard = ({ title, value, icon: Icon, color, change, changeType }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            {change && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                {changeType === "positive" ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm font-semibold ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                >
                  {change}
                </span>
                <span className="text-xs text-gray-400 ml-1">vs last month</span>
              </motion.div>
            )}
          </div>
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}
          >
            <Icon className="h-7 w-7 text-white" />
          </motion.div>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-full bg-gradient-to-r ${color} rounded-full`}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard
