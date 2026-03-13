import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import useCartStore from "../stores/cartStore";
import { toast } from "react-toastify";

const useCart = () => {
  const router = useRouter();
  const {
    cartItems,
    total,
    getTotalItems,
    addToCart,
    fetchCartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [removingItems, setRemovingItems] = useState(new Set());
  const [updatingQuantity, setUpdatingQuantity] = useState(new Set());

  useEffect(() => {
    const loadCart = async () => {
      try {
        await fetchCartItems();
      } catch (error) {
        toast.error("Không thể tải giỏ hàng");
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }, []);

  const handleAddToCart = useCallback(
    async (product) => {
      if (product.stock === 0) {
        toast.warning("Sản phẩm đã hết hàng!");
        return;
      }

      try {
        setAddingToCart(product.id);

        const response = await addToCart(product.id, 1);

        if (response.success) {
          toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
        } else {
          toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
        }
      } catch (error) {
        const errorMessage =
          error.message || "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.";
        toast.error(errorMessage);

        try {
          await fetchCartItems();
        } catch (fetchError) {
          console.error("Failed to refresh cart after error:", fetchError);
        }
      } finally {
        setAddingToCart(null);
      }
    },
    [addToCart, fetchCartItems]
  );

  const handleRemoveProduct = useCallback(
    async (productId) => {
      try {
        setRemovingItems((prev) => new Set(prev).add(productId));
        await removeFromCart(productId);
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      } catch (error) {
        const errorMessage = error.message || "Lỗi khi xóa sản phẩm";
        toast.error(errorMessage);

        try {
          await fetchCartItems();
        } catch (fetchError) {
          console.error("Failed to refresh cart after error:", fetchError);
        }
      } finally {
        setRemovingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }
    },
    [removeFromCart, fetchCartItems]
  );

  const handleQuantityChange = useCallback(
    async (productId, newQuantity) => {
      console.log("🔄 handleQuantityChange called:", {
        productId,
        newQuantity,
      });
      if (newQuantity < 1) return;
      try {
        setUpdatingQuantity((prev) => new Set(prev).add(productId));
        console.log("📤 Calling updateQuantity API...");
        await updateQuantity(productId, newQuantity);
        console.log(
          "✅ updateQuantity API success - using returned data, no need to fetch"
        );

        toast.success("Đã cập nhật số lượng sản phẩm");
      } catch (error) {
        console.error("❌ handleQuantityChange error:", error);
        const errorMessage = error.message || "Lỗi khi cập nhật số lượng";
        toast.error(errorMessage);

        try {
          console.log("🔄 Fetching cart after error...");
          await fetchCartItems();
          console.log("✅ Cart fetched after error");
        } catch (fetchError) {
          console.error("❌ Failed to refresh cart after error:", fetchError);
        }
      } finally {
        setUpdatingQuantity((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        console.log("🏁 handleQuantityChange completed");
      }
    },
    [updateQuantity, fetchCartItems]
  );

  const handleQuantityInputChange = useCallback(
    async (productId, value) => {
      console.log("📝 handleQuantityInputChange called:", { productId, value });
      const newQuantity = parseInt(value);
      if (!isNaN(newQuantity) && newQuantity > 0) {
        // Now handleQuantityChange already includes fetchCartItems, so we don't need to call it again
        await handleQuantityChange(productId, newQuantity);
      } else if (value === "" || newQuantity === 0) {
        console.log("⚠️ Invalid quantity value, skipping:", value);
        return;
      }
      console.log("🏁 handleQuantityInputChange completed");
    },
    [handleQuantityChange]
  );

  const handleCheckout = useCallback(() => {
    router.push("/dat-hang");
  }, [router]);

  const handleClearCart = useCallback(async () => {
    try {
      await clearCart();
      toast.success("Đã xóa toàn bộ giỏ hàng");
    } catch (error) {
      const errorMessage = error.message || "Lỗi khi xóa giỏ hàng";
      toast.error(errorMessage);
    }
  }, [clearCart]);

  // Manual refresh cart function
  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      await fetchCartItems();
    } catch (error) {
      toast.error("Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  }, [fetchCartItems]);

  return {
    // Cart data
    cartItems,
    total,
    totalItems: getTotalItems(),

    // Loading states
    loading,
    addingToCart,
    removingItems,
    updatingQuantity,

    // Handlers
    handleAddToCart,
    handleRemoveProduct,
    handleQuantityChange,
    handleQuantityInputChange,
    handleCheckout,
    handleClearCart,
    refreshCart,

    // Utilities
    formatPrice,
  };
};

export default useCart;
