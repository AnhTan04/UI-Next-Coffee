import { create } from 'zustand';
import api from '../configs/api';

const useOrderStore = create((set) => ({
  // Order state
  orders: [],
  currentOrder: null,
  pagination: {
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10
  },
  loading: false,
  error: null,

  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders/create', orderData);
      if (response.data.success) {
        set((state) => ({
          orders: [response.data.data, ...state.orders],
          currentOrder: response.data.data
        }));
        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Fetch order history
  fetchOrderHistory: async (page = 1, limit = 10, status = null) => {
    try {
      set({ loading: true, error: null });
      let url = `/orders/history/session?page=${page}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }

      const response = await api.get(url);
      
      if (!response?.data) {
        throw new Error('Invalid response format from server');
      }

      if (response.data.success) {
        const { orders, pagination } = response.data.data || { orders: [], pagination: {} };
        
        // Ensure orders is an array
        if (!Array.isArray(orders)) {
          console.warn('Orders is not an array:', orders);
          set({
            orders: [],
            pagination: {
              totalPages: 0,
              currentPage: page,
              totalItems: 0,
              itemsPerPage: limit
            },
            loading: false,
            error: 'Invalid orders data format'
          });
          return;
        }

        // Transform orders to ensure all numeric values are properly parsed
        const transformedOrders = orders.map(order => {
          if (!order) return null;
          
          try {
            return {
              id: order.id || Math.random().toString(),
              status: order.status?.code || order.status || 'pending',
              statusLabel: order.status?.label || 'Không xác định',
              paymentMethod: order.paymentMethod || 'COD',
              items: (order.items || []).map(item => {
                if (!item) return null;
                
                return {
                  id: item?.id || Math.random().toString(),
                  productId: item?.productId,
                  product: {
                    name: item?.product?.name || 'Sản phẩm không xác định',
                    image: item?.product?.image || '/placeholder-image.jpg',
                    ...item?.product
                  },
                  price: parseFloat(item?.price || 0),
                  quantity: parseInt(item?.quantity || 0),
                  total: parseFloat(item?.total || 0)
                };
              }).filter(Boolean), // Remove null items
              shipping: {
                name: order?.shipping?.name || 'N/A',
                phone: order?.shipping?.phone || 'N/A',
                address: order?.shipping?.address || 'N/A',
                note: order?.shipping?.note || ''
              },
              invoice: {
                name: order?.invoice?.name || 'N/A',
                phone: order?.invoice?.phone || 'N/A',
                email: order?.invoice?.email || 'N/A',
                address: order?.invoice?.address || 'N/A'
              },
              summary: {
                subtotal: parseFloat(order?.summary?.subtotal || 0),
                shippingFee: parseFloat(order?.summary?.shippingFee || 0),
                total: parseFloat(order?.summary?.total || 0)
              },
              createdAt: order.createdAt ? new Date(order.createdAt) : new Date()
            };
          } catch (error) {
            console.error('Error transforming order:', error);
            return null;
          }
        }).filter(Boolean); // Remove null orders

        set({
          orders: transformedOrders,
          pagination: {
            ...pagination,
            currentPage: page,
            itemsPerPage: limit
          },
          loading: false,
          error: null
        });
      } else {
        set({ 
          loading: false, 
          error: response.data.message || 'Unknown error',
          orders: [],
          pagination: {
            totalPages: 0,
            currentPage: page,
            totalItems: 0,
            itemsPerPage: limit
          }
        });
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
      set({ 
        loading: false, 
        error: error.message || 'Failed to fetch orders',
        orders: [],
        pagination: {
          totalPages: 0,
          currentPage: page,
          totalItems: 0,
          itemsPerPage: limit
        }
      });
    }
  },

  // Get single order
  getOrder: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      if (response.data.success) {
        const order = response.data.data;
        
        // Transform order data
        const transformedOrder = {
          ...order,
          items: order.items.map(item => ({
            ...item,
            price: parseFloat(item.price),
            total: parseFloat(item.total)
          })),
          summary: {
            ...order.summary,
            subtotal: parseFloat(order.summary.subtotal),
            shippingFee: parseFloat(order.summary.shippingFee),
            total: parseFloat(order.summary.total)
          }
        };

        set({ currentOrder: transformedOrder });
        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      if (response.data.success) {
        set((state) => ({
          orders: state.orders.map(order => 
            order.id === orderId ? { ...order, status: status } : order
          ),
          currentOrder: state.currentOrder?.id === orderId ? 
            { ...state.currentOrder, status } : state.currentOrder
        }));
        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    try {
      const response = await api.put(`/orders/${orderId}/cancel`);
      if (response.data.success) {
        set((state) => ({
          orders: state.orders.map(order => 
            order.id === orderId ? { ...order, status: 'cancelled' } : order
          )
        }));
        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  },

  // Reset store
  resetOrderStore: () => {
    set({
      orders: [],
      currentOrder: null,
      pagination: {
        totalPages: 0,
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 10
      },
      loading: false,
      error: null
    });
  }
}));

export default useOrderStore;
