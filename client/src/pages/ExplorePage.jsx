import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-dark bg-opacity-95 flex items-center justify-center p-6 font-arabic" dir="rtl">
      <Card className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10 relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold-light rounded-bl-full opacity-50 -z-10"></div>
        
        <div className="flex flex-col items-center text-center z-10 relative">
          <div className="w-24 h-24 rounded-2xl bg-dark flex items-center justify-center mb-6 shadow-md">
            <span className="text-accent-gold font-bold text-5xl">أ</span>
          </div>
          
          <h1 className="text-3xl font-bold text-dark mb-3">أفق للترجمة والتعريب</h1>
          <p className="text-text-secondary font-medium mb-6">
            شركة رائدة في مجال الترجمة والتعريب منذ ٢٠١٥ — فريق من ٤٥ متخصصاً
          </p>
          
          <p className="text-text-primary text-lg leading-relaxed max-w-2xl mb-10">
            تعتبر أفق للترجمة من الشركات الرائدة محلياً في تقديم حلول لغوية متكاملة للمؤسسات. 
            ننضم لكفاءات شابة ونوفر بيئة عمل عن بعد تركز على الجودة والدقة والالتزام بالمواعيد.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
            <div className="flex flex-col items-center bg-primary p-4 rounded-xl">
              <span className="text-3xl mb-2">💻</span>
              <span className="font-semibold text-dark">عمل عن بعد 100%</span>
            </div>
            <div className="flex flex-col items-center bg-primary p-4 rounded-xl">
              <span className="text-3xl mb-2">👥</span>
              <span className="font-semibold text-dark">فريق احترافي</span>
            </div>
            <div className="flex flex-col items-center bg-primary p-4 rounded-xl">
              <span className="text-3xl mb-2">📁</span>
              <span className="font-semibold text-dark">مشاريع حقيقية</span>
            </div>
          </div>
          
          <div className="w-full text-right mb-8">
            <h3 className="text-xl font-bold text-dark border-b border-border pb-2 mb-4">
              الأقسام الوظيفية المتاحة لتخصصك
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-accent-gold-light text-dark font-medium rounded-lg border border-accent-gold/20">
                قسم الترجمة التحريرية
              </span>
              <span className="px-4 py-2 bg-primary text-text-secondary font-medium rounded-lg border border-border">
                قسم التدقيق اللغوي
              </span>
              <span className="px-4 py-2 bg-primary text-text-secondary font-medium rounded-lg border border-border">
                قسم التعريب التقني
              </span>
            </div>
          </div>
          
          <Link to="/positions" className="w-full mt-4">
            <Button size="lg" fullWidth className="bg-accent-gold hover:bg-accent-gold/90 text-dark font-bold text-lg">
              استعرض الوظائف المتاحة →
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
