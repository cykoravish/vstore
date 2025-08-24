import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "../models/Product.js"
import Order from "../models/Order.js"
import User from "../models/User.js"

// Load environment variables
dotenv.config()

// Sample product data with high-quality placeholder images
const sampleProducts = [
  {
    name: "iPhone 15 Pro Max",
    description:
      "The most advanced iPhone yet with titanium design, A17 Pro chip, and professional camera system. Features a 6.7-inch Super Retina XDR display with ProMotion technology.",
    price: 134900,
    originalPrice: 149900,
    category: "Electronics",
    images: [
      {
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
        public_id: "iphone_15_pro_max_1",
      },
      {
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
        public_id: "iphone_15_pro_max_2",
      },
    ],
    stock: 25,
    ratings: { average: 4.8, count: 156 },
    featured: true,
    status: "active",
  },
  {
    name: "MacBook Air M3",
    description:
      "Supercharged by the M3 chip, the redesigned MacBook Air is more portable than ever and delivers exceptional performance with up to 18 hours of battery life.",
    price: 114900,
    originalPrice: 124900,
    category: "Electronics",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
        public_id: "macbook_air_m3_1",
      },
      {
        url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
        public_id: "macbook_air_m3_2",
      },
    ],
    stock: 15,
    ratings: { average: 4.9, count: 89 },
    featured: true,
    status: "active",
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading noise canceling headphones with exceptional sound quality, 30-hour battery life, and crystal-clear hands-free calling.",
    price: 29990,
    originalPrice: 34990,
    category: "Electronics",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        public_id: "sony_headphones_1",
      },
    ],
    stock: 40,
    ratings: { average: 4.7, count: 234 },
    featured: true,
    status: "active",
  },
  {
    name: "Nike Air Max 270",
    description:
      "Inspired by two icons of big Air: the Air Max 180 and Air Max 93. The Nike Air Max 270 delivers visible heel Air cushioning and modern style.",
    price: 12995,
    originalPrice: 14995,
    category: "Clothing",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        public_id: "nike_air_max_1",
      },
    ],
    stock: 60,
    ratings: { average: 4.5, count: 178 },
    featured: false,
    status: "active",
  },
  {
    name: "Adidas Ultraboost 22",
    description:
      "Experience incredible energy return with every step. The Ultraboost 22 features responsive BOOST midsole and Primeknit upper for ultimate comfort.",
    price: 16999,
    originalPrice: 18999,
    category: "Clothing",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
        public_id: "adidas_ultraboost_1",
      },
    ],
    stock: 35,
    ratings: { average: 4.6, count: 145 },
    featured: false,
    status: "active",
  },
  {
    name: 'Samsung 55" 4K Smart TV',
    description:
      "Crystal clear 4K resolution with HDR support, smart TV features, and sleek design. Perfect for your home entertainment setup.",
    price: 54990,
    originalPrice: 64990,
    category: "Electronics",
    images: [
      {
        url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
        public_id: "samsung_tv_1",
      },
    ],
    stock: 12,
    ratings: { average: 4.4, count: 67 },
    featured: true,
    status: "active",
  },
  {
    name: "Dyson V15 Detect Vacuum",
    description:
      "The most powerful, intelligent cordless vacuum. Reveals invisible dust and adapts suction power automatically for different floor types.",
    price: 65900,
    originalPrice: 72900,
    category: "Home & Garden",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
        public_id: "dyson_vacuum_1",
      },
    ],
    stock: 8,
    ratings: { average: 4.8, count: 92 },
    featured: false,
    status: "active",
  },
  {
    name: "Canon EOS R6 Mark II",
    description:
      "Professional mirrorless camera with 24.2MP full-frame sensor, 4K video recording, and advanced autofocus system for stunning photography.",
    price: 219999,
    originalPrice: 239999,
    category: "Electronics",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop",
        public_id: "canon_camera_1",
      },
    ],
    stock: 5,
    ratings: { average: 4.9, count: 43 },
    featured: true,
    status: "active",
  },
  {
    name: "Levi's 501 Original Jeans",
    description:
      "The original blue jean since 1873. Crafted with premium denim and classic straight fit that never goes out of style.",
    price: 4999,
    originalPrice: 5999,
    category: "Clothing",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
        public_id: "levis_jeans_1",
      },
    ],
    stock: 80,
    ratings: { average: 4.3, count: 267 },
    featured: false,
    status: "active",
  },
  {
    name: "PlayStation 5",
    description:
      "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, and 3D Audio technology.",
    price: 54990,
    originalPrice: 59990,
    category: "Electronics",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop",
        public_id: "playstation_5_1",
      },
    ],
    stock: 3,
    ratings: { average: 4.9, count: 189 },
    featured: true,
    status: "active",
  },
  {
    name: "Fitbit Charge 5",
    description:
      "Advanced fitness tracker with built-in GPS, stress management tools, and up to 7 days of battery life. Track your health 24/7.",
    price: 19999,
    originalPrice: 22999,
    category: "Electronics",
    images: [
      {
        url: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop",
        public_id: "fitbit_charge_1",
      },
    ],
    stock: 45,
    ratings: { average: 4.2, count: 156 },
    featured: false,
    status: "active",
  },
  {
    name: "KitchenAid Stand Mixer",
    description:
      "Professional-grade stand mixer with 10 speeds and multiple attachments. Perfect for baking enthusiasts and professional chefs.",
    price: 34999,
    originalPrice: 39999,
    category: "Home & Garden",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
        public_id: "kitchenaid_mixer_1",
      },
    ],
    stock: 18,
    ratings: { average: 4.7, count: 98 },
    featured: false,
    status: "active",
  },
]

