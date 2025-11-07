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
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
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

// Helper to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${imagePath}`;
};

export default api;
