import axios from 'axios';
import { mockDb } from './mockDb';

// Initialize mock DB
mockDb.init();

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('afuq_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper that tries backend first; if backend 404/network error (like on Netlify without dedicated backend), falls back to mockDb
async function withFallback(apiCall, mockCall) {
  try {
    const res = await apiCall();
    return res.data?.data || res.data;
  } catch (err) {
    // If running in pure static frontend (Netlify 404 for /api or connection refused)
    if (!err.response || err.response.status === 404 || err.code === 'ERR_NETWORK') {
      console.warn('API unavailable or 404, using interactive local store fallback:', err.message);
      return mockCall();
    }
    throw err;
  }
}

export const auth = {
  login: (credentials) => withFallback(
    () => axiosInstance.post('/auth/login', credentials),
    () => mockDb.loginUser(credentials.email, credentials.password)
  ),
  register: (userData) => withFallback(
    () => axiosInstance.post('/auth/register', userData),
    () => mockDb.registerUser(userData)
  ),
  getMe: () => withFallback(
    () => axiosInstance.get('/auth/me'),
    () => {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      if (!user) throw new Error('Not authenticated');
      return user;
    }
  ),
  logout: () => withFallback(
    () => axiosInstance.post('/auth/logout'),
    () => ({ success: true })
  ),
};

export const positions = {
  getAll: () => withFallback(
    () => axiosInstance.get('/positions'),
    () => mockDb.getPositions()
  ),
  getById: (id) => withFallback(
    () => axiosInstance.get(`/positions/${id}`),
    () => mockDb.getPositionById(id)
  ),
};

export const applications = {
  submit: (data) => withFallback(
    () => axiosInstance.post('/applications', data),
    () => {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.submitApplication(user?.id, data.positionId || 1, data);
    }
  ),
  getMine: () => withFallback(
    () => axiosInstance.get('/applications/mine'),
    () => {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.getMyApplication(user?.id);
    }
  ),
  getAll: () => withFallback(
    () => axiosInstance.get('/applications'),
    () => mockDb.getAllApplications()
  ),
  getById: (id) => withFallback(
    () => axiosInstance.get(`/applications/${id}`),
    () => mockDb.getAllApplications().find(a => a.id === id)
  ),
  updateStatus: (id, status, note) => withFallback(
    () => axiosInstance.patch(`/applications/${id}/status`, { status, supervisor_note: note }),
    () => mockDb.updateApplicationStatus(id, status, note)
  ),
};

export const tasks = {
  getMyTasks: () => withFallback(
    () => axiosInstance.get('/tasks/mine'),
    () => {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.getMyTasks(user?.id);
    }
  ),
  getById: (id) => withFallback(
    () => axiosInstance.get(`/tasks/${id}`),
    () => mockDb.getTaskById(id)
  ),
};

export const submissions = {
  submit: (taskId, data) => withFallback(
    () => axiosInstance.post(`/submissions/${taskId}`, data),
    () => {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.submitTask(user?.id, taskId, data.submitted_text);
    }
  ),
  getByTaskId: (taskId) => withFallback(
    () => axiosInstance.get(`/submissions/task/${taskId}`),
    () => mockDb.getSubmissionForTask(taskId)
  ),
  updateFeedback: (id, data) => withFallback(
    () => axiosInstance.patch(`/submissions/${id}/feedback`, data),
    () => ({ success: true })
  ),
};

export const messages = {
  getConversation: (userId) => withFallback(
    () => axiosInstance.get(`/messages/conversation/${userId}`),
    () => mockDb.getMessages(userId)
  ),
  send: (userId, data) => withFallback(
    () => axiosInstance.post(`/messages/${userId}`, data),
    () => {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.sendMessage(user?.id, userId, data.content);
    }
  ),
  getConversationsList: () => withFallback(
    () => axiosInstance.get('/messages/conversations'),
    () => []
  ),
};

export const meetings = {
  getAll: () => withFallback(
    () => axiosInstance.get('/meetings'),
    () => mockDb.getMeetings()
  ),
  create: (data) => withFallback(
    () => axiosInstance.post('/meetings', data),
    () => mockDb.createMeeting(data)
  ),
  updateStatus: (id, status) => withFallback(
    () => axiosInstance.patch(`/meetings/${id}/status`, { status }),
    () => ({ success: true })
  ),
};

export const notifications = {
  getAll: () => withFallback(
    () => axiosInstance.get('/notifications'),
    () => {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.getNotifications(user?.id);
    }
  ),
  markRead: (id) => withFallback(
    () => axiosInstance.patch(`/notifications/${id}/read`),
    () => ({ success: true })
  ),
  markAllRead: () => withFallback(
    () => axiosInstance.post('/notifications/mark-all-read'),
    () => ({ success: true })
  ),
};

export const admin = {
  getStats: () => withFallback(
    () => axiosInstance.get('/admin/stats'),
    () => ({
      totalUsers: 14,
      totalApplications: 6,
      acceptanceRate: 75,
      completionRate: 60
    })
  ),
  getUsers: () => withFallback(
    () => axiosInstance.get('/admin/users'),
    () => mockDb.getAllApplications()
  ),
  updateUser: (id, data) => withFallback(
    () => axiosInstance.patch(`/admin/users/${id}`, data),
    () => ({ success: true })
  ),
  getPositions: () => withFallback(
    () => axiosInstance.get('/admin/positions'),
    () => mockDb.getPositions()
  ),
  updatePosition: (id, data) => withFallback(
    () => axiosInstance.patch(`/admin/positions/${id}`, data),
    () => ({ success: true })
  ),
};

export const ai = {
  evaluateTranslation: (data) => withFallback(
    () => axiosInstance.post('/ai/evaluate-translation', data),
    () => mockDb.evaluateTranslation(data.studentTranslation || data.text)
  ),
  evaluateAnswers: (data) => withFallback(
    () => axiosInstance.post('/ai/evaluate-answers', data),
    () => ({
      overall_score: 90,
      overall_impression: 'ممتاز',
      summary_for_supervisor: 'إجابات واعية تدل على رغبة قوية في التعلم وفهم جيد لطبيعة الترجمة.',
      recommendation: 'يُنصح بقبوله'
    })
  ),
};

export const upload = {
  uploadCV: (file) => withFallback(
    () => {
      const formData = new FormData();
      formData.append('file', file);
      return axiosInstance.post('/upload/cv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    () => ({ url: URL.createObjectURL(file), name: file.name })
  ),
};

// Top-level aliases for direct imports compatibility
export const getPositions = positions.getAll;
export const getPositionById = positions.getById;
export const submitApplication = (positionId, data) => applications.submit({ ...data, positionId });
export const getMyApplication = applications.getMine;
export const getAllApplications = applications.getAll;
export const getMyTasks = tasks.getMyTasks;
export const getTaskById = tasks.getById;
export const submitTask = submissions.submit;
export const getSubmissionForTask = submissions.getByTaskId;
export const evaluateTranslation = ai.evaluateTranslation;
export const evaluateAnswers = ai.evaluateAnswers;
export const getMeetings = meetings.getAll;
export const createMeeting = meetings.create;
export const getNotifications = notifications.getAll;

export default {
  auth,
  positions,
  applications,
  tasks,
  submissions,
  messages,
  meetings,
  notifications,
  admin,
  ai,
  upload,
  // Direct functions
  getPositions,
  getPositionById,
  submitApplication,
  getMyApplication,
  getAllApplications,
  getMyTasks,
  getTaskById,
  submitTask,
  getSubmissionForTask,
  evaluateTranslation,
  evaluateAnswers,
  getMeetings,
  createMeeting,
  getNotifications
};
