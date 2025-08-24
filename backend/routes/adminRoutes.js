import express from "express"
import Product from "../models/Product.js"
import Order from "../models/Order.js"
import User from "../models/User.js"
import { authenticateAdmin } from "../middleware/auth.js"

const router = express.Router()

// All admin routes require authentication
router.use(authenticateAdmin)

// Dashboard stats
router.get("/dashboard/stats", async (req, res) => {
  try {
    const [totalProducts, totalOrders, totalRevenue, pendingOrders, recentOrders, popularProducts] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: "delivered" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Order.countDocuments({ status: "pending" }),
      Order.find().populate("items.product", "name price").sort({ createdAt: -1 }).limit(5),
      Product.find().sort({ sold: -1 }).limit(5).select("name price sold image"),
    ])

    // Calculate monthly sales for chart
    const monthlySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          sales: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])

    res.json({
      success: true,
      data: {
        stats: {
          totalProducts,
          totalOrders,
          totalRevenue: totalRevenue[0]?.total || 0,
          pendingOrders,
        },
        recentOrders,
        popularProducts,
        monthlySales,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats",
      error: error.message,
    })
  }
})

// Get all customers
router.get("/customers", async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query

    const filter = {}
    if (search) {
      filter.$or = [{ email: { $regex: search, $options: "i" } }, { name: { $regex: search, $options: "i" } }]
    }

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)
    const customers = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit))

    const total = await User.countDocuments(filter)

    res.json({
      success: true,
      data: {
        customers,
        pagination: {
          currentPage: Number.parseInt(page),
          totalPages: Math.ceil(total / Number.parseInt(limit)),
          totalCustomers: total,
        },
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching customers",
      error: error.message,
    })
  }
})

// Get sales analytics
router.get("/analytics/sales", async (req, res) => {
  try {
    const { period = "30d" } = req.query

    let dateFilter
    const now = new Date()

    switch (period) {
      case "7d":
        dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "30d":
        dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case "90d":
        dateFilter = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case "1y":
        dateFilter = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default:
        dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    const salesData = await Order.aggregate([
      { $match: { createdAt: { $gte: dateFilter } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          sales: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    // Category-wise sales
    const categorySales = await Order.aggregate([
      { $match: { createdAt: { $gte: dateFilter } } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$productInfo.category",
          sales: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
          quantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { sales: -1 } },
    ])

    res.json({
      success: true,
      data: {
        salesData,
        categorySales,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching sales analytics",
      error: error.message,
    })
  }
})

// Update site settings
router.put("/settings", async (req, res) => {
  try {
    // This would typically update a settings collection
    // For now, we'll just return success
    res.json({
      success: true,
      message: "Settings updated successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating settings",
      error: error.message,
    })
  }
})

// Bulk operations
router.post("/products/bulk-update", async (req, res) => {
  try {
    const { productIds, updates } = req.body

    const result = await Product.updateMany({ _id: { $in: productIds } }, updates)

    res.json({
      success: true,
      message: `${result.modifiedCount} products updated successfully`,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating products",
      error: error.message,
    })
  }
})

router.delete("/products/bulk-delete", async (req, res) => {
  try {
    const { productIds } = req.body

    const result = await Product.deleteMany({ _id: { $in: productIds } })

    res.json({
      success: true,
      message: `${result.deletedCount} products deleted successfully`,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting products",
      error: error.message,
    })
  }
})

export default router
