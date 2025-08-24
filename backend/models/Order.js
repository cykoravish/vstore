import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    customerInfo: {
      name: {
        type: String,
        required: [true, "Customer name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Customer email is required"],
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: [true, "Customer phone is required"],
        trim: true,
      },
    },
    shippingAddress: {
      area: {
        type: String,
        required: [true, "Area is required"],
        trim: true,
      },
      landmark: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
      },
      pincode: {
        type: String,
        required: [true, "Pincode is required"],
        trim: true,
      },
      addressType: {
        type: String,
        enum: ["home", "work", "other"],
        default: "home",
      },
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount cannot be negative"],
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentDetails: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    trackingNumber: {
      type: String,
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  },
)

// Generate order number before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments()
    this.orderNumber = `ORD${Date.now()}${count + 1}`
  }
  next()
})

// Index for efficient queries
orderSchema.index({ orderNumber: 1 })
orderSchema.index({ "customerInfo.email": 1 })
orderSchema.index({ orderStatus: 1 })
orderSchema.index({ createdAt: -1 })

export default mongoose.model("Order", orderSchema)
