import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, ClipboardList, MessageSquare, Calendar, Award, 
  LayoutDashboard, Users, UserCheck, BarChart, Settings, 
  LogOut, User as UserIcon, FileText, Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  
  if (!user) return null;

  const role = user.role;
  const status = user.status; // pending, reviewing, accepted, rejected
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'U';

  const roleSubtitle = () => {
    if (role === 'admin') return 'مدير النظام';
    if (role === 'supervisor') return 'مشرف — رئيس قسم اللغات';
    if (role === 'student') return user.position ? `متدرب — ${user.position}` : 'متدرب';
    return '';
  };

  const menuItems = {
    student_accepted: [
      { path: '/', label: 'الرئيسية', icon: Home },
      { path: '/tasks', label: 'مهامي', icon: ClipboardList },
      { path: '/messages', label: 'الرسائل', icon: MessageSquare },
      { path: '/meetings', label: 'الاجتماعات', icon: Calendar },
      { path: '/portfolio', label: 'ملف الإنجاز', icon: Award },
    ],
    student_pending: [
      { path: '/', label: 'الرئيسية', icon: Home },
      { path: '/application', label: 'طلبي', icon: FileText },
      { path: '/messages', label: 'الرسائل', icon: MessageSquare },
      { path: '/notifications', label: 'الإشعارات', icon: Bell },
      { path: '/profile', label: 'الملف الشخصي', icon: UserIcon },
    ],
    supervisor: [
      { path: '/', label: 'لوحة التحكم', icon: LayoutDashboard },
      { path: '/applicants', label: 'المتقدمون', icon: Users },
      { path: '/students', label: 'المتدربون الحاليون', icon: UserCheck },
      { path: '/messages', label: 'الرسائل', icon: MessageSquare },
      { path: '/meetings', label: 'الاجتماعات', icon: Calendar },
      { path: '/reports', label: 'التقارير', icon: BarChart },
    ],
    admin: [
      { path: '/', label: 'لوحة التحكم', icon: LayoutDashboard },
      { path: '/users', label: 'المستخدمون', icon: Users },
      { path: '/applications', label: 'الطلبات', icon: FileText },
      { path: '/positions', label: 'الوظائف', icon: ClipboardList },
      { path: '/settings', label: 'الإعدادات', icon: Settings },
    ]
  };

  let currentMenu = [];
  if (role === 'student') {
    currentMenu = status === 'accepted' ? menuItems.student_accepted : menuItems.student_pending;
  } else {
    currentMenu = menuItems[role] || [];
  }

  return (
    <aside className="fixed top-0 right-0 h-screen w-[260px] bg-bg-dark flex flex-col z-20">
      <div className="flex items-center gap-3 p-6">
        <div className="w-10 h-10 rounded-full bg-accent-gold flex items-center justify-center text-white font-bold text-xl">
          أ
        </div>
        <h1 className="text-xl font-bold text-white tracking-wide">أفق</h1>
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-full bg-bg-dark-2 flex items-center justify-center text-white text-sm font-medium border border-border-dark">
            {initials}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-sm font-bold text-white truncate">{user.name}</h3>
            <p className="text-xs text-text-muted truncate">{roleSubtitle()}</p>
          </div>
        </div>
      </div>

      <div className="mx-6 border-t border-border-dark mb-6"></div>

      <div className="flex-1 overflow-y-auto px-4">
        <nav className="flex flex-col gap-1">
          {currentMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-180 ease-out
                ${isActive 
                  ? 'bg-bg-dark-2 text-white border-r-[3px] border-accent-gold pl-3 pr-[9px]' 
                  : 'text-text-muted hover:text-white hover:bg-bg-dark-2/50 border-r-[3px] border-transparent'}
              `}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mx-6 border-t border-border-dark mt-4 mb-4"></div>

      <div className="px-4 pb-6 flex flex-col gap-1">
        <NavLink
          to="/profile"
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-180 ease-out
            ${isActive 
              ? 'bg-bg-dark-2 text-white border-r-[3px] border-accent-gold pl-3 pr-[9px]' 
              : 'text-text-muted hover:text-white hover:bg-bg-dark-2/50 border-r-[3px] border-transparent'}
          `}
        >
          <UserIcon size={20} className="flex-shrink-0" />
          <span className="text-sm font-medium">الملف الشخصي</span>
        </NavLink>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-error hover:bg-error/10 transition-colors border-r-[3px] border-transparent w-full text-right"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span className="text-sm font-medium">تسجيل الخروج</span>
        </button>
      </div>
      
      <div className="px-6 pb-4 text-center">
        <p className="text-[10px] text-text-muted">
          آخر تسجيل دخول: {new Date().toLocaleDateString('ar-SA')}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
