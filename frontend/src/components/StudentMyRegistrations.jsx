import React from 'react';
import { Calendar, MapPin, Users, CheckCircle, Clock, XCircle, Eye, ArrowRight, Download } from 'lucide-react';
import DownloadTicketButton from './eventForm/DownloadTicket';

const StudentMyRegistrations = ({ registrations, onViewDetails }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-50 border-green-200 text-green-700';
      case 'pending': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'rejected': return 'bg-red-50 border-red-200 text-red-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const stats = {
    total: registrations.length,
    approved: registrations.filter(r => r.registrationStatus === 'approved').length,
    pending: registrations.filter(r => r.registrationStatus === 'pending').length,
    rejected: registrations.filter(r => r.registrationStatus === 'rejected').length,
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium mb-1">Total</p>
              <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-700">{stats.approved}</p>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-200 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl shadow-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-700">{stats.rejected}</p>
            </div>
            <div className="w-12 h-12 bg-red-200 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Registrations List */}
      <div className="space-y-6">
        {registrations.map((event) => (
          <div
            key={event.id}
            className={`bg-white rounded-2xl shadow-lg border-2 ${getStatusColor(event.registrationStatus)} p-8 hover:shadow-xl transition-all duration-300 group`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  {getStatusIcon(event.registrationStatus)}
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold">{new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">College</p>
                      <p className="font-semibold">{event.college}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(event.registrationStatus)}`}>
                    {event.registrationStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="ml-6 flex flex-col gap-3">
                {/* Download Ticket Button for Approved Registrations */}
                {event.registrationStatus === 'approved' && event.registrationId && (
                  <button
                    onClick={() => {
                      // Create a mini version of download button for inline use
                      const registrationId = event.registrationId;
                      const token = localStorage.getItem('token');
                      
                      if (!token) {
                        alert('Please login to download your ticket');
                        return;
                      }

                      // Download ticket
                      fetch(`http://localhost:4000/api/tickets/${registrationId}`, {
                        method: 'GET',
                        headers: {
                          'Authorization': `Bearer ${token}`,
                        },
                      })
                      .then(response => {
                        if (!response.ok) {
                          throw new Error('Failed to download ticket');
                        }
                        return response.blob();
                      })
                      .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `ticket-${registrationId}.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                      })
                      .catch(error => {
                        console.error('Error downloading ticket:', error);
                        alert('Failed to download ticket. Please try again.');
                      });
                    }}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 group-hover:scale-105 shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    <span className="font-semibold">Download Ticket</span>
                  </button>
                )}
                
                {/* View Details Button */}
                <button
                  onClick={() => onViewDetails(event)}
                  className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 group-hover:scale-105 shadow-lg"
                >
                  <Eye className="w-5 h-5" />
                  <span className="font-semibold">View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentMyRegistrations;

