import React, { useState, useEffect } from 'react';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { initDatabase } from '@/lib/database';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize database
    initDatabase();
    
    // Check if admin is already logged in
    const session = localStorage.getItem('admin_session');
    if (session) {
      const sessionData = JSON.parse(session);
      if (sessionData.loggedIn) {
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin onLogin={handleLogin} />;
};
