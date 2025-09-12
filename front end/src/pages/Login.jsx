import React, { useState } from "react";
import TapNav from "../components/Navbar";

export default function Login() {
  const [role, setRole] = useState("student");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login Successfully as ${role.toUpperCase()}`);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert(`Password reset for ${forgotEmail} with new password: ${newPassword}`);
    setShowForgotModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TapNav />

      {/* Login Box */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-center mb-6">
            Sign in to continue to CampusEventHub
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Email address</label>
              <input
                type="email"
                placeholder="you@your.university.edu"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
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

            {/* Forgot password */}
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot your password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Log In
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm">
        © 2025 CampusEventHub. All rights reserved.
      </footer>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Reset Password</h3>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-3">
                <label className="block mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-gray-700">New Password</label>
                <input
                  type="password"
                  placeholder="Create new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}