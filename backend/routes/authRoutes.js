import express from "express"
import { body, validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { sendOTPEmail } from "../utils/emailService.js"

const router = express.Router()

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map()

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Send OTP
router.post(
  "/send-otp",
  [body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email")],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address",
          errors: errors.array(),
        })
      }

      const { email } = req.body
      const otp = generateOTP()

      // Store OTP with expiration (5 minutes)
      otpStore.set(email, {
        otp,
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
        attempts: 0,
      })

      // Send OTP via email (mock for now)
      try {
        await sendOTPEmail(email, otp)
      } catch (emailError) {
        console.error("Email sending failed:", emailError)
        // For demo purposes, continue even if email fails
      }

      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      })
    } catch (error) {
      console.error("Send OTP error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to send OTP",
      })
    }
  },
)

// Verify OTP
router.post(
  "/verify-otp",
  [
    body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
    body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Invalid input",
          errors: errors.array(),
        })
      }

      const { email, otp } = req.body

      // Check if OTP exists and is valid
      const storedOTPData = otpStore.get(email)
      if (!storedOTPData) {
        return res.status(400).json({
          success: false,
          message: "OTP not found or expired",
        })
      }

      // Check if OTP is expired
      if (Date.now() > storedOTPData.expires) {
        otpStore.delete(email)
        return res.status(400).json({
          success: false,
          message: "OTP has expired",
        })
      }

      // Check attempts limit
      if (storedOTPData.attempts >= 3) {
        otpStore.delete(email)
        return res.status(400).json({
          success: false,
          message: "Too many failed attempts",
        })
      }

      // Verify OTP (allow demo OTP 123456)
      if (otp !== storedOTPData.otp && otp !== "123456") {
        storedOTPData.attempts += 1
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        })
      }

      // OTP is valid, remove from store
      otpStore.delete(email)

      // Find or create user
      let user = await User.findOne({ email })
      if (!user) {
        user = new User({
          email,
          isVerified: true,
          lastLogin: new Date(),
        })
        await user.save()
      } else {
        user.isVerified = true
        user.lastLogin = new Date()
        await user.save()
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      })

      res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        token,
        user: {
          id: user._id,
          email: user.email,
          isVerified: user.isVerified,
        },
      })
    } catch (error) {
      console.error("Verify OTP error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to verify OTP",
      })
    }
  },
)

// Admin login
router.post("/admin/login", [body("password").notEmpty().withMessage("Password is required")], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
        errors: errors.array(),
      })
    }

    const { password } = req.body

    // Check admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      })
    }

    // Generate admin JWT token
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
    })
  } catch (error) {
    console.error("Admin login error:", error)
    res.status(500).json({
      success: false,
      message: "Login failed",
    })
  }
})

// Verify token
router.get("/verify", async (req, res) => {
  try {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      })
    }

    const token = authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role === "admin") {
      return res.status(200).json({
        success: true,
        user: { role: "admin" },
      })
    }

    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        isVerified: user.isVerified,
      },
    })
  } catch (error) {
    console.error("Token verification error:", error)
    res.status(401).json({
      success: false,
      message: "Invalid token",
    })
  }
})

export default router
