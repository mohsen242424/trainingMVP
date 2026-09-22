import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Badge from '../../components/ui/Badge';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const stats = [
    { label: 'إجمالي المستخدمين', value: '٣٤٢', color: 'bg-dark text-white' },
    { label: 'إجمالي الطلبات', value: '١٥٦', color: 'bg-primary border border-border text-dark' },
    { label: 'نسبة القبول', value: '٣٤٪', color: 'bg-success-bg text-success border border-success/20' },
    { label: 'نسبة الإكمال', value: '٨٩٪', color: 'bg-accent-gold-light text-dark border border-accent-gold/30' }
  ];

  const tabsData = [
    {
      label: 'المستخدمون',
      content: (
        <Card className="mt-6 border border-border shadow-sm overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-primary/50 border-b border-border text-text-secondary">
                <tr>
                  <th className="p-4 font-medium">الاسم</th>
                  <th className="p-4 font-medium">البريد الإلكتروني</th>
                  <th className="p-4 font-medium">الدور</th>
                  <th className="p-4 font-medium">الحالة</th>
                  <th className="p-4 font-medium">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                <tr>
                  <td className="p-4 font-bold text-dark">مدير النظام</td>
                  <td className="p-4 text-text-secondary">admin@afuq.com</td>
                  <td className="p-4"><Badge className="bg-dark text-white">مدير</Badge></td>
                  <td className="p-4"><Badge variant="success">نشط</Badge></td>
                  <td className="p-4 text-text-muted">-</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-dark">رنا حداد</td>
                  <td className="p-4 text-text-secondary">rana@afuq.com</td>
                  <td className="p-4"><Badge className="bg-accent-gold text-dark">مشرف</Badge></td>
                  <td className="p-4"><Badge variant="success">نشط</Badge></td>
                  <td className="p-4"><button className="text-error text-xs font-medium">تعطيل</button></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-dark">محمد علي</td>
                  <td className="p-4 text-text-secondary">mohammed@student.edu</td>
                  <td className="p-4"><Badge variant="outline">طالب</Badge></td>
                  <td className="p-4"><Badge variant="success">نشط</Badge></td>
                  <td className="p-4"><button className="text-error text-xs font-medium">تعطيل</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )
    },
    {
      label: 'الطلبات',
      content: (
        <Card className="mt-6 border border-border shadow-sm p-8 text-center text-text-secondary bg-primary/30">
          يمكنك فلترة واستعراض جميع الطلبات من هنا. (الواجهة قيد التطوير)
        </Card>
      )
    },
    {
      label: 'الوظائف (الأقسام)',
      content: (
        <div className="mt-6 space-y-4">
          <Card className="p-5 border border-border shadow-sm flex justify-between items-center bg-white">
            <div>
              <h3 className="font-bold text-dark text-lg">قسم الترجمة التحريرية</h3>
              <p className="text-sm text-text-secondary">متاح للطلاب ذوي التخصصات اللغوية</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-success">مفعل</span>
              <div className="w-10 h-6 bg-success rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform translate-x-4"></div>
              </div>
            </div>
          </Card>
          <Card className="p-5 border border-border shadow-sm flex justify-between items-center bg-white opacity-70">
            <div>
              <h3 className="font-bold text-dark text-lg">قسم التعريب التقني</h3>
              <p className="text-sm text-text-secondary">تحت التجهيز للمرحلة القادمة</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-text-muted">معطل</span>
              <div className="w-10 h-6 bg-border rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
            </div>
          </Card>
        </div>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-2">لوحة الإدارة</h1>
          <p className="text-text-secondary">إدارة النظام والمستخدمين والوظائف المتاحة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-xl shadow-sm ${stat.color}`}>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div>
          <Tabs tabs={tabsData} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>
    </DashboardLayout>
  );
}
