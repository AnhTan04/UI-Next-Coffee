import { create } from "zustand";
import api from "../configs/api";

const useCartStore = create((set, get) => ({
  // Cart state
  cartItems: [],
  total: 0,

  // Computed property for total items count
  getTotalItems: () => {
    const state = get();
    return state.cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post("/carts/add", {
        productId,
        quantity,
      });

      if (response.data.success) {
        set((state) => {
          const updatedItems = [...state.cartItems];
          const existingItemIndex = updatedItems.findIndex(
            (item) => item.productId === productId
          );

          const newItem = response.data.data;

          if (existingItemIndex !== -1) {
            updatedItems[existingItemIndex] = newItem;
          } else {
            updatedItems.push(newItem);
          }

          const newTotal = updatedItems.reduce((acc, item) => {
            const price = item.product?.price || 0;
            return acc + parseFloat(price) * item.quantity;
          }, 0);

          return {
            cartItems: updatedItems,
            total: newTotal,
          };
        });
        return response.data;
      }

      throw new Error(response.data.message || "Failed to add item to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Extract message from API response if available
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Fetch cart items
  fetchCartItems: async (sessionId = null) => {
    console.log('🏪 CartStore.fetchCartItems called:', { sessionId });
    try {
      const url = sessionId ? `/carts?sessionId=${sessionId}` : "/carts";
      const response = await api.get(url);

      if (response.data.success) {
        const { items = [], total = 0 } = response.data.data;
        console.log('✅ CartStore.fetchCartItems API success:', { itemsCount: items.length, total });
        set({
          cartItems: items,
          total: parseFloat(total),
        });
        console.log('🔄 CartStore.fetchCartItems state updated');
        return response.data;
      }

      throw new Error(response.data.message || "Failed to fetch cart items");
    } catch (error) {
      console.error('❌ CartStore.fetchCartItems error:', error);
      // Extract message from API response if available
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  updateQuantity: async (productId, quantity) => {
    console.log('🏪 CartStore.updateQuantity called:', { productId, quantity });
    try {
      const response = await api.put(`/carts/item/${productId}`, {
        quantity,
      });

      if (response.data.success) {
        console.log('✅ CartStore.updateQuantity API success:', response.data);
        set((state) => {
          const apiData = response.data.data;
          
          const transformedItem = {
            id: apiData.id,
            sessionId: apiData.sessionId,
            userId: apiData.userId,
            productId: apiData.productId,
            quantity: apiData.quantity,
            createdAt: apiData.createdAt,
            updatedAt: apiData.updatedAt,
            product: {
              name: apiData.name,
              price: apiData.price,
              image: apiData.image
            }
          };
          
          console.log('🔄 Transformed item structure:', transformedItem);
          
          const updatedItems = state.cartItems.map((item) =>
            item.productId === productId ? transformedItem : item
          );

          const newTotal = updatedItems.reduce((acc, item) => {
            const price = item.product?.price || 0;
            return acc + parseFloat(price) * item.quantity;
          }, 0);

          console.log('🔄 CartStore.updateQuantity state updated:', { updatedItems: updatedItems.length, newTotal });
          return {
            cartItems: updatedItems,
            total: newTotal,
          };
        });
        return response.data;
      }

      throw new Error(
        response.data.message || "Failed to update item quantity"
      );
    } catch (error) {
      console.error('❌ CartStore.updateQuantity error:', error);
      // Extract message from API response if available
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    try {
      const response = await api.delete(`/carts/item/${productId}`);

      if (response.data.success) {
        set((state) => {
          const updatedItems = state.cartItems.filter(
            (item) => item.productId !== productId
          );
          const newTotal = updatedItems.reduce((acc, item) => {
            const price = item.product?.price || 0;
            return acc + parseFloat(price) * item.quantity;
          }, 0);

          return {
            cartItems: updatedItems,
            total: newTotal,
          };
        });
        return response.data;
      }

      throw new Error(
        response.data.message || "Failed to remove item from cart"
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Extract message from API response if available
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await api.delete("/carts");

      if (response.data.success) {
        set({ cartItems: [], total: 0 });
        return response.data;
      }

      throw new Error(response.data.message || "Failed to clear cart");
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Extract message from API response if available
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Reset store to initial state (local only, no API call)
  resetCart: () => {
    set({ cartItems: [], total: 0 });
  },
}));

export default useCartStore;