// Sample users
const sampleUsers = [
  {
    email: "john.doe@example.com",
    isVerified: true,
    lastLogin: new Date(),
  },
  {
    email: "jane.smith@example.com",
    isVerified: true,
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    email: "mike.johnson@example.com",
    isVerified: true,
    lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    email: "sarah.wilson@example.com",
    isVerified: true,
    lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
]

// Function to generate sample orders
const generateSampleOrders = (products, users) => {
  const orderStatuses = ["pending", "confirmed", "processing", "shipped", "delivered"]
  const paymentMethods = ["cod", "online"]
  const paymentStatuses = ["pending", "completed"]

  const orders = []

  for (let i = 0; i < 25; i++) {
    const user = users[Math.floor(Math.random() * users.length)]
    const numItems = Math.floor(Math.random() * 3) + 1 // 1-3 items per order
    const orderItems = []
    let totalAmount = 0

    for (let j = 0; j < numItems; j++) {
      const product = products[Math.floor(Math.random() * products.length)]
      const quantity = Math.floor(Math.random() * 3) + 1 // 1-3 quantity
      const itemTotal = product.price * quantity

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0].url,
      })

      totalAmount += itemTotal
    }

    const orderStatus = orderStatuses[Math.floor(Math.random() * orderStatuses.length)]
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)]

    orders.push({
      customerInfo: {
        name: user.email
          .split("@")[0]
          .replace(".", " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        email: user.email,
        phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      },
      shippingAddress: {
        area: `${Math.floor(Math.random() * 999) + 1} Main Street`,
        landmark: "Near City Mall",
        city: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"][Math.floor(Math.random() * 5)],
        state: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal"][Math.floor(Math.random() * 5)],
        pincode: `${Math.floor(Math.random() * 900000) + 100000}`,
        addressType: ["home", "work", "other"][Math.floor(Math.random() * 3)],
      },
      items: orderItems,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod,
      paymentStatus:
        paymentMethod === "online" ? "completed" : paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      orderStatus: orderStatus,
      trackingNumber: orderStatus === "shipped" || orderStatus === "delivered" ? `TRK${Date.now()}${i}` : undefined,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date within last 30 days
    })
  }

  return orders
}

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...")

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Connected to MongoDB")

    // Clear existing data
    console.log("🗑️  Clearing existing data...")
    await Product.deleteMany({})
    await Order.deleteMany({})
    await User.deleteMany({})

    // Insert products
    console.log("📦 Inserting products...")
    const insertedProducts = await Product.insertMany(sampleProducts)
    console.log(`✅ Inserted ${insertedProducts.length} products`)

    // Insert users
    console.log("👥 Inserting users...")
    const insertedUsers = await User.insertMany(sampleUsers)
    console.log(`✅ Inserted ${insertedUsers.length} users`)

    // Generate and insert orders
    console.log("🛒 Generating and inserting orders...")
    const sampleOrders = generateSampleOrders(insertedProducts, insertedUsers)
    const insertedOrders = await Order.insertMany(sampleOrders)
    console.log(`✅ Inserted ${insertedOrders.length} orders`)

    // Update users with their orders
    console.log("🔗 Linking orders to users...")
    for (const order of insertedOrders) {
      await User.findOneAndUpdate({ email: order.customerInfo.email }, { $push: { orders: order._id } })
    }

    console.log("🎉 Database seeding completed successfully!")
    console.log("\n📊 Summary:")
    console.log(`   Products: ${insertedProducts.length}`)
    console.log(`   Users: ${insertedUsers.length}`)
    console.log(`   Orders: ${insertedOrders.length}`)
    console.log(`   Featured Products: ${insertedProducts.filter((p) => p.featured).length}`)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  } finally {
    await mongoose.disconnect()
    console.log("🔌 Disconnected from MongoDB")
    process.exit(0)
  }
}

// Run the seeding function
seedDatabase()
