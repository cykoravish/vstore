import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart from localStorage on app start
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      toast.error("Failed to load saved cart items");
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
      toast.error("Failed to save cart items");
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    try {
      if (!product || !product._id) {
        toast.error("Invalid product data");
        return;
      }

      if (product.stock !== undefined && product.stock < quantity) {
        toast.error(`Only ${product.stock} items available in stock`);
        return;
      }

      const productId = product.id || product._id;
      let toastMessage = "";

      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === productId);
        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          if (product.stock !== undefined && newQuantity > product.stock) {
            toast.error(
              `Cannot add more items. Only ${product.stock} available in stock`
            );
            return prev;
          }
        toastMessage = `Updated ${product.name} quantity in cart`
          return prev.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          );
        }
         toastMessage = `${product.name} added to cart`
        return [...prev, { ...product, id:productId ,quantity }];
      });
       if (toastMessage) toast.success(toastMessage)
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = (productId) => {
    try {
      const item = cartItems.find((item) => item.id === productId);
      if (item) {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
        toast.success(`${item.name} removed from cart`);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const updateQuantity = (productId, quantity) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      const item = cartItems.find((item) => item.id === productId);
      if (item && item.stock !== undefined && quantity > item.stock) {
        toast.error(`Only ${item.stock} items available in stock`);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update item quantity");
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const getCartTotal = () => {
    try {
      return cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    } catch (error) {
      console.error("Error calculating cart total:", error);
      return 0;
    }
  };

  const getCartItemsCount = () => {
    try {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    } catch (error) {
      console.error("Error calculating cart items count:", error);
      return 0;
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
