import React from "react";
import TopNav  from "../components/TapNav";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-purple-50">
      <TopNav />
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

