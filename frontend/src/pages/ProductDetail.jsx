"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Plus, Minus } from "lucide-react"
import { useCart } from "../contexts/CartContext"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      // Mock API call - will be replaced with real API
      const mockProduct = {
        id: Number.parseInt(id),
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        originalPrice: 99.99,
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500",
        ],
        rating: 4.5,
        reviews: 128,
        category: "Electronics",
        description:
          "Experience premium sound quality with these wireless Bluetooth headphones featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
        features: [
          "Active Noise Cancellation",
          "30-hour battery life",
          "Bluetooth 5.0 connectivity",
          "Comfortable over-ear design",
          "Built-in microphone",
          "Quick charge feature",
        ],
        specifications: {
          "Driver Size": "40mm",
          "Frequency Response": "20Hz - 20kHz",
          Impedance: "32 ohms",
          Weight: "250g",
          Connectivity: "Bluetooth 5.0, 3.5mm jack",
          Battery: "30 hours playback",
        },
        stock: 45,
        inStock: true,
      }

      setTimeout(() => {
        setProduct(mockProduct)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Failed to fetch product:", error)
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link to="/products" className="text-orange-600 hover:text-orange-700 font-medium">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link
            to="/products"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg shadow-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-orange-500" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="text-sm text-orange-600 font-medium">{product.category}</span>
              <h1 className="font-heading text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice > product.price && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-semibold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-50 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">{product.stock} in stock</span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
                </button>
                <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-gray-600">{key}:</dt>
                      <dd className="font-medium text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
