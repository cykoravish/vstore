# VStore Frontend Documentation

## Overview

The VStore frontend is a modern React application built with Vite, featuring a responsive design, smooth animations, and comprehensive e-commerce functionality.

## Technology Stack

- **React 18** - UI library with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Axios** - HTTP client (via custom API service)

## Project Structure

\`\`\`
frontend/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   └── favicon.ico        # Favicon
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── admin/         # Admin panel components
│   │   ├── auth/          # Authentication components
│   │   ├── cart/          # Shopping cart components
│   │   ├── checkout/      # Checkout process components
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin panel pages
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── ProductDetail.jsx
│   │   └── Products.jsx
│   ├── services/          # API service functions
│   │   └── api.js
│   ├── utils/             # Utility functions
│   │   ├── constants.js
│   │   └── errorHandler.js
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles and Tailwind imports
│   └── main.jsx           # Application entry point
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite configuration
\`\`\`

## Component Architecture

### Context Providers

#### AuthContext
Manages user authentication state and provides authentication methods.

**State:**
- `user` - Current user object
- `loading` - Authentication loading state
- `isAuthenticated` - Boolean authentication status
- `isAdmin` - Boolean admin status

**Methods:**
- `login(userData)` - Login user and store session
- `logout()` - Logout user and clear session
- `sendOTP(email)` - Send OTP to email
- `verifyOTP(email, otp)` - Verify OTP and login
- `adminLogin(password)` - Admin authentication

#### CartContext
Manages shopping cart state and operations.

**State:**
- `cartItems` - Array of cart items
- `getCartTotal()` - Calculate total price
- `getCartItemsCount()` - Get total item count

**Methods:**
- `addToCart(product, quantity)` - Add item to cart
- `removeFromCart(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Clear all cart items

### Page Components

#### Home (`/`)
- Hero section with call-to-action
- Category showcase
- Featured products grid
- Newsletter signup

#### Products (`/products`)
- Product grid with pagination
- Advanced filtering (category, price, search)
- Sorting options
- Responsive layout

#### ProductDetail (`/products/:id`)
- Product image gallery
- Detailed product information
- Add to cart functionality
- Related products

#### Cart (`/cart`)
- Cart items list
- Quantity controls
- Price calculations
- Checkout button

#### Checkout (`/checkout`)
Three-step checkout process:
1. **Cart Review** - Order summary and item verification
2. **Shipping Info** - Customer details and address form
3. **Payment** - Payment method selection and processing

#### Admin Pages (`/admin/*`)
- **Dashboard** - Analytics and overview
- **Products** - Product management (CRUD)
- **Orders** - Order management and tracking

### Component Guidelines

#### Naming Conventions
- **Components:** PascalCase (e.g., `ProductCard.jsx`)
- **Files:** PascalCase for components, camelCase for utilities
- **Props:** camelCase
- **CSS Classes:** Tailwind utility classes

#### Component Structure
\`\`\`jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from 'lucide-react'

const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(initialValue)
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies])
  
  // Event handlers
  const handleEvent = () => {
    // Handler logic
  }
  
  // Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="responsive-classes"
    >
      {/* Component content */}
    </motion.div>
  )
}

export default ComponentName
\`\`\`

## Styling Guidelines

### Tailwind CSS Usage

#### Responsive Design
\`\`\`jsx
// Mobile-first approach
<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
  {/* Content */}
</div>
\`\`\`

#### Color Scheme
- **Primary:** Orange (orange-600, orange-500)
- **Secondary:** Gray (gray-100 to gray-900)
- **Success:** Green (green-500)
- **Error:** Red (red-500)
- **Warning:** Yellow (yellow-500)

#### Common Patterns
\`\`\`jsx
// Button styles
<button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200">
  Button Text
</button>

// Card styles
<div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
  {/* Card content */}
</div>

// Input styles
<input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
\`\`\`

### Animation Guidelines

#### Framer Motion Patterns
\`\`\`jsx
// Page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {/* Page content */}
</motion.div>

// Hover animations
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  {/* Interactive element */}
</motion.div>

// Stagger animations
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map((item, index) => (
    <motion.div
      key={index}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>
\`\`\`

## State Management

### Context API Usage

#### Provider Setup
\`\`\`jsx
// App.jsx
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* App content */}
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}
\`\`\`

#### Context Consumption
\`\`\`jsx
// In components
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

const Component = () => {
  const { user, login, logout } = useAuth()
  const { cartItems, addToCart } = useCart()
  
  // Component logic
}
\`\`\`

### Local Storage Integration

#### Persistent State
- **Cart items** - Automatically saved and restored
- **User session** - JWT token and user data
- **Preferences** - Theme, language settings

## API Integration

### Service Layer
\`\`\`jsx
// services/api.js
class ApiService {
  async request(endpoint, options = {}) {
    // Request implementation with error handling
  }
  
  async uploadRequest(endpoint, formData, options = {}) {
    // File upload implementation
  }
  
  // Specific API methods
  async getProducts(params) { /* ... */ }
  async createProduct(data, images) { /* ... */ }
}

export default new ApiService()
\`\`\`

### Error Handling
\`\`\`jsx
// utils/errorHandler.js
export const handleApiError = (error, defaultMessage) => {
  // Centralized error handling with toast notifications
}

// Usage in components
try {
  const data = await apiService.getProducts()
  setProducts(data)
} catch (error) {
  handleApiError(error, 'Failed to load products')
}
\`\`\`

## Form Handling

### Form Validation
\`\`\`jsx
import { validateEmail, validateRequired } from '../utils/errorHandler'

const FormComponent = () => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    const newErrors = {}
    if (!validateRequired(formData.email, 'Email')) {
      newErrors.email = 'Email is required'
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Submit form
    handleFormSubmit(formData)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
\`\`\`

## Performance Optimization

### Code Splitting
\`\`\`jsx
import { lazy, Suspense } from 'react'

// Lazy load components
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <AdminDashboard />
</Suspense>
\`\`\`

### Image Optimization
\`\`\`jsx
// Responsive images with loading states
<img
  src={product.images?.[0]?.url || '/placeholder.svg'}
  alt={product.name}
  className="w-full h-64 object-cover"
  loading="lazy"
  onError={(e) => {
    e.target.src = '/placeholder.svg'
  }}
/>
\`\`\`

### Memoization
\`\`\`jsx
import { memo, useMemo, useCallback } from 'react'

// Memoized component
const ProductCard = memo(({ product, onAddToCart }) => {
  // Component implementation
})

// Memoized values
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// Memoized callbacks
const handleClick = useCallback(() => {
  onAddToCart(product)
}, [product, onAddToCart])
\`\`\`

## Testing Guidelines

### Component Testing
\`\`\`jsx
// Example test structure
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99
  }
  
  test('renders product information', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })
})
\`\`\`

## Deployment

### Build Process
\`\`\`bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

### Environment Variables
\`\`\`env
# .env
VITE_API_BASE_URL=https://api.vstore.com/api
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
VITE_APP_NAME=VStore Online
\`\`\`

### Deployment Checklist
- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] SEO meta tags added
- [ ] Performance optimized
- [ ] Security headers configured

## Best Practices

### Code Organization
- Keep components small and focused
- Use custom hooks for complex logic
- Separate business logic from UI components
- Follow consistent naming conventions

### Performance
- Use React.memo for expensive components
- Implement proper loading states
- Optimize images and assets
- Use code splitting for large components

### Accessibility
- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios

### Security
- Sanitize user inputs
- Validate data on both client and server
- Use HTTPS in production
- Implement proper error boundaries
