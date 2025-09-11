import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: '',
    description: '',
    category: 'hackathon',
    date: '',
    location: '',
    maxParticipants: ''
  });

  useEffect(() => {
    // Simulated data - in production, this would be an API call
    const fetchEvents = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('http://localhost:4000/api/admin/events');
        // const data = await response.json();
        
        // Simulate API data
        setTimeout(() => {
          setEvents([
            {
              id: 1,
              title: 'College Coding Competition',
              date: '2024-07-25',
              category: 'hackathon',
              registrations: 45,
              maxParticipants: 50,
              status: 'active'
            },
            {
              id: 2,
              title: 'Annual Debate Championship',
              date: '2024-08-10',
              category: 'academic',
              registrations: 18,
              maxParticipants: 20,
              status: 'active'
            },
            {
              id: 3,
              title: 'Spring Dance Festival',
              date: '2024-09-15',
              category: 'cultural',
              registrations: 15,
              maxParticipants: 30,
              status: 'pending'
            },
            {
              id: 4,
              title: 'Winter Volleyball Tournament',
              date: '2024-12-05',
              category: 'sports',
              registrations: 0,
              maxParticipants: 12,
              status: 'draft'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEventData({
      ...newEventData,
      [name]: value
    });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call to create a new event
    
    const newEvent = {
      id: events.length + 1,
      ...newEventData,
      registrations: 0,
      status: 'pending'
    };
    
    setEvents([...events, newEvent]);
    setShowCreateEventModal(false);
    setNewEventData({
      title: '',
      description: '',
      category: 'hackathon',
      date: '',
      location: '',
      maxParticipants: ''
    });
  };

  const handleStatusChange = (eventId, newStatus) => {
    // In a real app, this would be an API call to update the event status
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">CampusEventHub</h1>
              <span className="ml-2 px-2 py-1 text-xs bg-indigo-800 text-white rounded-md">
                Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white">
                {currentUser?.name} | {currentUser?.college}
              </span>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-900 transition-colors text-sm"
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
              Admin Dashboard
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your college's events and registrations
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setShowCreateEventModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Event
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'registrations'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Registrations
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Events Tab Content */}
        {activeTab === 'events' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {loading ? (
              <div className="flex justify-center py-12">
                <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No events created yet.</p>
                <button
                  onClick={() => setShowCreateEventModal(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Create your first event
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {events.map((event) => (
                  <li key={event.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          event.category === 'hackathon' ? 'bg-purple-100 text-purple-600' :
                          event.category === 'cultural' ? 'bg-pink-100 text-pink-600' :
                          event.category === 'academic' ? 'bg-blue-100 text-blue-600' :
                          event.category === 'sports' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {event.category === 'hackathon' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />}
                            {event.category === 'cultural' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />}
                            {event.category === 'academic' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                            {event.category === 'sports' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />}
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                          <div className="flex mt-1 space-x-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <svg className="mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                            <div className="flex items-center">
                              <svg className="mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              {event.registrations}/{event.maxParticipants} registered
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          event.status === 'active' ? 'bg-green-100 text-green-800' :
                          event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          event.status === 'draft' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                        <div className="relative">
                          <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => {
                              // Toggle dropdown menu in real implementation
                            }}
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                          <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Details</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Event</a>
                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete Event</a>
                          </div>
                        </div>
                        <div className="flex">
                          {event.status === 'pending' && (
                            <button
                              onClick={() => handleStatusChange(event.id, 'active')}
                              className="text-xs bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                            >
                              Publish
                            </button>
                          )}
                          {event.status === 'draft' && (
                            <button
                              onClick={() => handleStatusChange(event.id, 'pending')}
                              className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                            >
                              Submit
                            </button>
                          )}
                          {event.status === 'active' && (
                            <button
                              onClick={() => handleStatusChange(event.id, 'inactive')}
                              className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                            >
                              Pause
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Registrations Tab Content */}
        {activeTab === 'registrations' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="text-center py-12">
              <p className="text-gray-500">Registration management will be implemented in the next milestone.</p>
            </div>
          </div>
        )}

        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="text-center py-12">
              <p className="text-gray-500">Analytics will be implemented in the next milestone.</p>
            </div>
          </div>
        )}
      </main>

      {/* Create Event Modal */}
      {showCreateEventModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleCreateEvent}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Create New Event</h3>
                    <p className="mt-1 text-sm text-gray-500">Fill out the form below to create a new event for your college.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={newEventData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter event title"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        value={newEventData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Describe your event"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={newEventData.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="hackathon">Hackathon</option>
                        <option value="cultural">Cultural</option>
                        <option value="academic">Academic</option>
                        <option value="sports">Sports</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={newEventData.date}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={newEventData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Event location"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">Maximum Participants</label>
                      <input
                        type="number"
                        name="maxParticipants"
                        id="maxParticipants"
                        value={newEventData.maxParticipants}
                        onChange={handleInputChange}
                        min="1"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Create Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateEventModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;