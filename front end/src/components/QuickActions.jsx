import React from 'react';

const QuickActions = () => (
  <div className="bg-white p-6 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
    <div className="space-y-3">
      <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
        + Create New Event
      </button>
      <button className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200">
        View All Registrations
      </button>
      <button className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200">
        Export Event Data
      </button>
    </div>
  </div>
);

export default QuickActions;
