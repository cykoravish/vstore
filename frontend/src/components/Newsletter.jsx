"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send } from "lucide-react"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Mock newsletter subscription
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setEmail("")
      setTimeout(() => setSuccess(false), 5000)
    }, 2000)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special
            offers.
          </p>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white bg-opacity-20 border border-white border-opacity-30 text-white px-6 py-3 rounded-lg mb-6 inline-block"
            >
              Thank you for subscribing! Check your email for confirmation.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white hover:bg-gray-100 disabled:bg-gray-200 text-orange-600 font-semibold px-8 py-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-orange-100 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
