"use client"

import { motion } from "framer-motion"
import { ArrowRight, ShoppingBag, Users, Star, Truck } from "lucide-react"
import { Link } from "react-router-dom"

const Hero = () => {
  const stats = [
    { icon: ShoppingBag, label: "Products", value: "10,000+" },
    { icon: Users, label: "Happy Customers", value: "50,000+" },
    { icon: Star, label: "Reviews", value: "4.8/5" },
    { icon: Truck, label: "Fast Delivery", value: "24/7" },
  ]

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4 lg:space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight"
              >
                Shop Smart,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
                  {" "}
                  Live Better
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Discover amazing products at unbeatable prices. From electronics to fashion, we have everything you need
                for a modern lifestyle.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-105"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 lg:pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-3 sm:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-orange-100 hover:bg-white/70 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
                  </div>
                  <div className="font-heading font-bold text-lg sm:text-2xl text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative z-10">
              <motion.img
                src="/placeholder.svg?height=600&width=600"
                alt="Shopping Hero"
                className="w-full h-auto rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-3 hidden sm:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">Free Shipping</div>
                    <div className="text-xs text-gray-500">On orders $50+</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 hidden sm:block"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">4.8★ Rating</div>
                    <div className="text-xs text-gray-500">50k+ Reviews</div>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 sm:w-72 sm:h-72 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 sm:w-72 sm:h-72 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_50%)]"></div>
      </div>
    </section>
  )
}

export default Hero
