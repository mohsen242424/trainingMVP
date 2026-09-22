import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Tooltip from '../components/ui/Tooltip';
import { SkeletonCard } from '../components/ui/Skeleton';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import api from '../lib/api';

export default function PositionsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await api.getPositions();
        setPositions(data);
      } catch (err) {
        showToast('حدث خطأ أثناء تحميل الوظائف', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchPositions();
  }, [showToast]);

  return (
    <div className="min-h-screen bg-primary font-arabic" dir="rtl">
      {/* Top Bar */}
      <header className="bg-white border-b border-border px-8 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center text-accent-gold font-bold">أ</div>
          <span className="font-bold text-dark">أفق للترجمة والتعريب</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-text-secondary hover:text-dark cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          <div className="flex items-center gap-2 border-r border-border pr-4">
            <div className="w-8 h-8 rounded-full bg-accent-gold-light text-dark flex items-center justify-center font-bold">
              {user?.name?.charAt(0) || 'ط'}
            </div>
            <span className="text-sm font-medium text-dark">{user?.name}</span>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-dark mb-2">الوظائف المتاحة</h1>
            <p className="text-text-secondary">استكشف الأقسام المتاحة وانضم لفريق العمل</p>
          </div>
          <Badge variant="outline" className="bg-white">اللغة: الإنجليزية</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            positions.map(position => (
              <Card 
                key={position.id} 
                className={`p-6 border ${position.is_available ? 'border-border hover:shadow-md' : 'border-border/50 opacity-[0.65] grayscale'} transition-all`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-gold-light flex items-center justify-center text-2xl relative">
                      {!position.is_available && (
                        <div className="absolute inset-0 bg-dark/20 rounded-xl flex items-center justify-center backdrop-blur-[1px]">
                          <svg className="w-5 h-5 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      )}
                      📄
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark">{position.title}</h3>
                      <span className="text-sm text-text-secondary">{position.department}</span>
                    </div>
                  </div>
                  <Badge variant={position.is_available ? 'success' : 'default'}>
                    {position.is_available ? 'متاح' : 'قريباً'}
                  </Badge>
                </div>
                
                <p className="text-text-primary text-sm mb-6 line-clamp-2">
                  {position.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {position.requirements?.map((req, idx) => (
                    <span key={idx} className="bg-primary text-xs text-text-secondary px-2 py-1 rounded">
                      {req}
                    </span>
                  )) || (
                    <>
                      <span className="bg-primary text-xs text-text-secondary px-2 py-1 rounded">ترجمة تحريرية</span>
                      <span className="bg-primary text-xs text-text-secondary px-2 py-1 rounded">مستوى متقدم B2+</span>
                    </>
                  )}
                </div>

                {position.is_available ? (
                  <Link to={`/apply/${position.id}`}>
                    <Button fullWidth className="bg-accent-gold hover:bg-accent-gold/90 text-dark font-bold">
                      تقدم الآن
                    </Button>
                  </Link>
                ) : (
                  <Tooltip content="هذا القسم سيتوفر قريباً، ترقّبوا التحديثات!">
                    <div className="w-full">
                      <Button fullWidth disabled className="bg-gray-200 text-gray-500 cursor-not-allowed">
                        أشعرني عند الإطلاق
                      </Button>
                    </div>
                  </Tooltip>
                )}
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
