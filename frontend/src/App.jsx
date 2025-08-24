import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import About from "./pages/About"
import Contact from "./pages/Contact"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminCustomers from "./pages/admin/AdminCustomers"
import AdminSettings from "./pages/admin/AdminSettings"
import OrderConfirmation from "./pages/OrderConfirmation"
import ErrorBoundary from "./components/ErrorBoundary"
import AdminLayout from "./components/admin/AdminLayout"

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50">
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "#fff",
                    color: "#374151",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "16px",
                    fontSize: "14px",
                    fontWeight: "500",
                  },
                  success: {
                    iconTheme: {
                      primary: "#10b981",
                      secondary: "#fff",
                    },
                    style: {
                      border: "1px solid #10b981",
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: "#ef4444",
                      secondary: "#fff",
                    },
                    style: {
                      border: "1px solid #ef4444",
                    },
                  },
                  loading: {
                    iconTheme: {
                      primary: "#f97316",
                      secondary: "#fff",
                    },
                    style: {
                      border: "1px solid #f97316",
                    },
                  },
                }}
              />

              <Routes>
                {/* Admin Login Route (without layout) */}
                <Route path="/admin" element={<AdminLogin />} />

                {/* Admin Routes (with AdminLayout) */}
                <Route
                  path="/admin/*"
                  element={
                    <AdminLayout>
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="customers" element={<AdminCustomers />} />
                        <Route path="settings" element={<AdminSettings />} />
                      </Routes>
                    </AdminLayout>
                  }
                />

                {/* Customer Routes */}
                <Route
                  path="/*"
                  element={
                    <>
                      <Navbar />
                      <main className="min-h-screen">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/products/:id" element={<ProductDetail />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/contact" element={<Contact />} />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  }
                />
              </Routes>
            </div>
          </CartProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
