import express from "express"
import { body, validationResult } from "express-validator"
import Order from "../models/Order.js"
import Product from "../models/Product.js"
import { sendOrderConfirmationEmail } from "../utils/emailService.js"

const router = express.Router()

// Create new order
router.post(
  "/",
  [
    body("customerInfo.name").notEmpty().withMessage("Customer name is required"),
    body("customerInfo.email").isEmail().withMessage("Valid email is required"),
    body("customerInfo.phone").notEmpty().withMessage("Phone number is required"),
    body("shippingAddress.area").notEmpty().withMessage("Area is required"),
    body("shippingAddress.city").notEmpty().withMessage("City is required"),
    body("shippingAddress.state").notEmpty().withMessage("State is required"),
    body("shippingAddress.pincode").notEmpty().withMessage("Pincode is required"),
    body("items").isArray({ min: 1 }).withMessage("At least one item is required"),
    body("totalAmount").isNumeric().withMessage("Total amount must be a number"),
    body("paymentMethod").isIn(["cod", "online"]).withMessage("Invalid payment method"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
      }

      const { customerInfo, shippingAddress, items, totalAmount, paymentMethod, paymentStatus, paymentDetails } =
        req.body

      // Validate product availability and prices
      for (const item of items) {
        const product = await Product.findById(item.id)
        if (!product) {
          return res.status(400).json({
            success: false,
            message: `Product ${item.name} not found`,
          })
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${item.name}`,
          })
        }
      }

      // Create order
      const order = new Order({
        customerInfo,
        shippingAddress,
        items: items.map((item) => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount,
        paymentMethod,
        paymentStatus: paymentStatus || "pending",
        paymentDetails: paymentDetails || {},
      })

      await order.save()

      // Update product stock
      for (const item of items) {
        await Product.findByIdAndUpdate(item.id, {
          $inc: { stock: -item.quantity },
        })
      }

      // Send order confirmation email
      try {
        await sendOrderConfirmationEmail(customerInfo.email, {
          orderNumber: order.orderNumber,
          items: order.items,
          totalAmount: order.totalAmount,
          shippingAddress: order.shippingAddress,
        })
      } catch (emailError) {
        console.error("Failed to send order confirmation email:", emailError)
      }

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order: {
          id: order._id,
          orderNumber: order.orderNumber,
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
        },
      })
    } catch (error) {
      console.error("Create order error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to create order",
      })
    }
  },
)

// Get all orders (admin)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query

    const query = {}
    if (status && status !== "all") {
      query.orderStatus = status
    }
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { "customerInfo.name": { $regex: search, $options: "i" } },
        { "customerInfo.email": { $regex: search, $options: "i" } },
      ]
    }

    const orders = await Order.find(query)
      .populate("items.product")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Order.countDocuments(query)

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get orders error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    })
  }
})

// Get order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product")

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      })
    }

    res.status(200).json({
      success: true,
      order,
    })
  } catch (error) {
    console.error("Get order error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    })
  }
})

// Update order status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, trackingNumber } = req.body

    const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      })
    }

    const updateData = { orderStatus: status }
    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber
    }

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true })

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    })
  } catch (error) {
    console.error("Update order status error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    })
  }
})

export default router
