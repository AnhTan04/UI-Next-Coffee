import { useState, useEffect, useCallback } from "react";
import useProductStore from "../stores/productStore";

// Debounce utility function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const useProductFilters = (limit = 12) => {
  const { 
    fetchProducts, 
    loading, 
    error, 
    clearError,
    setLoading,
    setError 
  } = useProductStore();
  
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery, categoryId, page) => {
      try {
        clearError();
        
        const categoryIdParam = categoryId && categoryId !== "Tất cả" ? categoryId : null;
        const searchParam = searchQuery && searchQuery.trim() ? searchQuery.trim() : '';
        
        await fetchProducts(
          page, 
          categoryIdParam, 
          limit, 
          searchParam, 
          true, // isActive
          true  // includeImages
        );
      } catch (err) {
        setError("Có lỗi xảy ra khi tìm kiếm sản phẩm.");
      }
    }, 500),
    [fetchProducts, clearError, setError]
  );

  // Handle search and filter changes
  useEffect(() => {
    if (searchTerm || selectedCategory !== "Tất cả" || currentPage > 1) {
      debouncedSearch(
        searchTerm,
        selectedCategory !== "Tất cả" ? selectedCategory : null,
        currentPage
      );
    } else {
      fetchProducts(1, null, limit, '', true, true);
    }
  }, [
    searchTerm,
    selectedCategory,
    currentPage,
    debouncedSearch,
    fetchProducts,
    limit,
  ]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tất cả");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "Tất cả";

  return {
    // State
    selectedCategory,
    searchTerm,
    currentPage,
    loading,
    error,
    hasActiveFilters,
    
    // Actions
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    clearFilters,
    setError,
  };
};

export default useProductFilters; 