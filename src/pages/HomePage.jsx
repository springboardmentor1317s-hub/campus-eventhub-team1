import React from 'react';
// In a real application, you would use the Link component from react-router-dom
import { Link } from 'react-router-dom';
import heroImage from "../assets/abhi.png"

// SVG Icon Component
const LogoIcon = () => (
    <svg className="h-8 w-8 text-[#1380ec]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
    </svg>
);

const Header = () => (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <a className="flex items-center gap-2" href="#">
                    <LogoIcon />
                    <h1 className="text-xl font-bold text-gray-800">CampusEventHub</h1>
                </a>
                <nav className="hidden items-center gap-8 md:flex">
                    {/* For internal navigation, replace <a> with <Link> from react-router-dom */}
                    <a className="text-sm font-medium text-gray-600 transition-colors hover:text-[#1380ec]" href="#">Home</a>
                    <a className="text-sm font-medium text-gray-600 transition-colors hover:text-[#1380ec]" href="#">About</a>
                    <a className="text-sm font-medium text-gray-600 transition-colors hover:text-[#1380ec]" href="#">Events</a>
                    <a className="text-sm font-medium text-gray-600 transition-colors hover:text-[#1380ec]" href="#">Contact</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#1380ec] text-white text-sm font-bold shadow-sm transition-all hover:bg-blue-600 hover:shadow-md">
                        <span className="truncate">Sign Up</span>
                    </button>
                </div>
            </div>import HeroImage from 
        </div>
    </header>
);

const HeroSection = () => (
  <section
    // No changes needed here in the class names
    className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center py-20"
    style={{
      // Change `background` to `backgroundImage`
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("")`,
      // You can now safely remove these lines as Tailwind's bg-cover and bg-center handle them
      // backgroundSize: "cover",
      // backgroundPosition: "center",
    }}
  >
    <div className="container mx-auto px-4 text-center text-white">
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
        Discover, Manage, and Participate in Campus Events
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-200 md:text-xl">
        Your one-stop platform for all campus activities. Explore events,
        connect with peers, and make the most of your college experience.
      </p>
      <button className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-md h-12 px-8 bg-[#1380ec] text-base font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105">
        <span className="truncate">Explore Events</span>
      </button>
    </div>
  </section>
);





const LoginOptions = () => (
  <section className="py-16 sm:py-20">
    <div className="container mx-auto px-4">
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-800">
        Login to Your Dashboard
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

        {/* Student */}
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">Student</h3>
          <p className="mt-2 text-gray-600">Browse and register for exciting events on campus.</p>
          <Link
            to="/student-login"
            className="mt-6 flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-md h-11 px-5 text-base font-bold shadow-sm transition-all bg-[#1380ec] text-white hover:bg-blue-600"
          >
            Student Login
          </Link>
        </div>

        {/* Admin */}
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">College Admin</h3>
          <p className="mt-2 text-gray-600">Manage your college's events and host new ones.</p>
          <Link
            to="/admin-login"
            className="mt-6 flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-md h-11 px-5 text-base font-bold shadow-sm transition-all bg-[#f97316] text-white hover:bg-orange-600"
          >
            Admin Login
          </Link>
        </div>

        {/* Super Admin */}
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">Super Admin</h3>
          <p className="mt-2 text-gray-600">Oversee all colleges and manage approvals.</p>
          <Link
            to="/super-login"
            className="mt-6 flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-md h-11 px-5 text-base font-bold shadow-sm transition-all bg-[#10b981] text-white hover:bg-green-600"
          >
            Super Admin Login
          </Link>
        </div>
      </div>
    </div>
  </section>
);



const UpcomingEvents = () => (
  <section className="bg-white py-16 sm:py-20">
    <div className="container mx-auto px-4">
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-800">
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Event Card 1 */}
        <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md transition-transform duration-300 hover:-translate-y-2">
          <div
            className="h-52 w-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop")',
            }}
          ></div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Campus Career Fair
            </h3>
            <p className="mt-1 text-sm text-gray-600">October 26, 2025</p>
          </div>
        </div>

        {/* Event Card 2 */}
        <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md transition-transform duration-300 hover:-translate-y-2">
          <div
            className="h-52 w-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop")',
            }}
          ></div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Tech Talk: AI in Education
            </h3>
            <p className="mt-1 text-sm text-gray-600">November 15, 2025</p>
          </div>
        </div>

        {/* Event Card 3 */}
        <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md transition-transform duration-300 hover:-translate-y-2">
          <div
            className="h-52 w-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1527525443443-656d58cb0e81?q=80&w=2070&auto=format&fit=crop")',
            }}
          ></div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Student Networking Mixer
            </h3>
            <p className="mt-1 text-sm text-gray-600">December 5, 2025</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);


const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
            <div className="mt-8 border-t border-gray-700 pt-8 text-center">
                <p className="text-sm text-gray-400">© 2025 CampusEventHub. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// Main HomePage Component
export const HomePage = () => {
    return (
        <div className="bg-gray-50" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
            <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
                <Header />
                <main className="flex-grow">
                    <HeroSection />
                    <LoginOptions />
                    <UpcomingEvents />
                </main>
                <Footer />
            </div>
        </div>
    );
};

