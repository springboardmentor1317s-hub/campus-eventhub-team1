import React, { useState } from 'react';

const TabsPanel = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'My Events', 'Analytics'];

  return (
    <div className="mt-6 border-b border-gray-300">
      <nav className="flex space-x-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabsPanel;
