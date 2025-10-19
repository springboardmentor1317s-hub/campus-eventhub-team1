import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle, XCircle, Clock, ArrowLeft, Loader, User, 
  Search, Filter, X, Check, AlertCircle
} from 'lucide-react';

// Mock API calls - Replace with actual API integration
const mockAPI = {
  fetchParticipants: async (eventId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { 
            id: 1, 
            name: 'Rahul Kumar', 
            email: 'rahul@college.edu', 
            college: 'IIT Kanpur', 
            registrationDate: '2025-10-01', 
            status: 'pending' 
          },
          { 
            id: 2, 
            name: 'Priya Sharma', 
            email: 'priya@college.edu', 
            college: 'BHU Varanasi', 
            registrationDate: '2025-10-02', 
            status: 'approved' 
          },
          { 
            id: 3, 
            name: 'Amit Patel', 
            email: 'amit@college.edu', 
            college: 'IIIT Allahabad', 
            registrationDate: '2025-10-03', 
            status: 'pending' 
          },
          { 
            id: 4, 
            name: 'Sneha Singh', 
            email: 'sneha@college.edu', 
            college: 'Lucknow University', 
            registrationDate: '2025-10-01', 
            status: 'rejected' 
          },
          { 
            id: 5, 
            name: 'Vikram Joshi', 
            email: 'vikram@college.edu', 
            college: 'Amity Noida', 
            registrationDate: '2025-10-04', 
            status: 'pending' 
          },
          { 
            id: 6, 
            name: 'Anjali Verma', 
            email: 'anjali@college.edu', 
            college: 'AKTU Lucknow', 
            registrationDate: '2025-10-03', 
            status: 'approved' 
          }
        ]);
      }, 800);
    });
  },
  
  updateRegistrationStatus: async (registrationId, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: `Registration ${status} successfully!` });
      }, 600);
    });
  }
};

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? XCircle : AlertCircle;

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 z-50`}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 hover:bg-white/20 rounded-full p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Main Participant Management Page
export const ParticipantManagementPage = () => {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [processingIds, setProcessingIds] = useState([]);

  // Mock event data - Replace with actual API call or props
  const event = {
    id: 1,
    title: 'TechFest 2025 - AI/ML Hackathon',
    date: 'October 25-27, 2025',
    location: 'IIT Kanpur'
  };

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    setIsLoading(true);
    try {
      const data = await mockAPI.fetchParticipants(event.id);
      setParticipants(data);
    } catch (error) {
      setToast({ message: 'Failed to load participants', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (registrationId, newStatus) => {
    setProcessingIds([...processingIds, registrationId]);
    try {
      const result = await mockAPI.updateRegistrationStatus(registrationId, newStatus);
      if (result.success) {
        setParticipants(participants.map(p => 
          p.id === registrationId ? { ...p, status: newStatus } : p
        ));
        setToast({ 
          message: `Registration ${newStatus} successfully!`, 
          type: 'success' 
        });
      }
    } catch (error) {
      setToast({ message: 'Action failed. Please try again.', type: 'error' });
    } finally {
      setProcessingIds(processingIds.filter(id => id !== registrationId));
    }
  };

  const getStatusBadge = (status) => {
    const configs = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'Pending' },
      approved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Rejected' }
    };
    const config = configs[status];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-4 h-4 mr-1" />
        {config.label}
      </span>
    );
  };

  const filteredParticipants = participants.filter(p => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.college.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: participants.length,
    pending: participants.filter(p => p.status === 'pending').length,
    approved: participants.filter(p => p.status === 'approved').length,
    rejected: participants.filter(p => p.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
            <p className="text-gray-600">Manage participant registrations</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Registrations</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-xl shadow-sm border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-900">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 mb-1">Rejected</p>
                <p className="text-3xl font-bold text-red-900">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'pending', 'approved', 'rejected'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Participants Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="ml-3 text-gray-600 text-lg">Loading participants...</span>
            </div>
          ) : filteredParticipants.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm || filterStatus !== 'all' 
                  ? 'No participants found' 
                  : 'No students have registered yet'}
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Registrations will appear here once students sign up'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      College
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredParticipants.map((participant) => {
                    const isProcessing = processingIds.includes(participant.id);
                    return (
                      <tr key={participant.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                              <div className="text-sm text-gray-500">{participant.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {participant.college}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(participant.registrationDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(participant.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {participant.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStatusUpdate(participant.id, 'approved')}
                                disabled={isProcessing}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isProcessing ? (
                                  <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <Check className="w-4 h-4 mr-1" />
                                    Approve
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(participant.id, 'rejected')}
                                disabled={isProcessing}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isProcessing ? (
                                  <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <X className="w-4 h-4 mr-1" />
                                    Reject
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                          {participant.status !== 'pending' && (
                            <span className="text-gray-400">No actions available</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

