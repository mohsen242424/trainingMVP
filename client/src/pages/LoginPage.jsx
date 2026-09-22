import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      // Auto-redirect handled by App.jsx Route wrappers
      showToast('تم تسجيل الدخول بنجاح', 'success');
    } catch (err) {
      showToast(err.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    showToast('سيتم تفعيل هذه الخاصية قريباً', 'info');
  };

  return (
    <AuthLayout variant="centered">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-[420px]" dir="rtl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-accent-gold flex items-center justify-center text-dark font-bold text-2xl mb-4">أ</div>
          <h2 className="text-2xl font-bold text-dark">أهلاً بعودتك</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="البريد الإلكتروني"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@university.edu"
          />
          <Input
            label="كلمة المرور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="أدخل كلمة المرور"
          />
          
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-text-secondary">
              <input type="checkbox" className="rounded border-border text-accent-gold focus:ring-accent-gold" />
              <span>تذكرني</span>
            </label>
            <button type="button" onClick={handleForgotPassword} className="text-text-secondary hover:text-dark">
              نسيت كلمة المرور؟
            </button>
          </div>

          <Button
            type="submit"
            fullWidth
            className="bg-accent-gold hover:bg-accent-gold/90 text-dark font-bold text-lg py-3 mt-4"
            loading={loading}
          >
            تسجيل الدخول
          </Button>
        </form>

        <div className="mt-8 relative flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-border"></div>
          <span className="relative bg-white px-4 text-sm text-text-muted">أو</span>
        </div>

        <div className="mt-8">
          <Link to="/register">
            <Button variant="ghost" fullWidth className="text-dark border border-border hover:bg-primary">
              إنشاء حساب جديد
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
