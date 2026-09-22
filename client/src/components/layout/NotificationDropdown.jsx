import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle, MessageSquare, Calendar, ClipboardList } from 'lucide-react';
import api from '../../lib/api';

const NotificationDropdown = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for initial UI build
  useEffect(() => {
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: 'task',
          title: 'مهمة جديدة',
          body: 'تم تعيين مهمة "ترجمة مقال طبي" لك.',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 mins ago
        },
        {
          id: 2,
          type: 'message',
          title: 'رسالة جديدة',
          body: 'المشرف أحمد أرسل لك رسالة جديدة.',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
        },
        {
          id: 3,
          type: 'meeting',
          title: 'تذكير باجتماع',
          body: 'اجتماع التقييم الأسبوعي يبدأ بعد 15 دقيقة.',
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'task': return <ClipboardList size={16} className="text-warning" />;
      case 'message': return <MessageSquare size={16} className="text-info" />;
      case 'meeting': return <Calendar size={16} className="text-purple-500" />;
      default: return <Bell size={16} className="text-text-muted" />;
    }
  };

  const getBg = (type) => {
    switch (type) {
      case 'task': return 'bg-warning-bg';
      case 'message': return 'bg-info-bg';
      case 'meeting': return 'bg-purple-50';
      default: return 'bg-gray-100';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    return `منذ ${diffDays} يوم`;
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-surface rounded-xl shadow-lg border border-border overflow-hidden animate-[fadeIn_0.15s_ease-out]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gray-50/50">
        <h3 className="font-bold text-text-primary text-sm">الإشعارات</h3>
        <button className="text-xs text-info hover:underline font-medium">تحديد الكل كمقروء</button>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-sm text-text-muted">جاري التحميل...</div>
        ) : notifications.length > 0 ? (
          <div className="flex flex-col">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => { markAsRead(notif.id); onClose(); }}
                className={`flex gap-3 p-4 border-b border-border cursor-pointer hover:bg-gray-50 transition-colors ${!notif.isRead ? 'bg-info-bg/30' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getBg(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-text-primary truncate">{notif.title}</p>
                    {!notif.isRead && <span className="w-2 h-2 rounded-full bg-info"></span>}
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2 mb-1.5 leading-relaxed">{notif.body}</p>
                  <p className="text-[10px] text-text-muted">{formatTimeAgo(notif.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center flex flex-col items-center">
            <Bell size={32} className="text-text-muted/30 mb-3" />
            <p className="text-sm text-text-muted">لا توجد إشعارات حالياً</p>
          </div>
        )}
      </div>
      
      <div className="p-2 border-t border-border bg-gray-50/50">
        <Link 
          to="/notifications" 
          onClick={onClose}
          className="block w-full text-center py-2 text-sm text-text-primary font-medium hover:bg-gray-100 rounded-md transition-colors"
        >
          عرض كل الإشعارات
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;
