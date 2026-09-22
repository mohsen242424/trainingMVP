import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

const TopBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/') return 'الرئيسية';
    if (path.startsWith('/tasks')) return 'مهامي';
    if (path.startsWith('/messages')) return 'الرسائل';
    if (path.startsWith('/meetings')) return 'الاجتماعات';
    if (path.startsWith('/portfolio')) return 'ملف الإنجاز';
    if (path.startsWith('/application')) return 'الطلبات';
    if (path.startsWith('/profile')) return 'الملف الشخصي';
    return 'الرئيسية';
  };

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'U';

  return (
    <header className="h-16 bg-surface border-b border-border sticky top-0 z-10 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-bold text-text-primary">{getBreadcrumb()}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border border-white"></span>
          </button>
          {showNotifications && (
            <NotificationDropdown onClose={() => setShowNotifications(false)} />
          )}
        </div>

        <div className="h-6 w-px bg-border"></div>

        <div className="relative">
          <button 
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-2 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-accent-gold-light text-accent-gold flex items-center justify-center text-xs font-bold border border-accent-gold/20">
              {initials}
            </div>
            <span className="text-sm font-medium text-text-primary hidden sm:block">{user?.name}</span>
            <ChevronDown size={16} className="text-text-muted" />
          </button>

          {showUserMenu && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-1 animate-[fadeIn_0.15s_ease-out]">
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50"
                onClick={() => setShowUserMenu(false)}
              >
                الملف الشخصي
              </Link>
              <button 
                onClick={() => {
                  setShowUserMenu(false);
                  logout();
                }}
                className="block w-full text-right px-4 py-2 text-sm text-error hover:bg-error/5"
              >
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
