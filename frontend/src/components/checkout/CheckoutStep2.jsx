"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const CheckoutStep2 = ({ orderData, onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "home",
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Phone number must be 10 digits"
    if (!formData.area.trim()) newErrors.area = "Area is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required"
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          area: formData.area,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          addressType: formData.addressType,
        },
      })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-6">Shipping Address</h2>

      <form className="space-y-6">
        {/* Customer Information */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                Area *
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.area ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter area/locality"
              />
              {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
            </div>

            <div>
              <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-2">
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter landmark (optional)"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter city"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter state"
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>

            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.pincode ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter pincode"
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>

            <div>
              <label htmlFor="addressType" className="block text-sm font-medium text-gray-700 mb-2">
                Address Type
              </label>
              <select
                id="addressType"
                name="addressType"
                value={formData.addressType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      <div className="flex space-x-4 mt-8">
        <button
          onClick={onPrev}
          className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Cart</span>
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Continue to Payment</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default CheckoutStep2
