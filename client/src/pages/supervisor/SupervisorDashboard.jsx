import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import { useToast } from '../../contexts/ToastContext';

export default function SupervisorDashboard() {
  const { showToast } = useToast();
  const [selectedApp, setSelectedApp] = useState(null);

  const stats = [
    { label: 'إجمالي المتقدمين', value: '١٢٤', color: 'bg-dark text-white' },
    { label: 'قيد المراجعة', value: '١٥', color: 'bg-warning-bg text-warning' },
    { label: 'جارٍ التدريب', value: '٤٢', color: 'bg-info-bg text-info' },
    { label: 'أكملوا التدريب', value: '٨', color: 'bg-success-bg text-success' }
  ];

  const applications = [
    { id: '101', name: 'أحمد محمود', major: 'اللغة الإنجليزية', position: 'قسم الترجمة', date: '٢٤ سبت', status: 'pending' },
    { id: '102', name: 'سارة خالد', major: 'اللغة الفرنسية', position: 'قسم التعريب', date: '٢٣ سبت', status: 'reviewing' },
    { id: '103', name: 'محمد علي', major: 'اللغة الإنجليزية', position: 'قسم التدقيق', date: '٢٠ سبت', status: 'accepted' },
    { id: '104', name: 'نورة فهد', major: 'اللغة الإنجليزية', position: 'قسم الترجمة', date: '١٨ سبت', status: 'rejected' }
  ];

  const handleDecision = (decision) => {
    showToast(`تم ${decision === 'accept' ? 'قبول' : 'رفض'} المتقدم بنجاح`, decision === 'accept' ? 'success' : 'info');
    setSelectedApp(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <Badge variant="default" className="bg-warning-bg text-warning">جديد</Badge>;
      case 'reviewing': return <Badge variant="default" className="bg-info-bg text-info">قيد المراجعة</Badge>;
      case 'accepted': return <Badge variant="success">مقبول</Badge>;
      case 'rejected': return <Badge variant="default" className="bg-error-bg text-error">مرفوض</Badge>;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-2">لوحة المشرف</h1>
          <p className="text-text-secondary">نظرة عامة على طلبات الانضمام والمتدربين</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-xl shadow-sm border border-border ${stat.color}`}>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <Card className="mt-8 border border-border shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border bg-primary/50 flex justify-between items-center">
            <h2 className="font-bold text-dark">أحدث الطلبات</h2>
            <div className="flex gap-2">
              <input type="text" placeholder="بحث..." className="border border-border rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-accent-gold" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-white border-b border-border text-text-secondary">
                <tr>
                  <th className="p-4 font-medium">الطالب</th>
                  <th className="p-4 font-medium">الوظيفة</th>
                  <th className="p-4 font-medium">تاريخ التقديم</th>
                  <th className="p-4 font-medium">الحالة</th>
                  <th className="p-4 font-medium">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {applications.map(app => (
                  <tr key={app.id} className="hover:bg-primary/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-dark">{app.name}</div>
                      <div className="text-xs text-text-secondary">{app.major}</div>
                    </td>
                    <td className="p-4 text-text-primary">{app.position}</td>
                    <td className="p-4 text-text-secondary">{app.date}</td>
                    <td className="p-4">{getStatusBadge(app.status)}</td>
                    <td className="p-4">
                      <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>مراجعة</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Slide-over panel for review */}
      {selectedApp && (
        <>
          <div className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedApp(null)}></div>
          <div className="fixed inset-y-0 left-0 w-full md:w-[70%] max-w-2xl bg-white shadow-2xl z-50 transform transition-transform overflow-y-auto" dir="rtl">
            <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-dark">مراجعة طلب: {selectedApp.name}</h2>
              <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-primary rounded-full">✕</button>
            </div>
            
            <div className="p-6 space-y-8">
              <div className="flex gap-4 p-4 bg-primary rounded-xl border border-border">
                <div className="w-16 h-16 bg-accent-gold-light rounded-full flex items-center justify-center text-dark font-bold text-xl">
                  {selectedApp.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-dark text-lg">{selectedApp.name}</h3>
                  <p className="text-text-secondary text-sm mb-1">{selectedApp.major} | جامعة الملك سعود</p>
                  <p className="text-sm font-medium">التقديم على: <span className="text-accent-gold">{selectedApp.position}</span></p>
                </div>
              </div>

              <div>
                <Tabs 
                  activeTab={0}
                  tabs={[
                    { label: 'إجابات الأسئلة', content: (
                      <div className="space-y-4 pt-4">
                        <Card className="p-4 bg-white border border-border shadow-sm">
                          <p className="font-bold text-dark mb-2 text-sm">١. ما الذي دفعك لاختيار تخصص اللغة الإنجليزية؟</p>
                          <p className="text-text-secondary text-sm leading-relaxed">شغفي باللغات والتواصل الثقافي كان الدافع الأساسي. أجد متعة في نقل المعاني بين ثقافتين مختلفتين...</p>
                        </Card>
                        <Card className="p-4 bg-white border border-border shadow-sm">
                          <p className="font-bold text-dark mb-2 text-sm">٢. كيف تتعامل مع مصطلح تقني لا تعرف ترجمته؟</p>
                          <p className="text-text-secondary text-sm leading-relaxed">أقوم بالبحث في القواميس المتخصصة والمعاجم المعتمدة مثل معجم الأمم المتحدة، وأقرأ عن المفهوم في سياقه الأصلي...</p>
                        </Card>
                      </div>
                    )},
                    { label: 'السيرة الذاتية', content: (
                      <div className="pt-4 flex justify-center p-10 bg-primary border border-dashed border-border rounded-xl mt-4">
                        <Button variant="outline">عرض ملف PDF</Button>
                      </div>
                    )}
                  ]}
                  onChange={() => {}}
                />
              </div>

              {selectedApp.status !== 'accepted' && selectedApp.status !== 'rejected' && (
                <div className="bg-white border-t-4 border-t-dark shadow-lg rounded-xl p-6 mt-8">
                  <h3 className="font-bold text-dark mb-4 text-lg">القرار</h3>
                  <div className="flex gap-6 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="decision" value="accept" className="text-success focus:ring-success w-5 h-5" />
                      <span className="font-medium">قبول وتعيين مهمة</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="decision" value="reject" className="text-error focus:ring-error w-5 h-5" />
                      <span className="font-medium">رفض الطلب</span>
                    </label>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-dark mb-2">ملاحظة للطالب (اختياري)</label>
                    <textarea className="w-full border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-dark" rows="3" placeholder="أضف ملاحظة أو سبب للقرار..."></textarea>
                  </div>
                  <Button fullWidth className="bg-dark text-white" onClick={() => handleDecision('accept')}>تأكيد القرار</Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
