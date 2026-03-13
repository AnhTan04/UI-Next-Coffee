import { create } from 'zustand';
import api from '../configs/api';

const useCategoryStore = create((set) => ({
  // Danh sách các danh mục
  categories: [],

  // Danh mục đang được chọn
  selectedCategory: null,

  // Thông tin phân trang
  pagination: {
    total: 0,
    page: 1,
    totalPages: 0
  },

  // Hàm để fetch danh sách danh mục từ API
  fetchCategories: async (page = 1) => {
    try {
      const response = await api.get(`/categories?page=${page}`);
      const { categories, total, totalPages } = response.data.data;
      set({
        categories,
        pagination: {
          total,
          page, 
          totalPages
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Hàm để set danh sách danh mục
  setCategories: (categories) => {
    set({ categories });
  },

  // Hàm để chọn một danh mục
  selectCategory: (category) => {
    set({ selectedCategory: category });
  },

  // Hàm để thêm một danh mục mới
  addCategory: async (categoryData) => {
    try {
      const response = await api.post('/categories', categoryData);
      set((state) => ({
        categories: [...state.categories, response.data.data]
      }));
      return response.data;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  },

  // Hàm để cập nhật một danh mục
  updateCategory: async (categoryId, updateData) => {
    try {
      const response = await api.put(`/categories/${categoryId}`, updateData);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === categoryId ? response.data.data : cat
        )
      }));
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  // Hàm để xóa một danh mục
  deleteCategory: async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== categoryId)
      }));
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },

  // Hàm để reset store về trạng thái ban đầu
  resetStore: () => {
    set({
      categories: [],
      selectedCategory: null,
      pagination: {
        total: 0,
        page: 1,
        totalPages: 0
      }
    });
  },
}));

export default useCategoryStore;