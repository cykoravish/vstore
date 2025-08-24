# VStore Online - Full Stack E-commerce Platform

A modern, responsive e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring customer shopping experience and comprehensive admin panel.

## 🚀 Features

### Customer Features
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Product Browsing**: Advanced filtering, search, and categorization
- **Shopping Cart**: Add/remove items with real-time updates
- **OTP Authentication**: Secure email-based login system
- **Checkout Process**: 3-step checkout with address collection
- **Payment Integration**: Razorpay online payments + Cash on Delivery
- **Order Tracking**: Real-time order status updates
- **Responsive Design**: Optimized for all device sizes

### Admin Features
- **Dashboard**: Sales analytics, order management, product statistics
- **Product Management**: CRUD operations with image upload to Cloudinary
- **Order Management**: View, update order status, tracking numbers
- **Customer Management**: View customer data and order history
- **Analytics**: Sales charts and popular product insights
- **Secure Access**: Password-based admin authentication

### Technical Features
- **ESM Modules**: Modern JavaScript import/export syntax
- **Image Upload**: Direct Cloudinary integration with Multer
- **Toast Notifications**: User-friendly feedback system
- **Error Handling**: Comprehensive error boundaries and validation
- **API Integration**: RESTful API with proper error handling
- **State Management**: React Context API for global state
- **Form Validation**: Client-side and server-side validation

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Cloudinary** - Image storage and optimization
- **Multer** - File upload middleware
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Razorpay** - Payment gateway

## 📁 Project Structure

\`\`\`
ecomm-vstore/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── admin/       # Admin-specific components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── cart/        # Shopping cart components
│   │   │   └── checkout/    # Checkout flow components
│   │   ├── contexts/        # React Context providers
│   │   ├── pages/           # Page components
│   │   │   └── admin/       # Admin panel pages
│   │   ├── services/        # API service functions
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main app component
│   ├── .env                 # Environment variables
│   ├── package.json         # Dependencies and scripts
│   └── vite.config.js       # Vite configuration
├── backend/                 # Node.js backend application
│   ├── config/              # Configuration files
│   ├── middleware/          # Express middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API route handlers
│   ├── utils/               # Utility functions
│   ├── .env                 # Environment variables
│   ├── package.json         # Dependencies and scripts
│   └── server.js            # Express server entry point
└── README.md               # Project documentation
\`\`\`

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ecomm-vstore
   \`\`\`

2. **Backend Setup**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

   Create `.env` file in backend directory:
   \`\`\`env
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ADMIN_PASSWORD=your_admin_password
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Email Configuration (for OTP)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Razorpay Configuration
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   \`\`\`

3. **Frontend Setup**
   \`\`\`bash
   cd ../frontend
   npm install
   \`\`\`

   Create `.env` file in frontend directory:
   \`\`\`env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   VITE_APP_NAME=VStore Online
   \`\`\`

4. **Start Development Servers**

   Backend (Terminal 1):
   \`\`\`bash
   cd backend
   npm run dev
   \`\`\`

   Frontend (Terminal 2):
   \`\`\`bash
   cd frontend
   npm run dev
   \`\`\`

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:5173/admin

## 📚 API Documentation

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/send-otp` | Send OTP to email | `{ email }` |
| POST | `/verify-otp` | Verify OTP and login | `{ email, otp }` |
| POST | `/admin/login` | Admin login | `{ password }` |
| GET | `/verify` | Verify JWT token | Headers: `Authorization: Bearer <token>` |

### Product Routes (`/api/products`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all products with filters | No |
| GET | `/:id` | Get single product | No |
| GET | `/featured/list` | Get featured products | No |
| GET | `/categories/list` | Get product categories | No |
| POST | `/` | Create new product | Admin |
| PUT | `/:id` | Update product | Admin |
| DELETE | `/:id` | Delete product | Admin |
| PATCH | `/:id/stock` | Update product stock | Admin |
| POST | `/:id/images` | Upload product images | Admin |

### Order Routes (`/api/orders`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all orders | Admin |
| POST | `/` | Create new order | No |
| GET | `/:id` | Get single order | No |
| PATCH | `/:id/status` | Update order status | Admin |

### Payment Routes (`/api/payments`)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/create-order` | Create Razorpay order | `{ amount, currency }` |
| POST | `/verify` | Verify payment | `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }` |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/dashboard/stats` | Get dashboard statistics | Admin |
| GET | `/dashboard/sales` | Get sales data | Admin |

## 🎨 Frontend Routes

### Customer Routes
- `/` - Homepage with hero, categories, featured products
- `/products` - Product catalog with filtering and search
- `/products/:id` - Product detail page
- `/cart` - Shopping cart page
- `/checkout` - 3-step checkout process
- `/order-confirmation/:orderId` - Order confirmation page
- `/about` - About us page
- `/contact` - Contact page

### Admin Routes
- `/admin` - Admin login page
- `/admin/dashboard` - Admin dashboard with analytics
- `/admin/products` - Product management (CRUD)
- `/admin/orders` - Order management and tracking

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
\`\`\`env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Authentication
JWT_SECRET=your-super-secret-jwt-key
ADMIN_PASSWORD=your-admin-password

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Service (OTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment Gateway
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret
\`\`\`

#### Frontend (.env)
\`\`\`env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Payment Gateway
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx

# App Configuration
VITE_APP_NAME=VStore Online
\`\`\`

## 🚀 Deployment

### Backend Deployment (Railway/Heroku/DigitalOcean)

1. **Build the application**
   \`\`\`bash
   cd backend
   npm install --production
   \`\`\`

2. **Set environment variables** in your hosting platform

3. **Deploy using your preferred method**

### Frontend Deployment (Vercel/Netlify)

1. **Build the application**
   \`\`\`bash
   cd frontend
   npm run build
   \`\`\`

2. **Set environment variables** in your hosting platform

3. **Deploy the `dist` folder**

### Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist your IP addresses
4. Get the connection string and add to `MONGODB_URI`

### Image Storage (Cloudinary)

1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Add to environment variables

## 🧪 Testing

### Demo Credentials

**Admin Login:**
- Password: Set in `ADMIN_PASSWORD` environment variable

**Customer OTP:**
- Any email address
- OTP: `123456` (demo mode)

### Test Payment

Use Razorpay test credentials:
- Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@vstore.com or create an issue in the repository.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Cloudinary for image management
- Razorpay for payment processing
- MongoDB for the database solution
