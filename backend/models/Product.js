import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Beauty", "Toys", "Automotive", "Other"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be less than 0"],
        max: [5, "Rating cannot be more than 5"],
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality
productSchema.index({ name: "text", description: "text" })
productSchema.index({ category: 1 })
productSchema.index({ price: 1 })
productSchema.index({ featured: 1 })

export default mongoose.model("Product", productSchema)
