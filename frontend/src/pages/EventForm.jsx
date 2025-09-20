import React, { useState, useEffect } from 'react';

const EventCreationForm = () => {
    // State for all form fields
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        start_date: '',
        end_date: '',
        image: null,
    });

    // State for the image preview URL
    const [imagePreview, setImagePreview] = useState('');
    
    // State for success/error messages
    const [message, setMessage] = useState({ text: '', type: 'info' });
    
    // State to manage input validation errors
    const [errors, setErrors] = useState({});

    // A single handler to update form data state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler for the file input to create a preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            
            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({ ...prev, image: null }));
            setImagePreview('');
        }
    };
    
    // Clear message after a delay
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: '', type: 'info' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = {};
        
        // --- Validation ---
        if (!formData.title.trim()) formErrors.title = true;
        if (!formData.description.trim()) formErrors.description = true;
        if (!formData.category) formErrors.category = true;
        if (!formData.location.trim()) formErrors.location = true;
        if (!formData.start_date) formErrors.start_date = true;
        if (!formData.end_date) formErrors.end_date = true;

        if (formData.start_date && formData.end_date && new Date(formData.end_date) <= new Date(formData.start_date)) {
            formErrors.end_date = true;
            setMessage({ text: 'The end date must be after the start date.', type: 'error' });
            setErrors(formErrors);
            return;
        }
        
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            setMessage({ text: 'Please fill out all required fields.', type: 'error' });
            return;
        }

        // --- Process Form Data ---
        // In a real application, you'd send this to a server.
        const dataToSubmit = new FormData();
        for (const key in formData) {
            dataToSubmit.append(key, formData[key]);
        }

        console.log('Form Submitted!');
        for (let [key, value] of dataToSubmit.entries()) {
            console.log(`${key}:`, value);
        }
        
        setMessage({ text: 'Event created successfully!', type: 'success' });
        
        // Reset form and preview
        e.target.reset();
        setFormData({
            title: '', description: '', category: '', location: '',
            start_date: '', end_date: '', image: null,
        });
        setImagePreview('');
        setErrors({});
    };

    const getMessageClass = () => {
        if (message.type === 'success') return 'text-green-600';
        if (message.type === 'error') return 'text-red-600';
        return '';
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 antialiased flex items-center justify-center p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Event</h1>
                    <p className="text-gray-600">Fill out the details below to get started.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-6">
                        {/* Event Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Annual Tech Summit 2025" required
                                   className={`form-input w-full bg-gray-50 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`} />
                        </div>

                        {/* Event Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Provide a detailed description of your event..." required
                                      className={`form-input w-full bg-gray-50 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`}></textarea>
                        </div>

                        {/* Category & Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select id="category" name="category" value={formData.category} onChange={handleChange} required
                                        className={`form-input w-full bg-gray-50 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`}>
                                    <option value="">Select a Category</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Hackathon">Hackathon</option>
                                    <option value="Cultural">Cultural Fest</option>
                                    <option value="Sports">Sports</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Kanpur " required
                                       className={`form-input w-full bg-gray-50 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`} />
                            </div>
                        </div>

                        {/* Start & End Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">Starts On</label>
                                <input type="datetime-local" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} required
                                       className={`form-input w-full bg-gray-50 border ${errors.start_date ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`} />
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">Ends On</label>
                                <input type="datetime-local" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} required
                                       className={`form-input w-full bg-gray-50 border ${errors.end_date ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50`} />
                            </div>
                        </div>
                        
                        {/* File Input for Banner Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Event Banner</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label htmlFor="image" className="relative cursor-pointer font-semibold text-blue-600 hover:text-blue-500">
                                            <span>Upload a file</span>
                                            <input id="image" name="image" type="file" onChange={handleImageChange} className="sr-only" accept="image/png, image/jpeg, image/webp" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Banner Preview</label>
                                <img src={imagePreview} alt="Image Preview" className="w-full h-auto rounded-lg object-cover max-h-64" />
                            </div>
                        )}

                        {/* Submission Button */}
                        <div className="pt-4">
                            <button type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Create Event
                            </button>
                        </div>
                    </div>
                </form>
                
                {/* Message area for feedback */}
                {message.text && (
                    <div className={`mt-6 text-center text-sm font-medium ${getMessageClass()}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCreationForm;

