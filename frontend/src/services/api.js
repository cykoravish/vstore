const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    const token = localStorage.getItem("token") || localStorage.getItem("adminToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "API request failed")
      }

      return data
    } catch (error) {
      console.error("API Error:", error)
      throw error
    }
  }

  async uploadRequest(endpoint, formData, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      method: "POST",
      body: formData,
      headers: {
        ...options.headers,
      },
      ...options,
    }

    const token = localStorage.getItem("token") || localStorage.getItem("adminToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Upload request failed")
      }

      return data
    } catch (error) {
      console.error("Upload Error:", error)
      throw error
    }
  }

  // Auth endpoints
  async sendOTP(email) {
    return this.request("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async verifyOTP(email, otp) {
    return this.request("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    })
  }

  async adminLogin(password) {
    return this.request("/auth/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    })
  }

  async verifyToken() {
    return this.request("/auth/verify")
  }

  // Product endpoints
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/products${queryString ? `?${queryString}` : ""}`)
  }

  async getProduct(id) {
    return this.request(`/products/${id}`)
  }

  async getFeaturedProducts() {
    return this.request("/products/featured/list")
  }

  async getCategories() {
    return this.request("/products/categories/list")
  }

  async createProduct(productData, images = []) {
    const formData = new FormData()

    // Add product data
    Object.keys(productData).forEach((key) => {
      if (key !== "images") {
        formData.append(key, productData[key])
      }
    })

    // Add images
    images.forEach((image) => {
      formData.append("images", image)
    })

    return this.uploadRequest("/products", formData)
  }

  async updateProduct(id, productData, images = [], keepExisting = true) {
    const formData = new FormData()

    // Add product data
    Object.keys(productData).forEach((key) => {
      if (key !== "images") {
        formData.append(key, productData[key])
      }
    })

    // Add keep existing images flag
    formData.append("keepExistingImages", keepExisting.toString())

    // Add new images
    images.forEach((image) => {
      formData.append("images", image)
    })

    return this.uploadRequest(`/products/${id}`, formData, { method: "PUT" })
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: "DELETE",
    })
  }

  async updateProductStock(id, stock) {
    return this.request(`/products/${id}/stock`, {
      method: "PATCH",
      body: JSON.stringify({ stock }),
    })
  }

  // Order endpoints
  async createOrder(orderData) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/orders${queryString ? `?${queryString}` : ""}`)
  }

  async getOrder(id) {
    return this.request(`/orders/${id}`)
  }

  async updateOrderStatus(id, status, trackingNumber) {
    return this.request(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, trackingNumber }),
    })
  }

  // Payment endpoints
  async createPaymentOrder(amount, currency = "INR") {
    return this.request("/payments/create-order", {
      method: "POST",
      body: JSON.stringify({ amount, currency }),
    })
  }

  async verifyPayment(paymentData) {
    return this.request("/payments/verify", {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  }

  // Admin endpoints
  async getDashboardStats() {
    return this.request("/admin/dashboard/stats")
  }

  async getSalesData(period = "week") {
    return this.request(`/admin/dashboard/sales?period=${period}`)
  }

  async getAdminCustomers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/admin/customers${queryString ? `?${queryString}` : ""}`)
  }

  async getSalesAnalytics(period = "30d") {
    return this.request(`/admin/analytics/sales?period=${period}`)
  }

  async updateSiteSettings(settings) {
    return this.request("/admin/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    })
  }

  async bulkUpdateProducts(productIds, updates) {
    return this.request("/admin/products/bulk-update", {
      method: "POST",
      body: JSON.stringify({ productIds, updates }),
    })
  }

  async bulkDeleteProducts(productIds) {
    return this.request("/admin/products/bulk-delete", {
      method: "DELETE",
      body: JSON.stringify({ productIds }),
    })
  }
}

const apiService = new ApiService()

export const sendOTP = apiService.sendOTP.bind(apiService)
export const verifyOTP = apiService.verifyOTP.bind(apiService)
export const adminLogin = apiService.adminLogin.bind(apiService)
export const verifyToken = apiService.verifyToken.bind(apiService)
export const getProducts = apiService.getProducts.bind(apiService)
export const getProduct = apiService.getProduct.bind(apiService)
export const getFeaturedProducts = apiService.getFeaturedProducts.bind(apiService)
export const getCategories = apiService.getCategories.bind(apiService)
export const createProduct = apiService.createProduct.bind(apiService)
export const updateProduct = apiService.updateProduct.bind(apiService)
export const deleteProduct = apiService.deleteProduct.bind(apiService)
export const updateProductStock = apiService.updateProductStock.bind(apiService)
export const createOrder = apiService.createOrder.bind(apiService)
export const getOrders = apiService.getOrders.bind(apiService)
export const getOrder = apiService.getOrder.bind(apiService)
export const updateOrderStatus = apiService.updateOrderStatus.bind(apiService)
export const createPaymentOrder = apiService.createPaymentOrder.bind(apiService)
export const verifyPayment = apiService.verifyPayment.bind(apiService)
export const getDashboardStats = apiService.getDashboardStats.bind(apiService)
export const getSalesData = apiService.getSalesData.bind(apiService)
export const getAdminCustomers = apiService.getAdminCustomers.bind(apiService)
export const getSalesAnalytics = apiService.getSalesAnalytics.bind(apiService)
export const updateSiteSettings = apiService.updateSiteSettings.bind(apiService)
export const bulkUpdateProducts = apiService.bulkUpdateProducts.bind(apiService)
export const bulkDeleteProducts = apiService.bulkDeleteProducts.bind(apiService)

export default apiService