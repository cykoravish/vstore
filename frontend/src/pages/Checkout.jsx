"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Check, ShoppingBag, MapPin, CreditCard } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import CheckoutStep1 from "../components/checkout/CheckoutStep1"
import CheckoutStep2 from "../components/checkout/CheckoutStep2"
import CheckoutStep3 from "../components/checkout/CheckoutStep3"

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderData, setOrderData] = useState({
    items: [],
    customerInfo: {},
    shippingAddress: {},
    paymentMethod: "",
    total: 0,
  })
  const { cartItems, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to cart if no items
    if (cartItems.length === 0) {
      navigate("/cart")
      return
    }

    // Initialize order data
    setOrderData((prev) => ({
      ...prev,
      items: cartItems,
      total: getCartTotal() * 1.1, // Including tax
    }))
  }, [cartItems, getCartTotal, navigate])

  const steps = [
    { number: 1, title: "Review Cart", icon: ShoppingBag },
    { number: 2, title: "Shipping Address", icon: MapPin },
    { number: 3, title: "Payment", icon: CreditCard },
  ]

  const handleNextStep = (data) => {
    setOrderData((prev) => ({ ...prev, ...data }))
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleOrderComplete = (paymentData) => {
    setOrderData((prev) => ({ ...prev, ...paymentData }))
    clearCart()
    navigate("/order-confirmation", { state: { orderData: { ...orderData, ...paymentData } } })
  }

  if (cartItems.length === 0) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/cart" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </Link>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep > step.number
                        ? "bg-green-500 text-white"
                        : currentStep === step.number
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">Step {step.number}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${currentStep > step.number ? "bg-green-500" : "bg-gray-200"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {currentStep === 1 && <CheckoutStep1 orderData={orderData} onNext={handleNextStep} />}
          {currentStep === 2 && <CheckoutStep2 orderData={orderData} onNext={handleNextStep} onPrev={handlePrevStep} />}
          {currentStep === 3 && (
            <CheckoutStep3 orderData={orderData} onPrev={handlePrevStep} onComplete={handleOrderComplete} />
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Checkout
