import React, { useState } from 'react';

// SVG Icon Component
const LogoIcon = () => (
    <div className="size-8 text-blue-500">
        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
        </svg>
    </div>
);

// Main Login Component (Simplified)
export const SuLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password, rememberMe });
        alert(`Authenticating with ID: ${email}`);
    };

    return (
        <div className="bg-slate-900 text-white font-sans">
            <div className="relative flex size-full min-h-screen flex-col">
                <div className="flex h-full grow flex-col">
                    <header className="flex items-center justify-between whitespace-nowrap px-10 py-4 bg-transparent z-10">
                        <div className="flex items-center gap-3">
                            <LogoIcon />
                            <h1 className="text-xl font-bold tracking-tight">CampusEventHub</h1>
                        </div>
                        <nav className="flex items-center gap-4">
                            <a href="#" className="px-4 py-2 text-sm font-bold text-white rounded-md hover:bg-white/10 transition-colors">Login</a>
                            <a href="#" className="px-4 py-2 text-sm font-bold bg-white text-blue-600 rounded-md hover:bg-gray-200 transition-colors">Sign Up</a>
                        </nav>
                    </header>
                    <main className="flex flex-1 items-center justify-center py-12 z-10">
                        <div className="w-full max-w-md mx-auto p-8">
                            <div className="bg-slate-800 rounded-lg shadow-lg p-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold tracking-tight text-white">Super Admin Login</h2>
                                    <p className="text-gray-400 mt-2">Access your Super Admin dashboard.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email/ID Input */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                            Super Admin ID or Official Email
                                        </label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                person
                                            </span>
                                            <input
                                                id="email"
                                                name="email"
                                                type="text"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your ID or Email"
                                                className="block w-full rounded-md bg-slate-700 border-transparent py-3 pl-10 pr-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    {/* Password Input */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                lock
                                            </span>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                                className="block w-full rounded-md bg-slate-700 border-transparent py-3 pl-10 pr-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
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
                                                className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-gray-400">Remember me</label>
                                        </div>
                                        <div>
                                            <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 transition-colors"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                                <p className="mt-6 text-center text-sm text-gray-400">
                                    Don't have an account?{' '}
                                    <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                                        Contact support
                                    </a>
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};