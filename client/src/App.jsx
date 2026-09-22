import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExplorePage from './pages/ExplorePage';
import PositionsPage from './pages/PositionsPage';
import ApplicationPage from './pages/ApplicationPage';

import StudentDashboard from './pages/student/StudentDashboard';
import TaskView from './pages/student/TaskView';
import MessagesPage from './pages/student/MessagesPage';
import MeetingsPage from './pages/student/MeetingsPage';
import PortfolioPage from './pages/student/PortfolioPage';

import SupervisorDashboard from './pages/supervisor/SupervisorDashboard';
import InternsPage from './pages/supervisor/InternsPage';
import SupervisorMessages from './pages/supervisor/SupervisorMessages';
import SupervisorMeetings from './pages/supervisor/SupervisorMeetings';

import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-primary">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-accent-gold"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Routes */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to={
              user?.role === 'admin' ? '/dashboard/admin' :
              user?.role === 'supervisor' ? '/dashboard/supervisor' :
              user?.status === 'accepted' ? '/dashboard/student' :
              user?.status === 'pending' ? '/dashboard/student' :
              '/explore'
            } replace />
          ) : <LoginPage />
        } 
      />
      <Route 
        path="/register" 
        element={
          isAuthenticated ? <Navigate to="/explore" replace /> : <RegisterPage />
        } 
      />

      {/* Student Setup Routes */}
      <Route path="/explore" element={<ProtectedRoute allowedRoles={['student']}><ExplorePage /></ProtectedRoute>} />
      <Route path="/positions" element={<ProtectedRoute allowedRoles={['student']}><PositionsPage /></ProtectedRoute>} />
      <Route path="/apply/:positionId" element={<ProtectedRoute allowedRoles={['student']}><ApplicationPage /></ProtectedRoute>} />

      {/* Student Dashboard Routes */}
      <Route path="/dashboard/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/student/tasks/:taskId" element={<ProtectedRoute allowedRoles={['student']}><TaskView /></ProtectedRoute>} />
      <Route path="/dashboard/student/messages" element={<ProtectedRoute allowedRoles={['student']}><MessagesPage /></ProtectedRoute>} />
      <Route path="/dashboard/student/meetings" element={<ProtectedRoute allowedRoles={['student']}><MeetingsPage /></ProtectedRoute>} />
      <Route path="/dashboard/student/portfolio" element={<ProtectedRoute allowedRoles={['student']}><PortfolioPage /></ProtectedRoute>} />

      {/* Supervisor Dashboard Routes */}
      <Route path="/dashboard/supervisor" element={<ProtectedRoute allowedRoles={['supervisor']}><SupervisorDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/supervisor/interns" element={<ProtectedRoute allowedRoles={['supervisor']}><InternsPage /></ProtectedRoute>} />
      <Route path="/dashboard/supervisor/messages" element={<ProtectedRoute allowedRoles={['supervisor']}><SupervisorMessages /></ProtectedRoute>} />
      <Route path="/dashboard/supervisor/meetings" element={<ProtectedRoute allowedRoles={['supervisor']}><SupervisorMeetings /></ProtectedRoute>} />

      {/* Admin Dashboard Routes */}
      <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
