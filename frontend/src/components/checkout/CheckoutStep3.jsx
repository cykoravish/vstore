"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Truck, CreditCard, Loader } from "lucide-react"

const CheckoutStep3 = ({ orderData, onPrev, onComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePlaceOrder = async () => {
    setLoading(true)
    setError("")

    try {
      if (paymentMethod === "online") {
        // Razorpay integration
        await handleRazorpayPayment()
      } else {
        // Cash on Delivery
        await handleCODOrder()
      }
    } catch (err) {
      setError(err.message || "Failed to place order")
      setLoading(false)
    }
  }

  const handleCODOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          paymentMethod: "cod",
          paymentStatus: "pending",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to place order")
      }

      const data = await response.json()
      onComplete({
        paymentMethod: "cod",
        paymentStatus: "pending",
        orderId: data.order.id,
        orderNumber: data.order.orderNumber,
      })
    } catch (error) {
      throw error
    }
  }

  const handleRazorpayPayment = async () => {
    try {
      // Create Razorpay order
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: orderData.total,
          currency: "USD",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create payment order")
      }

      const { order } = await response.json()

      // Mock Razorpay payment (in production, use actual Razorpay SDK)
      const options = {
        key: "rzp_test_mock_key", // Mock key
        amount: order.amount,
        currency: order.currency,
        name: "VStore",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response) => {
          // Verify payment
          const verifyResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData,
            }),
          })

          if (verifyResponse.ok) {
            const data = await verifyResponse.json()
            onComplete({
              paymentMethod: "online",
              paymentStatus: "completed",
              orderId: data.order.id,
              orderNumber: data.order.orderNumber,
              paymentDetails: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
            })
          } else {
            throw new Error("Payment verification failed")
          }
        },
        prefill: {
          name: orderData.customerInfo.name,
          email: orderData.customerInfo.email,
          contact: orderData.customerInfo.phone,
        },
        theme: {
          color: "#ea580c",
        },
      }

      // Mock successful payment for demo
      setTimeout(() => {
        options.handler({
          razorpay_order_id: "order_mock_123",
          razorpay_payment_id: "pay_mock_456",
          razorpay_signature: "signature_mock_789",
        })
      }, 2000)
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-6">Payment Method</h2>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Items ({orderData.items.length})</span>
            <span>${(orderData.total / 1.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${(orderData.total * 0.1).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-300 pt-2 font-semibold">
            <div className="flex justify-between">
              <span>Total</span>
              <span className="text-orange-600">${orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
        <div className="text-sm text-gray-600">
          <p className="font-medium text-gray-900">{orderData.customerInfo.name}</p>
          <p>{orderData.shippingAddress.area}</p>
          {orderData.shippingAddress.landmark && <p>{orderData.shippingAddress.landmark}</p>}
          <p>
            {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.pincode}
          </p>
          <p>{orderData.customerInfo.phone}</p>
          <p>{orderData.customerInfo.email}</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-gray-900">Select Payment Method</h3>

        <div className="space-y-3">
          {/* Cash on Delivery */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === "cod" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("cod")}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-orange-600 focus:ring-orange-500"
              />
              <Truck className="h-6 w-6 text-gray-600" />
              <div>
                <label htmlFor="cod" className="font-medium text-gray-900 cursor-pointer">
                  Cash on Delivery
                </label>
                <p className="text-sm text-gray-600">Pay when your order is delivered</p>
              </div>
            </div>
          </motion.div>

          {/* Online Payment */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === "online" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("online")}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="online"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-orange-600 focus:ring-orange-500"
              />
              <CreditCard className="h-6 w-6 text-gray-600" />
              <div>
                <label htmlFor="online" className="font-medium text-gray-900 cursor-pointer">
                  Pay Online
                </label>
                <p className="text-sm text-gray-600">Credit/Debit Card, UPI, Net Banking</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6"
        >
          {error}
        </motion.div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={onPrev}
          disabled={loading}
          className="flex-1 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Address</span>
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{paymentMethod === "cod" ? "Place Order" : "Pay Now"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default CheckoutStep3
