import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    college: "",
  });

  const [errors, setErrors] = useState({});

  function validateForm() {
    const e = {};
    if (!form.firstName) e.firstName = "First name is required";
    if (!form.lastName) e.lastName = "Last name is required";
    if (!form.email) e.email = "Email is required";
    if (!form.mobile) e.mobile = "Mobile number is required";
    if (!form.password) e.password = "Password is required";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!form.college) e.college = "College name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleRegisterSubmit(evt) {
    evt.preventDefault();
    if (!validateForm()) return;

    // TODO: Connect to backend API
    console.log("Registration Data:", form);
    alert("Account created successfully!");
  }

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <span className="text-purple-600 text-3xl mr-2">💡</span>
        <h1 className="text-2xl font-bold text-purple-700">CampusEventHub</h1>
      </div>
    
      {/* Registration Form */}
      <form
        onSubmit={handleRegisterSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* First Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">First Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.firstName ? "border-red-400" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Last Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.lastName ? "border-red-400" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email Id:</label>
          <input
            type="email"
            placeholder="info@xyz.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.email ? "border-red-400" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Mobile No:</label>
          <input
            type="text"
            placeholder="+91 - 0000 000 000"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.mobile ? "border-red-400" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Password:</label>
          <input
            type="password"
            placeholder="********"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.password ? "border-red-400" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Confirm Password:</label>
          <input
            type="password"
            placeholder="********"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.confirmPassword ? "border-red-400" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* College Name */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">College Name:</label>
          <input
            type="text"
            placeholder="Enter your college name"
            value={form.college}
            onChange={(e) => setForm({ ...form, college: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.college ? "border-red-400" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.college && <p className="text-red-500 text-sm mt-1">{errors.college}</p>}
        </div>

        {/* Submit & Sign In Link */}
        <div className="md:col-span-2 flex flex-col items-center space-y-4">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Create Account
          </button>
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>

  );
}
