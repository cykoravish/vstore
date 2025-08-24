export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID
export const APP_NAME = import.meta.env.VITE_APP_NAME || "VStore Online"

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
}

export const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
}

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
  "Beauty",
  "Toys",
  "Automotive",
  "Other",
]
