import React from 'react';

const stats = [
  { label: 'Total Events', value: 0, color: 'bg-blue-100', icon: '📅' },
  { label: 'Active Events', value: 0, color: 'bg-green-100', icon: '📈' },
  { label: 'Total Registrations', value: 0, color: 'bg-purple-100', icon: '📝' },
  { label: 'Average Participants', value: 0, color: 'bg-orange-100', icon: '📊' },
];

function StatsCards (){
    return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {stats.map((stat, i) => (
      <div key={i} className={`p-4 rounded shadow ${stat.color}`}>
        <div className="text-3xl">{stat.icon}</div>
        <h3 className="text-lg font-semibold mt-2">{stat.label}</h3>
        <p className="text-2xl font-bold mt-1">{stat.value}</p>
      </div>
    ))}
  </div>
);
}

export default StatsCards;
