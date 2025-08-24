import express from "express";
import Product from "../models/Product.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Get all products with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 12,
    } = req.query;

    // Build filter object
    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number.parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = Number.parseFloat(maxPrice);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Execute query with pagination
    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number.parseInt(limit));

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / Number.parseInt(limit));

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: Number.parseInt(page),
          totalPages,
          totalProducts: total,
          hasNext: Number.parseInt(page) < totalPages,
          hasPrev: Number.parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
});

// Get featured products
router.get("/featured/list", async (req, res) => {
  try {
    const products = await Product.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(8);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching featured products",
      error: error.message,
    });
  }
});

// Get product categories
router.get("/categories/list", async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
});

// Admin routes (require authentication)
// Create new product with image upload
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    console.log("[v0] Product creation request received");
    console.log("[v0] Request body:", req.body);
    console.log("[v0] Uploaded files:", req.files);

    const productData = { ...req.body };

    if (productData.price) {
      productData.price = Number.parseFloat(productData.price);
    }
    if (productData.originalPrice) {
      productData.originalPrice = Number.parseFloat(productData.originalPrice);
    }
    if (productData.stock) {
      productData.stock = Number.parseInt(productData.stock);
    }

    if (productData.featured) {
      productData.featured =
        productData.featured === "true" || productData.featured === true;
    }

    // Add uploaded image URLs to product data
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    } else {
      productData.images = [];
    }

    console.log("[v0] Processed product data:", productData);

    const product = new Product(productData);
    await product.save();

    console.log("[v0] Product created successfully:", product._id);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("[v0] Product creation error:", error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: validationErrors,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// Update product with optional image upload
router.put("/:id", auth, upload.array("images", 5), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Add new uploaded images if any
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));

      // If keeping existing images, merge them
      if (updateData.keepExistingImages === "true") {
        const existingProduct = await Product.findById(req.params.id);
        updateData.images = [...(existingProduct.images || []), ...newImages];
      } else {
        updateData.images = newImages;
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
});

// Delete product
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
});

// Update product stock
router.patch("/:id/stock", auth, async (req, res) => {
  try {
    const { stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Stock updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating stock",
      error: error.message,
    });
  }
});

router.post(
  "/:id/images",
  auth,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }));

        product.images = [...(product.images || []), ...newImages];
        await product.save();
      }

      res.json({
        success: true,
        message: "Images uploaded successfully",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error uploading images",
        error: error.message,
      });
    }
  }
);

export default router;
