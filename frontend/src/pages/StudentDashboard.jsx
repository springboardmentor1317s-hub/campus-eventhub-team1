import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Filter, X, Trophy, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
          
          const response = await fetch(`${API_BASE_URL}/events/user/registrations`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data.registrations) {
              // Filter out registrations with null event_id and extract events from registrations
              const registeredEvents = data.data.registrations
                .filter(reg => reg.event_id !== null && reg.event_id !== undefined)
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
                  status: reg.status === 'approved' ? 'approved' : reg.status === 'pending' ? 'pending' : 'rejected',
                  registrationStatus: reg.status,
                  registrationId: reg._id  // Added registration ID for ticket download
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
  }, [currentUser]); // Remove activeTab dependency - fetch on mount

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
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={closeEventDetails}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
              {selectedEvent.registrationStatus && (
                <div className={`absolute top-4 left-4 px-4 py-2 rounded-full font-semibold text-sm backdrop-blur-sm border-2 ${getRegistrationStatusColor(selectedEvent.registrationStatus)}`}>
                  {selectedEvent.registrationStatus.toUpperCase()}
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h2>
              
              {/* Event Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-semibold">{new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} at {selectedEvent.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold">{selectedEvent.location}</p>
                      <p className="text-sm">{selectedEvent.college}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p className="font-semibold">{selectedEvent.participants} / {selectedEvent.maxParticipants} registered</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Trophy className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-semibold capitalize">{selectedEvent.category}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About This Event</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedEvent.description || 'No description available for this event.'}
                </p>
              </div>

              {/* Tags */}
              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Fee */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                <span className="text-gray-700 font-medium">Registration Fee</span>
                <span className="text-2xl font-bold text-green-600">₹{selectedEvent.fee}</span>
              </div>

              {/* Action Button */}
              <div className="flex gap-4 mb-8">
                {selectedEvent.registrationStatus ? (
                  <div className="flex-1">
                    <div className={`p-4 rounded-lg border-2 ${getRegistrationStatusColor(selectedEvent.registrationStatus)} text-center`}>
                      <p className="font-semibold text-lg">Registration Status</p>
                      <p className="text-2xl font-bold mt-2">{selectedEvent.registrationStatus.toUpperCase()}</p>
                      {selectedEvent.registrationStatus === 'approved' && (
                        <p className="text-sm mt-2">You're all set! See you at the event.</p>
                      )}
                      {selectedEvent.registrationStatus === 'pending' && (
                        <p className="text-sm mt-2">Your registration is awaiting admin approval.</p>
                      )}
                      {selectedEvent.registrationStatus === 'rejected' && (
                        <p className="text-sm mt-2">Unfortunately, your registration was not approved.</p>
                      )}
                    </div>
                    
                    {/* Download Ticket Button for Approved Registrations */}
                    {selectedEvent.registrationStatus === 'approved' && selectedEvent.registrationId && (
                      <DownloadTicketButton registrationId={selectedEvent.registrationId} />
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      closeEventDetails();
                      handleRegister(selectedEvent.id);
                    }}
                    disabled={selectedEvent.participants >= selectedEvent.maxParticipants}
                    className={`flex-1 py-4 rounded-lg font-semibold text-lg transition-colors ${
                      selectedEvent.participants >= selectedEvent.maxParticipants
                        ? 'bg-red-100 text-red-700 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {selectedEvent.participants >= selectedEvent.maxParticipants ? 'Event Full' : 'Register Now'}
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-8"></div>

              {/* Reviews Section */}
              <div>
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