import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-primary font-arabic" dir="rtl">
      {/* Header */}
      <header className="bg-[#0D1F35] text-white px-8 py-5 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E8A94D] flex items-center justify-center text-[#0D1F35] font-bold text-xl shadow-md">أ</div>
          <span className="text-2xl font-bold tracking-wider text-white">أفق</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="px-5 py-2.5 rounded-lg font-bold text-white hover:text-[#E8A94D] transition-colors">
              تسجيل الدخول
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2.5 rounded-lg bg-[#E8A94D] hover:bg-[#d9983b] text-[#0D1F35] font-bold shadow-md transition-all">
              ابدأ تجربتك
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-8 text-center flex flex-col items-center">
        <h1 className="text-5xl font-bold text-dark mb-6 leading-tight max-w-4xl">
          عِش تجربة العمل الحقيقية قبل التخرج
        </h1>
        <p className="text-xl text-text-secondary mb-10 max-w-2xl">
          منصة محاكاة مهنية تدريبية تضعك داخل شركة افتراضية حقيقية، لتكتسب الخبرة التي تبحث عنها الشركات.
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-accent-gold hover:bg-accent-gold/90 text-dark font-bold px-10 text-lg rounded-full">
            ابدأ تجربتك الآن
          </Button>
        </Link>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl w-full">
          <Card className="text-center p-8 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-accent-gold mb-3">٢٠+</div>
            <div className="text-text-primary font-medium text-lg">تخصص قريباً</div>
          </Card>
          <Card className="text-center p-8 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-accent-gold mb-3">شركات</div>
            <div className="text-text-primary font-medium text-lg">افتراضية واقعية</div>
          </Card>
          <Card className="text-center p-8 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-accent-gold mb-3">AI</div>
            <div className="text-text-primary font-medium text-lg">تقييم بالذكاء الاصطناعي</div>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark text-center mb-16">كيف تعمل المنصة؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-border -z-10"></div>
            {[
              { num: '١', title: 'أنشئ ملفك', desc: 'سجّل وحدد تخصصك واهتماماتك المهنية', icon: '📝' },
              { num: '٢', title: 'اختر وظيفتك', desc: 'تقدم لوظيفة في الشركة الافتراضية المناسبة', icon: '💼' },
              { num: '٣', title: 'ابدأ العمل', desc: 'استلم مهام حقيقية ونفذها ضمن المواعيد', icon: '✅' },
              { num: '٤', title: 'احصل على تقييم', desc: 'تغذية راجعة فورية من الذكاء الاصطناعي والمشرفين', icon: '📊' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl mb-6 shadow-sm z-10 border-4 border-white">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">{step.title}</h3>
                <p className="text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Companies */}
      <section className="py-20 px-8 bg-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark mb-12 text-center">الشركات الافتراضية المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-border shadow-sm p-6 relative overflow-hidden group hover:border-accent-gold transition-colors">
              <div className="absolute top-4 left-4 bg-success text-white text-xs font-bold px-3 py-1 rounded-full">
                متاح الآن
              </div>
              <div className="w-16 h-16 bg-dark rounded-xl mb-4 flex items-center justify-center">
                <div className="text-accent-gold font-bold text-2xl">أ</div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">أفق للترجمة والتعريب</h3>
              <p className="text-text-secondary mb-6 text-sm">
                شركة متخصصة في خدمات الترجمة التحريرية، التعريب، وتحرير المحتوى الرقمي.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-primary text-text-secondary text-xs px-2 py-1 rounded">لغة إنجليزية</span>
                <span className="bg-primary text-text-secondary text-xs px-2 py-1 rounded">ترجمة</span>
              </div>
              <Link to="/register">
                <Button fullWidth className="bg-dark hover:bg-dark-2 text-white">انضم للشركة</Button>
              </Link>
            </Card>

            {[1, 2].map((i) => (
              <Card key={i} className="border border-border shadow-sm p-6 relative overflow-hidden bg-gray-50 opacity-75">
                <div className="absolute top-4 left-4 bg-gray-300 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                  قريباً
                </div>
                <div className="w-16 h-16 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <Button fullWidth disabled className="bg-gray-300 text-gray-500 cursor-not-allowed">قريباً</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1F35] py-12 text-center border-t border-[#1E3A52]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#E8A94D] flex items-center justify-center text-[#0D1F35] font-bold text-base shadow-sm">أ</div>
          <span className="text-2xl font-bold text-white tracking-wider">أفق</span>
        </div>
        <p className="text-gray-300 text-sm font-medium">© 2024 أفق للترجمة والتعريب — جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
