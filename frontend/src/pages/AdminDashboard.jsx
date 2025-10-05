import React, { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, BarChart3, Plus, Download, Eye, MessageSquare, Bell, User, LogOut, Settings, Filter, Search, CheckCircle, AlertCircle, XCircle, Clock, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ParticipantManagementPage } from '../components/Admin/ParticipantManagementPage';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(5);
  const [stats, setStats] = useState({
    totalEvents: 12,
    activeUsers: 1234,
    totalRegistrations: 245,
    avgParticipants: 28
  });

  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@college.edu", college: "Tech University", role: "student", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@arts.edu", college: "Arts College", role: "student", status: "active" },
    { id: 3, name: "Admin User", email: "admin@tech.edu", college: "Tech University", role: "college_admin", status: "active" }
  ]);

  // Mock admin logs
  const [adminLogs, setAdminLogs] = useState([
    { id: 1, action: "Created event: Tech Hackathon 2024", user: "Admin User", timestamp: "2024-01-15 10:30:00" },
    { id: 2, action: "Approved registration for Cultural Fest", user: "Admin User", timestamp: "2024-01-15 09:15:00" },
    { id: 3, action: "Updated event details: Basketball Championship", user: "Admin User", timestamp: "2024-01-14 16:45:00" }
  ]);

  // System health data
  const [systemHealth, setSystemHealth] = useState({
    serverStatus: "Healthy",
    database: "Connected", 
    apiResponse: "152ms",
    uptime: "99.9%"
  });

  // Mock data for events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "2025-10-25",
      status: "active",
      registrations: 45,
      maxParticipants: 100,
      category: "hackathon"
    },
    {
      id: 2,
      title: "Cultural Night 2025",
      date: "2025-11-10",
      status: "upcoming",
      registrations: 78,
      maxParticipants: 150,
      category: "cultural"
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Total Events</p>
            <p className="text-3xl font-bold">{stats.totalEvents}</p>
            <p className="text-blue-200 text-xs">+12% vs last month</p>
          </div>
          <Calendar className="w-8 h-8 text-blue-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Active Users</p>
            <p className="text-3xl font-bold">{stats.activeUsers}</p>
            <p className="text-green-200 text-xs">+8% vs last month</p>
          </div>
          <Users className="w-8 h-8 text-green-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Total Registrations</p>
            <p className="text-3xl font-bold">{stats.totalRegistrations}</p>
            <p className="text-purple-200 text-xs">+23% vs last month</p>
          </div>
          <TrendingUp className="w-8 h-8 text-purple-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Average Participants</p>
            <p className="text-3xl font-bold">{stats.avgParticipants}</p>
            <p className="text-orange-200 text-xs">+5% vs last month</p>
          </div>
          <BarChart3 className="w-8 h-8 text-orange-200" />
        </div>
      </div>
    </div>
  );

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
          {event.status.toUpperCase()}
        </span>
      </div>
      
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          <span>{event.registrations}/{event.maxParticipants} registered</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Eye className="w-4 h-4 inline mr-2" />
          View Details
        </button>
        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const SystemHealth = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        System Health
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Server Status</span>
          <span className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            {systemHealth.serverStatus}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Database</span>
          <span className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            {systemHealth.database}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">API Response</span>
          <span className="text-sm font-medium text-gray-800">{systemHealth.apiResponse}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Uptime</span>
          <span className="text-sm font-medium text-gray-800">{systemHealth.uptime}</span>
        </div>
      </div>
    </div>
  );

  const MiniCalendar = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Recent Events
      </h3>
      <div className="space-y-3">
        {events.slice(0, 3).map(event => (
          <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-sm text-gray-800">{event.title}</p>
              <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const navigate = useNavigate();
  const HandleEventCreation =()=>{
    navigate('/create-event')
  }





  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
              </div>
                <h1 className="text-2xl font-bold text-gray-900">CampusEventHub</h1>
                <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  Admin
                </span>
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
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{currentUser?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{currentUser?.role || 'College Admin'}</p>
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
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'user-management', name: 'User Management', icon: Users },
              { id: 'event-management', name: 'Event Management', icon: Calendar },
              { id: 'registrations', name: 'Registrations', icon: CheckCircle },
              { id: 'admin-logs', name: 'Admin Logs', icon: Settings }
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
        {/* Dashboard Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">Event Organizer Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your events and track performance</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button  onClick={HandleEventCreation} className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </button>
          </div>
        </div>

        {/* Stats Cards - Show on Overview */}
        {activeTab === 'overview' && <DashboardStats />}
        
        {/* User Management Tab */}
        {activeTab === 'user-management' && (
          <div>
            <div className="mb-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">User Management</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
              </div>
            </div>
          </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                  </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.college}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'college_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'college_admin' ? 'Admin' : 'Student'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-red-600 hover:text-red-900">Disable</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Event Management Tab */}
        {activeTab === 'event-management' && (
          <div>
            <div className="mb-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <span>Approve Pending</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    <span>Flagged Events</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
            </div>
          </div>
        </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map(event => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</div>
        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.registrations} participants</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                        <button className="text-red-600 hover:text-red-900">Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Registrations Tab Content */}
      {activeTab === 'registrations' && (
  <ParticipantManagementPage />
)}


        {/* Admin Logs Tab Content */}
        {activeTab === 'admin-logs' && (
          <div>
            <div className="mb-6 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-800">Admin Activity Logs</h3>
              <p className="text-gray-600 text-sm">Track all administrative actions and system changes</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {adminLogs.map(log => (
                  <div key={log.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                        <p className="text-sm text-gray-500">by {log.user}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{log.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Overview Tab - Main Dashboard */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Events */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Events</h3>
              <div className="space-y-4">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            {/* Sidebar - Quick Actions, Calendar & System Health */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium flex items-center justify-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Event
                  </button>
                  <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export Event Data
                  </button>
                  <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Registrations
                  </button>
                  <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Feedback
                  </button>
                </div>
              </div>

              {/* Recent Events Mini View */}
              <MiniCalendar />

              {/* System Health */}
              <SystemHealth />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;