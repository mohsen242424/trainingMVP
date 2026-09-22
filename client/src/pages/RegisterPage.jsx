import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import api from '../lib/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    major: '',
    study_year: 'الأولى',
    language: 'الإنجليزية'
  });
  const [loading, setLoading] = useState(false);

  const yearOptions = [
    { value: 'الأولى', label: 'الأولى' },
    { value: 'الثانية', label: 'الثانية' },
    { value: 'الثالثة', label: 'الثالثة' },
    { value: 'الرابعة', label: 'الرابعة' },
    { value: 'الخامسة', label: 'الخامسة' }
  ];

  const languageOptions = [
    { value: 'الإنجليزية', label: 'الإنجليزية ✓' },
    { value: 'الفرنسية', label: 'الفرنسية (قريباً)' },
    { value: 'الألمانية', label: 'الألمانية (قريباً)' },
    { value: 'الإسبانية', label: 'الإسبانية (قريباً)' },
    { value: 'الصينية', label: 'الصينية (قريباً)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'language' && value !== 'الإنجليزية') {
      showToast('هذه اللغة ستتوفر قريباً! حالياً ندعم اللغة الإنجليزية فقط.', 'warning');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.language !== 'الإنجليزية') {
      showToast('يرجى اختيار اللغة الإنجليزية للاستمرار', 'error');
      return;
    }
    if (formData.password.length < 8) {
      showToast('كلمة المرور يجب أن تكون 8 أحرف على الأقل', 'error');
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      showToast('تم إنشاء الحساب بنجاح!', 'success');
      navigate('/explore');
    } catch (err) {
      showToast(err.response?.data?.message || err.message || 'حدث خطأ أثناء التسجيل', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout variant="split">
      <div className="w-full max-w-md mx-auto" dir="rtl">
        <h2 className="text-3xl font-bold text-dark mb-8 text-center">إنشاء حساب جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="الاسم الكامل"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="أدخل اسمك الكامل"
          />
          <Input
            label="البريد الإلكتروني"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@university.edu"
          />
          <Input
            label="كلمة المرور"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="8 أحرف على الأقل"
          />
          <Input
            label="الجامعة"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
            placeholder="اسم جامعتك"
          />
          <Input
            label="التخصص الدراسي"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
            placeholder="تخصصك"
          />
          <Select
            label="السنة الدراسية"
            name="study_year"
            value={formData.study_year}
            onChange={handleChange}
            options={yearOptions}
          />
          <Select
            label="اللغة الرئيسية"
            name="language"
            value={formData.language}
            onChange={handleChange}
            options={languageOptions}
          />
          
          <div className="pt-4">
            <Button
              type="submit"
              fullWidth
              className="bg-accent-gold hover:bg-accent-gold/90 text-dark font-bold text-lg py-3"
              loading={loading}
              disabled={formData.language !== 'الإنجليزية'}
            >
              إنشاء الحساب
            </Button>
          </div>
        </form>
        
        <p className="mt-6 text-center text-text-secondary">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-accent-gold font-bold hover:underline">
            سجّل الدخول
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
