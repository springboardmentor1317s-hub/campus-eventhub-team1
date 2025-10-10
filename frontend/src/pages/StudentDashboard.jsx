import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, Settings, User, LogOut, Heart, MessageCircle, Trophy, Code, Palette, BookOpen, ChevronRight, CheckCircle, AlertCircle, XCircle, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileSettings from '../components/ProfileSettings';
<<<<<<< Updated upstream
=======
import Notifications from '../components/Notifications';
import StudentMyRegistrations from '../components/StudentMyRegistrations';
import StudentUpcomingEvents from '../components/StudentUpcomingEvents';
import StudentQuickStats from '../components/StudentQuickStats';
>>>>>>> Stashed changes

const StudentDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');
  const dropdownRef = useRef(null);
  
  // Define the categories array
  const categories = useMemo(() => [
    { id: 'all', name: 'All Categories' },
    { id: 'technical', name: 'Technical' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'sports', name: 'Sports' },
    { id: 'workshop', name: 'Workshop' },
    { id: 'seminar', name: 'Seminar' },
    { id: 'hackathon', name: 'Hackathon' },
    { id: 'other', name: 'Other' }
  ], []);

  // API function to fetch events
  const fetchEvents = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        upcoming: 'true',
        limit: '50',
        ...filters
      });
      
      const response = await fetch(`http://localhost:4000/api/events?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await response.json();
      
      if (data.success && data.data && data.data.events) {
        // Transform backend data to match frontend expectations
        const transformedEvents = data.data.events.map(event => ({
          id: event._id,
          title: event.title,
          college: event.college_name,
          category: event.category,
          date: event.start_date.split('T')[0], // Extract date part
          time: new Date(event.start_date).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          location: event.location,
          participants: event.current_registrations || 0,
          maxParticipants: event.registration_limit,
          image: event.image ? `http://localhost:4000${event.image}` : 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
          description: event.description,
          tags: event.tags || [],
          registrationDeadline: event.registration_deadline ? 
            event.registration_deadline.split('T')[0] : 
            event.start_date.split('T')[0],
          fee: event.price || 0,
          rating: event.rating?.average || 0,
          status: event.registration_open ? 'open' : 'closed'
        }));
        
        setEvents(transformedEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]); // Add fetchEvents as dependency

  // Debounced fetch events when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filters = {};
      if (selectedCategory && selectedCategory !== 'all') {
        filters.category = selectedCategory;
      }
      if (searchTerm.trim()) {
        filters.search = searchTerm.trim();
      }
      fetchEvents(filters);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchTerm, fetchEvents]);

  // Use useMemo for derived values
  const uniqueDates = useMemo(() => [
    ...new Set(events.map(event => new Date(event.date).toISOString().split("T")[0]))
  ], [events]);

  // Use useMemo for filtered events
  const filteredEvents = useMemo(() => events.filter(event => {
    const matchesDate =
      selectedDateFilter === 'all' ||
      new Date(event.date).toISOString().split("T")[0] === selectedDateFilter;

    return matchesDate;
  }), [events, selectedDateFilter]);

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

  const handleRegister = (eventId) => {
    // Navigate to the event registration page with the event ID
    navigate(`/event-register/${eventId}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'filling_fast': return 'text-orange-600 bg-orange-100';
      case 'closed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const EventCard = ({ event, showRegisterButton = true }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
          {event.status.replace('_', ' ').toUpperCase()}
        </div>
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
          {event.college}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{event.title}</h3>
          <div className="flex items-center text-yellow-500 ml-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{event.rating}</span>
          </div>
        </div>
        
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>{event.participants}/{event.maxParticipants} registered</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-green-600">₹{event.fee}</div>
          {showRegisterButton && (
            <button
              onClick={() => handleRegister(event.id)}
              disabled={userEvents.some(e => e.id === event.id) || event.participants >= event.maxParticipants}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                userEvents.some(e => e.id === event.id)
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : event.participants >= event.maxParticipants
                  ? 'bg-red-100 text-red-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {userEvents.some(e => e.id === event.id) 
                ? 'Registered' 
                : event.participants >= event.maxParticipants
                ? 'Full'
                : 'View Details'  /* Changed from "Register" to "View Details" */
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Registered Events</p>
            <p className="text-3xl font-bold">{userEvents.length}</p>
          </div>
          <Calendar className="w-8 h-8 text-blue-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Completed Events</p>
            <p className="text-3xl font-bold">{userEvents.filter(e => e.status === 'completed').length}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Available Events</p>
            <p className="text-3xl font-bold">{events.filter(e => e.status === 'open').length}</p>
          </div>
          <Trophy className="w-8 h-8 text-purple-200" />
        </div>
      </div>
      
    </div>
  );

  // Update in StudentDashboard.jsx - modify the useEffect section
  useEffect(() => {
    // Fetch user's registered events if on the 'registered' tab
    if (activeTab === 'registered' && currentUser?.id) {
      const fetchUserRegistrations = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
          
          const response = await fetch('http://localhost:4000/api/events/user/registrations', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data.registrations) {
              // Extract events from registrations
              const registeredEvents = data.data.registrations.map(reg => ({
                id: reg.event_id._id,
                title: reg.event_id.title,
                college: reg.event_id.college_name,
                category: reg.event_id.category,
                date: reg.event_id.start_date.split('T')[0],
                time: new Date(reg.event_id.start_date).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }),
                location: reg.event_id.location,
                participants: reg.event_id.current_registrations || 0,
                maxParticipants: reg.event_id.registration_limit,
                image: reg.event_id.image ? `http://localhost:4000${reg.event_id.image}` : 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
                description: reg.event_id.description,
                fee: reg.event_id.price || 0,
                status: reg.status === 'approved' ? 'approved' : reg.status === 'pending' ? 'pending' : 'rejected',
                registrationStatus: reg.status
              }));
              setUserEvents(registeredEvents);
            }
          }
        } catch (error) {
          console.error('Error fetching user registrations:', error);
        }
      };
      
      fetchUserRegistrations();
    }
  }, [activeTab, currentUser]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">CampusEventHub</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notification Icon / Dropdown */}
              <Notifications />
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-700">{currentUser?.name || 'Student'}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      currentUser?.role === 'student' 
                        ? 'bg-green-100 text-green-800' 
                        : currentUser?.role === 'college_admin' || currentUser?.role === 'admin'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {currentUser?.role === 'student' ? 'Student' : 
                       currentUser?.role === 'college_admin' ? 'Admin' :
                       currentUser?.role === 'super_admin' ? 'Super Admin' :
                       'User'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{currentUser?.college || 'Computer Science'}</p>
                </div>
                
                {/* Settings Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <Settings 
                    className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" 
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
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'browse', name: 'Browse Events', icon: Search },
              { id: 'registered', name: 'My Events', icon: Calendar },
              { id: 'dashboard', name: 'Dashboard', icon: User }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Show ProfileSettings if showSettings is true */}
        {showSettings && (
          <ProfileSettings 
            currentUser={currentUser} 
            logout={logout} 
            token={token}
            onBack={() => setShowSettings(false)}
          />
        )}

        {!showSettings && activeTab === 'dashboard' && <DashboardStats />}
        
        {!showSettings && activeTab === 'browse' && (
          <>
            {/* Search and Filters */}
            <div className="mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by event name, college, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  {/* All Events Button */}
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedDateFilter('all'); }}
                    className="bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base order-3 sm:order-1"
                  >
                    All Events
                  </button>

                  {/* Filter Dropdowns Container */}
                  <div className="flex flex-col sm:flex-row gap-3 flex-1 sm:flex-none order-1 sm:order-2">
                    {/* Category Dropdown */}
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full sm:w-auto px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white"
                    >
                      <option value="all" disabled hidden>
                        Filter by Category
                      </option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>                    
                    
                    {/* Date Dropdown */}
                    <select
                      value={selectedDateFilter}                  
                      onChange={(e) => setSelectedDateFilter(e.target.value)}
                      className="w-full sm:w-auto px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white"
                    >
                      {/* Placeholder heading */}
                      <option value="all" disabled hidden>                  
                        Filter by Dates
                      </option>
                    
                      {/* Default option */}                  
                      <option value="all">All Dates</option>
                    
                      {/* Event dates */}
                      {uniqueDates.map((date) => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading events...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Error Loading Events</h3>
                  <p className="text-gray-500 mb-4">{error}</p>
                  <button
                    onClick={fetchEvents}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </>
        )}
        
        {!showSettings && activeTab === 'registered' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Registered Events</h2>
            {userEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userEvents.map(event => (
                  <EventCard key={event.id} event={event} showRegisterButton={false} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Registered</h3>
                <p className="text-gray-500 mb-6">Start exploring and register for exciting events!</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Browse Events
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// Default export for StudentDashboard component
export default StudentDashboard;