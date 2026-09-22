import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center mb-4 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center text-white font-bold">
              أ
            </div>
          </div>
          <p className="text-text-muted text-sm font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && user && !roles.includes(user.role)) {
    // Redirect to default dashboard based on role
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'supervisor') return <Navigate to="/supervisor" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
