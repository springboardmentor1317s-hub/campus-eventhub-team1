import React, { useState } from 'react';

// Main Admin Login Component (Simplified)
export const ALogin = () => {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted:", { adminId, password, rememberMe });
        alert(`Authenticating Admin: ${adminId}`);
    };

    return (
        // Main container with a simple, static background color
        <div className="bg-slate-900 font-sans text-white">
            <div className="relative flex size-full min-h-screen flex-col">
                <div className="flex flex-col h-full grow z-10">
                    {/* Header Section */}
                    <header className="flex items-center justify-between whitespace-nowrap px-10 py-4">
                        <div className="flex items-center gap-3">
                            <svg className="h-8 w-8 text-sky-500" fill="currentColor" viewBox="0 0 48 48">
                                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
                            </svg>
                            <h2 className="text-xl font-bold tracking-tight">CampusEventHub</h2>
                        </div>
                    </header>

                    {/* Form Section */}
                    <main className="relative flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="relative w-full max-w-md space-y-8 rounded-xl bg-slate-800 p-10 shadow-lg">
                            <div>
                                <h2 className="text-center text-3xl font-extrabold text-white">Admin Log In</h2>
                                <p className="mt-2 text-center text-base text-slate-400">Access your dashboard</p>
                            </div>
                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                <div className="space-y-6 rounded-md">
                                    {/* Admin ID Input */}
                                    <div>
                                        <label htmlFor="admin-id" className="block text-sm font-medium text-slate-300 mb-2">
                                            Admin ID or Official Email
                                        </label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="material-symbols-outlined text-slate-500">badge</span>
                                            </span>
                                            <input
                                                id="admin-id"
                                                type="text"
                                                required
                                                value={adminId}
                                                onChange={(e) => setAdminId(e.target.value)}
                                                placeholder="Enter your ID or email"
                                                className="block w-full rounded-md border-slate-700 bg-slate-900/50 py-3 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                            />
                                        </div>
                                    </div>
                                    {/* Password Input */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="material-symbols-outlined text-slate-500">lock</span>
                                            </span>
                                            <input
                                                id="password"
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                                className="block w-full rounded-md border-slate-700 bg-slate-900/50 py-3 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-sky-500 focus:ring-sky-500"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-slate-400">Remember me</label>
                                    </div>
                                    <div>
                                        <a href="#" className="font-medium text-sky-500 hover:text-sky-400">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-3 px-4 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors"
                                    >
                                        Log In
                                    </button>
                                </div>

                                <div className="text-center text-sm text-slate-400">
                                    Don't have an account?{' '}
                                    <a href="#" className="font-medium text-sky-500 hover:text-sky-400">
                                        Sign up
                                    </a>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

