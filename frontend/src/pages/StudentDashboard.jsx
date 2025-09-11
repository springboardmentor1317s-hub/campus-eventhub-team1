import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - in production, this would be an API call
    const fetchEvents = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('http://localhost:4000/api/events');
        // const data = await response.json();
        
        // Simulate API data
        setTimeout(() => {
          setEvents([
            {
              id: 1,
              title: 'Annual Tech Hackathon',
              college: 'IIT Bombay',
              date: '2024-08-15',
              category: 'hackathon',
              description: 'A 24-hour coding competition to solve real-world problems.',
              registrationOpen: true,
              registered: false
            },
            {
              id: 2,
              title: 'Cultural Fest 2024',
              college: 'Delhi University',
              date: '2024-09-05',
              category: 'cultural',
              description: 'Annual cultural festival with music, dance, and art competitions.',
              registrationOpen: true,
              registered: true
            },
            {
              id: 3,
              title: 'Science Symposium',
              college: 'IIT Delhi',
              date: '2024-07-20',
              category: 'academic',
              description: 'Research presentations and discussions on emerging technologies.',
              registrationOpen: true,
              registered: false
            },
            {
              id: 4,
              title: 'Inter-College Basketball Tournament',
              college: 'SRM University',
              date: '2024-08-10',
              category: 'sports',
              description: 'Annual basketball tournament with teams from colleges across the country.',
              registrationOpen: false,
              registered: false
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = (eventId) => {
    // In a real app, this would be an API call to register for the event
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, registered: true } : event
    ));
  };

  const filteredEvents = activeTab === 'upcoming' 
    ? events.filter(event => !event.registered)
    : events.filter(event => event.registered);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">CampusEventHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Hello, {currentUser?.name}
              </span>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Student Dashboard
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse and register for events happening across colleges
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('registered')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'registered'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Registered Events
            </button>
          </nav>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {activeTab === 'upcoming' 
                ? 'No upcoming events available at the moment.' 
                : 'You have not registered for any events yet.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className={`h-2 ${
                  event.category === 'hackathon' ? 'bg-purple-500' :
                  event.category === 'cultural' ? 'bg-pink-500' :
                  event.category === 'academic' ? 'bg-blue-500' :
                  event.category === 'sports' ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      event.category === 'hackathon' ? 'bg-purple-100 text-purple-800' :
                      event.category === 'cultural' ? 'bg-pink-100 text-pink-800' :
                      event.category === 'academic' ? 'bg-blue-100 text-blue-800' :
                      event.category === 'sports' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Hosted by {event.college}</p>
                  <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-600">
                      <svg className="h-4 w-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                      </svg>
                      {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    {activeTab === 'upcoming' ? (
                      <button
                        onClick={() => handleRegister(event.id)}
                        className={`px-4 py-1.5 rounded text-sm font-medium ${
                          event.registrationOpen 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                            : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        }`}
                        disabled={!event.registrationOpen}
                      >
                        {event.registrationOpen ? 'Register' : 'Closed'}
                      </button>
                    ) : (
                      <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded text-sm font-medium">
                        Registered
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;