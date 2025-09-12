import React from 'react';
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 

const TopNav = () => {
  return (
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-purple-600 text-3xl mr-2">💡</span>
          <h1 className="text-xl font-bold text-purple-700">CampusEventHub</h1>
        </div>

        {/* Nav Links */}
        <nav className="space-x-6 text-gray-800 font-medium">
          <Link to="/Event" className="hover:text-purple-600">
            Event
          </Link>
          <Link to="/adminDashboard" className="hover:text-purple-600">
            Dashboard
          </Link>
        </nav>

        {/* Login Button */}
        <Link
          to="/login"
          className="flex items-center bg-purple-200 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-300 transition"
        >
          <FaUserCircle className="mr-2" />
          <span className="font-semibold text-sm">LOG IN</span>
        </Link>
      </header>
  );
};

export default TopNav;
