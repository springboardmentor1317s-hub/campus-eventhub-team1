import React, { useState } from 'react';
import { Search, Filter, Trash2, Eye, Star, MessageSquare, Calendar, User, TrendingUp, AlertCircle } from 'lucide-react';

const AdminFeedbackManager = () => {
  const [activeTab, setActiveTab] = useState('feedback');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample feedback data
  const [feedbackData, setFeedbackData] = useState([
    { id: 1, user: 'John Doe', email: 'john@example.com', message: 'Great experience! The interface is intuitive.', status: 'unread', date: '2025-10-15', category: 'UI/UX' },
    { id: 2, user: 'Jane Smith', email: 'jane@example.com', message: 'Found a bug in the payment section.', status: 'resolved', date: '2025-10-14', category: 'Bug Report' },
    { id: 3, user: 'Mike Johnson', email: 'mike@example.com', message: 'Would love to see dark mode added.', status: 'pending', date: '2025-10-13', category: 'Feature Request' },
    { id: 4, user: 'Sarah Williams', email: 'sarah@example.com', message: 'Customer support was very helpful!', status: 'unread', date: '2025-10-12', category: 'Support' },
  ]);

  // Sample event ratings data
  const [ratingsData, setRatingsData] = useState([
    { id: 1, event: 'Tech Conference 2025', user: 'Alice Brown', rating: 5, comment: 'Excellent speakers and organization!', date: '2025-10-10', attendees: 250 },
    { id: 2, event: 'Workshop: React Basics', user: 'Bob Wilson', rating: 4, comment: 'Very informative, could be longer.', date: '2025-10-09', attendees: 45 },
    { id: 3, event: 'Networking Meetup', user: 'Carol Davis', rating: 3, comment: 'Good venue but poor sound system.', date: '2025-10-08', attendees: 80 },
    { id: 4, event: 'Product Launch', user: 'David Lee', rating: 5, comment: 'Amazing! Exceeded expectations.', date: '2025-10-07', attendees: 150 },
  ]);

  const handleDelete = (id) => {
    if (activeTab === 'feedback') {
      setFeedbackData(feedbackData.filter(item => item.id !== id));
    } else {
      setRatingsData(ratingsData.filter(item => item.id !== id));
    }
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setFeedbackData(feedbackData.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const toggleSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (activeTab === 'feedback') {
      setFeedbackData(feedbackData.filter(item => !selectedItems.includes(item.id)));
    } else {
      setRatingsData(ratingsData.filter(item => !selectedItems.includes(item.id)));
    }
    setSelectedItems([]);
  };

  const filteredFeedback = feedbackData.filter(item => {
    const matchesSearch = item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredRatings = ratingsData.filter(item => {
    const matchesSearch = item.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getAverageRating = () => {
    if (ratingsData.length === 0) return 0;
    const sum = ratingsData.reduce((acc, item) => acc + item.rating, 0);
    return (sum / ratingsData.length).toFixed(1);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'unread': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage user feedback and event ratings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Feedback</p>
                <p className="text-2xl font-bold text-gray-900">{feedbackData.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedbackData.filter(f => f.status === 'unread').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Ratings</p>
                <p className="text-2xl font-bold text-gray-900">{ratingsData.length}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{getAverageRating()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('feedback')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'feedback'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Feedback Management
              </button>
              <button
                onClick={() => setActiveTab('ratings')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'ratings'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Event Ratings
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {activeTab === 'feedback' && (
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              )}
              {selectedItems.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({selectedItems.length})
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'feedback' ? (
              <div className="space-y-4">
                {filteredFeedback.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="font-semibold text-gray-900">{item.user}</span>
                              <span className="text-sm text-gray-500">{item.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{item.date}</span>
                              <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}
                          >
                            <option value="unread">Unread</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                        <p className="text-gray-700 mb-3">{item.message}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredFeedback.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No feedback found matching your criteria.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRatings.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{item.event}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <User className="w-4 h-4" />
                              <span>{item.user}</span>
                              <Calendar className="w-4 h-4 ml-2" />
                              <span>{item.date}</span>
                              <span className="ml-2 text-gray-400">•</span>
                              <span>{item.attendees} attendees</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(item.rating)}
                            <span className="ml-2 font-semibold text-gray-900">{item.rating}.0</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{item.comment}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredRatings.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No ratings found matching your criteria.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedbackManager;