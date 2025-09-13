import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Account created successfully as ${role.toUpperCase()} `);
    navigate("/"); // redirect to login page after signup
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Signup Container */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center mb-2">Create Your Account</h2>
          <p className="text-gray-500 text-center mb-6">
            Join CampusEventHub and start exploring events
          </p>

          {/* Signup Form */}
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="you@your.university.edu"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">College</label>
              <input
                type="text"
                placeholder="Enter your college"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          {/* Already have account */}
          <p className="text-center mt-4 text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm">
        © 2025 CampusEventHub. All rights reserved.
      </footer>
    </div>
  );
}
