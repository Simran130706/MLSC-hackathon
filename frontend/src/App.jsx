import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AttendancePage from './pages/AttendancePage';
import { CreditCard } from "lucide-react";

import VotingPage from './pages/VotingPage';
import CertificatesPage from './pages/CertificatesPage';
import VerificationPage from './pages/VerificationPage';
import AnalyticsPage from './pages/AnalyticsPage';

// Layout
import Layout from './components/Shared/Layout';

function App() {
  // Simulated auth state - replace with actual auth logic
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
        />
        <Route path="/verify" element={<VerificationPage />} />

        {/* Protected Routes */}
        {user ? (
          <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route 
              path="dashboard" 
              element={user.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />} 
            />
            <Route path="attendance" element={<AttendancePage user={user} />} />
            <Route path="voting" element={<VotingPage user={user} />} />
            <Route path="certificates" element={<CertificatesPage user={user} />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
