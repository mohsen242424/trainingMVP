import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function MeetingsPage() {
  const meetings = [
    {
      id: 1,
      title: 'الاجتماع التعريفي والتوجيهي',
      date: '٢٤ سبتمبر ٢٠٢٤',
      time: '١٠:٠٠ صباحاً',
      duration: '٣٠ دقيقة',
      supervisor: 'رنا حداد',
      status: 'completed'
    },
    {
      id: 2,
      title: 'جلسة تقييم منتصف التدريب',
      date: '٥ أكتوبر ٢٠٢٤',
      time: '٠٢:٠٠ مساءً',
      duration: '٤٥ دقيقة',
      supervisor: 'رنا حداد',
      status: 'scheduled',
      link: '#'
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-2">الاجتماعات المجدولة</h1>
          <p className="text-text-secondary">استعرض اجتماعاتك القادمة والسابقة مع المشرفين</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map(m => (
            <Card key={m.id} className="p-6 border border-border shadow-sm flex flex-col h-full hover:border-accent-gold transition-colors">
              <div className="flex justify-between items-start mb-4">
                <Badge variant={m.status === 'completed' ? 'success' : 'default'} className={m.status === 'scheduled' ? 'bg-info-bg text-info' : ''}>
                  {m.status === 'completed' ? 'مكتمل' : 'مجدول'}
                </Badge>
                <span className="text-2xl opacity-80">📅</span>
              </div>
              
              <h3 className="font-bold text-dark text-lg mb-4">{m.title}</h3>
              
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-text-muted w-5">📆</span>
                  <span className="text-text-secondary">{m.date}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-text-muted w-5">⏰</span>
                  <span className="text-text-secondary">{m.time} ({m.duration})</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-text-muted w-5">👤</span>
                  <span className="text-text-secondary">المشرف: {m.supervisor}</span>
                </div>
              </div>

              {m.status === 'scheduled' && (
                <div className="mt-6 pt-4 border-t border-border">
                  <Button fullWidth className="bg-dark hover:bg-dark-2 text-white">
                    انضم للاجتماع
                  </Button>
                </div>
              )}
            </Card>
          ))}
          
          <Card className="p-6 border border-dashed border-border flex flex-col items-center justify-center text-center h-full bg-primary/50 opacity-60">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-text-muted mb-3 shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-text-secondary font-medium text-sm">سيقوم المشرف بجدولة اجتماعات إضافية بناءً على تقدمك</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
