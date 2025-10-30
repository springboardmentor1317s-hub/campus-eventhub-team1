import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Star, Filter, Search, Settings, User, LogOut, Heart, 
  MessageCircle, Trophy, Code, Palette, BookOpen, ChevronRight, CheckCircle, 
  AlertCircle, XCircle, Bell 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

 export const StudentDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userEvents, setUserEvents] = useState([]);

  // Mock data for events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "TechFest 2025 - Hackathon",
      college: "IIT Delhi",
      category: "hackathon",
      date: "2025-10-15",
      time: "09:00 AM",
      location: "Main Campus, Delhi",
      participants: 156,
      maxParticipants: 200,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
      description: "48-hour coding marathon with prizes worth ₹2 lakhs. Build innovative solutions for real-world problems.",
      tags: ["Coding", "Innovation", "Team Event"],
      registrationDeadline: "2025-10-10",
      fee: 500,
      rating: 4.8,
      status: "open"
    },
    {
      id: 2,
      title: "Inter-College Sports Meet",
      college: "Delhi University",
      category: "sports",
      date: "2025-10-22",
      time: "08:00 AM",
      location: "Sports Complex, DU",
      participants: 89,
      maxParticipants: 120,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
      description: "Multi-sport championship featuring basketball, football, cricket, and track events.",
      tags: ["Sports", "Competition", "Championship"],
      registrationDeadline: "2025-10-18",
      fee: 200,
      rating: 4.6,
      status: "open"
    },
    {
      id: 3,
      title: "Cultural Extravaganza",
      college: "Jamia Millia Islamia",
      category: "cultural",
      date: "2025-11-05",
      time: "06:00 PM",
      location: "Auditorium, JMI",
      participants: 234,
      maxParticipants: 300,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      description: "Showcase your artistic talents in dance, music, drama, and fine arts competitions.",
      tags: ["Arts", "Performance", "Cultural"],
      registrationDeadline: "2025-11-01",
      fee: 300,
      rating: 4.9,
      status: "open"
    },
    {
      id: 4,
      title: "AI/ML Workshop Series",
      college: "IIIT Hyderabad",
      category: "workshop",
      date: "2025-10-28",
      time: "10:00 AM",
      location: "Lab Block, IIIT-H",
      participants: 45,
      maxParticipants: 50,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
      description: "Hands-on workshop on machine learning algorithms and practical AI applications.",
      tags: ["AI/ML", "Workshop", "Learning"],
      registrationDeadline: "2025-10-25",
      fee: 800,
      rating: 4.7,
      status: "filling_fast"
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'hackathon', name: 'Hackathons', icon: Code },
    { id: 'sports', name: 'Sports', icon: Trophy },
    { id: 'cultural', name: 'Cultural', icon: Palette },
    { id: 'workshop', name: 'Workshops', icon: BookOpen }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleRegister = (eventId) => {
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
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>
        
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
              {userEvents.some(e => e.id === event.id) ? 'Registered' : event.participants >= event.maxParticipants ? 'Full' : 'Register'}
             
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Notifications</p>
            <p className="text-3xl font-bold">{notifications}</p>
          </div>
          <Bell className="w-8 h-8 text-orange-200" />
        </div>
      </div>
    </div>
  );

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
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{currentUser?.name || 'Student'}</p>
                  <p className="text-xs text-gray-500">{currentUser?.role || 'Computer Science'}</p>
                </div>
                <LogOut 
                  className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" 
                  onClick={logout}
                />
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
        {activeTab === 'dashboard' && <DashboardStats />}
        
        {activeTab === 'browse' && (
          <>
            {/* Search and Filters */}
            <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events, colleges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <category.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
        
        {activeTab === 'registered' && (
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