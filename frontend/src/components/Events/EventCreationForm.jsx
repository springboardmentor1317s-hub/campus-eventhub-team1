import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Users, DollarSign, Tag, FileText, Image, 
  Plus, X, Save, Eye, ArrowLeft, ArrowRight, Upload, AlertCircle, CheckCircle, 
  Trophy, Code, Palette, BookOpen, Building, Star
} from 'lucide-react';

 export const EventCreationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    college_name: '',
    image: null,
    title: '',
    description: '',
    category: '',
    location: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    registration_limit: '',
    price: ''
  });

  const upColleges = [
    'Aligarh Muslim University (AMU), Aligarh',
    'Banaras Hindu University (BHU), Varanasi',
    'University of Allahabad, Prayagraj',
    'Lucknow University, Lucknow',
    'Jamia Millia Islamia, New Delhi',
    'Indian Institute of Technology (IIT) Kanpur',
    'Indian Institute of Technology (IIT) BHU Varanasi',
    'Indian Institute of Information Technology (IIIT) Allahabad',
    'Motilal Nehru National Institute of Technology (NIT) Allahabad',
    'Harcourt Butler Technical University (HBTU), Kanpur',
    'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow',
    'Integral University, Lucknow',
    'Amity University, Lucknow',
    'Amity University, Noida',
    'Sharda University, Greater Noida',
    'Gautam Buddha University, Greater Noida',
    'Jaypee Institute of Information Technology (JIIT), Noida',
    'Bennett University, Greater Noida',
    'Galgotias University, Greater Noida',
    'GL Bajaj Institute of Technology and Management, Greater Noida',
    'KIET Group of Institutions, Ghaziabad',
    'Ajay Kumar Garg Engineering College (AKGEC), Ghaziabad',
    'JSS Academy of Technical Education, Noida',
    'Delhi Technical Campus, Greater Noida',
    'Institute of Engineering and Technology (IET), Lucknow',
    'Kamla Nehru Institute of Technology (KNIT), Sultanpur',
    'Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur',
    'Bundelkhand University, Jhansi',
    'Chhatrapati Shahu Ji Maharaj University, Kanpur',
    'Deen Dayal Upadhyaya Gorakhpur University, Gorakhpur',
    'Mahatma Jyotiba Phule Rohilkhand University, Bareilly',
    'Veer Bahadur Singh Purvanchal University, Jaunpur',
    'Invertis University, Bareilly',
    'Mangalayatan University, Aligarh',
    'Monad University, Hapur',
    'Pranveer Singh Institute of Technology (PSIT), Kanpur',
    'United College of Engineering and Research (UCER), Prayagraj',
    'Hindustan College of Science and Technology, Farah',
    'Raj Kumar Goel Institute of Technology, Ghaziabad',
    'IMS Engineering College, Ghaziabad',
    'Krishna Institute of Engineering and Technology, Ghaziabad',
    'Babu Banarasi Das University, Lucknow',
    'Era University, Lucknow',
    'Goel Institute of Technology and Management, Lucknow',
    'Institute of Technology and Science (ITS), Ghaziabad',
    'Azad Institute of Engineering and Technology, Lucknow',
    'Maharana Pratap Engineering College, Kanpur',
    'Sam Higginbottom University of Agriculture, Prayagraj',
    'Other'
  ];

  const eventCategories = [
    { id: 'hackathon', name: 'Hackathon', icon: Code, color: 'bg-blue-100 text-blue-600' },
    { id: 'cultural', name: 'Cultural', icon: Palette, color: 'bg-purple-100 text-purple-600' },
    { id: 'sports', name: 'Sports', icon: Trophy, color: 'bg-green-100 text-green-600' },
    { id: 'workshop', name: 'Workshop', icon: BookOpen, color: 'bg-orange-100 text-orange-600' },
    { id: 'seminar', name: 'Seminar', icon: Users, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'competition', name: 'Competition', icon: Trophy, color: 'bg-red-100 text-red-600' }
  ];

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Event details and category' },
    { number: 2, title: 'Schedule', description: 'Dates and timing' },
    { number: 3, title: 'Registration', description: 'Limits and pricing' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleInputChange('image', file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Event created:', formData);
      setIsSubmitting(false);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              currentStep >= step.number 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : step.number}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-600'}`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const BasicInfoStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">College Name *</label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={formData.college_name}
            onChange={(e) => handleInputChange('college_name', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            required
          >
            <option value="">Select your college</option>
            {upColleges.map((college, index) => (
              <option key={index} value={college}>
                {college}
              </option>
            ))}
          </select>
        </div>
        {formData.college_name === 'Other' && (
          <div className="mt-3">
            <input
              type="text"
              placeholder="Enter your college name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleInputChange('college_name', e.target.value)}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter event title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Provide a detailed description of your event..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Category *</label>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            required
          >
            <option value="">Select event category</option>
            {eventCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter event location (e.g., Auditorium, Main Campus, Delhi)"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drop your image here, or <span className="text-blue-600 hover:text-blue-700">browse</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
          </label>
          {formData.image && (
            <p className="mt-2 text-sm text-green-600">✓ {formData.image.name}</p>
          )}
        </div>
      </div>
    </div>
  );

  const ScheduleStep = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => handleInputChange('start_date', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => handleInputChange('end_date', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="time"
              value={formData.start_time}
              onChange={(e) => handleInputChange('start_time', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="time"
              value={formData.end_time}
              onChange={(e) => handleInputChange('end_time', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const RegistrationStep = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Limit *</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={formData.registration_limit}
              onChange={(e) => handleInputChange('registration_limit', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Maximum participants"
              min="1"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Fee (₹)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0 for free event"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">Event Creation Note</h4>
            <p className="text-sm text-blue-700">
              After creating the event, the system will automatically track registrations, ratings, and feedback from participants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const EventPreview = () => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-4 left-6 text-white">
          <h2 className="text-3xl font-bold mb-2">{formData.title || 'Event Title'}</h2>
          <p className="text-blue-100">
            {formData.category && eventCategories.find(cat => cat.id === formData.category)?.name}
          </p>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
          {formData.price && formData.price > 0 ? `₹${formData.price}` : 'Free'}
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Building className="w-5 h-5 mr-3" />
              <span>{formData.college_name || 'College Name'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3" />
              <span>
                {formData.start_date ? new Date(formData.start_date).toLocaleDateString() : 'Start Date'} - 
                {formData.end_date ? new Date(formData.end_date).toLocaleDateString() : 'End Date'}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-3" />
              <span>{formData.start_time || 'Start Time'} - {formData.end_time || 'End Time'}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3" />
              <span>{formData.location || 'Event Location'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-3" />
              <span>Max {formData.registration_limit || '0'} participants</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Star className="w-5 h-5 mr-3" />
              <span>No ratings yet</span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Description</h3>
          <p className="text-gray-600">{formData.description || 'Event description will appear here...'}</p>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return <BasicInfoStep />;
      case 2: return <ScheduleStep />;
      case 3: return <RegistrationStep />;
      default: return <BasicInfoStep />;
    }
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setPreviewMode(false)}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Form
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Event...
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="w-5 h-5 mr-2" />
                  Create Event
                </div>
              )}
            </button>
          </div>
          <EventPreview />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
              <p className="text-gray-600">Fill in the details based on your event schema</p>
            </div>
            <button
              onClick={() => setPreviewMode(true)}
              className="flex items-center text-blue-600 hover:text-blue-700 border border-blue-200 px-4 py-2 rounded-lg"
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview
            </button>
          </div>
        </div>

        <StepIndicator />

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Step {currentStep}: {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>

          {renderCurrentStep()}

          <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            
            <div className="flex space-x-3">
              {currentStep === steps.length ? (
                <button
                  onClick={() => setPreviewMode(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Preview & Create
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

