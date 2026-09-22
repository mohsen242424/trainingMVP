import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('afuq_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('afuq_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (data) => api.post('/auth/login', data).then(res => res.data),
  register: (data) => api.post('/auth/register', data).then(res => res.data),
  getMe: () => api.get('/auth/me').then(res => res.data),
  logout: () => api.post('/auth/logout').then(res => res.data),
};

export const positions = {
  getAll: () => api.get('/positions').then(res => res.data),
  getById: (id) => api.get(`/positions/${id}`).then(res => res.data),
};

export const applications = {
  submit: (data) => api.post('/applications', data).then(res => res.data),
  getMine: () => api.get('/applications/mine').then(res => res.data),
  getAll: () => api.get('/applications').then(res => res.data),
  getById: (id) => api.get(`/applications/${id}`).then(res => res.data),
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }).then(res => res.data),
};

export const tasks = {
  getMyTasks: () => api.get('/tasks/mine').then(res => res.data),
  getById: (id) => api.get(`/tasks/${id}`).then(res => res.data),
};

export const submissions = {
  submit: (taskId, data) => api.post(`/submissions/${taskId}`, data).then(res => res.data),
  getByTaskId: (taskId) => api.get(`/submissions/task/${taskId}`).then(res => res.data),
  updateFeedback: (id, data) => api.patch(`/submissions/${id}/feedback`, data).then(res => res.data),
};

export const messages = {
  getConversation: (userId) => api.get(`/messages/conversation/${userId}`).then(res => res.data),
  send: (userId, data) => api.post(`/messages/${userId}`, data).then(res => res.data),
  getConversationsList: () => api.get('/messages/conversations').then(res => res.data),
};

export const meetings = {
  getAll: () => api.get('/meetings').then(res => res.data),
  create: (data) => api.post('/meetings', data).then(res => res.data),
  updateStatus: (id, status) => api.patch(`/meetings/${id}/status`, { status }).then(res => res.data),
};

export const notifications = {
  getAll: () => api.get('/notifications').then(res => res.data),
  markRead: (id) => api.patch(`/notifications/${id}/read`).then(res => res.data),
  markAllRead: () => api.post('/notifications/mark-all-read').then(res => res.data),
};

export const admin = {
  getStats: () => api.get('/admin/stats').then(res => res.data),
  getUsers: () => api.get('/admin/users').then(res => res.data),
  updateUser: (id, data) => api.patch(`/admin/users/${id}`, data).then(res => res.data),
  getPositions: () => api.get('/admin/positions').then(res => res.data),
  updatePosition: (id, data) => api.patch(`/admin/positions/${id}`, data).then(res => res.data),
};

export const ai = {
  evaluateTranslation: (data) => api.post('/ai/evaluate-translation', data).then(res => res.data),
  evaluateAnswers: (data) => api.post('/ai/evaluate-answers', data).then(res => res.data),
};

export const upload = {
  uploadCV: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/cv', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => res.data);
  },
};

export default {
  auth, positions, applications, tasks, submissions, messages, meetings, notifications, admin, ai, upload
};
