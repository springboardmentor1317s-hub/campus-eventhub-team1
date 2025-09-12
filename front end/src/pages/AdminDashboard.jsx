import React from 'react';
import TopNav from '../components/TapNav.jsx';
import StatsCards from '../components/StatsCards.jsx';
import TabsPanel from '../components/TabsPanel.jsx';
import RecentEvents from '../components/RecentEvents.jsx';
import QuickActions from '../components/QuickActions.jsx';
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-purple-50">
      <TopNav />
      <div className="px-8 py-6">
        <div className="flex justify-between items-center mb-6">
            <nav className="space-x-6 text-gray-800 font-medium">
                <Link to="/Event" className="hover:text-purple-600">
                     All Events
                </Link>
                <Link to="/adminDashboard" className="hover:text-purple-600">
                     Dashboard
                </Link>
            </nav>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">Event Organizer Dashboard</h1>
            <p className="text-gray-500">Manage your events and track performance</p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
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


