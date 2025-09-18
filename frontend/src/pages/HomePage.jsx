import React from "react";

export const HomePage = () => {
  return (
    <div className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <svg
                className="w-10 h-10 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900">
                CampusEventHub
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-base font-medium text-gray-600 hover:text-blue-500" href="#">Home</a>
              <a className="text-base font-medium text-gray-600 hover:text-blue-500" href="#">Events</a>
              <a className="text-base font-medium text-gray-600 hover:text-blue-500" href="#">About</a>
              <a className="text-base font-medium text-gray-600 hover:text-blue-500" href="#">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              <a className="text-base font-medium text-gray-600 hover:text-blue-500" href="/login">Login</a>
              <a className="px-6 py-3 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:scale-105 transition" href="/register">
                Register
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                The Heartbeat of Your Campus.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  All in One Place.
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                From hackathons to cultural fests, discover, manage, and engage
                with every event happening on your campus.
              </p>
              <a className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:scale-105 transition" href="/register">
                Get Started
              </a>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcTgcZ0tUCs1hhE6yZSOuHMRpucKp4MeaAJi57DJ0MTYrfLcD9bS8BPnZWjaIcMEn2wCzVre7iTc1NtWQUZAPsAEze5UErz212NNUcj5zD6sg8E6BMQAzlXjFUKkSJkwda65QQ3cDnV2twCnCrB8t7dDZ6q2OrEBPbftBpIqlZqyu3BaHroy8qzsifmcprAQTvjzLgaS_KvIe9SvpJPJG6r49hpVzH-2utV1RR4VlyNfe27jEJJrhcQ4teYUJ3pYZm919gNqvEyZs"
                alt="Students collaborating"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Roles */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                One Platform, Many Roles
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Tailored experiences for everyone on campus.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Student */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition">
                <h3 className="text-2xl font-bold mb-3">Explore & Register</h3>
                <p className="text-gray-600 mb-6">
                  For Students: Browse events, register with ease, and never
                  miss out on campus life.
                </p>
              </div>
              {/* Admin */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition">
                <h3 className="text-2xl font-bold mb-3">Manage Events</h3>
                <p className="text-gray-600 mb-6">
                  For Admins: Create, promote, and manage events effortlessly.
                </p>
              </div>
              {/* Super Admin */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition">
                <h3 className="text-2xl font-bold mb-3">Control & Settings</h3>
                <p className="text-gray-600 mb-6">
                  For Super Admins: Oversee colleges, manage roles, and
                  customize settings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
              <p className="mt-4 text-lg text-gray-600">
                Don&apos;t miss out on what&apos;s next. Here&apos;s a peek at our featured events.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Hackathon */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv5v0PGG-8roIMqp8RhXZCj-MbQGBC58Cffg&s"
                  alt="Hackathon"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500">October 28, 2024</p>
                  <h3 className="text-xl font-bold mb-2">InnovateFest 2024 Hackathon</h3>
                  <p className="text-gray-600 mb-4">
                    Join the brightest minds on campus for a 24-hour coding challenge.
                  </p>
                  <a className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" href="#">
                    Register Now
                  </a>
                </div>
              </div>
              {/* Cultural Fest */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/61/92/5d/61925d7680f2aa1a5bc9d55db2d80a3e.jpg"
                  alt="Cultural Fest"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500">November 15, 2024</p>
                  <h3 className="text-xl font-bold mb-2">Annual Cultural Fest: Spectrum</h3>
                  <p className="text-gray-600 mb-4">
                    Experience a vibrant celebration of diversity with music, dance, and food.
                  </p>
                  <a className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" href="#">
                    Register Now
                  </a>
                </div>
              </div>
              {/* Sports Meet */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src="https://img.freepik.com/premium-vector/athletes-running-track-field-competition_120816-610.jpg"
                  alt="Sports Meet"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500">November 22, 2024</p>
                  <h3 className="text-xl font-bold mb-2">Inter-College Sports Meet</h3>
                  <p className="text-gray-600 mb-4">
                    Cheer for your college or compete in a week-long sports extravaganza.
                  </p>
                  <a className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" href="#">
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">CampusEventHub</h3>
            <p>Connecting campuses, one event at a time.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Events</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">For Partners</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Host an Event</a></li>
              <li><a href="#" className="hover:text-white">Sponsorships</a></li>
              <li><a href="#" className="hover:text-white">College Admins</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Contact Info</h4>
            <p>123 University Ave, Innovation City, 12345</p>
            <p>Email: info@campuseventhub.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
