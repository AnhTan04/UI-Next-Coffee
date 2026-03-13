import React, { useEffect } from "react";
import MasterLayout from "@/components/layouts/MasterLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import {
  ProductHeader,
  ErrorAlert,
  FilterSection,
  LoadingSpinner,
  ProductGrid,
  EmptyState,
  ProductPagination,
} from "@/components/products";

// Hooks
import { useProductFilters } from "@/hooks";
import useCartStore from "../stores/cartStore";

// Stores
import useCategoryStore from "../stores/categoryStore";
import useProductStore from "../stores/productStore";

// Utils
import { formatPrice } from "@/utils/formatters";

const SanPham = () => {
  const { categories, fetchCategories } = useCategoryStore();
  const { products, pagination, loading: productsLoading, error: productsError } = useProductStore();
  const { addToCart, loading: cartLoading } = useCartStore();
  
  const {
    selectedCategory,
    searchTerm,
    currentPage,
    loading: filtersLoading,
    error: filtersError,
    hasActiveFilters,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    clearFilters,
    setError,
  } = useProductFilters();

  // Combine loading states
  const loading = productsLoading || filtersLoading;
  const error = productsError || filtersError;

  // Handle add to cart
  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng");
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchCategories();
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Có lỗi xảy ra khi tải danh mục sản phẩm.");
      }
    };

    fetchInitialData();
  }, [fetchCategories, setError]);

  // Calculate total pages
  const totalPages = pagination ? Math.ceil(pagination.total / 12) : 1;
  const totalProducts = pagination?.total || products.length;

  // Debug logging
  useEffect(() => {
    console.log("Products data:", {
      products: products.length,
      pagination,
      loading,
      error,
      selectedCategory,
      searchTerm,
      currentPage
    });
  }, [products, pagination, loading, error, selectedCategory, searchTerm, currentPage]);

  return (
    <MasterLayout>
      <div className="bg-gray-50 min-h-screen">
        <ProductHeader totalProducts={totalProducts} />

        <div className="container mx-auto px-6 py-8">
          <ErrorAlert error={error} onDismiss={() => setError(null)} />

          <FilterSection
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {loading && <LoadingSpinner />}

          {!loading && products.length > 0 && (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Hiển thị {products.length} sản phẩm {totalProducts > products.length && `trong tổng số ${totalProducts} sản phẩm`}
              </div>
              <ProductGrid
                products={products}
                onAddToCart={handleAddToCart}
                addingToCart={cartLoading}
                formatPrice={formatPrice}
              />
            </>
          )}

          {!loading && products.length === 0 && !error && (
            <EmptyState onReset={clearFilters} />
          )}

          {!loading && products.length > 0 && totalPages > 1 && (
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </MasterLayout>
  );
};

export default SanPham;
