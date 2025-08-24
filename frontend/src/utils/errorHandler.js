import toast from "react-hot-toast"

export const handleApiError = (error, defaultMessage = "Something went wrong") => {
  console.error("API Error:", error)

  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || error.response.statusText || defaultMessage
    toast.error(message)
    return message
  } else if (error.request) {
    // Network error
    const message = "Network error. Please check your connection."
    toast.error(message)
    return message
  } else {
    // Other error
    const message = error.message || defaultMessage
    toast.error(message)
    return message
  }
}

export const handleSuccess = (message, data = null) => {
  toast.success(message)
  return { message, data }
}

export const handleLoading = (message = "Loading...") => {
  return toast.loading(message)
}

export const dismissToast = (toastId) => {
  toast.dismiss(toastId)
}

// Form validation helpers
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === "") {
    toast.error(`${fieldName} is required`)
    return false
  }
  return true
}

export const validateMinLength = (value, minLength, fieldName) => {
  if (value.length < minLength) {
    toast.error(`${fieldName} must be at least ${minLength} characters`)
    return false
  }
  return true
}

export const validateMaxLength = (value, maxLength, fieldName) => {
  if (value.length > maxLength) {
    toast.error(`${fieldName} must be less than ${maxLength} characters`)
    return false
  }
  return true
}

export const validatePrice = (price) => {
  const numPrice = Number.parseFloat(price)
  if (isNaN(numPrice) || numPrice < 0) {
    toast.error("Price must be a valid positive number")
    return false
  }
  return true
}

export const validateStock = (stock) => {
  const numStock = Number.parseInt(stock)
  if (isNaN(numStock) || numStock < 0) {
    toast.error("Stock must be a valid non-negative number")
    return false
  }
  return true
}
