// Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Login form data
    loginEmail: '',
    loginPassword: '',
    // Register form data
    name: '',
    email: '',
    college: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [collegeSuggestions, setCollegeSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Sample college data
  const colleges = [
    'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
    'NIT Trichy', 'NIT Warangal', 'NIT Surathkal', 'NIT Calicut',
    'BITS Pilani', 'BITS Goa', 'BITS Hyderabad',
    'VIT Vellore', 'VIT Chennai', 'Manipal Institute of Technology',
    'SRM University', 'Amity University', 'Christ University',
    'Delhi University', 'Mumbai University', 'Pune University',
    'Jadavpur University', 'Anna University', 'Osmania University'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (error) setError('');

    if (name === 'college') {
      if (value.length >= 2) {
        const filtered = colleges.filter(college =>
          college.toLowerCase().includes(value.toLowerCase())
        );
        setCollegeSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const handleCollegeSelect = (college) => {
    setFormData(prev => ({ ...prev, college }));
    setShowSuggestions(false);
  };

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

      login(data.user, data.token);
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          college: formData.college,
          password: formData.password,
          role: formData.role
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setRegistrationSuccess(true);
      setSuccessMessage(
        formData.role === 'college_admin' 
          ? 'Account created successfully! You will be redirected to the admin dashboard in a moment.'
          : 'Account created successfully! You will be redirected to the student dashboard in a moment.'
      );
      
      setTimeout(() => {
        login(data.user, data.token);
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'An error occurred during registration');
      setLoading(false);
    }
  };

  const collegeDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (collegeDropdownRef.current && !collegeDropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-10 right-1/3 w-24 h-24 bg-purple-400 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-400 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-indigo-300 rounded-full opacity-40 blur-lg"></div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl w-full max-w-md mx-auto relative z-10 border border-white/20">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-6 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-5 left-10 w-20 h-20 rounded-full bg-white opacity-10"></div>
              <div className="absolute bottom-5 right-10 w-16 h-16 rounded-full bg-white opacity-10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white opacity-5"></div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 relative">CampusEventHub</h1>
            <p className="text-indigo-100 text-xs md:text-sm font-medium opacity-90">Connect. Participate. Excel.</p>
          </div>

          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => {
                setActiveTab('login');
                setError('');
              }}
              className={`flex-1 py-4 px-4 text-sm md:text-base font-medium text-center transition-all duration-300 ${
                activeTab === 'login'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setError('');
              }}
              className={`flex-1 py-4 px-4 text-sm md:text-base font-medium text-center transition-all duration-300 ${
                activeTab === 'register'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Register
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {registrationSuccess && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 border border-gray-100">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full bg-green-100 p-4">
                    <svg className="h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-center text-gray-700 text-lg mb-6">{successMessage}</p>
                <div className="flex justify-center">
                  <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="p-6 md:p-8 space-y-5 md:space-y-6">
              <div>
                <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="loginEmail"
                    name="loginEmail"
                    value={formData.loginEmail}
                    onChange={handleInputChange}
                    className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-sm"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="loginPassword"
                    name="loginPassword"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-sm"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Forgot password functionality will be implemented with email service integration.');
                  }}
                  className="text-indigo-600 text-sm hover:text-indigo-800 hover:underline transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="p-6 md:p-8 space-y-4 md:space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-sm"
                    placeholder="Enter your full name"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-sm"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="relative" ref={collegeDropdownRef}>
                <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1.5">
                  College
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    onFocus={() => formData.college.length >= 2 && setShowSuggestions(true)}
                    className="w-full pl-10 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-sm"
                    placeholder="Enter or select your college"
                    autoComplete="off"
                    required
                    disabled={loading}
                  />
                </div>
                
                {showSuggestions && collegeSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto z-10 shadow-lg">
                    {collegeSuggestions.map((college, index) => (
                      <div
                        key={index}
                        onClick={() => handleCollegeSelect(college)}
                        className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition-colors duration-200 text-sm border-b border-gray-100 last:border-0"
                      >
                        {college}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-sm"
                      placeholder="Create password"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-sm"
                      placeholder="Confirm password"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="radio"
                      id="student"
                      name="role"
                      value="student"
                      checked={formData.role === 'student'}
                      onChange={handleInputChange}
                      className="sr-only"
                      disabled={loading}
                    />
                    <label
                      htmlFor="student"
                      className={`block w-full py-2.5 px-3 text-center rounded-lg border cursor-pointer transition-all duration-300 font-medium text-sm ${
                        formData.role === 'student'
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      Student
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="admin"
                      name="role"
                      value="college_admin"
                      checked={formData.role === 'college_admin'}
                      onChange={handleInputChange}
                      className="sr-only"
                      disabled={loading}
                    />
                    <label
                      htmlFor="admin"
                      className={`block w-full py-2.5 px-3 text-center rounded-lg border cursor-pointer transition-all duration-300 font-medium text-sm ${
                        formData.role === 'college_admin'
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      College Admin
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;