import React, { useState, useEffect } from 'react';

// A simple, reusable input field component for the form
const FormInput = ({ id, name, label, value, onChange, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
            {label}
        </label>
        <input
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            {...props}
            className="w-full rounded-xl border border-[rgba(255,255,255,0.2)] bg-white/10 p-4 text-base font-normal leading-normal text-gray-100 backdrop-blur-sm focus:border-[#6366F1] focus:bg-white/20 focus:ring-2 focus:ring-[#6366F1] focus:ring-opacity-50"
        />
    </div>
);

// Main Student Registration Component
export  const SRegister = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        college: '',
        course: '',
        yearOfStudy: ''
    });
    const [progress, setProgress] = useState(0);

    // Effect to calculate form completion for the progress bar
    useEffect(() => {
        const totalFields = Object.keys(formData).length;
        const filledFields = Object.values(formData).filter(value => value !== '').length;
        setProgress((filledFields / totalFields) * 100);
    }, [formData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Form data submitted:", formData);
        alert("Account creation initiated. Check the console for details.");
    };

    return (
        <div className="bg-gray-900 text-gray-100 font-['Poppins',_sans-serif]">
            <div className="relative min-h-screen">
                <div className="relative z-10 flex h-full grow flex-col">
                    <header className="sticky top-0 z-20 w-full bg-gray-900/50 backdrop-blur-lg">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex h-20 items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl text-[#6366F1]">
                                        <svg className="h-10 w-10" fill="none" viewBox="0 0 48 48"><path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path></svg>
                                    </div>
                                    <h1 className="text-2xl font-bold tracking-tight text-white">CampusEventHub</h1>
                                </div>
                                <div className="flex items-center gap-4">
                                    <a className="rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10" href="#">Log In</a>
                                    <a className="hidden rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 sm:block" href="#">Admin Login</a>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className="flex flex-1 items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-5xl space-y-10">
                            <div className="text-center">
                                <h2 className="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl md:text-6xl">
                                    <span className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">Join the Future</span> of Campus Life
                                </h2>
                                <p className="mt-6 text-lg text-gray-300">Unlock a world of events and connect with your university community.</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-gray-800/20 p-8 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-12">
                                <div className="mb-10">
                                    <div className="flex justify-between mb-2">
                                        <p className="text-sm font-medium text-gray-300">Registration Progress</p>
                                        <p className="text-sm font-bold text-white">{Math.round(progress)}%</p>
                                    </div>
                                    <div className="h-2.5 w-full rounded-full bg-white/20">
                                        <div className="h-2.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899]" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <FormInput id="studentId" name="studentId" label="Student ID" type="text" value={formData.studentId} onChange={handleChange} required />
                                    <FormInput id="fullName" name="fullName" label="Full Name" type="text" value={formData.fullName} onChange={handleChange} required />
                                    <FormInput id="email" name="email" label="University Email" type="email" value={formData.email} onChange={handleChange} required />
                                    <FormInput id="phoneNumber" name="phoneNumber" label="Phone Number" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
                                    <FormInput id="password" name="password" label="Create a strong password" type="password" value={formData.password} onChange={handleChange} required />
                                    <FormInput id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} required />
                                    <FormInput id="college" name="college" label="College / University" type="text" value={formData.college} onChange={handleChange} required />
                                    <FormInput id="course" name="course" label="Course / Major" type="text" value={formData.course} onChange={handleChange} required />
                                    
                                    <div>
                                        <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-300 mb-2">Year of Study</label>
                                        <select id="year-of-study" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} required className="w-full rounded-xl border border-[rgba(255,255,255,0.2)] bg-white/10 p-4 text-base font-normal leading-normal text-gray-100 backdrop-blur-sm focus:border-[#6366F1] focus:bg-white/20 focus:ring-2 focus:ring-[#6366F1] focus:ring-opacity-50">
                                            <option className="bg-gray-800" value="">Select your year</option>
                                            <option className="bg-gray-800" value="1">Freshman (1st Year)</option>
                                            <option className="bg-gray-800" value="2">Sophomore (2nd Year)</option>
                                            <option className="bg-gray-800" value="3">Junior (3rd Year)</option>
                                            <option className="bg-gray-800" value="4">Senior (4th Year)</option>
                                            <option className="bg-gray-800" value="5">Graduate Student</option>
                                        </select>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-3">Profile Photo (Optional)</label>
                                        <div className="mt-1 flex items-center gap-5">
                                            <span className="inline-block h-20 w-20 overflow-hidden rounded-full bg-white/10">
                                                <svg className="h-full w-full text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                            </span>
                                            <label htmlFor="file-upload" className="cursor-pointer rounded-xl border border-[rgba(255,255,255,0.2)] bg-white/10 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-white/20 focus-within:outline-none focus-within:ring-2 focus-within:ring-[#6366F1] focus-within:ring-offset-2 focus-within:ring-offset-gray-900">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="sm:col-span-2 pt-6">
                                        <button type="submit" className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6366F1] to-[#EC4899] px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/50">
                                            Create Account
                                        </button>
                                    </div>

                                    <div className="sm:col-span-2 text-center">
                                        <p className="text-sm text-gray-300">
                                            Already have an account? <a className="font-medium text-[#6366F1] hover:text-indigo-400" href="#">Log in here</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
