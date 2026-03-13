import { create } from 'zustand';
import api from '../configs/api';

const useProductStore = create((set, get) => ({
  products: [],
  selectedProduct: null,
  productImages: [],
  stockInfo: null,
  loading: false,
  error: null,

  pagination: {
    total: 0,
    page: 1,
    totalPages: 0
  },

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error state
  setError: (error) => set({ error }),

  // Clear error
  clearError: () => set({ error: null }),

  // Fetch products with enhanced parameters
  fetchProducts: async (page = 1, categoryId = null, limit = 12, search = '', isActive = true, includeImages = false) => {
    try {
      set({ loading: true, error: null });
      console.log('[ProductStore] Fetching products with params:', { page, categoryId, limit, search, isActive, includeImages });
      
      let url = `/products?page=${page}&limit=${limit}&includeImages=${includeImages}`;
      if (categoryId) {
        url += `&categoryId=${categoryId}`;
      }
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      if (isActive !== null) {
        url += `&isActive=${isActive}`;
      }
      
      console.log('[ProductStore] Request URL:', url);
      
      const response = await api.get(url);
      console.log('[ProductStore] API Response:', response.data);
      
      if (response.data.success) {
        const { products, total, page: currentPage, totalPages } = response.data.data;
        console.log('[ProductStore] Parsed data:', { 
          productsCount: products.length, 
          total, 
          totalPages 
        });
        
        set({
          products,
          pagination: {
            total,
            page: currentPage,
            totalPages
          },
          loading: false
        });
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('[ProductStore] Error fetching products:', {
        message: error.message,
        status: error?.response?.status,
        data: error?.response?.data
      });
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to fetch products',
        loading: false 
      });
      throw error;
    }
  },

  // Fetch single product by ID
  fetchProductById: async (productId) => {
    try {
      set({ loading: true, error: null });
      console.log('[ProductStore] Fetching product by ID:', productId);
      
      const response = await api.get(`/products/${productId}`);
      console.log('[ProductStore] Product response:', response.data);
      
      if (response.data.success) {
        const product = response.data.data;
        
        // Set product and images if they exist in the response
        set({ 
          selectedProduct: product,
          productImages: product.images || [],
          loading: false 
        });
        
        // Also fetch stock info if not included
        if (product.stock !== undefined) {
          set({ stockInfo: { stock: product.stock, isActive: product.isActive } });
        }
        
        return product;
      } else {
        throw new Error(response.data.message || 'Failed to fetch product');
      }
    } catch (error) {
      console.error('[ProductStore] Error fetching product:', error);
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to fetch product',
        loading: false 
      });
      throw error;
    }
  },

  // Fetch product details with images
  fetchProductDetails: async (productId) => {
    try {
      set({ loading: true, error: null });
      console.log('[ProductStore] Fetching product details:', productId);
      
      const response = await api.get(`/products/${productId}/details`);
      console.log('[ProductStore] Product details response:', response.data);
      
      if (response.data.success) {
        const product = response.data.data;
        set({ 
          selectedProduct: product,
          productImages: product.images || [],
          loading: false 
        });
        return product;
      } else {
        throw new Error(response.data.message || 'Failed to fetch product details');
      }
    } catch (error) {
      console.error('[ProductStore] Error fetching product details:', error);
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to fetch product details',
        loading: false 
      });
      throw error;
    }
  },

  // Fetch products by category
  fetchProductsByCategory: async (categoryId, page = 1, limit = 12, includeImages = false) => {
    try {
      set({ loading: true, error: null });
      console.log('[ProductStore] Fetching products by category:', { categoryId, page, limit, includeImages });
      
      const response = await api.get(`/products/category/${categoryId}?page=${page}&limit=${limit}&includeImages=${includeImages}`);
      console.log('[ProductStore] Category products response:', response.data);
      
      if (response.data.success) {
        const { products, total, page: currentPage, totalPages } = response.data.data;
        set({
          products,
          pagination: {
            total,
            page: currentPage,
            totalPages
          },
          loading: false
        });
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch category products');
      }
    } catch (error) {
      console.error('[ProductStore] Error fetching category products:', error);
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to fetch category products',
        loading: false 
      });
      throw error;
    }
  },

  // Fetch product stock information
  fetchProductStock: async (productId) => {
    try {
      console.log('[ProductStore] Fetching product stock:', productId);
      
      const response = await api.get(`/products/${productId}/stock`);
      console.log('[ProductStore] Stock response:', response.data);
      
      if (response.data.success) {
        const stockInfo = response.data.data;
        set({ stockInfo });
        return stockInfo;
      } else {
        throw new Error(response.data.message || 'Failed to fetch stock information');
      }
    } catch (error) {
      console.error('[ProductStore] Error fetching stock:', error);
      set({ error: error.response?.data?.message || error.message || 'Failed to fetch stock information' });
      throw error;
    }
  },

  // Fetch product images
  fetchProductImages: async (productId) => {
    try {
      console.log('[ProductStore] Fetching product images:', productId);
      
      const response = await api.get(`/products/${productId}/images`);
      console.log('[ProductStore] Images response:', response.data);
      
      if (response.data.success) {
        const images = response.data.data;
        set({ productImages: images });
        return images;
      } else {
        throw new Error(response.data.message || 'Failed to fetch product images');
      }
    } catch (error) {
      console.error('[ProductStore] Error fetching images:', error);
      set({ error: error.response?.data?.message || error.message || 'Failed to fetch product images' });
      throw error;
    }
  },

  // Fetch main product image
  fetchMainProductImage: async (productId) => {
    try {
      console.log('[ProductStore] Fetching main product image:', productId);
      
      const response = await api.get(`/products/${productId}/images/main`);
      console.log('[ProductStore] Main image response:', response.data);
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch main product image');
      }
    } catch (error) {
      console.error('[ProductStore] Error fetching main image:', error);
      throw error;
    }
  },

  // Set products list
  setProducts: (products) => {
    set({ products });
  },

  // Select a product
  selectProduct: (product) => {
    set({ selectedProduct: product });
  },

  // Clear selected product
  clearSelectedProduct: () => {
    set({ selectedProduct: null, productImages: [], stockInfo: null });
  },

  // Add new product (Admin only)
  addProduct: async (productData) => {
    try {
      set({ loading: true, error: null });
      console.log('[ProductStore] Adding product:', productData);
      
      const response = await api.post('/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        const newProduct = response.data.data;
        set((state) => ({
          products: [...state.products, newProduct],
          loading: false
        }));
        return newProduct;
      } else {
        throw new Error(response.data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('[ProductStore] Error adding product:', error);
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to add product',
        loading: false 
      });
      throw error;
    }
  },

  // Update product (Admin only)
  updateProduct: async (productId, updateData) => {
    try {
      set({ loading: true, error: null });
      console.log('[ProductStore] Updating product:', productId, updateData);
      
      const response = await api.put(`/products/${productId}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        const updatedProduct = response.data.data;
        set((state) => ({
          products: state.products.map((prod) =>
            prod.id === productId ? updatedProduct : prod
          ),
          selectedProduct: state.selectedProduct?.id === productId ? updatedProduct : state.selectedProduct,
          loading: false
        }));
        return updatedProduct;
      } else {
        throw new Error(response.data.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('[ProductStore] Error updating product:', error);
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to update product',
        loading: false 
      });
      throw error;
    }
  },

  // Delete product (Admin only)
  deleteProduct: async (productId) => {
    try {
      set({ loading: true, error: null });
      console.log('[ProductStore] Deleting product:', productId);
      
      const response = await api.delete(`/products/${productId}`);
      
      if (response.data.success) {
        set((state) => ({
          products: state.products.filter((prod) => prod.id !== productId),
          selectedProduct: state.selectedProduct?.id === productId ? null : state.selectedProduct,
          loading: false
        }));
        return true;
      } else {
        throw new Error(response.data.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('[ProductStore] Error deleting product:', error);
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to delete product',
        loading: false 
      });
      throw error;
    }
  },

  // Update product stock (Admin only)
  updateProductStock: async (productId, quantity) => {
    try {
      set({ loading: true, error: null });
      console.log('[ProductStore] Updating product stock:', productId, quantity);
      
      const response = await api.patch(`/products/stock/${productId}`, { quantity });
      
      if (response.data.success) {
        const updatedProduct = response.data.data;
        set((state) => ({
          products: state.products.map((prod) =>
            prod.id === productId ? updatedProduct : prod
          ),
          selectedProduct: state.selectedProduct?.id === productId ? updatedProduct : state.selectedProduct,
          loading: false
        }));
        return updatedProduct;
      } else {
        throw new Error(response.data.message || 'Failed to update stock');
      }
    } catch (error) {
      console.error('[ProductStore] Error updating stock:', error);
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to update stock',
        loading: false 
      });
      throw error;
    }
  },

  // Reset store to initial state
  resetStore: () => {
    set({
      products: [],
      selectedProduct: null,
      productImages: [],
      stockInfo: null,
      loading: false,
      error: null,
      pagination: {
        total: 0,
        page: 1,
        totalPages: 0
      }
    });
  },

  // Search products
  searchProducts: async (searchTerm, page = 1, limit = 12, categoryId = null) => {
    return get().fetchProducts(page, categoryId, limit, searchTerm, true, false);
  },

  // Get product by ID from current products list
  getProductById: (productId) => {
    const { products } = get();
    return products.find(product => product.id === parseInt(productId));
  },

  // Check if product is in stock
  isProductInStock: (product) => {
    return product && product.stock > 0 && product.isActive;
  },

  // Get product main image URL
  getProductMainImage: (product) => {
    if (product?.images && product.images.length > 0) {
      const mainImage = product.images.find(img => img.isMain);
      return mainImage ? mainImage.imageUrl : product.images[0].imageUrl;
    }
    return product?.image || '/images/placeholder-product.jpg';
  },

  // Parse product specifications
  parseProductSpecifications: (product) => {
    try {
      return product?.specifications ? JSON.parse(product.specifications) : {};
    } catch (error) {
      console.error('Error parsing specifications:', error);
      return {};
    }
  },

  // Parse product features
  parseProductFeatures: (product) => {
    try {
      return product?.features ? JSON.parse(product.features) : [];
    } catch (error) {
      console.error('Error parsing features:', error);
      return [];
    }
  },

  // Get product tags as array
  getProductTags: (product) => {
    return product?.tags ? product.tags.split(',').map(tag => tag.trim()) : [];
  },

  // Format product price
  formatProductPrice: (product) => {
    if (!product?.price) return 0;
    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    return isNaN(price) ? 0 : price;
  },

  // Get formatted price string
  getFormattedPrice: (product) => {
    const price = get().formatProductPrice(product);
    return price.toLocaleString('vi-VN');
  }
}));

export default useProductStore;