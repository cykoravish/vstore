"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Star, Package, ArrowRight } from "lucide-react"

const PopularProducts = ({ products = [] }) => {
  const [productsList, setProductsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (products && products.length > 0) {
      const formattedProducts = products.map((product, index) => ({
        id: product._id,
        name: product.name,
        image: product.images?.[0]?.url || "/placeholder.svg?height=60&width=60",
        sales: product.sold || Math.floor(Math.random() * 200) + 50,
        revenue: (product.sold || Math.floor(Math.random() * 200) + 50) * product.price,
        trend: `+${Math.floor(Math.random() * 25) + 5}%`,
        rating: product.ratings?.average || 0,
        stock: product.stock,
        price: product.price,
      }))
      setProductsList(formattedProducts.slice(0, 5))
    } else {
      // Mock data for demonstration
      const mockProducts = [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=60&h=60&fit=crop",
          sales: 245,
          revenue: 3305055,
          trend: "+12%",
          rating: 4.8,
          stock: 25,
          price: 134900,
        },
        {
          id: 2,
          name: "MacBook Air M3",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=60&h=60&fit=crop",
          sales: 189,
          revenue: 2171511,
          trend: "+8%",
          rating: 4.9,
          stock: 15,
          price: 114900,
        },
        {
          id: 3,
          name: "Sony WH-1000XM5",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop",
          sales: 156,
          revenue: 467844,
          trend: "+15%",
          rating: 4.7,
          stock: 40,
          price: 29990,
        },
        {
          id: 4,
          name: 'Samsung 55" 4K TV',
          image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=60&h=60&fit=crop",
          sales: 134,
          revenue: 736866,
          trend: "+5%",
          rating: 4.4,
          stock: 12,
          price: 54990,
        },
        {
          id: 5,
          name: "PlayStation 5",
          image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=60&h=60&fit=crop",
          sales: 98,
          revenue: 539102,
          trend: "+22%",
          rating: 4.9,
          stock: 3,
          price: 54990,
        },
      ]
      setProductsList(mockProducts)
    }
    setIsLoading(false)
  }, [products])

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-gray-900">Top Products</h3>
            <p className="text-sm text-gray-500">Best performing items</p>
          </div>
        </div>
        <motion.button
          whileHover={{ x: 2 }}
          className="text-orange-600 hover:text-orange-700 text-sm font-semibold flex items-center space-x-1 px-3 py-2 rounded-xl hover:bg-orange-50 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="space-y-4">
        {productsList.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 border border-transparent hover:border-gray-100">
              <div className="relative">
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </div>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </p>
                  {product.stock < 10 && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      Low Stock
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Package className="h-3 w-3" />
                    <span>{product.sales} sold</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  <div className="text-xs">Stock: {product.stock}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-bold text-gray-900">₹{product.revenue.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs font-semibold">{product.trend}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">₹{product.price.toLocaleString()} each</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-lg font-bold text-blue-800">{productsList.reduce((sum, p) => sum + p.sales, 0)}</div>
            <div className="text-xs text-blue-600 font-medium">Total Sales</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-lg font-bold text-green-800">
              ₹{productsList.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
            </div>
            <div className="text-xs text-green-600 font-medium">Revenue</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-lg font-bold text-purple-800">
              {(productsList.reduce((sum, p) => sum + p.rating, 0) / productsList.length).toFixed(1)}
            </div>
            <div className="text-xs text-purple-600 font-medium">Avg Rating</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PopularProducts
