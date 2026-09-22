import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import { useToast } from '../../contexts/ToastContext';

export default function SupervisorMeetings() {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const meetings = [
    {
      id: 1,
      title: 'الاجتماع التعريفي والتوجيهي',
      date: '٢٤ سبتمبر ٢٠٢٤',
      time: '١٠:٠٠ صباحاً',
      student: 'محمد علي',
      status: 'completed'
    },
    {
      id: 2,
      title: 'جلسة تقييم منتصف التدريب',
      date: '٥ أكتوبر ٢٠٢٤',
      time: '٠٢:٠٠ مساءً',
      student: 'لمى سعد',
      status: 'scheduled'
    }
  ];

  const handleSchedule = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    showToast('تم جدولة الاجتماع بنجاح وسيتم إشعار المتدرب', 'success');
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-dark mb-2">إدارة الاجتماعات</h1>
            <p className="text-text-secondary">جدولة وإدارة جلسات التوجيه مع المتدربين</p>
          </div>
          <Button className="bg-accent-gold text-dark font-bold" onClick={() => setIsModalOpen(true)}>
            + جدولة اجتماع جديد
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <table className="w-full text-right text-sm">
            <thead className="bg-primary/50 border-b border-border text-text-secondary">
              <tr>
                <th className="p-4 font-medium">عنوان الاجتماع</th>
                <th className="p-4 font-medium">المتدرب</th>
                <th className="p-4 font-medium">التاريخ والوقت</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {meetings.map(m => (
                <tr key={m.id} className="hover:bg-primary/20 transition-colors">
                  <td className="p-4 font-medium text-dark">{m.title}</td>
                  <td className="p-4 text-text-primary">{m.student}</td>
                  <td className="p-4 text-text-secondary">{m.date} - {m.time}</td>
                  <td className="p-4">
                    <Badge variant={m.status === 'completed' ? 'success' : 'default'} className={m.status === 'scheduled' ? 'bg-info-bg text-info' : ''}>
                      {m.status === 'completed' ? 'مكتمل' : 'مجدول'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {m.status === 'scheduled' ? (
                      <Button variant="outline" size="sm" className="text-xs">رابط الانضمام</Button>
                    ) : (
                      <span className="text-text-muted text-xs">لا يوجد إجراء</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="جدولة اجتماع جديد" size="md">
        <form onSubmit={handleSchedule} className="space-y-4 pt-4 text-right" dir="rtl">
          <Input label="عنوان الاجتماع" placeholder="مثال: جلسة تقييم منتصف التدريب" required />
          <Select 
            label="المتدرب" 
            options={[
              {value: '1', label: 'محمد علي (قسم الترجمة)'},
              {value: '2', label: 'لمى سعد (قسم التدقيق)'}
            ]} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="التاريخ" type="date" required />
            <Input label="الوقت" type="time" required />
          </div>
          <Select 
            label="المدة" 
            options={[
              {value: '30', label: '٣٠ دقيقة'},
              {value: '45', label: '٤٥ دقيقة'},
              {value: '60', label: 'ساعة واحدة'}
            ]} 
          />
          <Input label="رابط الاجتماع (Google Meet / Zoom)" placeholder="https://..." dir="ltr" />
          <Textarea label="ملاحظات إضافية (تظهر للمتدرب)" rows={2} />
          
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button type="submit" className="flex-1 bg-dark text-white">حفظ وجدولة</Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
