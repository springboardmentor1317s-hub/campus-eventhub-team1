import React, { useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileSettings = ({ currentUser, logout, token, onBack }) => {
    const { updateUserProfile } = useAuth();
    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleUpdate = async () => {
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch('http://localhost:4000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to update profile');

            // Update context
            updateUserProfile({ name, email });

            setMessage('Profile updated successfully!');

            setTimeout(() => {
                if (onBack) onBack();
            }, 2000);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Edit Profile</h2>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-blue-600 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                )}
            </div>

            {message && <p className="text-green-600 mb-3">{message}</p>}
            {error && (
                <p className="text-red-600 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> {error}
                </p>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg font-medium text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 cursor-pointer hover:bg-blue-700'
                            }`}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
