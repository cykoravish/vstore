import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="font-heading font-bold text-xl">VStore</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted online shopping destination for quality products at unbeatable prices. Shop with confidence
              and enjoy fast, reliable delivery.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                Products
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Customer Service</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                Help Center
              </a>
              <a href="#" className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                Shipping Info
              </a>
              <a href="#" className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                Returns & Exchanges
              </a>
              <a href="#" className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                Size Guide
              </a>
              <a href="#" className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                Track Your Order
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-gray-300 text-sm">support@vstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 Commerce Street
                  <br />
                  Business District, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 VStore. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
