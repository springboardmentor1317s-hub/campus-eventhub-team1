import React from 'react';
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 

const Navbar = () => {
  return (
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-8 py-4 bg-white shadow-md gap-3">
        {/* Logo */}
          <div className="flex items-center justify-center sm:justify-start">
              <span className="text-blue-600 text-3xl mr-2">💡</span>
              <h1 className="text-xl font-bold text-blue-700">CampusEventHub</h1>
          </div>

        {/* Nav Links & Login */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full sm:w-auto">
            <nav className="flex justify-center sm:justify-start space-x-6 text-gray-800 font-medium">
              <Link to="/Event" className="hover:text-blue-600">
                   Event
              </Link>
              <Link to="/adminDashboard" className="hover:text-blue-600">
                   Dashboard
              </Link>
            </nav>
              <Link
                to="/login"
                className="flex items-center bg-blue-200 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-300 transition justify-center sm:justify-start"
              >
                <FaUserCircle className="mr-2" />
                <span className="font-semibold text-sm">LOG IN</span>
              </Link>
          </div>
      </header>
  );
};

export default Navbar;
