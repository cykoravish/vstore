import express from "express"
import Razorpay from "razorpay"
import Order from "../models/Order.js"

const router = express.Router()

// Initialize Razorpay (mock for demo)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mock_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "mock_secret",
})

// Create Razorpay order
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "USD" } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      })
    }

    // Mock Razorpay order creation
    const order = {
      id: `order_${Date.now()}`,
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      status: "created",
    }

    res.status(200).json({
      success: true,
      order,
    })
  } catch (error) {
    console.error("Create payment order error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to create payment order",
    })
  }
})

// Verify Razorpay payment
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body

    // Mock signature verification (in production, use actual Razorpay verification)
    const isValidSignature = true // Mock validation

    if (!isValidSignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      })
    }

    // Create order in database
    const order = new Order({
      customerInfo: orderData.customerInfo,
      shippingAddress: orderData.shippingAddress,
      items: orderData.items.map((item) => ({
        product: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount: orderData.total,
      paymentMethod: "online",
      paymentStatus: "completed",
      paymentDetails: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    })

    await order.save()

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
      },
    })
  } catch (error) {
    console.error("Verify payment error:", error)
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    })
  }
})

export default router
