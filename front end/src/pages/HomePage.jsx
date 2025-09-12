import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-purple-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-purple-600 text-3xl mr-2">💡</span>
          <h1 className="text-xl font-bold text-purple-700">CampusEventHub</h1>
        </div>

        {/* Nav Links */}
        <nav className="space-x-6 text-gray-800 font-medium">
          <Link to="/" className="hover:text-purple-600">
            Home
          </Link>
          <Link to="/events" className="hover:text-purple-600">
            Event
          </Link>
          <Link to="/dashboard" className="hover:text-purple-600">
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

      {/* Event Cards */}
      <main className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Example Event Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
           <img
               src="/images/img1.jpg"
               alt="Cultural Fest"
               className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Cultural Fest</h3>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
           <img
            src="/images/Hackathon.jpg"
            alt="Hackathon"
            className="w-full h-40 object-cover"
          />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Hackathon</h3>
            </div>
          </div>

          {/* Add more cards as needed */}
        </div>
      </main>
    </div>
  );
}

