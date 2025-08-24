"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const CheckoutStep1 = ({ orderData, onNext }) => {
  const handleNext = () => {
    onNext({})
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-6">Review Your Order</h2>

      <div className="space-y-4 mb-6">
        {orderData.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
          >
            <img
              src={item.image || "/placeholder.svg?height=80&width=80"}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">${item.price}</p>
              <p className="text-sm text-gray-600">Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-6 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${(orderData.total / 1.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-semibold">${(orderData.total * 0.1).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-xl text-orange-600">${orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <span>Continue to Shipping</span>
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  )
}

export default CheckoutStep1
