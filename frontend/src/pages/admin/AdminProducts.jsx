"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, Eye, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { getProducts, deleteProduct, createProduct } from "../../services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    images: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();

      if (response.success) {
        setProducts(response.data.products || response.data);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.error("Products fetch error:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await deleteProduct(productId);
        if (response.success) {
          toast.success("Product deleted successfully");
          fetchProducts(); // Refresh the list
        } else {
          toast.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Delete product error:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.stock
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setAddingProduct(true);
      // const formData = new FormData();

      // formData.append("name", newProduct.name);
      // formData.append("description", newProduct.description);
      // formData.append("price", Number.parseFloat(newProduct.price));
      // formData.append(
      //   "originalPrice",
      //   newProduct.originalPrice
      //     ? Number.parseFloat(newProduct.originalPrice)
      //     : Number.parseFloat(newProduct.price)
      // );
      // formData.append("category", newProduct.category);
      // formData.append("stock", Number.parseInt(newProduct.stock));

      // Add images if any
      // newProduct.images.forEach((image, index) => {
      //   formData.append("images", image);
      // });
      const response = await createProduct(newProduct, newProduct.images);

      if (response.success) {
        toast.success("Product added successfully");
        setShowAddModal(false);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          originalPrice: "",
          category: "",
          stock: "",
          images: [],
        });
        fetchProducts(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Add product error:", error);
      toast.error("Failed to add product");
    } finally {
      setAddingProduct(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const categories = [
    "all",
    "Electronics",
    "Clothing",
    "Sports",
    "Home & Garden",
    "Books",
    "Beauty",
    "Toys",
    "Automotive",
    "Other",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getStockColor = (stock) => {
    if (stock === 0) return "text-red-600";
    if (stock < 20) return "text-yellow-600";
    return "text-green-600";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 border-b animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Products
          </h1>
          <p className="text-gray-600">
            Manage your product inventory and listings
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">
                  Product
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">
                  Category
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">
                  Price
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">
                  Stock
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">
                  Rating
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.images?.[0]?.url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {product._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{product.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`font-medium ${getStockColor(product.stock)}`}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : `${product.stock} units`}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-900">
                        {product.ratings?.average?.toFixed(1) || "0.0"}
                      </span>
                      <span className="text-gray-500">
                        ({product.ratings?.count || 0})
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-700 p-1">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Product
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories
                        .filter((cat) => cat !== "all")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.originalPrice}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          originalPrice: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          stock: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {newProduct.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {newProduct.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={
                              URL.createObjectURL(image) || "/placeholder.svg"
                            }
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addingProduct}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                  >
                    {addingProduct ? "Adding..." : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
