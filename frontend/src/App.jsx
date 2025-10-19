import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import {StudentDashboard }from './pages/StudentDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HomePage } from './pages/HomePage.jsx';
import { EventCreationForm } from './components/Events/EventCreationForm.jsx';
import { EventRegisterPage } from './components/Events/EventRegisterPage.jsx';




// Protected Route Component for any authenticated user
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Admin-only Route Component
const AdminRoute = ({ children }) => {
  const { hasRole, loading, isAuthenticated } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (!hasRole(['college_admin', 'super_admin'])) {
    return <Navigate to="/student/dashboard" replace />;
  }
  
  return children;
};

// Student-only Route Component
const StudentRoute = ({ children }) => {
  const { hasRole, loading, isAuthenticated } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (!hasRole(['student'])) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return children;
};

// App Component with Routes
const AppRoutes = () => {
  const { currentUser, isAuthenticated } = useAuth();
  
  console.log("Current user:", currentUser);
  console.log("Is authenticated:", isAuthenticated());
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path ="/create-event" element={<EventCreationForm/>} />

      <Route path = "/" element ={<HomePage/>} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path= '/event-register/:eventId' element ={<EventRegisterPage/>}/>

      
      {/* Root route - redirect based on role */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            {currentUser && currentUser.role === 'student' ? (
              <Navigate to="/student/dashboard" replace />
            ) : (
              <Navigate to="/admin/dashboard" replace />
            )}
          </ProtectedRoute>
        } 
      />
      
      {/* Student routes */}
      <Route 
        path="/student/dashboard" 
        element={
          <StudentRoute>
            <StudentDashboard />
          </StudentRoute>
        } 
      />
      
      {/* Admin routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } 
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

// In the handleLoginSubmit function:
const handleLoginSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.loginEmail,
        password: formData.loginPassword
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Save token and user info in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Redirect based on user role
    if (data.user.role === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
    
  } catch (error) {
    console.error('Login error:', error);
    setError(error.message || 'An error occurred during login');
  } finally {
    setLoading(false);
  }
};

export default App;