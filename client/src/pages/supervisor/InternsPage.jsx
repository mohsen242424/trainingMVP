import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function InternsPage() {
  const interns = [
    { id: 1, name: 'محمد علي', position: 'قسم الترجمة التحريرية', progress: 2, total: 5, lastActive: 'قبل ساعتين', status: 'active' },
    { id: 2, name: 'لمى سعد', position: 'قسم التدقيق اللغوي', progress: 4, total: 5, lastActive: 'أمس', status: 'active' },
    { id: 3, name: 'فهد عبدالعزيز', position: 'قسم الترجمة التحريرية', progress: 5, total: 5, lastActive: 'قبل يومين', status: 'completed' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-dark mb-2">المتدربون</h1>
            <p className="text-text-secondary">متابعة تقدم المتدربين النشطين وتقييم أعمالهم</p>
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="بحث باسم المتدرب..." className="border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent-gold min-w-[250px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interns.map(intern => (
            <Card key={intern.id} className="p-0 overflow-hidden border border-border shadow-sm flex flex-col">
              <div className="p-5 border-b border-border bg-white flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-gold-light text-dark flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {intern.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-dark">{intern.name}</h3>
                    {intern.status === 'completed' ? (
                      <Badge variant="success" className="text-[10px] px-2 py-0.5">مكتمل</Badge>
                    ) : (
                      <Badge className="bg-info-bg text-info text-[10px] px-2 py-0.5">نشط</Badge>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary">{intern.position}</p>
                </div>
              </div>
              
              <div className="p-5 bg-primary/30 flex-1 flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-text-secondary">التقدم في المهام</span>
                    <span className="font-bold text-dark">{intern.progress} / {intern.total}</span>
                  </div>
                  <ProgressBar value={(intern.progress / intern.total) * 100} color={intern.status === 'completed' ? 'bg-success' : 'bg-accent-gold'} size="sm" />
                </div>
                
                <div className="flex justify-between items-center text-xs text-text-secondary mb-4">
                  <span className="flex items-center gap-1">⏱️ آخر نشاط: {intern.lastActive}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 text-sm py-1.5" size="sm">التفاصيل والتقييم</Button>
                  <Button className="bg-dark hover:bg-dark-2 text-white px-3" size="sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
