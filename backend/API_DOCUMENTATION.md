# VStore API Documentation

## Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## Response Format

All API responses follow this format:

\`\`\`json
{
  "success": true,
  "message": "Success message",
  "data": {
    // Response data
  }
}
\`\`\`

Error responses:
\`\`\`json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
\`\`\`

## Authentication Endpoints

### Send OTP
Send OTP to user's email for authentication.

**POST** `/auth/send-otp`

**Request Body:**
\`\`\`json
{
  "email": "user@example.com"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "OTP sent successfully"
}
\`\`\`

### Verify OTP
Verify OTP and authenticate user.

**POST** `/auth/verify-otp`

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "otp": "123456"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "OTP verified successfully",
  "token": "jwt-token-here",
  "user": {
    "email": "user@example.com",
    "role": "customer"
  }
}
\`\`\`

### Admin Login
Authenticate admin user with password.

**POST** `/auth/admin/login`

**Request Body:**
\`\`\`json
{
  "password": "admin-password"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Admin login successful",
  "token": "jwt-token-here",
  "admin": {
    "email": "admin@vstore.com",
    "role": "admin"
  }
}
\`\`\`

## Product Endpoints

### Get All Products
Retrieve products with optional filtering and pagination.

**GET** `/products`

**Query Parameters:**
- `category` (string): Filter by category
- `search` (string): Search in name and description
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `sortBy` (string): Sort field (default: "createdAt")
- `sortOrder` (string): "asc" or "desc" (default: "desc")
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "product-id",
        "name": "Product Name",
        "description": "Product description",
        "price": 99.99,
        "originalPrice": 129.99,
        "category": "Electronics",
        "images": [
          {
            "url": "https://cloudinary-url",
            "public_id": "image-id"
          }
        ],
        "stock": 50,
        "ratings": {
          "average": 4.5,
          "count": 128
        },
        "featured": true,
        "status": "active",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalProducts": 60,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
\`\`\`

### Get Single Product
Retrieve a specific product by ID.

**GET** `/products/:id`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "_id": "product-id",
    "name": "Product Name",
    // ... other product fields
  }
}
\`\`\`

### Get Featured Products
Retrieve featured products.

**GET** `/products/featured/list`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "_id": "product-id",
      "name": "Featured Product",
      // ... other product fields
    }
  ]
}
\`\`\`

### Get Categories
Retrieve all product categories.

**GET** `/products/categories/list`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports"
  ]
}
\`\`\`

### Create Product (Admin Only)
Create a new product with optional image upload.

**POST** `/products`

**Headers:**
\`\`\`
Authorization: Bearer <admin-jwt-token>
Content-Type: multipart/form-data
\`\`\`

**Form Data:**
- `name` (string): Product name
- `description` (string): Product description
- `price` (number): Product price
- `originalPrice` (number): Original price (optional)
- `category` (string): Product category
- `stock` (number): Stock quantity
- `featured` (boolean): Is featured product
- `images` (files): Product images (max 5)

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    // Created product data
  }
}
\`\`\`

### Update Product (Admin Only)
Update an existing product.

**PUT** `/products/:id`

**Headers:**
\`\`\`
Authorization: Bearer <admin-jwt-token>
Content-Type: multipart/form-data
\`\`\`

**Form Data:** Same as create product

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    // Updated product data
  }
}
\`\`\`

### Delete Product (Admin Only)
Delete a product.

**DELETE** `/products/:id`

**Headers:**
\`\`\`
Authorization: Bearer <admin-jwt-token>
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Product deleted successfully"
}
\`\`\`

## Order Endpoints

### Create Order
Create a new order.

**POST** `/orders`

**Request Body:**
\`\`\`json
{
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  },
  "items": [
    {
      "productId": "product-id",
      "name": "Product Name",
      "price": 99.99,
      "quantity": 2,
      "image": "image-url"
    }
  ],
  "paymentMethod": "razorpay",
  "paymentDetails": {
    "razorpay_order_id": "order-id",
    "razorpay_payment_id": "payment-id",
    "razorpay_signature": "signature"
  },
  "totalAmount": 199.98
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "order-id",
    "orderNumber": "ORD-001",
    "status": "confirmed",
    // ... other order fields
  }
}
\`\`\`

### Get Orders (Admin Only)
Retrieve all orders with optional filtering.

**GET** `/orders`

**Headers:**
\`\`\`
Authorization: Bearer <admin-jwt-token>
\`\`\`

**Query Parameters:**
- `status` (string): Filter by order status
- `page` (number): Page number
- `limit` (number): Items per page

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "orders": [
      {
        "_id": "order-id",
        "orderNumber": "ORD-001",
        "customerInfo": {
          "name": "John Doe",
          "email": "john@example.com"
        },
        "totalAmount": 199.98,
        "status": "confirmed",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      // ... pagination info
    }
  }
}
\`\`\`

### Update Order Status (Admin Only)
Update order status and tracking information.

**PATCH** `/orders/:id/status`

**Headers:**
\`\`\`
Authorization: Bearer <admin-jwt-token>
\`\`\`

**Request Body:**
\`\`\`json
{
  "status": "shipped",
  "trackingNumber": "TRK123456789"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    // Updated order data
  }
}
\`\`\`

## Payment Endpoints

### Create Payment Order
Create a Razorpay order for payment processing.

**POST** `/payments/create-order`

**Request Body:**
\`\`\`json
{
  "amount": 19998,
  "currency": "INR"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "order_razorpay_id",
    "amount": 19998,
    "currency": "INR",
    "status": "created"
  }
}
\`\`\`

### Verify Payment
Verify Razorpay payment signature.

**POST** `/payments/verify`

**Request Body:**
\`\`\`json
{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id",
  "razorpay_signature": "signature"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Payment verified successfully"
}
\`\`\`

## Admin Dashboard Endpoints

### Get Dashboard Stats (Admin Only)
Retrieve dashboard statistics.

**GET** `/admin/dashboard/stats`

**Headers:**
\`\`\`
Authorization: Bearer <admin-jwt-token>
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "totalOrders": 150,
    "totalRevenue": 15000,
    "totalProducts": 50,
    "totalCustomers": 100,
    "recentOrders": [
      // Recent orders data
    ]
  }
}
\`\`\`

### Get Sales Data (Admin Only)
Retrieve sales analytics data.

**GET** `/admin/dashboard/sales`

**Headers:**
\`\`\`
Authorization: Bearer <admin-jwt-token>
\`\`\`

**Query Parameters:**
- `period` (string): "week", "month", "year" (default: "week")

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "salesData": [
      {
        "date": "2024-01-01",
        "sales": 1500,
        "orders": 10
      }
    ],
    "totalSales": 15000,
    "totalOrders": 100
  }
}
\`\`\`

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Internal Server Error |

## Rate Limiting

The API implements rate limiting:
- 100 requests per 15 minutes per IP address
- Exceeded requests will receive a 429 status code

## File Upload

### Image Upload Guidelines
- **Supported formats:** JPG, JPEG, PNG, WebP
- **Maximum file size:** 5MB per image
- **Maximum files:** 5 images per product
- **Automatic optimization:** Images are automatically resized and optimized by Cloudinary

### Upload Response
\`\`\`json
{
  "success": true,
  "data": {
    "images": [
      {
        "url": "https://res.cloudinary.com/...",
        "public_id": "ecommerce-products/abc123"
      }
    ]
  }
}
