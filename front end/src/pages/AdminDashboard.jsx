import React from 'react';
import Navbar from '../components/Navbar.jsx';
import StatsCards from '../components/StatsCards.jsx';
import TabsPanel from '../components/TabsPanel.jsx';
import RecentEvents from '../components/RecentEvents.jsx';
import QuickActions from '../components/QuickActions.jsx';
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
        <div className="px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
                <nav className="space-x-6 text-gray-800 font-medium flex justify-center lg:justify-start">
                    <Link to="/Event" className="hover:text-blue-600">
                        All Events
                    </Link>
                    <Link to="/adminDashboard" className="hover:text-blue-600">
                         Dashboard
                    </Link>
                </nav>
                <div className="mb-3 lg:mb-0 text-center  flex-1">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                        Event Organizer Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 mt-1">
                         Manage your events and track performance
                     </p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full lg:w-auto">
                    + Create Event
                </button>
            </div>
                <StatsCards />
                <TabsPanel />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                 <RecentEvents />
                <QuickActions />
            </div>
        </div>
    </div>
  );
}


