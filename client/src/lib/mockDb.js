// Client-side local storage fallback database for full static deployment (Netlify/Vercel)
const STORAGE_KEYS = {
  USERS: 'afuq_mock_users',
  POSITIONS: 'afuq_mock_positions',
  APPLICATIONS: 'afuq_mock_applications',
  TASKS: 'afuq_mock_tasks',
  SUBMISSIONS: 'afuq_mock_submissions',
  MESSAGES: 'afuq_mock_messages',
  MEETINGS: 'afuq_mock_meetings',
  NOTIFICATIONS: 'afuq_mock_notifications'
};

const DEFAULT_POSITIONS = [
  {
    id: 1,
    title_ar: 'مترجم محتوى رقمي',
    title_en: 'Digital Content Translator',
    department_ar: 'قسم الترجمة الرقمية',
    description_ar: 'ترجمة محتوى الويب والتطبيقات ومواقع التواصل مع مراعاة ثقافة الجمهور المستهدف وضمان الأسلوب الإبداعي والمهني.',
    requirements_ar: 'إتقان اللغتين العربية والإنجليزية — القدرة على الكتابة بأسلوب واضح وسلس — معرفة أساسية بالمحتوى الرقمي',
    language_required: 'english',
    is_available: 1,
    available_for_languages: ['english'],
    order_index: 1
  },
  {
    id: 2,
    title_ar: 'مدقق لغوي',
    title_en: 'Language Proofreader',
    department_ar: 'قسم ضمان الجودة',
    description_ar: 'مراجعة وتدقيق الترجمات والنصوص لضمان الجودة اللغوية والأسلوبية وخلوها من الأخطاء النحوية والمصطلحية.',
    requirements_ar: 'إتقان عالٍ للغة العربية والإنجليزية — حس لغوي دقيق — اهتمام بالتفاصيل',
    language_required: 'english',
    is_available: 1,
    available_for_languages: ['english'],
    order_index: 2
  },
  {
    id: 3,
    title_ar: 'مترجم قانوني',
    title_en: 'Legal Translator',
    department_ar: 'قسم الترجمة القانونية',
    description_ar: 'ترجمة الوثائق والعقود القانونية والاتفاقيات بدقة وأمانة علمية تحت إشراف مترجمين قانونيين متخصصين.',
    requirements_ar: 'إتقان اللغتين — اهتمام بالمجال القانوني — الدقة والأمانة العالية',
    language_required: 'english',
    is_available: 1,
    available_for_languages: ['english'],
    order_index: 3
  },
  {
    id: 4,
    title_ar: 'مترجم تقني',
    title_en: 'Technical Translator',
    department_ar: 'قسم الترجمة التقنية',
    description_ar: 'ترجمة الوثائق والأدلة التقنية في مجالات البرمجيات والتكنولوجيا والهندسة.',
    requirements_ar: 'إتقان اللغتين — خلفية تقنية أو اهتمام بالتكنولوجيا',
    language_required: 'english',
    is_available: 0,
    available_for_languages: ['english'],
    order_index: 4
  },
  {
    id: 5,
    title_ar: 'متخصص تعريب',
    title_en: 'Localization Specialist',
    department_ar: 'قسم التعريب',
    description_ar: 'العمل على تعريب البرمجيات والتطبيقات والألعاب وتكييف المحتوى بما يلائم الثقافة المحلية.',
    requirements_ar: 'إتقان اللغتين — معرفة ثقافية واسعة وشغف بالبرمجيات',
    language_required: 'english',
    is_available: 0,
    available_for_languages: ['english'],
    order_index: 5
  },
  {
    id: 6,
    title_ar: 'مترجم فوري',
    title_en: 'Interpreter',
    department_ar: 'قسم الترجمة الفورية',
    description_ar: 'المشاركة في جلسات الترجمة الفورية والمؤتمرات والندوات الافتراضية تحت إشراف متخصصين.',
    requirements_ar: 'إتقان عالٍ للغتين — سرعة بديهة وقدرة على العمل تحت الضغط',
    language_required: 'english',
    is_available: 0,
    available_for_languages: ['english'],
    order_index: 6
  },
  {
    id: 7,
    title_ar: 'ترجمة اللغة الفرنسية',
    title_en: 'French Language Track',
    department_ar: 'متعدد الأقسام',
    description_ar: 'جميع مسارات الترجمة التحريرية والتطبيقية باللغة الفرنسية.',
    requirements_ar: 'إتقان اللغة الفرنسية',
    language_required: 'french',
    is_available: 0,
    available_for_languages: ['french'],
    order_index: 7
  }
];

const DEFAULT_USERS = [
  {
    id: 1,
    name: 'مدير النظام',
    email: 'admin@afuq-platform.com',
    password: 'Admin@Afuq2024',
    role: 'admin',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'د. أحمد الخالدي',
    email: 'dr.ahmad@afuq-platform.com',
    password: 'Doctor@Afuq2024',
    role: 'supervisor',
    university: 'الجامعة الهاشمية',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'سارة المحمود',
    email: 'student@afuq-platform.com',
    password: 'Student@2024',
    role: 'student',
    university: 'الجامعة الهاشمية',
    major: 'اللغة الإنجليزية وآدابها',
    study_year: 'الثالث',
    created_at: new Date().toISOString()
  }
];

