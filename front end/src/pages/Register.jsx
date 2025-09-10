import React, { useState } from 'react';

 export const Register = () => {
  // State to hold all form data in a single object
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Default role
  });

  // A single handler to update state for all text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default page reload
    // Basic validation example
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // On successful submission, you would typically send the data to an API
    console.log('Form submitted with data:', formData);
    alert('Account creation request sent! Check the console for data.');
  };

  return (
    <div className="flex min-h-screen bg-[var(--background-color)]" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      {/* Left side: The Form */}
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 text-[var(--primary-color)]">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_6_535)">
                    <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_6_535"><rect fill="white" height="48" width="48"></rect></clipPath>
                  </defs>
                </svg>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--primary-text-color)]">Campus Connect</h1>
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--primary-text-color)]">Create your account</h2>
            <p className="mt-2 text-sm text-[var(--secondary-text-color)]">
              Already have an account?{' '}
              <a href="#" className="font-medium text-[var(--primary-color)] hover:text-red-500">
                Sign in
              </a>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-[var(--primary-text-color)]">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="full_name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="form-input block w-full appearance-none rounded-md border-0 bg-[var(--input-bg-color)] px-3 py-3 placeholder-[var(--input-placeholder-color)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 sm:text-sm text-[var(--primary-text-color)]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--primary-text-color)]">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input block w-full appearance-none rounded-md border-0 bg-[var(--input-bg-color)] px-3 py-3 placeholder-[var(--input-placeholder-color)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 sm:text-sm text-[var(--primary-text-color)]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-[var(--primary-text-color)]">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input block w-full appearance-none rounded-md border-0 bg-[var(--input-bg-color)] px-3 py-3 placeholder-[var(--input-placeholder-color)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 sm:text-sm text-[var(--primary-text-color)]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="confirm_password" className="block text-sm font-medium text-[var(--primary-text-color)]">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm_password"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input block w-full appearance-none rounded-md border-0 bg-[var(--input-bg-color)] px-3 py-3 placeholder-[var(--input-placeholder-color)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 sm:text-sm text-[var(--primary-text-color)]"
                    />
                  </div>
                </div>
                
                <fieldset>
                  <legend className="block text-sm font-medium text-[var(--primary-text-color)] mb-2">Register as:</legend>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        id="student"
                        name="role"
                        type="radio"
                        value="student"
                        checked={formData.role === 'student'}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <label htmlFor="student" className="flex flex-col items-center justify-center rounded-md border-2 border-[var(--input-bg-color)] bg-[var(--input-bg-color)] p-4 text-center cursor-pointer peer-checked:border-[var(--primary-color)] peer-checked:bg-red-50 hover:bg-red-50 transition-colors">
                        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">school</span>
                        <span className="mt-2 text-sm font-medium text-[var(--primary-text-color)]">Student</span>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="admin"
                        name="role"
                        type="radio"
                        value="admin"
                        checked={formData.role === 'admin'}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <label htmlFor="admin" className="flex flex-col items-center justify-center rounded-md border-2 border-[var(--input-bg-color)] bg-[var(--input-bg-color)] p-4 text-center cursor-pointer peer-checked:border-[var(--primary-color)] peer-checked:bg-red-50 hover:bg-red-50 transition-colors">
                        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">admin_panel_settings</span>
                        <span className="mt-2 text-sm font-medium text-[var(--primary-text-color)]">Admin</span>
                      </label>
                    </div>
                  </div>
                </fieldset>

                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-[var(--primary-color)] py-3 px-4 text-base font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2">
                    <span className="material-symbols-outlined mr-2">person_add</span>
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: The Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt="University campus with students"
        />
        <div className="absolute inset-0 bg-[var(--primary-color)] opacity-30"></div>
      </div>
    </div>
  );
};
