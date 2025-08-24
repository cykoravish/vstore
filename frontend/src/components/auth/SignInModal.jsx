"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Shield, ArrowLeft, Loader2 } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import toast from "react-hot-toast"

const SignInModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("email") // 'email' or 'otp'
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const { sendOTP, verifyOTP } = useAuth()

  const resetModal = () => {
    setStep("email")
    setEmail("")
    setOtp("")
    setError("")
    setOtpSent(false)
    setLoading(false)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  const handleSendOTP = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter your email address")
      return
    }

    setLoading(true)
    setError("")

    try {
      await sendOTP(email)
      setStep("otp")
      setOtpSent(true)
    } catch (err) {
      setError(err.message || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    if (!otp.trim()) {
      toast.error("Please enter the OTP")
      return
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits")
      return
    }

    setLoading(true)
    setError("")

    try {
      await verifyOTP(email, otp)
      handleClose()
    } catch (err) {
      setError(err.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setLoading(true)
    setError("")

    try {
      await sendOTP(email)
      setOtpSent(true)
      setError("")
    } catch (err) {
      setError(err.message || "Failed to resend OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-100"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                {step === "email" ? <Mail className="h-8 w-8 text-white" /> : <Shield className="h-8 w-8 text-white" />}
              </div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                {step === "email" ? "Sign In" : "Verify OTP"}
              </h2>
              <p className="text-gray-600 text-sm">
                {step === "email"
                  ? "Enter your email address to get started"
                  : `We've sent a verification code to ${email}`}
              </p>
            </div>

            {/* Email Step */}
            {step === "email" && (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center"
                  >
                    <span className="text-red-500 mr-2">⚠</span>
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-orange-400 disabled:to-orange-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            )}

            {/* OTP Step */}
            {step === "otp" && (
              <div className="space-y-4">
                <button
                  onClick={() => setStep("email")}
                  className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium mb-4 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to email
                </button>

                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg font-mono tracking-widest transition-all duration-200"
                      placeholder="000000"
                      maxLength={6}
                      required
                      disabled={loading}
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center"
                    >
                      <span className="text-red-500 mr-2">⚠</span>
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-orange-400 disabled:to-orange-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Continue"
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                  <button
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-orange-600 hover:text-orange-700 text-sm font-medium disabled:text-orange-400 transition-colors"
                  >
                    Resend OTP
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Demo OTP:{" "}
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-orange-600 font-semibold">
                      123456
                    </span>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SignInModal