function get(key, defaultVal) {
  const item = localStorage.getItem(key);
  if (!item) {
    localStorage.setItem(key, JSON.stringify(defaultVal));
    return defaultVal;
  }
  try {
    return JSON.parse(item);
  } catch (e) {
    return defaultVal;
  }
}

function set(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export const mockDb = {
  init() {
    get(STORAGE_KEYS.USERS, DEFAULT_USERS);
    get(STORAGE_KEYS.POSITIONS, DEFAULT_POSITIONS);
    get(STORAGE_KEYS.APPLICATIONS, []);
    get(STORAGE_KEYS.TASKS, []);
    get(STORAGE_KEYS.SUBMISSIONS, []);
    get(STORAGE_KEYS.MESSAGES, []);
    get(STORAGE_KEYS.MEETINGS, []);
    get(STORAGE_KEYS.NOTIFICATIONS, []);
  },

  // Auth
  registerUser(userData) {
    const users = get(STORAGE_KEYS.USERS, DEFAULT_USERS);
    if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('البريد الإلكتروني مسجل بالفعل');
    }
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'student',
      university: userData.university,
      major: userData.major,
      study_year: userData.study_year,
      language: userData.language || 'الإنجليزية',
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    set(STORAGE_KEYS.USERS, users);
    return { token: 'mock_token_' + newUser.id, user: newUser };
  },

  loginUser(email, password) {
    const users = get(STORAGE_KEYS.USERS, DEFAULT_USERS);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
    return { token: 'mock_token_' + user.id, user };
  },

  getUserByToken(token) {
    if (!token) return null;
    const userId = parseInt(token.replace('mock_token_', ''), 10);
    const users = get(STORAGE_KEYS.USERS, DEFAULT_USERS);
    return users.find(u => u.id === userId) || null;
  },

  // Positions
  getPositions() {
    return get(STORAGE_KEYS.POSITIONS, DEFAULT_POSITIONS);
  },

  getPositionById(id) {
    const positions = this.getPositions();
    return positions.find(p => p.id === Number(id));
  },

  // Applications
  submitApplication(userId, positionId, appData) {
    const applications = get(STORAGE_KEYS.APPLICATIONS, []);
    const newApp = {
      id: 'AFQ-2024-' + Math.floor(1000 + Math.random() * 9000),
      student_id: userId,
      position_id: Number(positionId),
      status: 'pending', // pending, reviewing, accepted, rejected
      cv_text: appData.cvText,
      cv_file_url: appData.cvFile ? URL.createObjectURL(appData.cvFile) : null,
      answers: appData.answers,
      submitted_at: new Date().toISOString()
    };
    applications.push(newApp);
    set(STORAGE_KEYS.APPLICATIONS, applications);
    return newApp;
  },

  getMyApplication(userId) {
    const applications = get(STORAGE_KEYS.APPLICATIONS, []);
    return applications.find(a => a.student_id === userId) || null;
  },

  getAllApplications() {
    const applications = get(STORAGE_KEYS.APPLICATIONS, []);
    const users = get(STORAGE_KEYS.USERS, DEFAULT_USERS);
    const positions = this.getPositions();
    return applications.map(app => {
      const student = users.find(u => u.id === app.student_id);
      const position = positions.find(p => p.id === app.position_id);
      return { ...app, student, position };
    });
  },

  updateApplicationStatus(appId, status, supervisor_note = '') {
    const applications = get(STORAGE_KEYS.APPLICATIONS, []);
    const app = applications.find(a => a.id === appId);
    if (app) {
      app.status = status;
      app.supervisor_note = supervisor_note;
      if (status === 'accepted') {
        app.accepted_at = new Date().toISOString();
        // Create initial tasks
        this.createTasksForApplication(app.id);
      }
      set(STORAGE_KEYS.APPLICATIONS, applications);
    }
    return app;
  },

  // Tasks
  createTasksForApplication(appId) {
    const tasks = get(STORAGE_KEYS.TASKS, []);
    const existing = tasks.filter(t => t.application_id === appId);
    if (existing.length > 0) return existing;

    const initialTasks = [
      {
        id: Date.now() + 1,
        application_id: appId,
        title_ar: 'ترجمة محتوى رقمي تعريفي',
        description_ar: 'ستترجم النص التعريفي لشركة أفق من الإنجليزية إلى العربية. راعِ الأسلوب المهني وسلاسة النص العربي والتعبير الدقيق عن المعنى.',
        task_type: 'translation',
        is_available: 1,
        source_text: "Horizon Translation & Localization was founded in 2015 with a simple mission: to bridge cultures through the power of language. Today, our team of 45 specialists works across 12 languages, serving clients in technology, legal, and media sectors across the Arab world and beyond. Our approach combines human expertise with the latest language technology to deliver translations that don't just convert words — they convey meaning, tone, and cultural nuance. We believe every translation is a conversation between two worlds.",
        order_index: 1
      },
      {
        id: Date.now() + 2,
        application_id: appId,
        title_ar: 'مراجعة وتدقيق نص مترجم',
        description_ar: 'هذه المهمة ستتوفر قريباً عند إتمام المهمة الأولى بنجاح.',
        task_type: 'proofreading',
        is_available: 0,
        source_text: null,
        order_index: 2
      },
      {
        id: Date.now() + 3,
        application_id: appId,
        title_ar: 'ترجمة وثيقة رسمية',
        description_ar: 'هذه المهمة ستتوفر قريباً.',
        task_type: 'translation',
        is_available: 0,
        source_text: null,
        order_index: 3
      },
      {
        id: Date.now() + 4,
        application_id: appId,
        title_ar: 'تعريب واجهة تطبيق',
        description_ar: 'هذه المهمة ستتوفر قريباً.',
        task_type: 'localization',
        is_available: 0,
        source_text: null,
        order_index: 4
      },
      {
        id: Date.now() + 5,
        application_id: appId,
        title_ar: 'مشروع الترجمة الختامي',
        description_ar: 'مشروع التقييم النهائي والشامل.',
        task_type: 'final_project',
        is_available: 0,
        source_text: null,
        order_index: 5
      }
    ];

    tasks.push(...initialTasks);
    set(STORAGE_KEYS.TASKS, tasks);
    return initialTasks;
  },

  getMyTasks(userId) {
    const app = this.getMyApplication(userId);
    if (!app) return [];
    if (app.status === 'accepted') {
      this.createTasksForApplication(app.id);
    }
    const tasks = get(STORAGE_KEYS.TASKS, []);
    return tasks.filter(t => t.application_id === app.id);
  },

  getTaskById(id) {
    const tasks = get(STORAGE_KEYS.TASKS, []);
    return tasks.find(t => t.id === Number(id));
  },

  // Submissions
  submitTask(userId, taskId, text) {
    const submissions = get(STORAGE_KEYS.SUBMISSIONS, []);
    const newSub = {
      id: Date.now(),
      task_id: Number(taskId),
      student_id: userId,
      submitted_text: text,
      status: 'submitted',
      score: 85,
      submitted_at: new Date().toISOString()
    };
    submissions.push(newSub);
    set(STORAGE_KEYS.SUBMISSIONS, submissions);
    return newSub;
  },

  getSubmissionForTask(taskId) {
    const submissions = get(STORAGE_KEYS.SUBMISSIONS, []);
    return submissions.find(s => s.task_id === Number(taskId)) || null;
  },

  // AI Evaluation Simulation fallback
  evaluateTranslation(text) {
    return {
      overall_score: 88,
      dimensions: {
        accuracy: { score: 90, label: 'الدقة اللغوية' },
        fluency: { score: 85, label: 'سلاسة الأسلوب' },
        meaning_preservation: { score: 92, label: 'الحفاظ على المعنى' },
        terminology: { score: 85, label: 'المصطلحات' }
      },
      strengths: [
        'نقل المعنى والسياق العام للنص باحترافية عالية',
        'صياغة عربية طبيعية وسلسة بعيدة عن الترجمة الحرفية الجافة'
      ],
      improvements: [
        'الانتباه إلى بعض المصطلحات المتخصصة مثل "cultural nuance"',
        'تنسيق الفقرات وعلامات الترقيم بشكل أدق'
      ],
      detailed_feedback: 'ترجمة متميزة تعكس فهماً عميقاً للنص الإنجليزي وقدرة واضحة على صياغته بأسلوب عربي أنيق وملائم لطبيعة المحتوى المؤسسي.'
    };
  },

  // Messages
  getMessages(userId) {
    const messages = get(STORAGE_KEYS.MESSAGES, []);
    return messages;
  },

  sendMessage(fromId, toId, content) {
    const messages = get(STORAGE_KEYS.MESSAGES, []);
    const newMsg = {
      id: Date.now(),
      from_user_id: fromId,
      to_user_id: toId,
      content,
      is_read: 0,
      sent_at: new Date().toISOString()
    };
    messages.push(newMsg);
    set(STORAGE_KEYS.MESSAGES, messages);
    return newMsg;
  },

  // Meetings
  getMeetings() {
    return get(STORAGE_KEYS.MEETINGS, []);
  },

  createMeeting(data) {
    const meetings = get(STORAGE_KEYS.MEETINGS, []);
    const newMeeting = {
      id: Date.now(),
      ...data,
      status: 'scheduled',
      created_at: new Date().toISOString()
    };
    meetings.push(newMeeting);
    set(STORAGE_KEYS.MEETINGS, meetings);
    return newMeeting;
  },

  // Notifications
  getNotifications(userId) {
    return get(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 1,
        user_id: userId,
        type: 'welcome',
        title_ar: 'مرحباً بك في أفق',
        body_ar: 'تم إنشاء حسابك بنجاح. استكشف الوظائف وابدأ رحلتك التدريبية!',
        is_read: 0,
        created_at: new Date().toISOString()
      }
    ]);
  }
};
