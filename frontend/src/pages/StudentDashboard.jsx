import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Filter, X, Trophy, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Add useLocation
import ProfileSettings from '../components/ProfileSettings';
import { 
  StudentMyRegistrations, 
  StudentUpcomingEvents, 
  StudentQuickStats, 
  BrowseEvents, 
  MyRegistrations, 
  DashboardSection, 
  ReviewSection,
  HeaderSection 
} from '../components/student';
import DownloadTicketButton from '../components/event-actions/DownloadTicket';
import { API_BASE_URL } from '../config/api';

const StudentDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Add this line
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');
  const dropdownRef = useRef(null);
  
  // Pagination state for browse events
  const [browsePage, setBrowsePage] = useState(1);
  const BROWSE_EVENTS_PER_PAGE = 12;
  
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
      
      const response = await fetch(`${API_BASE_URL}/events?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
          image: event.image ? `${API_BASE_URL.replace('/api', '')}${event.image}` : 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
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

  // Paginate browse events
  const paginatedBrowseEvents = useMemo(() => {
    const startIndex = 0;
    const endIndex = browsePage * BROWSE_EVENTS_PER_PAGE;
    return filteredEvents.slice(startIndex, endIndex);
  }, [filteredEvents, browsePage]);

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

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
    setShowEventDetails(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'filling_fast': return 'text-orange-600 bg-orange-100';
      case 'closed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRegistrationStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'text-green-600 bg-green-100 border-green-300';
      case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'rejected': return 'text-red-600 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const EventCard = ({ event, showRegisterButton = true }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
          {event.status.replace('_', ' ').toUpperCase()}
        </div>
        {/* Show registration status badge for registered events */}
        {event.registrationStatus && (
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${getRegistrationStatusColor(event.registrationStatus)}`}>
            {event.registrationStatus.toUpperCase()}
          </div>
        )}
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
          {showRegisterButton ? (
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
                : 'Register Now'
              }
            </button>
          ) : (
            <button
              onClick={() => handleViewDetails(event)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              View Details
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
    // Fetch user's registered events on component mount and when tab changes
    if (currentUser?.id) {
      const fetchUserRegistrations = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
          
          console.log('Fetching user registrations...');
          
          const response = await fetch(`${API_BASE_URL}/events/user/registrations`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('Registration data received:', data);
            
            if (data.success && data.data.registrations) {
              // Filter out registrations with null event_id and extract events from registrations
              const registeredEvents = data.data.registrations
                .filter(reg => {
                  if (!reg.event_id) {
                    console.warn('Registration with null event_id found:', reg._id);
                    return false;
                  }
                  return true;
                })
                .map(reg => ({
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
                  image: reg.event_id.image ? `${API_BASE_URL.replace('/api', '')}${reg.event_id.image}` : 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
                  description: reg.event_id.description,
                  tags: reg.event_id.tags || [],
                  registrationDeadline: reg.event_id.registration_deadline ? 
                    reg.event_id.registration_deadline.split('T')[0] : 
                    reg.event_id.start_date.split('T')[0],
                  fee: reg.event_id.price || 0,
                  status: reg.status, // Keep the actual registration status
                  registrationStatus: reg.status, // This should be 'pending', 'approved', or 'rejected'
                  registrationId: reg._id
                }));
              
              console.log('Processed registered events:', registeredEvents);
              setUserEvents(registeredEvents);
            }
          }
        } catch (error) {
          console.error('Error fetching user registrations:', error);
        }
      };
      
      fetchUserRegistrations();
    }
  }, [currentUser]); // Remove activeTab dependency - fetch on mount

  // Add useEffect to handle navigation state
  useEffect(() => {
    // Check if we're being navigated to with a specific active tab
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      // Clear the state to prevent it from persisting on refresh
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location.state]);

  // Add a function to refresh user registrations
  const refreshUserRegistrations = useCallback(async () => {
    if (currentUser?.id) {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        console.log('Refreshing user registrations...');
        
        const response = await fetch(`${API_BASE_URL}/events/user/registrations`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Registration data refreshed:', data);
          
          if (data.success && data.data.registrations) {
            // Filter out registrations with null event_id and extract events from registrations
            const registeredEvents = data.data.registrations
              .filter(reg => {
                if (!reg.event_id) {
                  console.warn('Registration with null event_id found:', reg._id);
                  return false;
                }
                return true;
              })
              .map(reg => ({
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
                image: reg.event_id.image ? `${API_BASE_URL.replace('/api', '')}${reg.event_id.image}` : 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
                description: reg.event_id.description,
                tags: reg.event_id.tags || [],
                registrationDeadline: reg.event_id.registration_deadline ? 
                  reg.event_id.registration_deadline.split('T')[0] : 
                  reg.event_id.start_date.split('T')[0],
                fee: reg.event_id.price || 0,
                status: reg.status, 
                registrationStatus: reg.status, 
                registrationId: reg._id
              }));
            
            console.log('Processed registered events:', registeredEvents);
            setUserEvents(registeredEvents);
          }
        }
      } catch (error) {
        console.error('Error refreshing user registrations:', error);
      }
    }
  }, [currentUser]);

  // Update the existing useEffect
  useEffect(() => {
    refreshUserRegistrations();
  }, [refreshUserRegistrations]);

  // Add an interval to periodically refresh registration data
  useEffect(() => {
    const interval = setInterval(() => {
      refreshUserRegistrations();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [refreshUserRegistrations]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use the HeaderSection component */}
      <HeaderSection
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        dropdownRef={dropdownRef}
        handleLogout={handleLogout}
        handleSettingsClick={handleSettingsClick}
      />

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

        {!showSettings && activeTab === 'dashboard' && (
          <DashboardSection
            currentUser={currentUser}
            userEvents={userEvents}
            events={events}
            handleViewDetails={handleViewDetails}
            setActiveTab={setActiveTab}
            getRegistrationStatusColor={getRegistrationStatusColor}
          />
        )}
        
        {!showSettings && activeTab === 'browse' && (
          <BrowseEvents
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDateFilter={selectedDateFilter}
            setSelectedDateFilter={setSelectedDateFilter}
            browsePage={browsePage}
            setBrowsePage={setBrowsePage}
            categories={categories}
            uniqueDates={uniqueDates}
            loading={loading}
            error={error}
            fetchEvents={fetchEvents}
            paginatedBrowseEvents={paginatedBrowseEvents}
            filteredEvents={filteredEvents}
            EventCard={(props) => <EventCard {...props} />}
            BROWSE_EVENTS_PER_PAGE={BROWSE_EVENTS_PER_PAGE}
          />
        )}
        
        {!showSettings && activeTab === 'registered' && (
          <MyRegistrations 
            userEvents={userEvents} 
            onViewDetails={handleViewDetails}
            onBrowseEvents={() => setActiveTab('browse')}
            currentUser={currentUser}
            handleRegister={handleRegister}
          />
        )}
      </main>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
          onClick={closeEventDetails}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-full h-[90vh] overflow-y-auto animate-fade-in mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Enhanced for full width */}
            <div className="relative h-80 lg:h-96">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-full object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-t-xl"></div>
              
              {/* Close button */}
              <button
                onClick={closeEventDetails}
                className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
              
              {/* Registration status badge */}
              {selectedEvent.registrationStatus && (
                <div className={`absolute top-6 left-6 px-6 py-3 rounded-full font-bold text-lg backdrop-blur-sm border-2 shadow-lg ${getRegistrationStatusColor(selectedEvent.registrationStatus)}`}>
                  {selectedEvent.registrationStatus.toUpperCase()}
                </div>
              )}

              {/* Event title overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                  {selectedEvent.title}
                </h2>
                <p className="text-xl text-gray-200 font-medium">
                  {selectedEvent.college}
                </p>
              </div>
            </div>

            {/* Modal Content - Better spacing for full width */}
            <div className="p-8 lg:p-12">
              {/* Event Info Grid - Optimized for full width */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <div className="flex items-center text-blue-600 mb-3">
                    <Calendar className="w-6 h-6 mr-3" />
                    <p className="text-sm font-semibold uppercase tracking-wide">Date & Time</p>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">
                    {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-600 font-medium">{selectedEvent.time}</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                  <div className="flex items-center text-green-600 mb-3">
                    <MapPin className="w-6 h-6 mr-3" />
                    <p className="text-sm font-semibold uppercase tracking-wide">Location</p>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">{selectedEvent.location}</p>
                  <p className="text-gray-600 font-medium">{selectedEvent.college}</p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                  <div className="flex items-center text-purple-600 mb-3">
                    <Users className="w-6 h-6 mr-3" />
                    <p className="text-sm font-semibold uppercase tracking-wide">Participants</p>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">
                    {selectedEvent.participants}/{selectedEvent.maxParticipants}
                  </p>
                  <p className="text-gray-600 font-medium">Registered</p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                  <div className="flex items-center text-orange-600 mb-3">
                    <Trophy className="w-6 h-6 mr-3" />
                    <p className="text-sm font-semibold uppercase tracking-wide">Fee</p>
                  </div>
                  <p className="font-bold text-green-600 text-2xl">₹{selectedEvent.fee}</p>
                  <p className="text-gray-600 font-medium">Registration</p>
                </div>
              </div>

              {/* Category Section */}
              <div className="bg-gray-50 p-6 rounded-2xl mb-8">
                <div className="flex items-center text-gray-700 mb-3">
                  <Trophy className="w-6 h-6 mr-3 text-blue-600" />
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">Category</p>
                </div>
                <p className="font-bold text-gray-900 text-xl capitalize">{selectedEvent.category}</p>
              </div>

              {/* Description - Full width with better typography */}
              <div className="mb-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-4"></div>
                  About This Event
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedEvent.description || 'No description available for this event.'}
                  </p>
                </div>
              </div>

              {/* Tags */}
              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-2 h-6 bg-gradient-to-b from-green-600 to-blue-600 rounded-full mr-4"></div>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedEvent.tags.map((tag, index) => (
                      <span key={index} className="px-6 py-3 bg-blue-100 text-blue-800 text-lg font-medium rounded-full border border-blue-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons - Better aligned for full width */}
              <div className="bg-gray-50 p-8 rounded-2xl mb-10">
                <div className="max-w-4xl mx-auto">
                  {selectedEvent.registrationStatus ? (
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                      <div className="flex-1 w-full lg:w-auto">
                        <div className={`p-8 rounded-2xl font-bold text-2xl text-center border-2 shadow-lg ${getRegistrationStatusColor(selectedEvent.registrationStatus)}`}>
                          <div className="flex items-center justify-center gap-3">
                            {selectedEvent.registrationStatus === 'approved' && <CheckCircle className="w-8 h-8" />}
                            {selectedEvent.registrationStatus === 'pending' && <Clock className="w-8 h-8" />}
                            {selectedEvent.registrationStatus === 'rejected' && <X className="w-8 h-8" />}
                            <span>Registration {selectedEvent.registrationStatus.toUpperCase()}</span>
                          </div>
                          <p className="text-lg font-medium mt-2">
                            {selectedEvent.registrationStatus === 'approved' && "You're all set for this event!"}
                            {selectedEvent.registrationStatus === 'pending' && "Your registration is awaiting admin approval."}
                            {selectedEvent.registrationStatus === 'rejected' && "Unfortunately, your registration was not approved."}
                          </p>
                        </div>
                      </div>
                      {selectedEvent.registrationStatus === 'approved' && selectedEvent.registrationId && (
                        <div className="w-full lg:w-auto">
                          <DownloadTicketButton registrationId={selectedEvent.registrationId} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <button
                        onClick={() => {
                          closeEventDetails();
                          handleRegister(selectedEvent.id);
                        }}
                        disabled={selectedEvent.participants >= selectedEvent.maxParticipants}
                        className={`px-12 py-6 rounded-2xl font-bold text-2xl transition-all transform hover:scale-105 shadow-lg ${
                          selectedEvent.participants >= selectedEvent.maxParticipants
                            ? 'bg-red-100 text-red-700 cursor-not-allowed border-2 border-red-300'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-xl'
                        }`}
                      >
                        {selectedEvent.participants >= selectedEvent.maxParticipants ? 
                          'Event Full - Registration Closed' : 
                          'Register for This Event'
                        }
                      </button>
                      {selectedEvent.participants < selectedEvent.maxParticipants && (
                        <p className="text-gray-600 mt-4 text-lg">
                          Join {selectedEvent.participants} other participants
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-gray-200 mb-10"></div>

              {/* Reviews Section - Full width with better spacing */}
              <div className="w-full">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mr-4"></div>
                  Event Reviews & Ratings
                </h3>
                <ReviewSection 
                  eventId={selectedEvent.id} 
                  currentUserId={currentUser?.id}
                  showForm={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;