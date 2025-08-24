"use client"

import { createContext, useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"
import apiService from "../services/api"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    try {
      const savedUser = localStorage.getItem("user")
      const savedToken = localStorage.getItem("token")

      if (savedUser && savedToken) {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        // Verify token is still valid
        verifyToken().catch(() => {
          // Token is invalid, logout user
          logout()
        })
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }, [])

  const login = (userData) => {
    try {
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      if (userData.token) {
        localStorage.setItem("token", userData.token)
      }
      toast.success(`Welcome back, ${userData.email}!`)
    } catch (error) {
      console.error("Error during login:", error)
      toast.error("Failed to save login information")
    }
  }

  const logout = () => {
    try {
      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      toast.success("Logged out successfully")
    } catch (error) {
      console.error("Error during logout:", error)
      toast.error("Error during logout")
    }
  }

  const sendOTP = async (email) => {
    try {
      const loadingToast = toast.loading("Sending OTP...")
      const response = await apiService.sendOTP(email)
      toast.dismiss(loadingToast)
      toast.success("OTP sent successfully! Check your email.")
      return response
    } catch (error) {
      console.error("Error sending OTP:", error)
      toast.error(error.message || "Failed to send OTP")
      throw error
    }
  }

  const verifyOTP = async (email, otp) => {
    try {
      const loadingToast = toast.loading("Verifying OTP...")
      const response = await apiService.verifyOTP(email, otp)
      toast.dismiss(loadingToast)

      if (response.success) {
        const userData = {
          email,
          token: response.token,
          ...response.user,
        }
        login(userData)
        return response
      } else {
        throw new Error(response.message || "Invalid OTP")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      toast.error(error.message || "Invalid OTP")
      throw error
    }
  }

  const verifyToken = async () => {
    try {
      const response = await apiService.verifyToken()
      return response
    } catch (error) {
      console.error("Token verification failed:", error)
      throw error
    }
  }

  const adminLogin = async (password) => {
    try {
      const loadingToast = toast.loading("Signing in...")
      const response = await apiService.adminLogin(password)
      toast.dismiss(loadingToast)

      if (response.success) {
        const userData = {
          email: "admin@vstore.com",
          role: "admin",
          token: response.token,
          ...response.admin,
        }
        login(userData)
        return response
      } else {
        throw new Error(response.message || "Invalid password")
      }
    } catch (error) {
      console.error("Admin login error:", error)
      toast.error(error.message || "Invalid admin password")
      throw error
    }
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    sendOTP,
    verifyOTP,
    adminLogin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
