import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Calendar, Users, TrendingUp, BarChart3, Plus, Download, Eye, MessageSquare, User, LogOut, Settings, Filter, Search, CheckCircle, AlertCircle, XCircle, Clock, Building, Trash2, X, MapPin, DollarSign, Tag, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileSettings from '../components/ProfileSettings';
import Event from '../components/EventRegistrationManagement';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeUsers: 0,
    totalRegistrations: 0,
    avgParticipants: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem('token');
  const dropdownRef = useRef(null);

  // Users data
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);


  // System health data - will be fetched from API in future updates
  const [systemHealth, setSystemHealth] = useState({
    serverStatus: "Healthy",
    database: "Connected", 
    apiResponse: "152ms",
    uptime: "99.9%"
  });

  // Events data - fetched from database
  const [events, setEvents] = useState([]);

  // API base URL
  const API_BASE_URL = 'http://localhost:4000/api';

  // Function to get auth token
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch events created by the current admin
  const fetchAdminEvents = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        setError('No authentication token found');
        return;
      }

      // Fetch all events and filter by created_by on frontend
      // We'll use search parameter to get events by current user
      const response = await fetch(`${API_BASE_URL}/events?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Filter events by current user (admin)
        const adminEvents = data.data.events.filter(event => 
          event.created_by && event.created_by._id === currentUser?.id
        );
        setEvents(adminEvents);
      } else {
        throw new Error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching admin events:', error);
      setError('Failed to fetch events. Please try again.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch admin statistics
  const fetchAdminStats = async () => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        return;
      }

      const response = await fetch(`${API_BASE_URL}/events/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats({
            totalEvents: data.data.overview.total_events || 0,
            activeUsers: data.data.overview.active_events || 0, // Using active events as proxy
            totalRegistrations: data.data.overview.total_registrations || 0,
            avgParticipants: Math.round(data.data.overview.total_registrations / Math.max(data.data.overview.total_events, 1)) || 0
          });
        }
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      // Keep default stats on error
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      setUsersError(null);
      const token = getAuthToken();
      
      if (!token) {
        setUsersError('No authentication token found');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data.users);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsersError('Failed to fetch users. Please try again.');
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  // Fetch user details
  const fetchUserDetails = async (userId) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setSelectedUser(data.data.user);
        setShowUserDetails(true);
      } else {
        throw new Error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('Failed to fetch user details. Please try again.');
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      setDeleteUserLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Remove user from local state
        setUsers(users.filter(user => (user._id || user.id) !== userId));
        alert('User deleted successfully');
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(error.message || 'Failed to delete user. Please try again.');
    } finally {
      setDeleteUserLoading(false);
    }
  };

  // Handle delete user confirmation
  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      deleteUser(userId);
    }
  };

  // Delete event function
  const deleteEvent = async (eventId) => {
    try {
      setDeleteLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Remove the deleted event from the local state
        setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
        // Close modal if the deleted event was being viewed
        if (selectedEvent && selectedEvent._id === eventId) {
          closeEventDetails();
        }
        // Refresh stats
        fetchAdminStats();
        setError(null);
      } else {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // View event details function
  const viewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  // Close event details modal
  const closeEventDetails = () => {
    setSelectedEvent(null);
    setShowEventDetails(false);
  };

  // Handle delete confirmation
  const handleDeleteEvent = (event, eventId) => {
    event.stopPropagation(); // Prevent triggering view details
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      deleteEvent(eventId);
    }
  };

  // Load data when component mounts or currentUser changes
  useEffect(() => {
    if (currentUser?.id) {
      fetchAdminEvents();
      fetchAdminStats();
    }
  }, [currentUser]);

  // Load users when user management tab is active
  useEffect(() => {
    if (activeTab === 'user-management' && currentUser?.id) {
      fetchUsers();
    }
  }, [activeTab, currentUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout with confirmation
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
    setShowDropdown(false);
  };

  // Handle settings click
  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowDropdown(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const HandleEventCreation = () => {
    navigate('/create-event');
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
          {(event.status || 'upcoming').toUpperCase()}
        </span>
      </div>
      
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(event.start_date || event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          <span>{event.current_registrations || event.registrations || 0}/{event.registration_limit || event.maxParticipants || 0} registered</span>
        </div>
        {event.location && (
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-2" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
        {event.category && (
          <div className="flex items-center">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
              {event.category}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => viewEventDetails(event)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Eye className="w-4 h-4 inline mr-2" />
          View Details
        </button>
        <button 
          onClick={(e) => handleDeleteEvent(e, event._id)}
          disabled={deleteLoading}
          className="bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete Event"
        >
          <Trash2 className="w-4 h-4" />
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

  const EventDetailsModal = () => {
    if (!showEventDetails || !selectedEvent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
            <button
              onClick={closeEventDetails}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Event Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Event Image */}
                {selectedEvent.image && (
                  <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={`http://localhost:4000${selectedEvent.image}`} 
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedEvent.description || 'No description provided.'}
                  </p>
                </div>

                {/* Tags */}
                {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          <Tag className="w-3 h-3 inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Event Details Sidebar */}
              <div className="space-y-4">
                {/* Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedEvent.status || 'upcoming')}`}>
                    {(selectedEvent.status || 'upcoming').toUpperCase()}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Event Schedule</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Start: {new Date(selectedEvent.start_date).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>End: {new Date(selectedEvent.end_date).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                  <div className="flex items-center text-sm text-gray-700">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{selectedEvent.location || 'Location not specified'}</span>
                  </div>
                </div>

                {/* Registration Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Registration</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>
                        {selectedEvent.current_registrations || 0} / {selectedEvent.registration_limit} registered
                      </span>
                    </div>
                    {selectedEvent.registration_deadline && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Deadline: {new Date(selectedEvent.registration_deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
                  <div className="flex items-center text-sm text-gray-700">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{selectedEvent.price === 0 ? 'Free' : `₹${selectedEvent.price}`}</span>
                  </div>
                </div>

                {/* Category & College */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Details</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>
                      <strong>Category:</strong> <span className="capitalize">{selectedEvent.category || 'General'}</span>
                    </div>
                    <div>
                      <strong>College:</strong> {selectedEvent.college_name || 'Not specified'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleDeleteEvent(e, selectedEvent._id)}
                    disabled={deleteLoading}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    Delete Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MiniCalendar = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Recent Events
      </h3>
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No events created yet</p>
          </div>
        ) : (
          events.slice(0, 3).map(event => (
            <div key={event._id || event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                 onClick={() => viewEventDetails(event)}>
              <div>
                <p className="font-medium text-sm text-gray-800">{event.title}</p>
                <p className="text-xs text-gray-500">{new Date(event.start_date || event.date).toLocaleDateString()}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status || 'upcoming')}`}>
                {event.status || 'upcoming'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );


  const tabs = useMemo(() => ([
    { id: 'overview', name: 'Overview', shortName: 'Overview', icon: BarChart3 },
    { id: 'user-management', name: 'User Management', shortName: 'Users', icon: Users },
    { id: 'event-management', name: 'Event Management', shortName: 'Events', icon: Calendar },
    { id: 'registrations', name: 'Registrations', shortName: 'Registrations', icon: CheckCircle }
  ]), []);

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
              {/* Notification Icon */}
              <div className="relative">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  5
                </span>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-700">{currentUser?.name || 'Admin'}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      currentUser?.role === 'student' 
                        ? 'bg-green-100 text-green-800' 
                        : currentUser?.role === 'college_admin' || currentUser?.role === 'admin'
                        ? 'bg-blue-100 text-blue-800'
                        : currentUser?.role === 'super_admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {currentUser?.role === 'student' ? 'Student' : 
                       currentUser?.role === 'college_admin' ? 'Admin' :
                       currentUser?.role === 'super_admin' ? 'Super Admin' :
                       currentUser?.role === 'admin' ? 'Admin' :
                       'User'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{currentUser?.college || 'College Admin'}</p>
                </div>
                
                {/* Settings Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <Settings 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-blue-600 cursor-pointer" 
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  
                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={handleSettingsClick}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 min-w-max sm:min-w-0">
            {tabs.map(tab => (
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
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Show ProfileSettings if showSettings is true */}
        {showSettings && (
          <ProfileSettings 
            currentUser={currentUser} 
            logout={logout} 
            token={token}
            onBack={() => setShowSettings(false)}
          />
        )}

        {/* Dashboard Header */}
        {!showSettings && (
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6 sm:mb-8">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-7 text-gray-900 truncate">Event Organizer Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your events and track performance</p>
          </div>
          <div className="flex-shrink-0">
            <button 
              onClick={HandleEventCreation}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Create Event</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>
        )}

        {/* Stats Cards - Show on Overview */}
        {!showSettings && activeTab === 'overview' && <DashboardStats />}
        
        {/* User Management Tab */}
        {!showSettings && activeTab === 'user-management' && (
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
                  {usersLoading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading users...</p>
                      </td>
                    </tr>
                  ) : usersError ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center">
                        <p className="text-sm text-red-500">{usersError}</p>
                        <button 
                          onClick={fetchUsers}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Retry
                        </button>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center">
                        <p className="text-sm text-gray-500">No users found</p>
                      </td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user._id || user.id} className="hover:bg-gray-50">
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
                            user.role === 'college_admin' ? 'bg-purple-100 text-purple-800' : 
                            user.role === 'super_admin' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role === 'college_admin' ? 'Admin' : 
                             user.role === 'super_admin' ? 'Super Admin' : 'Student'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => fetchUserDetails(user._id || user.id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user._id || user.id, user.name)}
                            disabled={deleteUserLoading}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deleteUserLoading ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {usersLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading users...</p>
                </div>
              ) : usersError ? (
                <div className="text-center py-8">
                  <p className="text-sm text-red-500">{usersError}</p>
                  <button 
                    onClick={fetchUsers}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Retry
                  </button>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">No users found</p>
                </div>
              ) : (
                users.map(user => (
                  <div key={user._id || user.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
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
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-gray-500">College: </span>
                        <span className="text-gray-900">{user.college}</span>
                      </div>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'college_admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'super_admin' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'college_admin' ? 'Admin' : 
                         user.role === 'super_admin' ? 'Super Admin' : 'Student'}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button 
                        onClick={() => fetchUserDetails(user._id || user.id)}
                        className="flex-1 text-sm text-blue-600 hover:text-blue-900 font-medium bg-blue-50 hover:bg-blue-100 py-2 px-3 rounded-lg transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user._id || user.id, user.name)}
                        disabled={deleteUserLoading}
                        className="flex-1 text-sm text-red-600 hover:text-red-900 font-medium bg-red-50 hover:bg-red-100 py-2 px-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deleteUserLoading ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Event Management Tab */}
        {!showSettings && activeTab === 'event-management' && (
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
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading events...</p>
                      </td>
                    </tr>
                  ) : events.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center">
                        <p className="text-sm text-gray-500">No events found. Create your first event to get started!</p>
                      </td>
                    </tr>
                  ) : (
                    events.map(event => (
                      <tr key={event._id || event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                            <div className="text-sm text-gray-500">{new Date(event.start_date || event.date).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{event.category || 'General'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.current_registrations || event.registrations || 0} participants</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status || 'upcoming')}`}>
                            {event.status || 'upcoming'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => viewEventDetails(event)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            View
                          </button>
                          <button 
                            onClick={(e) => handleDeleteEvent(e, event._id)}
                            disabled={deleteLoading}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">No events found. Create your first event to get started!</p>
                </div>
              ) : (
                events.map(event => (
                  <div key={event._id || event.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{new Date(event.start_date || event.date).toLocaleDateString()}</div>
                      </div>
                      <span className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status || 'upcoming')}`}>
                        {event.status || 'upcoming'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Category: </span>
                        <span className="text-gray-900 capitalize">{event.category || 'General'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Participants: </span>
                        <span className="text-gray-900">{event.current_registrations || event.registrations || 0}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => viewEventDetails(event)}
                        className="flex-1 text-xs text-blue-600 hover:text-blue-900 font-medium bg-blue-50 hover:bg-blue-100 py-2 px-3 rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={(e) => handleDeleteEvent(e, event._id)}
                        disabled={deleteLoading}
                        className="flex-1 text-xs text-red-600 hover:text-red-900 font-medium bg-red-50 hover:bg-red-100 py-2 px-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Registrations Tab Content */}
{!showSettings && activeTab === 'registrations' && (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
  
      {/* Embed the Event page here */}
      <div className="w-full h-full border rounded-lg shadow-sm p-4">
        <Event /> {/* Renders your existing Event page */}
      </div>
    </div>
  
)}
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-700 text-sm">{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  if (currentUser?.id) {
                    fetchAdminEvents();
                    fetchAdminStats();
                  }
                }}
                className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Overview Tab - Main Dashboard */}
        {!showSettings && activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Recent Events */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Events</h3>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-2">Loading your events...</p>
                  </div>
                ) : events.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No Events Created Yet</h4>
                    <p className="text-gray-500 mb-4">Start by creating your first event to manage your campus activities.</p>
                    <button 
                      onClick={HandleEventCreation}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Event
                    </button>
                  </div>
                ) : (
                  events.map(event => (
                    <EventCard key={event._id || event.id} event={event} />
                  ))
                )}
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
                    onClick={HandleEventCreation}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Event
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

      {/* Event Details Modal */}
      <EventDetailsModal />

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* User Avatar */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h3>
                    <p className="text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>
                
                {/* User Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Full Name:</span>
                        <p className="text-gray-900">{selectedUser.name}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Email Address:</span>
                        <p className="text-gray-900">{selectedUser.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">College:</span>
                        <p className="text-gray-900">{selectedUser.college}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Role:</span>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedUser.role === 'college_admin' ? 'bg-purple-100 text-purple-800' : 
                          selectedUser.role === 'super_admin' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {selectedUser.role === 'college_admin' ? 'Admin' : 
                           selectedUser.role === 'super_admin' ? 'Super Admin' : 'Student'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Account Status</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Status:</span>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedUser.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Account Created:</span>
                        <p className="text-gray-900">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                      </div>
                      {selectedUser.lastLogin && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Last Login:</span>
                          <p className="text-gray-900">{new Date(selectedUser.lastLogin).toLocaleDateString()}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-500">User ID:</span>
                        <p className="text-gray-900 text-xs font-mono">{selectedUser._id}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Security Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Security Information</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>Password and other sensitive authentication data are not displayed for security reasons. Only basic account information is shown.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
