import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appStatus, setAppStatus] = useState('loading'); // loading, pending, rejected, accepted
  const [application, setApplication] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appRes = await api.getMyApplication();
        if (!appRes) {
          navigate('/explore');
          return;
        }
        setApplication(appRes);
        setAppStatus(appRes.status);

        if (appRes.status === 'accepted') {
          const tasks = await api.getMyTasks();
          const active = tasks.find(t => t.is_available && !t.submitted);
          setActiveTask(active || tasks[0]); // Fallback for UI if no active
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [navigate]);

  if (appStatus === 'loading') {
    return <DashboardLayout><div className="p-8 text-center">جاري التحميل...</div></DashboardLayout>;
  }

  // --- PENDING / REVIEWING VIEW ---
  if (appStatus === 'pending' || appStatus === 'reviewing') {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto mt-10">
          <Card className="p-10 text-center shadow-lg border-t-4 border-t-warning">
            <div className="w-24 h-24 mx-auto bg-warning-bg rounded-full flex items-center justify-center mb-6 relative">
              <span className="text-4xl animate-pulse">⏳</span>
            </div>
            <h2 className="text-3xl font-bold text-dark mb-4">طلبك قيد المراجعة</h2>
            <p className="text-text-secondary text-lg mb-2">
              تم تقديم طلبك لوظيفة <span className="font-bold text-dark">{application?.position?.title || 'مترجم متدرب'}</span> بتاريخ {new Date(application?.created_at || Date.now()).toLocaleDateString('ar-SA')}
            </p>
            <p className="text-text-secondary mb-10">سيتواصل معك المشرف قريباً</p>

            <div className="relative mb-16 px-4">
              <div className="absolute top-1/2 left-8 right-8 h-1 bg-border -translate-y-1/2 -z-10"></div>
              <div className="absolute top-1/2 right-8 h-1 bg-warning w-1/3 -translate-y-1/2 -z-10 transition-all duration-1000"></div>
              
              <div className="flex justify-between">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center font-bold shadow-md mb-2">✓</div>
                  <span className="text-sm font-bold text-dark">تقديم الطلب</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-warning border-4 border-white flex items-center justify-center shadow-md mb-2 animate-pulse"></div>
                  <span className="text-sm font-bold text-warning">المراجعة</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-border border-4 border-white flex items-center justify-center shadow-md mb-2"></div>
                  <span className="text-sm font-medium text-text-muted">القرار</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-border border-4 border-white flex items-center justify-center shadow-md mb-2"></div>
                  <span className="text-sm font-medium text-text-muted">البدء</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-dark mb-6 text-right">ما سيشمله عملك</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="p-5 text-right relative overflow-hidden bg-gray-50 border-none">
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-white/40 flex items-center justify-center z-10">
                    <span className="text-2xl opacity-50">🔒</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // --- REJECTED VIEW ---
  if (appStatus === 'rejected') {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto mt-20">
          <Card className="p-10 text-center shadow-lg border-t-4 border-t-error">
            <div className="w-20 h-20 mx-auto bg-error-bg text-error rounded-full flex items-center justify-center text-4xl mb-6">
              ✕
            </div>
            <h2 className="text-2xl font-bold text-dark mb-4">لم يتم قبول طلبك هذه المرة</h2>
            <p className="text-text-secondary mb-6">شكراً لاهتمامك بالانضمام إلينا. نتمنى لك التوفيق في مسيرتك المهنية.</p>
            {application?.supervisor_note && (
              <div className="bg-primary p-4 rounded-lg text-right mb-8 border border-border text-sm">
                <strong className="text-dark block mb-1">ملاحظة المشرف:</strong>
                <span className="text-text-secondary">{application.supervisor_note}</span>
              </div>
            )}
            <Button onClick={() => navigate('/positions')} className="bg-dark text-white">
              يمكنك التقدم لوظيفة أخرى
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // --- ACCEPTED VIEW (MAIN DASHBOARD) ---
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-dark">صباح الخير، {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-text-secondary mt-2">لديك مهمة بانتظارك اليوم للعمل عليها.</p>
        </div>

        <Card className="border-l-4 border-l-accent-gold p-0 overflow-hidden shadow-sm">
          <div className="bg-accent-gold-light/30 px-6 py-4 border-b border-border flex justify-between items-center">
            <h2 className="font-bold text-dark text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse"></span>
              مهمة اليوم النشطة
            </h2>
          </div>
          <div className="p-6 md:flex justify-between items-center gap-6">
            <div className="flex-1 mb-6 md:mb-0">
              <div className="text-sm text-text-secondary mb-1">المهمة #١</div>
              <h3 className="text-xl font-bold text-dark mb-2">{activeTask?.title || 'ترجمة مقال تعريفي للشركة'}</h3>
              <p className="text-text-secondary line-clamp-2 max-w-2xl">
                {activeTask?.description || 'المطلوب ترجمة المقال المرفق من الإنجليزية إلى العربية مع مراعاة المصطلحات الخاصة بالشركة والالتزام بدليل الأسلوب الخاص بنا.'}
              </p>
              <div className="flex gap-4 mt-4 text-sm font-medium">
                <span className="text-warning bg-warning-bg px-2 py-1 rounded">الموعد: اليوم ١١:٥٩ م</span>
                <span className="text-info bg-info-bg px-2 py-1 rounded">القسم: ترجمة تحريرية</span>
              </div>
            </div>
            <div className="md:w-48 flex-shrink-0">
              <Button 
                size="lg" 
                fullWidth 
                className="bg-accent-gold text-dark font-bold shadow-md hover:-translate-y-1 transition-transform"
                onClick={() => navigate(`/dashboard/student/tasks/${activeTask?.id || '1'}`)}
              >
                ابدأ المهمة
              </Button>
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-xl font-bold text-dark mb-6">مسار التدريب</h2>
          <div className="relative border-r-2 border-border pr-6 space-y-8">
            
            <div className="relative">
              <div className="absolute w-4 h-4 rounded-full bg-success -right-[31px] top-1 border-4 border-white"></div>
              <Card className="p-4 bg-success-bg/30 border-success/30">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-dark">الاجتماع التعريفي (تم)</h3>
                  <span className="text-success text-sm font-bold">✓ مكتمل</span>
                </div>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute w-4 h-4 rounded-full bg-accent-gold -right-[31px] top-1 border-4 border-white shadow-[0_0_10px_rgba(232,169,77,0.5)]"></div>
              <Card className="p-4 border-accent-gold shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-dark">المهمة ١: ترجمة مقال تعريفي</h3>
                  <span className="text-accent-gold text-sm font-bold">قيد التنفيذ</span>
                </div>
                <ProgressBar value={10} color="bg-accent-gold" size="sm" />
              </Card>
            </div>

            {[2, 3, 4, 5].map(num => (
              <div key={num} className="relative opacity-60">
                <div className="absolute w-4 h-4 rounded-full bg-border -right-[31px] top-1 border-4 border-white"></div>
                <Card className="p-4 border-dashed border-border bg-transparent">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-text-secondary">المهمة {num}: سيتوفر قريباً</h3>
                    <span className="text-text-muted text-sm text-xl">🔒</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
