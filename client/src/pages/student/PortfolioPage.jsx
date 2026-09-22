import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export default function PortfolioPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-dark">ملف إنجازي المهني</h1>
          <Button variant="outline" className="border-border text-dark gap-2 shadow-sm bg-white" onClick={() => window.print()}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            تنزيل الملف
          </Button>
        </div>

        <Card id="portfolio-document" className="p-10 border-t-8 border-t-accent-gold bg-white shadow-lg print:shadow-none print:border-t-0">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-border pb-8 mb-8">
            <div className="flex gap-6 items-center">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center font-bold text-4xl text-accent-gold shadow-inner border border-border">
                {user?.name?.charAt(0) || 'ط'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark mb-2">{user?.name || 'اسم المتدرب'}</h1>
                <p className="text-text-secondary text-lg mb-1">{user?.major || 'تخصص اللغة الإنجليزية'} | {user?.university || 'جامعة...'}</p>
                <div className="flex gap-2 mt-3">
                  <span className="bg-dark text-white px-3 py-1 rounded-full text-xs font-bold">مترجم متدرب</span>
                  <span className="bg-primary text-text-secondary px-3 py-1 rounded-full text-xs border border-border">أفق للترجمة والتعريب</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-dark flex items-center justify-center mb-2 mx-auto">
                <span className="text-accent-gold font-bold text-2xl">أ</span>
              </div>
              <span className="text-xs font-bold text-dark tracking-wide">AFUQ PLATFORM</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Sidebar info */}
            <div className="col-span-1 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-dark border-b border-border pb-2 mb-4">فترة التدريب</h3>
                <p className="text-sm text-text-secondary">من: ١ سبتمبر ٢٠٢٤</p>
                <p className="text-sm text-text-secondary">إلى: مستمر</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-dark border-b border-border pb-2 mb-4">المهارات المكتسبة</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary border border-border rounded text-xs text-dark">ترجمة تحريرية</span>
                  <span className="px-2 py-1 bg-primary border border-border rounded text-xs text-dark">صياغة تسويقية</span>
                  <span className="px-2 py-1 bg-primary border border-border rounded text-xs text-dark">الالتزام بالمواعيد</span>
                  <span className="px-2 py-1 bg-primary border border-border rounded text-xs text-dark">التواصل المهني</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-dark border-b border-border pb-2 mb-4">ملخص الأداء</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-text-secondary">المهام المنجزة</span><span className="font-bold text-dark">١ / ٥</span></div>
                    <ProgressBar value={20} color="bg-dark" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-text-secondary">متوسط جودة العمل</span><span className="font-bold text-dark">٧٨٪</span></div>
                    <ProgressBar value={78} color="bg-accent-gold" size="sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-2 space-y-8">
              <div className="bg-primary/50 p-6 rounded-xl border border-border relative">
                <div className="absolute top-0 right-0 w-2 h-full bg-accent-gold rounded-r-xl"></div>
                <h3 className="text-lg font-bold text-dark mb-2">رأي المشرف (قريباً)</h3>
                <p className="text-text-secondary text-sm italic leading-relaxed">
                  "سيتم إضافة التقييم النهائي ورأي المشرف هنا بعد إكمال مسار التدريب بالكامل."
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-dark mb-4">سجل المهام المنجزة</h3>
                <div className="space-y-4">
                  <Card className="p-4 border border-border shadow-none">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-dark">ترجمة مقال تعريفي للشركة</h4>
                      <span className="bg-success-bg text-success px-2 py-1 rounded text-xs font-bold">مكتمل</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">ترجمة مقال من الإنجليزية إلى العربية مع مراعاة الأسلوب التسويقي للشركة.</p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1"><span className="text-accent-gold font-bold">★</span> <span className="text-dark font-medium">التقييم: ٧٨/١٠٠</span></div>
                      <span className="text-border">|</span>
                      <span className="text-text-secondary">التاريخ: ١٥ أكتوبر ٢٠٢٤</span>
                    </div>
                  </Card>
                  
                  <div className="p-4 border border-dashed border-border rounded-xl text-center text-text-muted text-sm bg-primary/30">
                    المهام القادمة ستظهر هنا عند إنجازها
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
