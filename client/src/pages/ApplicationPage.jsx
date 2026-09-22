import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Tabs from '../components/ui/Tabs';
import FileUpload from '../components/ui/FileUpload';
import ProgressBar from '../components/ui/ProgressBar';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import api from '../lib/api';

export default function ApplicationPage() {
  const { positionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [cvTab, setCvTab] = useState(0); // 0: text, 1: file

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: user?.university || '',
    major: user?.major || '',
    study_year: user?.study_year || '',
    linkedin: '',
    cvText: '',
    cvFile: null,
    answers: {
      q1: '', q2: '', q3: '', q4: '', q5: ''
    },
    confirmed: false
  });

  const handleAnswerChange = (q, value) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [q]: value }
    }));
  };

  const handleFileSelect = (file) => {
    setFormData(prev => ({ ...prev, cvFile: file }));
  };

  const handleSubmit = async () => {
    if (!formData.confirmed) {
      showToast('يرجى تأكيد صحة المعلومات', 'error');
      return;
    }

    setLoading(true);
    try {
      const result = await api.submitApplication(positionId, formData);
      setApplicationId(result.id || `AFQ-2024-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
    } catch (err) {
      showToast(err.message || 'حدث خطأ أثناء إرسال الطلب', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-6 font-arabic" dir="rtl">
        <Card className="max-w-md w-full p-10 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-success-bg text-success rounded-full flex items-center justify-center text-4xl mb-6">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-dark mb-4">تم استلام طلبك بنجاح! 🎉</h2>
          <p className="text-text-secondary mb-2">سيقوم المشرف بمراجعة طلبك خلال ١-٣ أيام عمل</p>
          <p className="text-text-primary font-mono bg-primary px-4 py-2 rounded-lg mb-8">رقم الطلب: #{applicationId}</p>
          <Button fullWidth onClick={() => navigate('/dashboard/student')} className="bg-accent-gold text-dark font-bold">
            الرجوع إلى الرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  const cvTabsData = [
    { label: 'أدخل سيرتك الذاتية نصياً', content: 
      <Textarea 
        value={formData.cvText}
        onChange={(e) => setFormData({...formData, cvText: e.target.value})}
        placeholder="انسخ والصق محتوى سيرتك الذاتية هنا..."
        rows={8}
      />
    },
    { label: 'رفع ملف PDF', content: 
      <FileUpload 
        accept=".pdf"
        maxSize={5 * 1024 * 1024}
        label="اسحب وأفلت ملف PDF هنا أو انقر للاختيار"
        currentFile={formData.cvFile}
        onFileSelect={handleFileSelect}
      />
    }
  ];

  return (
    <div className="min-h-screen bg-primary font-arabic pb-20" dir="rtl">
      {/* Top Bar Simple */}
      <header className="bg-white border-b border-border px-8 py-4 flex justify-center sticky top-0 z-20">
        <span className="font-bold text-dark">تقديم طلب انضمام</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <ProgressBar value={(step / 3) * 100} size="sm" color="bg-accent-gold" />
          <div className="flex justify-between text-sm text-text-secondary mt-2">
            <span className={step >= 1 ? 'text-dark font-bold' : ''}>المعلومات الشخصية</span>
            <span className={step >= 2 ? 'text-dark font-bold' : ''}>أسئلة التقديم</span>
            <span className={step >= 3 ? 'text-dark font-bold' : ''}>مراجعة وإرسال</span>
          </div>
        </div>

        <Card className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-dark border-b border-border pb-4">معلوماتك الشخصية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="الاسم الكامل" value={formData.name} disabled />
                <Input label="البريد الإلكتروني" value={formData.email} disabled />
                <Input label="الجامعة" value={formData.university} disabled />
                <Input label="التخصص" value={formData.major} disabled />
              </div>
              <Input 
                label="رابط حساب لينكد إن (اختياري)" 
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                placeholder="https://linkedin.com/in/username"
                dir="ltr"
              />
              
              <div className="mt-8">
                <h3 className="text-lg font-bold text-dark mb-4">السيرة الذاتية</h3>
                <Tabs tabs={cvTabsData} activeTab={cvTab} onChange={setCvTab} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-border pb-4 mb-6">
                <h2 className="text-2xl font-bold text-dark mb-2">أخبرنا عن نفسك</h2>
                <p className="text-text-secondary">أجب بصدق — لا توجد إجابات خاطئة. نريد أن نفهمك كإنسان قبل أن نفهمك كمتقدم.</p>
              </div>

              {[
                { id: 'q1', text: 'ما الذي دفعك لاختيار تخصص اللغة الإنجليزية؟' },
                { id: 'q2', text: 'هل لديك أي تجربة سابقة في الترجمة أو العمل باللغة الإنجليزية؟ اذكر التفاصيل.' },
                { id: 'q3', text: 'كيف تتعامل مع مصطلح تقني لا تعرف ترجمته الدقيقة؟' },
                { id: 'q4', text: 'ما نقطة القوة الأبرز التي تميّزك كمترجم؟' },
                { id: 'q5', text: 'صِف موقفاً واجهت فيه ضغطاً في العمل أو الدراسة وكيف تعاملت معه.' }
              ].map((q, idx) => (
                <Card key={q.id} className="p-5 border border-border shadow-sm bg-gray-50/50">
                  <label className="block text-dark font-medium mb-3">{idx + 1}. {q.text}</label>
                  <Textarea
                    value={formData.answers[q.id]}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    placeholder="اكتب إجابتك هنا..."
                    minLength={80}
                    showCount={true}
                    rows={4}
                  />
                </Card>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-dark border-b border-border pb-4">مراجعة وإرسال</h2>
              
              <div className="bg-primary p-6 rounded-xl space-y-4">
                <h3 className="font-bold text-dark">ملخص الطلب</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-text-secondary">الاسم:</span>
                  <span className="text-dark font-medium">{formData.name}</span>
                  <span className="text-text-secondary">التخصص:</span>
                  <span className="text-dark font-medium">{formData.major}</span>
                  <span className="text-text-secondary">السيرة الذاتية:</span>
                  <span className="text-dark font-medium">{cvTab === 0 ? (formData.cvText ? 'تم الإدخال نصياً' : 'لم يتم الإدخال') : (formData.cvFile ? 'تم رفع ملف' : 'لم يتم الرفع')}</span>
                  <span className="text-text-secondary">الأسئلة المجابة:</span>
                  <span className="text-dark font-medium">{Object.values(formData.answers).filter(a => a.trim().length > 0).length} / 5</span>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer bg-white">
                <input 
                  type="checkbox" 
                  className="mt-1 w-5 h-5 rounded border-border text-accent-gold focus:ring-accent-gold"
                  checked={formData.confirmed}
                  onChange={(e) => setFormData({...formData, confirmed: e.target.checked})}
                />
                <span className="text-dark font-medium">أؤكد أن جميع المعلومات التي قدمتها صحيحة ودقيقة وأن الإجابات من كتابتي الشخصية.</span>
              </label>
            </div>
          )}

          <div className="mt-10 flex justify-between pt-6 border-t border-border">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>السابق</Button>
            ) : <div></div>}

            {step < 3 ? (
              <Button className="bg-dark text-white px-8" onClick={() => setStep(step + 1)}>التالي</Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-accent-gold text-dark font-bold px-10" 
                onClick={handleSubmit}
                loading={loading}
                disabled={!formData.confirmed}
              >
                إرسال الطلب
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
