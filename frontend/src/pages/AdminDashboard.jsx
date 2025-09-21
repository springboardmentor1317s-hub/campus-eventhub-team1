import React, { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, BarChart3, Plus, Download, Eye, MessageSquare, Bell, User, LogOut, Settings, Filter, Search, CheckCircle, AlertCircle, XCircle, Clock, Building, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(5);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 12,
    activeUsers: 1234,
    totalRegistrations: 245,
    avgParticipants: 28
  });

  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@college.edu", college: "Tech University", role: "student", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@arts.edu", college: "Arts College", role: "student", status: "active" },
    { id: 3, name: "Admin User", email: "admin@tech.edu", college: "Tech University", role: "college_admin", status: "active" }
  ]);

  // Mock admin logs
  const [adminLogs, setAdminLogs] = useState([
    { id: 1, action: "Created event: Tech Hackathon 2024", user: "Admin User", timestamp: "2024-01-15 10:30:00" },
    { id: 2, action: "Approved registration for Cultural Fest", user: "Admin User", timestamp: "2024-01-15 09:15:00" },
    { id: 3, action: "Updated event details: Basketball Championship", user: "Admin User", timestamp: "2024-01-14 16:45:00" }
  ]);

  // System health data
  const [systemHealth, setSystemHealth] = useState({
    serverStatus: "Healthy",
    database: "Connected", 
    apiResponse: "152ms",
    uptime: "99.9%"
  });

  // Mock data for events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "2025-10-25",
      status: "active",
      registrations: 45,
      maxParticipants: 100,
      category: "hackathon"
    },
    {
      id: 2,
      title: "Cultural Night 2025",
      date: "2025-11-10",
      status: "upcoming",
      registrations: 78,
      maxParticipants: 150,
      category: "cultural"
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const DashboardStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Total Events</p>
            <p className="text-2xl sm:text-3xl font-bold">{stats.totalEvents}</p>
            <p className="text-blue-200 text-xs">+12% vs last month</p>
          </div>
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 sm:p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Active Users</p>
            <p className="text-2xl sm:text-3xl font-bold">{stats.activeUsers}</p>
            <p className="text-green-200 text-xs">+8% vs last month</p>
          </div>
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 sm:p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Total Registrations</p>
            <p className="text-2xl sm:text-3xl font-bold">{stats.totalRegistrations}</p>
            <p className="text-purple-200 text-xs">+23% vs last month</p>
          </div>
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 sm:p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Average Participants</p>
            <p className="text-2xl sm:text-3xl font-bold">{stats.avgParticipants}</p>
            <p className="text-orange-200 text-xs">+5% vs last month</p>
          </div>
          <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-orange-200" />
        </div>
      </div>
    </div>
  );

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
          {event.status.toUpperCase()}
        </span>
      </div>
      
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          <span>{event.registrations}/{event.maxParticipants} registered</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Eye className="w-4 h-4 inline mr-2" />
          View Details
        </button>
        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const SystemHealth = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        System Health
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Server Status</span>
          <span className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            {systemHealth.serverStatus}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Database</span>
          <span className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            {systemHealth.database}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">API Response</span>
          <span className="text-sm font-medium text-gray-800">{systemHealth.apiResponse}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Uptime</span>
          <span className="text-sm font-medium text-gray-800">{systemHealth.uptime}</span>
        </div>
      </div>
    </div>
  );

  const MiniCalendar = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Recent Events
      </h3>
      <div className="space-y-3">
        {events.slice(0, 3).map(event => (
          <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-sm text-gray-800">{event.title}</p>
              <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const EventCreationModal = () => {
    // State for all form fields
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: '',
      location: '',
      start_date: '',
      end_date: '',
      image: null,
    });

    // State for the image preview URL
    const [imagePreview, setImagePreview] = useState('');
    
    // State for success/error messages
    const [message, setMessage] = useState({ text: '', type: 'info' });
    
    // State to manage input validation errors
    const [errors, setErrors] = useState({});

    // A single handler to update form data state
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler for the file input to create a preview
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({ ...prev, image: file }));
        
        // Create a preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFormData(prev => ({ ...prev, image: null }));
        setImagePreview('');
      }
    };
    
    // Clear message after a delay
    useEffect(() => {
      if (message.text) {
        const timer = setTimeout(() => {
          setMessage({ text: '', type: 'info' });
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [message]);

    // Form submission handler
    const handleSubmit = (e) => {
      e.preventDefault();
      let formErrors = {};
      
      // --- Validation ---
      if (!formData.title.trim()) formErrors.title = true;
      if (!formData.description.trim()) formErrors.description = true;
      if (!formData.category) formErrors.category = true;
      if (!formData.location.trim()) formErrors.location = true;
      if (!formData.start_date) formErrors.start_date = true;
      if (!formData.end_date) formErrors.end_date = true;

      if (formData.start_date && formData.end_date && new Date(formData.end_date) <= new Date(formData.start_date)) {
        formErrors.end_date = true;
        setMessage({ text: 'The end date must be after the start date.', type: 'error' });
        setErrors(formErrors);
        return;
      }
      
      setErrors(formErrors);

      if (Object.keys(formErrors).length > 0) {
        setMessage({ text: 'Please fill out all required fields.', type: 'error' });
        return;
      }

      // --- Process Form Data ---
      // In a real application, you'd send this to a server.
      const dataToSubmit = new FormData();
      for (const key in formData) {
        dataToSubmit.append(key, formData[key]);
      }

      console.log('Form Submitted!');
      for (let [key, value] of dataToSubmit.entries()) {
        console.log(`${key}:`, value);
      }
      
      setMessage({ text: 'Event created successfully!', type: 'success' });
      
      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        setFormData({
          title: '', description: '', category: '', location: '',
          start_date: '', end_date: '', image: null,
        });
        setImagePreview('');
        setErrors({});
        setMessage({ text: '', type: 'info' });
        setShowCreateEventModal(false);
      }, 2000);
    };

    const getMessageClass = () => {
      if (message.type === 'success') return 'text-green-600';
      if (message.type === 'error') return 'text-red-600';
      return '';
    };

    const closeModal = () => {
      setFormData({
        title: '', description: '', category: '', location: '',
        start_date: '', end_date: '', image: null,
      });
      setImagePreview('');
      setErrors({});
      setMessage({ text: '', type: 'info' });
      setShowCreateEventModal(false);
    };

    if (!showCreateEventModal) return null;

    return (
      <div 
        className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50"
        onClick={closeModal}
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(4px)' 
        }}
      >
        <div 
          className="bg-white bg-opacity-95 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-gray-300 backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1 pr-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create a New Event</h2>
                <p className="text-gray-600 text-sm mt-1">Fill out the details below to get started.</p>
              </div>
              <button
                onClick={closeModal}
                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                {/* Event Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="e.g., Annual Tech Summit 2025" 
                    required
                    className={`form-input w-full bg-gray-50 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`} 
                  />
                </div>

                {/* Event Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    rows="4" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Provide a detailed description of your event..." 
                    required
                    className={`form-input w-full bg-gray-50 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`}
                  ></textarea>
                </div>

                {/* Category & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select 
                      id="category" 
                      name="category" 
                      value={formData.category} 
                      onChange={handleChange} 
                      required
                      className={`form-input w-full bg-gray-50 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`}
                    >
                      <option value="">Select a Category</option>
                      <option value="Conference">Conference</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Cultural">Cultural Fest</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input 
                      type="text" 
                      id="location" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleChange} 
                      placeholder="e.g., Kanpur" 
                      required
                      className={`form-input w-full bg-gray-50 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`} 
                    />
                  </div>
                </div>

                {/* Start & End Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">Starts On</label>
                    <input 
                      type="datetime-local" 
                      id="start_date" 
                      name="start_date" 
                      value={formData.start_date} 
                      onChange={handleChange} 
                      required
                      className={`form-input w-full bg-gray-50 border ${errors.start_date ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`} 
                    />
                  </div>
                  <div>
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">Ends On</label>
                    <input 
                      type="datetime-local" 
                      id="end_date" 
                      name="end_date" 
                      value={formData.end_date} 
                      onChange={handleChange} 
                      required
                      className={`form-input w-full bg-gray-50 border ${errors.end_date ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`} 
                    />
                  </div>
                </div>
                
                {/* File Input for Banner Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Banner</label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label htmlFor="image" className="relative cursor-pointer font-semibold text-blue-600 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input id="image" name="image" type="file" onChange={handleImageChange} className="sr-only" accept="image/png, image/jpeg, image/webp" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  </div>
                </div>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner Preview</label>
                    <img src={imagePreview} alt="Image Preview" className="w-full h-auto rounded-lg object-cover max-h-64" />
                  </div>
                )}

                {/* Submission Button */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </form>
            
            {/* Message area for feedback */}
            {message.text && (
              <div className={`mt-6 text-center text-sm font-medium ${getMessageClass()}`}>
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center min-w-0 flex-1">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">CampusEventHub</h1>
                  <span className="hidden xs:inline-block mt-1 sm:mt-0 sm:ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    Admin
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{currentUser?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{currentUser?.college || 'College Admin'}</p>
                </div>
                <LogOut 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-red-500 cursor-pointer" 
                  onClick={logout}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 min-w-max sm:min-w-0">
            {[
              { id: 'overview', name: 'Overview', shortName: 'Overview', icon: BarChart3 },
              { id: 'user-management', name: 'User Management', shortName: 'Users', icon: Users },
              { id: 'event-management', name: 'Event Management', shortName: 'Events', icon: Calendar },
              { id: 'registrations', name: 'Registrations', shortName: 'Registrations', icon: CheckCircle },
              { id: 'admin-logs', name: 'Admin Logs', shortName: 'Logs', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-1 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="sm:hidden">{tab.shortName}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6 sm:mb-8">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-7 text-gray-900 truncate">Event Organizer Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your events and track performance</p>
          </div>
          <div className="flex-shrink-0">
            <button 
              onClick={() => setShowCreateEventModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Create Event</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>

        {/* Stats Cards - Show on Overview */}
        {activeTab === 'overview' && <DashboardStats />}
        
        {/* User Management Tab */}
        {activeTab === 'user-management' && (
          <div>
            <div className="mb-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">User Management</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
              </div>
            </div>
          </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.college}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'college_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'college_admin' ? 'Admin' : 'Student'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-red-600 hover:text-red-900">Disable</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {users.map(user => (
                <div key={user.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">College: </span>
                      <span className="text-gray-900">{user.college}</span>
                    </div>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'college_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'college_admin' ? 'Admin' : 'Student'}
                    </span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 text-sm text-blue-600 hover:text-blue-900 font-medium bg-blue-50 hover:bg-blue-100 py-2 px-3 rounded-lg transition-colors">
                      View
                    </button>
                    <button className="flex-1 text-sm text-red-600 hover:text-red-900 font-medium bg-red-50 hover:bg-red-100 py-2 px-3 rounded-lg transition-colors">
                      Disable
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event Management Tab */}
        {activeTab === 'event-management' && (
          <div>
            <div className="mb-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <span>Approve Pending</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    <span>Flagged Events</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
            </div>
          </div>
        </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map(event => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.registrations} participants</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                        <button className="text-red-600 hover:text-red-900">Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {events.map(event => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{new Date(event.date).toLocaleDateString()}</div>
                    </div>
                    <span className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Category: </span>
                      <span className="text-gray-900 capitalize">{event.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Participants: </span>
                      <span className="text-gray-900">{event.registrations}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 text-xs text-blue-600 hover:text-blue-900 font-medium bg-blue-50 hover:bg-blue-100 py-2 px-3 rounded-lg transition-colors">
                      View
                    </button>
                    <button className="flex-1 text-xs text-green-600 hover:text-green-900 font-medium bg-green-50 hover:bg-green-100 py-2 px-3 rounded-lg transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 text-xs text-red-600 hover:text-red-900 font-medium bg-red-50 hover:bg-red-100 py-2 px-3 rounded-lg transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registrations Tab Content */}
        {activeTab === 'registrations' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Registration Management</h3>
              <p className="text-gray-500">Detailed registration management will be implemented in Milestone 3.</p>
            </div>
          </div>
        )}

        {/* Admin Logs Tab Content */}
        {activeTab === 'admin-logs' && (
          <div>
            <div className="mb-6 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-800">Admin Activity Logs</h3>
              <p className="text-gray-600 text-sm">Track all administrative actions and system changes</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {adminLogs.map(log => (
                  <div key={log.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                        <p className="text-sm text-gray-500">by {log.user}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{log.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Overview Tab - Main Dashboard */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Recent Events */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Events</h3>
              <div className="space-y-4">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            {/* Sidebar - Quick Actions, Calendar & System Health */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowCreateEventModal(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Event
                  </button>
                  <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export Event Data
                  </button>
                  <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Registrations
                  </button>
                  <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Feedback
                  </button>
                </div>
              </div>

              {/* Recent Events Mini View */}
              <MiniCalendar />

              {/* System Health */}
              <SystemHealth />
            </div>
          </div>
        )}
      </main>
      
      {/* Event Creation Modal */}
      <EventCreationModal />
    </div>
  );
};

export default AdminDashboard;