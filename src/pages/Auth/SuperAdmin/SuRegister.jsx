import React, { useState } from 'react';

// A simple, reusable input field component for the form
const FormInput = ({ id, name, label, value, onChange, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
            {label}
        </label>
        <input
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            {...props}
            className={`block w-full rounded-md border-gray-600 bg-slate-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${props.readOnly ? 'cursor-not-allowed bg-slate-600 text-gray-400' : ''}`}
        />
    </div>
);

// Main Super Admin Register Component (Simplified)
export const SuRegister = () => {
    const [formData, setFormData] = useState({
        superAdminId: '',
        fullName: '',
        email: '',
        mobileNumber: '',
        password: '',
        role: 'Super Admin'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registration submitted:", formData);
        alert(`Creating Super Admin account for: ${formData.fullName}`);
    };

    const formFields = [
        { name: "superAdminId", label: "Super Admin ID", placeholder: "SA-XXXX-XXXX", type: "text" },
        { name: "fullName", label: "Full Name", placeholder: "Enter Full Name", type: "text" },
        { name: "email", label: "Official Email ID", placeholder: "admin@campuseventhub.com", type: "email" },
        { name: "mobileNumber", label: "Mobile Number", placeholder: "Enter Mobile Number", type: "tel" },
        { name: "password", label: "Password", placeholder: "••••••••••••", type: "password" },
        { name: "role", label: "Role/Access Level", type: "text", readOnly: true },
    ];

    return (
        // Main container with a simple, static background
        <div className="text-gray-200 bg-slate-900 font-sans min-h-screen">
            <div className="relative flex min-h-screen flex-col">
                {/* Header Section */}
                <header className="absolute top-0 left-0 w-full z-10">
                    <div className="container mx-auto flex items-center justify-between p-6">
                        <div className="flex items-center gap-3 text-white">
                            <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 48 48">
                                <path d="M24 4c-4.42 0-8 3.58-8 8v4h16v-4c0-4.42-3.58-8-8-8zM12 20v18c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V20H12zm12 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                            </svg>
                            <h1 className="text-2xl font-bold tracking-wider">CampusEventHub</h1>
                        </div>
                    </div>
                </header>

                {/* Form Section */}
                <main className="flex-grow">
                    <div className="container mx-auto flex min-h-screen items-center justify-center py-12 px-4">
                        <div className="w-full max-w-xl space-y-8">
                            <div className="text-center">
                                <h2 className="text-4xl font-extrabold text-white">Super Admin Registration</h2>
                                <p className="mt-4 text-lg text-gray-400">Create a new super administrator account.</p>
                            </div>
                            <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {formFields.map((field) => (
                                        <FormInput
                                            key={field.name}
                                            id={field.name}
                                            name={field.name}
                                            label={field.label}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            required
                                            readOnly={field.readOnly}
                                        />
                                    ))}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 transition-colors"
                                        >
                                            Create Account
                                        </button>
                                    </div>
                                </form>
                                <p className="mt-8 text-center text-sm text-gray-400">
                                    Already have an account?{' '}
                                    <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                                        Authenticate Here
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};