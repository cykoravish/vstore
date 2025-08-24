"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Smartphone, Shirt, Home, Dumbbell, Book, Sparkles, Car, Gamepad2 } from "lucide-react"
import { useState, useEffect } from "react"
import { getCategories } from "../services/api"

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const defaultCategories = [
    {
      name: "Electronics",
      icon: Smartphone,
      image: "/placeholder.svg?height=200&width=200",
      count: "0 items",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Clothing",
      icon: Shirt,
      image: "/placeholder.svg?height=200&width=200",
      count: "0 items",
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "Home & Garden",
      icon: Home,
      image: "/placeholder.svg?height=200&width=200",
      count: "0 items",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Sports",
      icon: Dumbbell,
      image: "/placeholder.svg?height=200&width=200",
      count: "0 items",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Books",
      icon: Book,
      image: "/placeholder.svg?height=200&width=200",
      count: "0 items",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Beauty",
      icon: Sparkles,
      image: "/placeholder.svg?height=200&width=200",
      count: "0 items",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      name: "Automotive",
      icon: Car,
      image: "/placeholder.svg?height=200&width=200",
      count: "0 items",
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Toys",
      icon: Gamepad2,
      image: "/placeholder.svg?height=200&width=200",
      count: "0 items",
      color: "from-orange-500 to-orange-600",
    },
  ]

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await getCategories()
      if (response.success) {
        // Map API categories to UI format
        const dynamicCategories = response.data.map((categoryName) => {
          const defaultCategory = defaultCategories.find((cat) => cat.name === categoryName)
          return (
            defaultCategory || {
              name: categoryName,
              icon: Smartphone,
              image: "/placeholder.svg?height=200&width=200",
              count: "0 items",
              color: "from-gray-500 to-gray-600",
            }
          )
        })
        setCategories(dynamicCategories)
      } else {
        setCategories(defaultCategories)
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      setCategories(defaultCategories)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Loading categories...</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                  ></div>
                  <div className="absolute top-4 right-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                      <category.icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
