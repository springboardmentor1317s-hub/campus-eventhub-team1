import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, Users, DollarSign, Star, X, Check, 
  CheckCircle, XCircle, AlertCircle, Building, Tag, Loader, ArrowLeft,
  Share2, Bookmark
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ReviewSection from '../ReviewSection';
import { API_BASE_URL } from '../../config/api';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? XCircle : AlertCircle;

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 z-50 animate-fadeIn`}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 hover:bg-white/20 rounded-full p-1 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Registration Confirmation Modal
const RegistrationModal = ({ event, onConfirm, onCancel, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl transform transition-all">
        <button
          onClick={onCancel}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Registration</h2>
          <p className="text-gray-600">Review the details before registering</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm">
              <Tag className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Event</p>
              <p className="font-bold text-gray-900 truncate">{event.title}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-semibold text-gray-900 text-sm truncate">{event.location}</p>
              </div>
            </div>
          </div>
          
          {event.price > 0 && (
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Registration Fee</span>
                <span className="text-2xl font-bold text-blue-600">₹{event.price}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                Confirm & Register
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Event Details Page with Registration
export const EventRegistrationPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState('not_registered');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [toast, setToast] = useState(null);
  const ASSETS_BASE_URL = API_BASE_URL.replace('/api', '');

  useEffect(() => {
    // Check for payment status from URL query params
    const query = new URLSearchParams(window.location.search);
    if (query.get('payment_success')) {
      const sessionId = query.get('session_id');
      
      if (sessionId) {
        setToast({ message: "Payment successful! Verifying registration...", type: 'success' });
        
        // Clean up URL first
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Verify payment and create/update registration
        verifyPaymentRegistration(sessionId);
      } else {
        setToast({ message: "Payment completed but verification failed. Please contact support.", type: 'error' });
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    if (query.get('payment_cancelled')) {
      setToast({ message: "Payment was cancelled. You can try again.", type: 'error' });
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    fetchEventDetails();
    if (currentUser?.id) {
      checkRegistrationStatus();
    }
  }, [eventId, currentUser]);

  const fetchEventDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
      const data = await response.json();
      if (data.success) {
        setEvent(data.data.event);
      } else {
        throw new Error(data.error || 'Failed to fetch event details');
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      setToast({ message: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const checkRegistrationStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/events/${eventId}/registration/status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const status = data.data.status || 'not_registered';
          setRegistrationStatus(status);
        }
      }
    } catch (error) {
      console.error('Error checking registration status:', error);
    }
  };

  const handleRegisterClick = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: `/event-register/${eventId}` } });
      return;
    }
    setShowModal(true);
  };

  const handleConfirmRegistration = async () => {
    setIsRegistering(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        // If paid event, redirect to Stripe Checkout
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
          return;
        }
        // Free event flow
        setRegistrationStatus('pending');
        setShowModal(false);
        setToast({ message: 'Registration submitted successfully!', type: 'success' });
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      setToast({ message: error.message || 'Registration failed. Please try again.', type: 'error' });
    } finally {
      setIsRegistering(false);
    }
  };

  const verifyPaymentRegistration = async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setToast({ message: "Please log in to complete registration.", type: 'error' });
        return;
      }

      const response = await fetch(`${API_BASE_URL}/events/verify-payment-registration`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRegistrationStatus('pending');
          setToast({ 
            message: "Payment successful! Your registration is now pending admin approval.", 
            type: 'success' 
          });
          
          // Force refresh the registration status after a short delay
          setTimeout(() => {
            checkRegistrationStatus();
          }, 1000);
        }
      } else {
        const errorData = await response.json();
        console.error('Payment verification failed:', errorData);
        setToast({ 
          message: "Payment verification failed. Please contact support.", 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Error verifying payment registration:', error);
      setToast({ 
        message: "Error verifying payment. Please contact support.", 
        type: 'error' 
      });
    }
  };

  const getButtonConfig = () => {
    switch (registrationStatus) {
      case 'not_registered':
        return {
          text: 'Register Now',
          className: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl',
          icon: Check,
          disabled: false,
          onClick: handleRegisterClick
        };
      case 'pending':
        return {
          text: 'Registration Pending',
          className: 'bg-yellow-500 text-white cursor-not-allowed',
          icon: Clock,
          disabled: true,
          onClick: null
        };
      case 'approved':
        return {
          text: 'Registration Approved',
          className: 'bg-green-500 text-white cursor-not-allowed',
          icon: CheckCircle,
          disabled: true,
          onClick: null
        };
      case 'rejected':
        return {
          text: 'Registration Declined',
          className: 'bg-red-500 text-white cursor-not-allowed',
          icon: XCircle,
          disabled: true,
          onClick: null
        };
      default:
        return {
          text: 'Register Now',
          className: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl',
          icon: Check,
          disabled: false,
          onClick: handleRegisterClick
        };
    }
  };

  if (isLoading || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  const buttonConfig = getButtonConfig();
  const ButtonIcon = buttonConfig.icon;
  const isFull = event.current_registrations >= event.registration_limit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      {/* Navigation Bar - Matching your app's style */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <a href="/" className="flex items-center group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    CampusEventHub
                  </span>
                  <div className="text-xs text-gray-500 -mt-1">Connect • Discover • Engage</div>
                </div>
              </a>
            </div>

            {/* Back Button */}
            <button
              onClick={() => {
                // Check if user is logged in and determine their role
                if (currentUser) {
                  if (currentUser.role === 'student') {
                    // Navigate to student dashboard with browse tab active
                    navigate('/student/dashboard', { state: { activeTab: 'browse' } });
                  } else if (currentUser.role === 'college_admin' || currentUser.role === 'super_admin') {
                    // Navigate to admin dashboard
                    navigate('/admin/dashboard');
                  } else {
                    // Fallback to previous page
                    navigate(-1);
                  }
                } else {
                  // For non-logged in users, go to login page
                  navigate('/login');
                }
              }}
              className="flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Back to Events</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <div className="relative aspect-[16/9] group">
                <img 
                  src={event.image ? `${ASSETS_BASE_URL}${event.image}` : 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop'}
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded-full shadow-lg capitalize">
                    {event.category}
                  </span>
                </div>

              

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">{event.title}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-white/90">
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <Building className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{event.college_name}</span>
                    </div>
                    {event.rating && (
                      <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{event.rating.average || 0}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mr-3"></div>
                About This Event
              </h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Event Details Grid */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mr-3"></div>
                Event Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start p-4 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium mb-1">Date</p>
                    <p className="font-bold text-gray-900">
                      {new Date(event.start_date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                    {event.end_date !== event.start_date && (
                      <p className="text-sm text-gray-600">
                        to {new Date(event.end_date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start p-4 bg-purple-50 rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium mb-1">Time</p>
                    <p className="font-bold text-gray-900">
                      {new Date(event.start_date).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium mb-1">Location</p>
                    <p className="font-bold text-gray-900 truncate">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-orange-50 rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm flex-shrink-0">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1">Capacity</p>
                    <p className="font-bold text-gray-900">
                      {event.current_registrations} / {event.registration_limit} registered
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((event.current_registrations / event.registration_limit) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl border border-gray-100 sticky top-24">
              {/* Price Section */}
              <div className="text-center mb-6">
                <p className="text-gray-500 mb-2 font-medium text-sm">Registration Fee</p>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {event.price > 0 ? `₹${event.price}` : 'Free'}
                </div>
              </div>

              {/* Registration Button */}
              <button
                onClick={buttonConfig.onClick}
                disabled={buttonConfig.disabled || isFull}
                className={`w-full py-4 px-6 rounded-lg font-bold text-base transition-all transform hover:scale-105 flex items-center justify-center mb-6 ${
                  isFull 
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                    : buttonConfig.className
                }`}
              >
                <ButtonIcon className="w-5 h-5 mr-2" />
                {isFull ? 'Event Full' : buttonConfig.text}
              </button>

              {/* Status Messages */}
              {registrationStatus === 'pending' && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-yellow-900 text-sm mb-1">Pending Approval</p>
                      <p className="text-xs text-yellow-700">
                        Your registration is under review. You'll receive an email notification once approved.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {registrationStatus === 'approved' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-green-900 text-sm mb-1">You're Registered!</p>
                      <p className="text-xs text-green-700">
                        Your spot is confirmed. Check your email for event updates and details.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium text-sm">Available Spots</span>
                  <span className="text-xl font-bold text-gray-900">
                    {event.registration_limit - event.current_registrations}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium text-sm">Total Capacity</span>
                  <span className="text-xl font-bold text-gray-900">
                    {event.registration_limit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Reviews Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mr-3"></div>
            What Students Are Saying
          </h2>
          <ReviewSection 
            eventId={eventId} 
            currentUserId={currentUser?.id}
            showForm={true}
          />
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <RegistrationModal
          event={event}
          onConfirm={handleConfirmRegistration}
          onCancel={() => setShowModal(false)}
          isLoading={isRegistering}
        />
      )}
    </div>
  );
};