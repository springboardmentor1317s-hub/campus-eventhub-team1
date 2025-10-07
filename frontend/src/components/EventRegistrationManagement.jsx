import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, Clock, Users, ArrowLeft, Download } from 'lucide-react';

import { Link } from "react-router-dom";

/**
 * Detailed view for managing registrations of a single event.
 * Matches the requested UI exactly.
 * @param {object} props
 * @param {string} props.eventTitle - The title of the event being viewed.
 * @param {function} props.onBack - Function to return to the previous view (event list).
 */
const EventRegistrations = ({ eventTitle, onBack }) => {
  // --- MOCK DATA ---
  // In a real application, this data would be fetched from an API using the eventId.
  const mockRegistrationData = [
    { _id: 'reg1', student: { name: 'Rahul Kumar', email: 'rahul@college.edu' }, college: 'IIT Kanpur', registration_date: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'Pending' },
    { _id: 'reg2', student: { name: 'Priya Sharma', email: 'priya@college.edu' }, college: 'BHU Varanasi', registration_date: new Date(Date.now() - 86400000 * 4).toISOString(), status: 'Approved' },
   
  ];
  // --- END MOCK DATA ---

  const [registrations, setRegistrations] = useState(mockRegistrationData);
  const [loading, setLoading] = useState(false); // Set to false since we use static mock data
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All'); // Current filter: All, Pending, Approved, Rejected

  // Function to handle local status update for UI demonstration
  const handleStatusUpdate = (registrationId, newStatus) => {
    setRegistrations(regs => regs.map(reg =>
      reg._id === registrationId ? { ...reg, status: newStatus } : reg
    ));
    // NOTE: Add your API call here to persist the change to the backend.
  };
  
  // Helper to determine badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-700 bg-green-100 border-green-200';
      case 'Pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Rejected': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  // Filter and search logic
  const filteredRegistrations = registrations.filter(reg => {
    const matchesFilter = filter === 'All' || reg.status === filter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = reg.student.name.toLowerCase().includes(searchLower) ||
                          reg.student.email.toLowerCase().includes(searchLower) ||
                          reg.college.toLowerCase().includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  // Calculate stats for the cards
  const total = registrations.length;
  const pending = registrations.filter(r => r.status === 'Pending').length;
  const approved = registrations.filter(r => r.status === 'Approved').length;
  const rejected = registrations.filter(r => r.status === 'Rejected').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      
      {/* Header and Back Button (Matches Top Left Corner) */}
     

      {/* Registration Stats Cards (Matches Image) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        
        {/* Total Registrations Card */}
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Registrations</p>
            <p className="text-2xl font-bold text-gray-900">{total}</p>
          </div>
          <Users className="w-8 h-8 text-blue-500" />
        </div>

        {/* Pending Card (Clickable to Filter) */}
        <div 
          className={`p-4 rounded-xl shadow-md border cursor-pointer transition-all ${filter === 'Pending' ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-200'}`}
          onClick={() => setFilter(filter === 'Pending' ? 'All' : 'Pending')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-700">{pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        {/* Approved Card (Clickable to Filter) */}
        <div 
          className={`p-4 rounded-xl shadow-md border cursor-pointer transition-all ${filter === 'Approved' ? 'bg-green-100 border-green-400' : 'bg-white border-gray-200'}`}
          onClick={() => setFilter(filter === 'Approved' ? 'All' : 'Approved')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm">Approved</p>
              <p className="text-2xl font-bold text-green-700">{approved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        {/* Rejected Card (Clickable to Filter) */}
        <div 
          className={`p-4 rounded-xl shadow-md border cursor-pointer transition-all ${filter === 'Rejected' ? 'bg-red-100 border-red-400' : 'bg-white border-gray-200'}`}
          onClick={() => setFilter(filter === 'Rejected' ? 'All' : 'Rejected')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm">Rejected</p>
              <p className="text-2xl font-bold text-red-700">{rejected}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>
      
      {/* Search, Filters, and Export Button (Matches Image) */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex space-x-2 overflow-x-auto p-1">
            {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === status
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          
        
        </div>
      </div>

      {/* Registration Table (Matches Image) */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        {loading ? (
          <div className="text-center p-10 text-gray-500">Loading registrations...</div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center p-10 text-gray-500">No registrations found matching your criteria.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STUDENT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COLLEGE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">REGISTRATION DATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.map((reg) => (
                <tr key={reg._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* Avatar Placeholder */}
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {reg.student.name[0]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{reg.student.name}</div>
                        <div className="text-sm text-gray-500">{reg.student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{reg.college}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(reg.registration_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(reg.status)}`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {reg.status === 'Pending' ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(reg._id, 'Approved')}
                          className="px-3 py-1 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" /> Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(reg._id, 'Rejected')}
                          className="px-3 py-1 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center"
                        >
                          <XCircle className="w-3 h-3 mr-1" /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">Actioned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EventRegistrations;
