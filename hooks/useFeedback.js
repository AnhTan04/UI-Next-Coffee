import { useState, useCallback } from 'react';
import api from '@/configs/api';

const useFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10
  });

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Validate feedback data
  const validateFeedback = useCallback((data) => {
    const errors = [];

    if (!data.fullName?.trim()) {
      errors.push('Họ và tên là bắt buộc');
    }

    if (!data.email?.trim()) {
      errors.push('Email là bắt buộc');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Email không đúng định dạng');
    }

    if (data.phone && !/^0\d{9,10}$/.test(data.phone)) {
      errors.push('Số điện thoại phải bắt đầu bằng 0 và có 10-11 chữ số');
    }

    if (!data.subject) {
      errors.push('Chủ đề là bắt buộc');
    }

    if (!data.content?.trim()) {
      errors.push('Nội dung feedback là bắt buộc');
    }

    return errors;
  }, []);

  // 1. Create new feedback (Public)
  const createFeedback = useCallback(async (feedbackData) => {
    setLoading(true);
    setError(null);

    try {
      // Validate data
      const validationErrors = validateFeedback(feedbackData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      // Prepare data
      const data = {
        fullName: feedbackData.fullName.trim(),
        email: feedbackData.email.trim().toLowerCase(),
        phone: feedbackData.phone?.trim() || '',
        subject: feedbackData.subject,
        content: feedbackData.content.trim(),
      };

      const response = await api.post('/feedback', data);

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message || 'Có lỗi xảy ra khi gửi feedback');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể gửi feedback';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [validateFeedback]);

  // 2. Get subjects list (Public)
  const getSubjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/feedback/subjects');

      if (response.data.success) {
        setSubjects(response.data.data.subjects);
        return {
          success: true,
          data: response.data.data.subjects
        };
      } else {
        throw new Error(response.data.message || 'Không thể lấy danh sách chủ đề');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể lấy danh sách chủ đề';
      setError(errorMessage);
      
      // Fallback subjects
      const fallbackSubjects = [
        { value: "product", label: "Sản phẩm" },
        { value: "order", label: "Đơn hàng" },
        { value: "technical_support", label: "Hỗ trợ kỹ thuật" },
        { value: "partnership", label: "Hợp tác" },
        { value: "other", label: "Khác" }
      ];
      setSubjects(fallbackSubjects);
      
      return {
        success: false,
        error: errorMessage,
        data: fallbackSubjects
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Get statuses list (Public)
  const getStatuses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/feedback/statuses');

      if (response.data.success) {
        setStatuses(response.data.data.statuses);
        return {
          success: true,
          data: response.data.data.statuses
        };
      } else {
        throw new Error(response.data.message || 'Không thể lấy danh sách trạng thái');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể lấy danh sách trạng thái';
      setError(errorMessage);
      
      // Fallback statuses
      const fallbackStatuses = [
        { value: "pending", label: "Chờ xử lý" },
        { value: "processing", label: "Đang xử lý" },
        { value: "resolved", label: "Đã giải quyết" },
        { value: "closed", label: "Đã đóng" }
      ];
      setStatuses(fallbackStatuses);
      
      return {
        success: false,
        error: errorMessage,
        data: fallbackStatuses
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // 3.1. Get my feedback list (Public - based on session)
  const getMyFeedback = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      const response = await api.get(`/feedback/my-feedback?${queryParams.toString()}`);

      if (response.data.success) {
        setFeedbackList(response.data.data.feedback);
        setPagination({
          page: response.data.data.page,
          totalPages: response.data.data.totalPages,
          total: response.data.data.total,
          limit: params.limit || 10
        });
        
        return {
          success: true,
          data: response.data.data
        };
      } else {
        throw new Error(response.data.message || 'Không thể lấy danh sách feedback của bạn');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể lấy danh sách feedback của bạn';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // 4. Get feedback stats (Admin)
  const getFeedbackStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/feedback/stats');

      if (response.data.success) {
        setStats(response.data.data);
        return {
          success: true,
          data: response.data.data
        };
      } else {
        throw new Error(response.data.message || 'Không thể lấy thống kê feedback');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể lấy thống kê feedback';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // 5. Get feedback list (Admin)
  const getFeedbackList = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.status) queryParams.append('status', params.status);
      if (params.subject) queryParams.append('subject', params.subject);
      if (params.search) queryParams.append('search', params.search);

      const response = await api.get(`/feedback?${queryParams.toString()}`);

      if (response.data.success) {
        setFeedbackList(response.data.data.feedback);
        setPagination({
          page: response.data.data.page,
          totalPages: response.data.data.totalPages,
          total: response.data.data.total,
          limit: params.limit || 10
        });
        
        return {
          success: true,
          data: response.data.data
        };
      } else {
        throw new Error(response.data.message || 'Không thể lấy danh sách feedback');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể lấy danh sách feedback';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // 6. Get feedback by ID (Admin)
  const getFeedbackById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/feedback/${id}`);

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data
        };
      } else {
        throw new Error(response.data.message || 'Không thể lấy thông tin feedback');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể lấy thông tin feedback';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // 7. Update feedback status and reply (Admin)
  const updateFeedbackStatus = useCallback(async (id, statusData) => {
    setLoading(true);
    setError(null);

    try {
      const data = {
        status: statusData.status,
        adminReply: statusData.adminReply?.trim() || ''
      };

      const response = await api.put(`/feedback/${id}/status`, data);

      if (response.data.success) {
        // Update local state if feedback exists in current list
        setFeedbackList(prev => 
          prev.map(feedback => 
            feedback.id === id ? response.data.data : feedback
          )
        );

        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message || 'Không thể cập nhật trạng thái feedback');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể cập nhật trạng thái feedback';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // 8. Update feedback (Admin)
  const updateFeedback = useCallback(async (id, feedbackData) => {
    setLoading(true);
    setError(null);

    try {
      // Prepare data (all fields are optional for update)
      const data = {};
      if (feedbackData.fullName) data.fullName = feedbackData.fullName.trim();
      if (feedbackData.email) data.email = feedbackData.email.trim().toLowerCase();
      if (feedbackData.phone) data.phone = feedbackData.phone.trim();
      if (feedbackData.subject) data.subject = feedbackData.subject;
      if (feedbackData.content) data.content = feedbackData.content.trim();
      if (feedbackData.adminReply) data.adminReply = feedbackData.adminReply.trim();

      const response = await api.put(`/feedback/${id}`, data);

      if (response.data.success) {
        // Update local state if feedback exists in current list
        setFeedbackList(prev => 
          prev.map(feedback => 
            feedback.id === id ? response.data.data : feedback
          )
        );

        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message || 'Không thể cập nhật feedback');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể cập nhật feedback';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // 9. Delete feedback (Admin)
  const deleteFeedback = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(`/feedback/${id}`);

      if (response.data.success) {
        // Remove from local state
        setFeedbackList(prev => prev.filter(feedback => feedback.id !== id));
        
        // Update pagination total
        setPagination(prev => ({
          ...prev,
          total: prev.total - 1
        }));

        return {
          success: true,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message || 'Không thể xóa feedback');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể xóa feedback';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper function to get subject label by value
  const getSubjectLabel = useCallback((value) => {
    const subject = subjects.find(s => s.value === value);
    return subject ? subject.label : value;
  }, [subjects]);

  // Helper function to get status label by value
  const getStatusLabel = useCallback((value) => {
    const status = statuses.find(s => s.value === value);
    return status ? status.label : value;
  }, [statuses]);

  return {
    // State
    loading,
    error,
    feedbackList,
    subjects,
    statuses,
    stats,
    pagination,

    // Actions
    clearError,
    validateFeedback,

    // Public API functions
    createFeedback,
    getSubjects,
    getStatuses,
    getMyFeedback,

    // Admin API functions
    getFeedbackStats,
    getFeedbackList,
    getFeedbackById,
    updateFeedbackStatus,
    updateFeedback,
    deleteFeedback,

    // Helper functions
    getSubjectLabel,
    getStatusLabel,
  };
};

export default useFeedback; 