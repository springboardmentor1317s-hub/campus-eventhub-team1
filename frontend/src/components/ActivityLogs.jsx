import React, { useState, useEffect } from 'react';
import { Activity, Clock, User, AlertCircle, RefreshCw, Filter } from 'lucide-react';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    recentActivity: 0,
    totalLogs: 0,
    actionCounts: []
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, [filter]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const queryParams = filter !== 'all' ? `?action=${filter}` : '';
      const response = await fetch(`http://localhost:4000/api/logs${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.logs) {
          setLogs(data.data.logs);
        }
      } else {
        console.error('Failed to fetch logs');
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logs/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setStats(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching log stats:', error);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'event_created':
      case 'event_updated':
      case 'event_deleted':
        return '📅';
      case 'registration_status_update':
        return '✅';
      case 'user_created':
      case 'user_updated':
      case 'user_deleted':
        return '👤';
      case 'login':
      case 'logout':
        return '🔐';
      default:
        return '📝';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'event_created':
      case 'user_created':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'event_deleted':
      case 'user_deleted':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'event_updated':
      case 'user_updated':
      case 'registration_status_update':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'login':
      case 'logout':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const formatActionName = (action) => {
    return action
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const actionFilters = [
    { value: 'all', label: 'All Activities' },
    { value: 'event_created', label: 'Events Created' },
    { value: 'event_deleted', label: 'Events Deleted' },
    { value: 'registration_status_update', label: 'Registration Updates' }
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Activity className="w-7 h-7 mr-2 text-blue-600" />
            Activity Logs
          </h2>
          <p className="text-gray-500 text-sm mt-1">Track all important system activities</p>
        </div>
        
        <button
          onClick={() => { fetchLogs(); fetchStats(); }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Recent Activity (24h)</p>
              <p className="text-2xl font-bold text-gray-900">{stats.recentActivity}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalLogs}</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Most Common Action</p>
              <p className="text-lg font-bold text-gray-900">
                {stats.actionCounts.length > 0 
                  ? formatActionName(stats.actionCounts[0]._id)
                  : 'N/A'
                }
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2 overflow-x-auto">
            {actionFilters.map(filterOption => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === filterOption.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        {loading ? (
          <div className="text-center p-10">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-4">Loading activity logs...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center p-10 text-gray-500">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p>No activity logs found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {logs.map((log) => (
              <div
                key={log._id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl border ${getActionColor(log.action)}`}>
                    {getActionIcon(log.action)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {log.description}
                        </p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getActionColor(log.action)}`}>
                            {formatActionName(log.action)}
                          </span>
                          {log.user_id && (
                            <span className="text-xs text-gray-500 flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {log.user_id.name}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>

                    {/* Details */}
                    {log.details && Object.keys(log.details).length > 0 && (
                      <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        {log.details.event_title && (
                          <div>Event: <span className="font-medium">{log.details.event_title}</span></div>
                        )}
                        {log.details.student_name && (
                          <div>Student: <span className="font-medium">{log.details.student_name}</span></div>
                        )}
                        {log.details.old_status && log.details.new_status && (
                          <div>Status: <span className="font-medium">{log.details.old_status}</span> → <span className="font-medium">{log.details.new_status}</span></div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;

