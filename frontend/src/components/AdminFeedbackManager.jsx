import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Trash2,
  Star,
  MessageSquare,
  Calendar,
  User,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const API_BASE = "http://localhost:4000/api";

const AdminFeedbackManager = () => {
  const [activeTab, setActiveTab] = useState("feedback");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);

  const [feedbackData, setFeedbackData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);

  const [stats, setStats] = useState({
    totalFeedback: 0,
    unread: 0,
    pending: 0,
    resolved: 0,
    totalRatings: 0,
    averageRating: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Load data
  useEffect(() => {
    fetchFeedback();
    fetchRatings();
    fetchStats();
  }, []);

  // ----- FEEDBACK -----
  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${API_BASE}/feedback`);
      setFeedbackData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setError("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.patch(`${API_BASE}/feedback/${id}/status`, {
        status: newStatus,
      });
      setFeedbackData((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
      fetchStats();
    } catch (err) {
      console.error("Error updating feedback status:", err);
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      await axios.delete(`${API_BASE}/feedback/${id}`);
      setFeedbackData((prev) => prev.filter((item) => item._id !== id));
      fetchStats();
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  const handleBulkDeleteFeedback = async () => {
    try {
      await axios.post(`${API_BASE}/feedback/bulk-delete`, { ids: selectedItems });
      setFeedbackData((prev) => prev.filter((item) => !selectedItems.includes(item._id)));
      setSelectedItems([]);
      fetchStats();
    } catch (err) {
      console.error("Error bulk deleting feedback:", err);
    }
  };

  // ----- RATINGS -----
  const fetchRatings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/ratings`);
      setRatingsData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching ratings:", err);
      setError("Failed to load ratings");
    }
  };

  const handleDeleteRating = async (id) => {
    try {
      await axios.delete(`${API_BASE}/ratings/${id}`);
      setRatingsData((prev) => prev.filter((item) => item._id !== id));
      fetchStats();
    } catch (err) {
      console.error("Error deleting rating:", err);
    }
  };

  // ----- STATS -----
  const fetchStats = async () => {
    try {
      const [feedbackRes, ratingRes] = await Promise.all([
        axios.get(`${API_BASE}/feedback/stats`),
        axios.get(`${API_BASE}/ratings/stats`),
      ]);

      setStats({
        totalFeedback: feedbackRes.data.total || 0,
        unread: feedbackRes.data.unread || 0,
        pending: feedbackRes.data.pending || 0,
        resolved: feedbackRes.data.resolved || 0,
        totalRatings: ratingRes.data.totalRatings || 0,
        averageRating: ratingRes.data.averageRating || 0,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // ----- HELPERS -----
  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredFeedback = feedbackData.filter((item) => {
    const user = (item?.user || "").toLowerCase();
    const message = (item?.message || "").toLowerCase();
    const search = (searchQuery || "").toLowerCase();
    const matchesSearch = user.includes(search) || message.includes(search);
    const matchesFilter =
      filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredRatings = ratingsData.filter((item) => {
    const event = (item?.event || "").toLowerCase();
    const user = (item?.user || "").toLowerCase();
    const search = (searchQuery || "").toLowerCase();
    return event.includes(search) || user.includes(search);
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));

  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading dashboard...</div>;

  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  // ----- UI -----
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Organizer Dashboard</h1>
          <p className="text-gray-600">Manage user feedback and event ratings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Feedback</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFeedback}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Ratings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRatings}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("feedback")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "feedback"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Feedback Management
              </button>
              <button
                onClick={() => setActiveTab("ratings")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "ratings"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Event Ratings
              </button>
            </div>
          </div>

          {/* Filters + Search */}
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

              {activeTab === "feedback" && (
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
                  onClick={
                    activeTab === "feedback"
                      ? handleBulkDeleteFeedback
                      : () => {
                          selectedItems.forEach((id) => handleDeleteRating(id));
                          setSelectedItems([]);
                        }
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({selectedItems.length})
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {activeTab === "feedback" ? (
              <div className="space-y-4">
                {filteredFeedback.map((item) => (
                  <div key={item._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item._id)}
                        onChange={() => toggleSelection(item._id)}
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
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                              <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              item.status
                            )}`}
                          >
                            <option value="unread">Unread</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                        <p className="text-gray-700 mb-3">{item.message}</p>
                        <button
                          onClick={() => handleDeleteFeedback(item._id)}
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
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
                  <div key={item._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item._id)}
                        onChange={() => toggleSelection(item._id)}
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
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(item.rating)}
                            <span className="ml-2 font-semibold text-gray-900">{item.rating}.0</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{item.comment}</p>
                        <button
                          onClick={() => handleDeleteRating(item._id)}
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
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
