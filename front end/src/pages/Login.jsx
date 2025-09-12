import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  function validateLogin() {
    const e = {};
    if (!login.email) e.email = "Email is required";
    if (!login.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    if (!validateLogin()) return;

    // TODO: Connect to your backend API
    console.log("Login Data:", login);
    alert("Login submitted!");
  }

return (
  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: "url('/images/img.jpg')",
       backgroundSize: "100%", // Zoom out effect (smaller than cover)
       backgroundRepeat: "no-repeat",
     }}
  >
    <div className="flex flex-col justify-center items-center w-full max-w-md bg-purple-50 bg-opacity-90 px-8 py-10 rounded-xl shadow-lg">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <span className="text-purple-600 text-3xl mr-2">💡</span>
        <h1 className="text-2xl font-bold text-purple-700">CampusEventHub</h1>
      </div>

      {/* Welcome Message */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome</h2>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit} className="w-full space-y-5">
        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Enter your password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.password ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Login
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="mt-6 text-gray-600">
        Don’t have an account?{" "}
        <Link to="/register" className="text-purple-600 font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  </div>
);
}
