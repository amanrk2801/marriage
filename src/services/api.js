import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't auto-redirect on 401 - let components handle it
    // This prevents unwanted redirects when user is already logged in
    if (error.response?.status === 401) {
      console.log('Authentication error:', error.response?.data?.message || 'Unauthorized');
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me')
};

// Profile APIs
export const profileAPI = {
  getProfiles: (filters) => api.get('/profiles', { params: filters }),
  getProfileById: (id) => api.get(`/profiles/${id}`),
  updateProfile: (data) => api.put('/profiles/me', data)
};

// Interest APIs
export const interestAPI = {
  sendInterest: (toUserId) => api.post('/interests', { toUserId }),
  acceptInterest: (interestId) => api.put(`/interests/${interestId}/accept`),
  rejectInterest: (interestId) => api.put(`/interests/${interestId}/reject`),
  getSentInterests: () => api.get('/interests/sent'),
  getReceivedInterests: () => api.get('/interests/received')
};

// Message APIs
export const messageAPI = {
  sendMessage: (toUserId, content) => api.post('/messages', { toUserId, content }),
  getConversation: (userId) => api.get(`/messages/${userId}`),
  getConversations: () => api.get('/messages/conversations/list')
};

// Notification APIs
export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => api.put('/notifications/mark-all-read'),
  deleteNotification: (notificationId) => api.delete(`/notifications/${notificationId}`)
};

// Upload APIs
export const uploadAPI = {
  uploadProfilePhoto: (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    return api.post('/upload/profile-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  deleteProfilePhoto: () => api.delete('/upload/profile-photo')
};

// Profile View APIs
export const profileViewAPI = {
  recordView: (viewedUserId) => api.post('/profile-views', { viewedUserId }),
  getMyViews: () => api.get('/profile-views/my-views')
};

// Payment APIs
export const paymentAPI = {
  createOrder: () => api.post('/payment/create-order'),
  verifyPayment: (razorpay_order_id, razorpay_payment_id, razorpay_signature) => 
    api.post('/payment/verify', { razorpay_order_id, razorpay_payment_id, razorpay_signature }),
  getStatus: () => api.get('/payment/status'),
  getHistory: () => api.get('/payment/history')
};

// Helper to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${imagePath}`;
};

export default api;
