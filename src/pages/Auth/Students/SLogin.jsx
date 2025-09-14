import React, { useState } from 'react';

// Main Login Component (Simplified)
export const SLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted:", { email, password });
        alert(`Logging in with: ${email}`);
    };

    return (
        // Main container with a simple, static background color
        <div className="bg-gray-900 text-white font-sans">
            <div className="flex flex-col min-h-screen">
                {/* Header Section */}
                <header className="absolute top-0 left-0 w-full z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-20 items-center justify-between">
                            <div className="flex items-center gap-4">
                                <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 48 48">
                                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C2.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
                                </svg>
                                <h1 className="text-xl font-bold text-white">CampusEventHub</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <a href="#" className="px-4 py-2 text-sm font-bold text-white rounded-md hover:bg-white/10 transition-colors">Login</a>
                                <a href="#" className="px-4 py-2 text-sm font-bold bg-white text-blue-600 rounded-md hover:bg-gray-200 transition-colors">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Form Section */}
                <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Student Login</h2>
                            <p className="mt-2 text-center text-sm text-gray-400">Access your CampusEventHub account</p>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            {/* Email/ID Input */}
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-1">
                                    Student ID, Enrollment or Email
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-end text-sm">
                                <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                                    Forgot your password?
                                </a>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="text-center text-sm text-gray-400">
                            <p>
                                Don't have an account?{' '}
                                <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};