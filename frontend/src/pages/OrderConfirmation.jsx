"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useLocation, Link } from "react-router-dom"
import { CheckCircle, Package, Truck, MapPin, CreditCard, ArrowRight } from "lucide-react"

const OrderConfirmation = () => {
  const location = useLocation()
  const orderData = location.state?.orderData

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
          <Link to="/" className="text-orange-600 hover:text-orange-700 font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const getPaymentMethodDisplay = (method) => {
    return method === "cod" ? "Cash on Delivery" : "Online Payment"
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100"
      case "pending":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your order. We've received your order and will process it shortly.
          </p>
          <p className="text-orange-600 font-semibold">
            Order Number: <span className="font-mono">{orderData.orderNumber}</span>
          </p>
        </motion.div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center mb-6">
              <Package className="h-6 w-6 text-orange-600 mr-3" />
              <h2 className="font-heading text-xl font-semibold text-gray-900">Order Summary</h2>
            </div>

            <div className="space-y-4 mb-6">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg?height=60&width=60"}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${(orderData.total / 1.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(orderData.total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-orange-600">${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping & Payment Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-orange-600 mr-3" />
                <h3 className="font-heading text-lg font-semibold text-gray-900">Shipping Address</h3>
              </div>
              <div className="text-gray-600">
                <p className="font-medium text-gray-900">{orderData.customerInfo.name}</p>
                <p>{orderData.shippingAddress.area}</p>
                {orderData.shippingAddress.landmark && <p>{orderData.shippingAddress.landmark}</p>}
                <p>
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                  {orderData.shippingAddress.pincode}
                </p>
                <p className="mt-2">{orderData.customerInfo.phone}</p>
                <p>{orderData.customerInfo.email}</p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-orange-600 mr-3" />
                <h3 className="font-heading text-lg font-semibold text-gray-900">Payment Information</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">{getPaymentMethodDisplay(orderData.paymentMethod)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(orderData.paymentStatus)}`}
                  >
                    {orderData.paymentStatus.charAt(0).toUpperCase() + orderData.paymentStatus.slice(1)}
                  </span>
                </div>
                {orderData.paymentDetails?.razorpayPaymentId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-sm">{orderData.paymentDetails.razorpayPaymentId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-orange-600 mr-3" />
                <h3 className="font-heading text-lg font-semibold text-gray-900">Delivery Information</h3>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-medium">Estimated Delivery:</span> 3-5 business days
                </p>
                <p>
                  <span className="font-medium">Tracking:</span> You'll receive tracking information via email once your
                  order ships
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 bg-orange-50 rounded-xl p-8 text-center"
        >
          <h3 className="font-heading text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-orange-600">1</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Order Processing</h4>
              <p className="text-sm text-gray-600">We'll prepare your order for shipment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-orange-600">2</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Shipping</h4>
              <p className="text-sm text-gray-600">Your order will be shipped with tracking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-orange-600">3</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Delivery</h4>
              <p className="text-sm text-gray-600">Enjoy your new products!</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-orange-600 text-orange-600 hover:bg-orange-50 font-semibold rounded-lg transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderConfirmation
