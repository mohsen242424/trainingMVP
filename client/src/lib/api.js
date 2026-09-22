import { supabase } from './supabase';
import { mockDb } from './mockDb';

// Initialize local mockDb as immediate fallback
mockDb.init();

export const auth = {
  async register(userData) {
    try {
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('email', userData.email.trim().toLowerCase())
        .maybeSingle();

      if (existing) {
        throw new Error('البريد الإلكتروني مسجل بالفعل');
      }

      const { data, error } = await supabase
        .from('users')
        .insert([{
          name: userData.name,
          email: userData.email.trim().toLowerCase(),
          password_hash: userData.password,
          role: 'student',
          university: userData.university,
          major: userData.major,
          study_year: userData.study_year,
          language: userData.language || 'الإنجليزية'
        }])
        .select()
        .single();

      if (error) throw error;
      const token = 'supabase_token_' + data.id;
      return { token, user: data };
    } catch (err) {
      console.warn('Supabase register fallback:', err.message);
      return mockDb.registerUser(userData);
    }
  },

  async login(credentials) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email.trim().toLowerCase())
        .eq('password_hash', credentials.password)
        .maybeSingle();

      if (error || !data) {
        throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }

      const token = 'supabase_token_' + data.id;
      return { token, user: data };
    } catch (err) {
      console.warn('Supabase login fallback:', err.message);
      return mockDb.loginUser(credentials.email, credentials.password);
    }
  },

  async getMe() {
    const token = localStorage.getItem('afuq_token');
    if (!token) throw new Error('Not authenticated');

    if (token.startsWith('supabase_token_')) {
      const id = token.replace('supabase_token_', '');
      const { data } = await supabase.from('users').select('*').eq('id', id).single();
      if (data) return data;
    }
    const user = mockDb.getUserByToken(token);
    if (!user) throw new Error('Not authenticated');
    return user;
  },

  async logout() {
    return { success: true };
  }
};

export const positions = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('positions')
        .select('*')
        .order('order_index', { ascending: true });
      if (error || !data || data.length === 0) throw error || new Error('No data');
      return data.map(p => ({
        ...p,
        title: p.title_ar,
        department: p.department_ar,
        description: p.description_ar,
        requirements: p.requirements_ar ? p.requirements_ar.split('—').map(s => s.trim()) : []
      }));
    } catch (err) {
      return mockDb.getPositions().map(p => ({
        ...p,
        title: p.title_ar,
        department: p.department_ar,
        description: p.description_ar,
        requirements: p.requirements_ar ? p.requirements_ar.split('—').map(s => s.trim()) : []
      }));
    }
  },

  async getById(id) {
    try {
      const { data, error } = await supabase.from('positions').select('*').eq('id', id).single();
      if (error || !data) throw error;
      return {
        ...data,
        title: data.title_ar,
        department: data.department_ar,
        description: data.description_ar
      };
    } catch {
      return mockDb.getPositionById(id);
    }
  }
};

export const applications = {
  async submit(data) {
    try {
      const token = localStorage.getItem('afuq_token');
      const studentId = token?.startsWith('supabase_token_') ? parseInt(token.replace('supabase_token_', ''), 10) : 3;
      const appId = 'AFQ-2024-' + Math.floor(1000 + Math.random() * 9000);

      const { data: app, error } = await supabase
        .from('applications')
        .insert([{
          id: appId,
          student_id: studentId,
          position_id: Number(data.positionId || 1),
          status: 'pending',
          cv_text: data.cvText,
          answers: data.answers
        }])
        .select()
        .single();

      if (error) throw error;
      return app;
    } catch {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.submitApplication(user?.id, data.positionId || 1, data);
    }
  },

  async getMine() {
    try {
      const token = localStorage.getItem('afuq_token');
      const studentId = token?.startsWith('supabase_token_') ? parseInt(token.replace('supabase_token_', ''), 10) : 3;

      const { data, error } = await supabase
        .from('applications')
        .select('*, positions(*)')
        .eq('student_id', studentId)
        .maybeSingle();

      if (error || !data) throw error || new Error('No app');
      return {
        ...data,
        position: data.positions ? {
          title: data.positions.title_ar,
          department: data.positions.department_ar
        } : null
      };
    } catch {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.getMyApplication(user?.id);
    }
  },

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*, users(*), positions(*)');
      if (error || !data) throw error;
      return data.map(a => ({
        ...a,
        student: a.users,
        position: a.positions
      }));
    } catch {
      return mockDb.getAllApplications();
    }
  },

  async updateStatus(id, status, supervisor_note = '') {
    try {
      const { data, error } = await supabase
        .from('applications')
        .update({ status, supervisor_note })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch {
      return mockDb.updateApplicationStatus(id, status, supervisor_note);
    }
  }
};

export const tasks = {
  async getMyTasks() {
    try {
      const app = await applications.getMine();
      if (!app) return [];
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('application_id', app.id)
        .order('order_index', { ascending: true });
      if (error || !data || data.length === 0) throw error;
      return data;
    } catch {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.getMyTasks(user?.id);
    }
  },

  async getById(id) {
    try {
      const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single();
      if (error || !data) throw error;
      return data;
    } catch {
      return mockDb.getTaskById(id);
    }
  }
};

export const submissions = {
  async submit(taskId, data) {
    try {
      const token = localStorage.getItem('afuq_token');
      const studentId = token?.startsWith('supabase_token_') ? parseInt(token.replace('supabase_token_', ''), 10) : 3;

      const { data: sub, error } = await supabase
        .from('submissions')
        .insert([{
          task_id: Number(taskId),
          student_id: studentId,
          submitted_text: data.submitted_text,
          status: 'submitted',
          score: 85
        }])
        .select()
        .single();

      if (error) throw error;
      return sub;
    } catch {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.submitTask(user?.id, taskId, data.submitted_text);
    }
  },

  async getByTaskId(taskId) {
    try {
      const { data, error } = await supabase.from('submissions').select('*').eq('task_id', taskId).maybeSingle();
      if (error || !data) throw error;
      return data;
    } catch {
      return mockDb.getSubmissionForTask(taskId);
    }
  }
};

export const ai = {
  async evaluateTranslation(data) {
    return mockDb.evaluateTranslation(data.studentTranslation || data.text);
  },
  async evaluateAnswers() {
    return {
      overall_score: 90,
      overall_impression: 'ممتاز',
      summary_for_supervisor: 'إجابات متميزة تدل على شغف باللغة وقدرة عالية على التكيف.',
      recommendation: 'يُنصح بقبوله'
    };
  }
};

export const meetings = {
  async getAll() {
    try {
      const { data, error } = await supabase.from('meetings').select('*');
      if (error || !data) throw error;
      return data;
    } catch {
      return mockDb.getMeetings();
    }
  },
  async create(data) {
    try {
      const { data: res, error } = await supabase.from('meetings').insert([data]).select().single();
      if (error) throw error;
      return res;
    } catch {
      return mockDb.createMeeting(data);
    }
  }
};

export const notifications = {
  async getAll() {
    try {
      const token = localStorage.getItem('afuq_token');
      const userId = token?.startsWith('supabase_token_') ? parseInt(token.replace('supabase_token_', ''), 10) : 1;
      const { data, error } = await supabase.from('notifications').select('*').eq('user_id', userId);
      if (error || !data) throw error;
      return data;
    } catch {
      const token = localStorage.getItem('afuq_token');
      const user = mockDb.getUserByToken(token);
      return mockDb.getNotifications(user?.id);
    }
  },
  async markRead() { return { success: true }; },
  async markAllRead() { return { success: true }; }
};

export const admin = {
  async getStats() {
    return {
      totalUsers: 18,
      totalApplications: 7,
      acceptanceRate: 80,
      completionRate: 65
    };
  },
  async getUsers() {
    try {
      const { data, error } = await supabase.from('users').select('*');
      if (error || !data) throw error;
      return data;
    } catch {
      return mockDb.getAllApplications();
    }
  },
  async getPositions() {
    return positions.getAll();
  }
};

export const upload = {
  async uploadCV(file) {
    return { url: URL.createObjectURL(file), name: file.name };
  }
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
  meetings,
  notifications,
  admin,
  ai,
  upload,
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
