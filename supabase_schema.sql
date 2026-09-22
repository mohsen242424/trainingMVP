-- =========================================================
-- Afuq Platform (أفق) - Complete Supabase Database Schema
-- Run this script in the Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Run
-- =========================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) CHECK (role IN ('student', 'supervisor', 'admin')) DEFAULT 'student',
  university VARCHAR(150),
  major VARCHAR(150),
  study_year VARCHAR(50),
  language VARCHAR(50) DEFAULT 'ar',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Positions Table
CREATE TABLE IF NOT EXISTS public.positions (
  id BIGSERIAL PRIMARY KEY,
  title_ar VARCHAR(200) NOT NULL,
  title_en VARCHAR(200) NOT NULL,
  department_ar VARCHAR(100),
  description_ar TEXT,
  requirements_ar TEXT,
  language_required VARCHAR(50),
  is_available BOOLEAN DEFAULT false,
  available_for_languages TEXT[],
  order_index INTEGER DEFAULT 0
);

-- 3. Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
  id VARCHAR(50) PRIMARY KEY,
  student_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  position_id BIGINT REFERENCES public.positions(id) ON DELETE SET NULL,
  status VARCHAR(30) DEFAULT 'pending',
  cv_text TEXT,
  cv_file_url TEXT,
  answers JSONB,
  supervisor_note TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  accepted_at TIMESTAMP WITH TIME ZONE
);

-- 4. Tasks Table
CREATE TABLE IF NOT EXISTS public.tasks (
  id BIGSERIAL PRIMARY KEY,
  application_id VARCHAR(50) REFERENCES public.applications(id) ON DELETE CASCADE,
  title_ar VARCHAR(200) NOT NULL,
  description_ar TEXT NOT NULL,
  task_type VARCHAR(50),
  is_available BOOLEAN DEFAULT false,
  source_text TEXT,
  expected_output_notes TEXT,
  deadline TIMESTAMP WITH TIME ZONE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
  id BIGSERIAL PRIMARY KEY,
  task_id BIGINT REFERENCES public.tasks(id) ON DELETE CASCADE,
  student_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  submitted_text TEXT,
  submitted_file_url TEXT,
  status VARCHAR(30) DEFAULT 'submitted',
  ai_feedback JSONB,
  supervisor_feedback TEXT,
  score INTEGER,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- 6. Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id BIGSERIAL PRIMARY KEY,
  from_user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  to_user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Meetings Table
CREATE TABLE IF NOT EXISTS public.meetings (
  id BIGSERIAL PRIMARY KEY,
  supervisor_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  student_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(200),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER DEFAULT 30,
  meeting_link TEXT,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  type VARCHAR(50),
  title_ar VARCHAR(200),
  body_ar TEXT,
  is_read BOOLEAN DEFAULT false,
  related_id BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) and grant open access for MVP demo
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow anon public access for the web app frontend
CREATE POLICY "Public full access users" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access positions" ON public.positions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access applications" ON public.applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access submissions" ON public.submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access messages" ON public.messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access meetings" ON public.meetings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access notifications" ON public.notifications FOR ALL USING (true) WITH CHECK (true);

-- Insert Seed Users
INSERT INTO public.users (id, name, email, password_hash, role, university, major, study_year)
VALUES 
  (1, 'مدير النظام', 'admin@afuq-platform.com', 'Admin@Afuq2024', 'admin', NULL, NULL, NULL),
  (2, 'د. أحمد الخالدي', 'dr.ahmad@afuq-platform.com', 'Doctor@Afuq2024', 'supervisor', 'الجامعة الهاشمية', 'قسم اللغات', NULL),
  (3, 'سارة المحمود', 'student@afuq-platform.com', 'Student@2024', 'student', 'الجامعة الهاشمية', 'اللغة الإنجليزية وآدابها', 'الثالث')
ON CONFLICT (email) DO NOTHING;

-- Insert Seed Positions
INSERT INTO public.positions (id, title_ar, title_en, department_ar, description_ar, requirements_ar, language_required, is_available, available_for_languages, order_index)
VALUES
(1, 'مترجم محتوى رقمي', 'Digital Content Translator', 'قسم الترجمة الرقمية',
'ستعمل على ترجمة المحتوى الرقمي من المواقع الإلكترونية والتطبيقات ومنصات التواصل الاجتماعي بين اللغتين العربية والإنجليزية.',
'إتقان اللغتين العربية والإنجليزية — القدرة على الكتابة بأسلوب واضح وسلس — معرفة أساسية بالمحتوى الرقمي',
'english', true, ARRAY['english'], 1),

(2, 'مدقق لغوي', 'Language Proofreader', 'قسم ضمان الجودة',
'ستراجع وتدقق الترجمات والنصوص لضمان الجودة اللغوية والأسلوبية. ستتعلم معايير الجودة المهنية في مجال الترجمة.',
'إتقان عالٍ للغة العربية والإنجليزية — حس لغوي دقيق — اهتمام بالتفاصيل',
'english', true, ARRAY['english'], 2),

(3, 'مترجم قانوني', 'Legal Translator', 'قسم الترجمة القانونية',
'ستترجم الوثائق والعقود القانونية تحت إشراف مترجمين متخصصين. تجربة مثالية لمن يرغب في التخصص بالترجمة القانونية.',
'إتقان اللغتين — اهتمام بالمجال القانوني — الدقة والأمانة',
'english', true, ARRAY['english'], 3),

(4, 'مترجم تقني', 'Technical Translator', 'قسم الترجمة التقنية',
'ترجمة الوثائق والأدلة التقنية في مجالات التكنولوجيا والهندسة.',
'إتقان اللغتين — خلفية تقنية',
'english', false, ARRAY['english'], 4),

(5, 'متخصص تعريب', 'Localization Specialist', 'قسم التعريب',
'العمل على تعريب البرامج والتطبيقات وتكييف المحتوى ثقافياً.',
'إتقان اللغتين — معرفة ثقافية واسعة',
'english', false, ARRAY['english'], 5),

(6, 'مترجم فوري', 'Interpreter', 'قسم الترجمة الفورية',
'المشاركة في جلسات الترجمة الفورية تحت إشراف متخصصين.',
'إتقان عالٍ للغتين — قدرة على العمل تحت الضغط',
'english', false, ARRAY['english'], 6),

(7, 'ترجمة اللغة الفرنسية', 'French Language Track', 'متعدد الأقسام',
'جميع مسارات الترجمة باللغة الفرنسية.',
'-', 'french', false, ARRAY['french'], 7)
ON CONFLICT (id) DO NOTHING;
