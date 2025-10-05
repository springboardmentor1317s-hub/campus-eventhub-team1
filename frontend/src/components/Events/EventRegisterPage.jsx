import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, Users, DollarSign, Star, X, Check, 
  CheckCircle, XCircle, AlertCircle, Building, Tag, Loader
} from 'lucide-react';

// Mock API calls - Replace with actual API integration
const mockAPI = {
  checkRegistrationStatus: async (eventId, userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 'not_registered' });
      }, 500);
    });
  },
  
  registerForEvent: async (eventId, userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Registration successful!' });
      }, 1000);
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
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 z-50 animate-slide-in`}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 hover:bg-white/20 rounded-full p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Registration Confirmation Modal
const RegistrationModal = ({ event, onConfirm, onCancel, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Registration</h2>
          <p className="text-gray-600">Please review the event details before confirming</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
          <div className="flex items-start">
            <Tag className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Event Title</p>
              <p className="font-semibold text-gray-900">{event.title}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold text-gray-900">{event.date}</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">{event.location}</p>
            </div>
          </div>
          {event.price > 0 && (
            <div className="flex items-start">
              <DollarSign className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Registration Fee</p>
                <p className="font-semibold text-gray-900">₹{event.price}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                Confirm Registration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Event Details Page with Registration
export const EventRegisterPage = () => {
  const { eventId } = useParams();
  console.log('EventRegisterPage eventId param:', eventId);
  const [registrationStatus, setRegistrationStatus] = useState('not_registered');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [toast, setToast] = useState(null);

  // Mock event data - Replace with actual API call
  const event = {
    id: 1,
    title: 'TechFest 2025 - AI/ML Hackathon',
    college: 'IIT Kanpur',
    description: 'Join us for an exciting 48-hour hackathon focused on AI and Machine Learning. Build innovative solutions and compete for amazing prizes! This event brings together the brightest minds from colleges across India to collaborate, innovate, and push the boundaries of technology.',
    date: 'October 25-27, 2025',
    time: '9:00 AM - 6:00 PM',
    location: 'Tech Park, IIT Kanpur Campus',
    category: 'Hackathon',
    registrationLimit: 200,
    registered: 156,
    price: 500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    setIsLoading(true);
    const result = await mockAPI.checkRegistrationStatus(event.id, 'current-user-id');
    setRegistrationStatus(result.status);
    setIsLoading(false);
  };

  const handleRegisterClick = () => {
    setShowModal(true);
  };

  const handleConfirmRegistration = async () => {
    setIsRegistering(true);
    try {
      const result = await mockAPI.registerForEvent(event.id, 'current-user-id');
      if (result.success) {
        setRegistrationStatus('pending');
        setShowModal(false);
        setToast({ message: 'Registration submitted successfully!', type: 'success' });
      }
    } catch (error) {
      setToast({ message: 'Registration failed. Please try again.', type: 'error' });
    } finally {
      setIsRegistering(false);
    }
  };

  const getButtonConfig = () => {
    switch (registrationStatus) {
      case 'not_registered':
        return {
          text: 'Register Now',
          className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg',
          icon: Check,
          disabled: false,
          onClick: handleRegisterClick
        };
      case 'pending':
        return {
          text: 'Registration Pending',
          className: 'bg-yellow-100 text-yellow-700 cursor-not-allowed',
          icon: Clock,
          disabled: true,
          onClick: null
        };
      case 'approved':
        return {
          text: '✅ Approved',
          className: 'bg-green-100 text-green-700 cursor-not-allowed',
          icon: CheckCircle,
          disabled: true,
          onClick: null
        };
      case 'rejected':
        return {
          text: 'Not Approved',
          className: 'bg-red-100 text-red-700 cursor-not-allowed',
          icon: XCircle,
          disabled: true,
          onClick: null
        };
      default:
        return {
          text: 'Register Now',
          className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg',
          icon: Check,
          disabled: false,
          onClick: handleRegisterClick
        };
    }
  };

  const buttonConfig = getButtonConfig();
  const ButtonIcon = buttonConfig.icon;

  return (
    <div className="min-h-screen bg-gray-50">
     
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      {/* Header Image */}
      <div className="relative h-96 bg-gray-900">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                {event.category}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                {event.college}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                <span>{event.rating}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-1" />
                <span>{event.registered}/{event.registrationLimit} registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Event</h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-900">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Organized by</p>
                    <p className="font-medium text-gray-900">{event.college}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2">Registration Fee</p>
                <p className="text-3xl font-bold text-gray-900">
                  {event.price > 0 ? `₹${event.price}` : 'Free'}
                </p>
              </div>

              {isLoading ? (
                <button
                  disabled
                  className="w-full py-4 px-6 bg-gray-200 text-gray-500 rounded-xl font-semibold flex items-center justify-center"
                >
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Loading...
                </button>
              ) : (
                <button
                  onClick={buttonConfig.onClick}
                  disabled={buttonConfig.disabled}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center ${buttonConfig.className}`}
                >
                  <ButtonIcon className="w-5 h-5 mr-2" />
                  {buttonConfig.text}
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Spots Available</span>
                  <span className="font-semibold text-gray-900">
                    {event.registrationLimit - event.registered}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Capacity</span>
                  <span className="font-semibold text-gray-900">
                    {event.registrationLimit}
                  </span>
                </div>
              </div>

              {registrationStatus === 'pending' && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Pending Approval</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Your registration is awaiting admin approval. You'll be notified once it's reviewed.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {registrationStatus === 'approved' && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Registration Confirmed!</p>
                      <p className="text-xs text-green-700 mt-1">
                        You're all set! Check your email for event details and updates.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
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

