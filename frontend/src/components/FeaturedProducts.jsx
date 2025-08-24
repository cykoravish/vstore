"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Heart, Eye, Loader2, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { getFeaturedProducts } from "../services/api"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const response = await getFeaturedProducts()
        if (response.success) {
          setProducts(response.data || [])
        } else {
          throw new Error(response.message || "Failed to fetch featured products")
        }
      } catch (err) {
        console.error("Error fetching featured products:", err)
        setError(err.message)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || "/placeholder.svg",
      stock: product.stock,
    })
  }

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-6 sm:h-8 bg-gray-200 rounded-lg w-48 sm:w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 sm:w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            <span className="ml-2 text-gray-600">Loading featured products...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error || products.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 mb-4">
              {error
                ? "Failed to load products. Please try again later."
                : "No featured products available at the moment."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Featured Products
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium products at amazing prices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product._id || product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.images?.[0]?.url || product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.originalPrice > product.price && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}

                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <motion.button
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                  </motion.button>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={`/products/${product._id || product.id}`}
                      className="block p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
                    >
                      <Eye className="h-4 w-4 text-gray-600 hover:text-orange-600 transition-colors" />
                    </Link>
                  </motion.div>
                </div>

                {/* Stock indicator */}
                {product.stock < 10 && product.stock > 0 && (
                  <div className="absolute bottom-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Only {product.stock} left!
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6">
                <div className="mb-2">
                  <span className="text-xs sm:text-sm text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-base sm:text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          i < Math.floor(product.ratings?.average || product.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">
                    ({product.ratings?.count || product.reviews || 0})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm sm:text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <motion.button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12 lg:mt-16"
        >
          <Link
            to="/products"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts
