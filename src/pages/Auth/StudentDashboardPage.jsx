import React from 'react';

export const StudentDashboardPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
        <div className="flex h-full grow">
          {/* Sidebar Navigation */}
          <div className="fixed top-0 left-0 w-80 h-full bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-8">
              {/* Profile Section */}
              <div className="flex items-center gap-3">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDnljsACu8uZjA6arTRJvgvsslJd1ZuRy3SfJ4PwiiEm8_BzKx3U3gjOv-d7n7S014DKTPsZVYJ64d2WHd7lQ7hsErfIyaY8M_t2uYVMC1_bpWEXsbG_-8ZKXOC5LjbtsjrOUlMemoEZDaEjNQtVTurNrgIZZePBF4U07OUD7Vllc3KAP6FPc4GBhukMDnoo2kSLXx4HR_o-qN72CdNiCbnFqZUrTd53t8a6LlrtQoGIuv7QsxDmE41iAazHuh5yLC3ktVbIiYM9GI")' }}>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-gray-900 text-lg font-bold">Sophia Chen</h1>
                  <p className="text-gray-500 text-sm">Student</p>
                </div>
              </div>
              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
                <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-semibold" href="#">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                  </svg>
                  <p className="text-base">Dashboard</p>
                </a>
                <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors" href="#">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path></svg>
                  <p className="text-base font-medium">Events</p>
                </a>
                <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors" href="#">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path></svg>
                  <p className="text-base font-medium">Organizations</p>
                </a>
                <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors" href="#">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
                  <p className="text-base font-medium">Profile</p>
                </a>
              </nav>
            </div>
            {/* Settings and Logout */}
            <div className="flex flex-col gap-2">
              <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors" href="#">
                <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path></svg>
                <p className="text-base font-medium">Settings</p>
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors" href="#">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-125.66a8,8,0,0,1,0,11.32L139.31,128l34.35,34.34a8,8,0,0,1-11.32,11.32L128,139.31l-34.34,34.35a8,8,0,0,1-11.32-11.32L116.69,128,82.34,93.66a8,8,0,0,1,11.32-11.32L128,116.69l34.34-34.35A8,8,0,0,1,173.66,90.34Z"></path></svg>
                <p className="text-base font-medium">Logout</p>
              </a>
            </div>
          </div>

          {/* Main Content */}
          <main className="ml-80 flex-1 p-8">
            <div className="flex flex-col gap-8">
              <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
              
              {/* Upcoming Events Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
                    <div className="w-full h-48 bg-center bg-no-repeat bg-cover transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSoGLJgP-dPjyWNcntzU-ebFyHqWn6crnitoi9dGCJZFQt1KbdSM3Z2OX4XI42RFmn7pTMSoQLQxNoKQrvw7ngVH0-3XSnPCXDOVR4Iqu5t7gCQlrvoQoB8-7k6Q7cUOS7homQnW5yM0Ni2tL3lRgBHeVQfzzPOdVfzd2oaOfvd0NgtjAgWvASIhNmJ2Q24AqvIrpkxeq5lmsdaK2rqqin7tNJG6gzWNP7h2OKRlWSvGMK18owu59DqgLGLUG5hXRZQIy759T2Rqw")' }}></div>
                    <div className="p-4">
                      <p className="text-lg font-bold text-gray-900">Campus Fest 2024</p>
                      <p className="text-gray-600">Join us for a day of fun and games!</p>
                      <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">Register Now</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
                    <div className="w-full h-48 bg-center bg-no-repeat bg-cover transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCkqwUdnsv9qKp8Vq5j22A1dxfMIcKF_kmgZWfrm_X7W5RhNxxYKULhIFWDDaESruKW2fRZMTQr7iXdcB279FEs9ZQ44GTEGwQwrZe1VLOVIuLZHP0xnYtgQob6Il_avKXdOzVPAlcb-SdhRJb1AdlzoEHlMZBYBe8ShGTsD0ZcYwyULZR6iLDwfbWd6INw4XlHMaen3-eCnx3_Qn9REV2CfBV_YPlVyFqrZblYIGK6Uw8-jS968_EZaow3V0x8FQMNslmwPEPvI9A")' }}></div>
                    <div className="p-4">
                      <p className="text-lg font-bold text-gray-900">Tech Talk: Future of AI</p>
                      <p className="text-gray-600">Learn about the latest trends in AI.</p>
                      <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">Register Now</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
                    <div className="w-full h-48 bg-center bg-no-repeat bg-cover transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPbyifNJBYyZvZripc_tNtc3AZFqon3tbBJW0dyXwUNs7EMTuCrsSAT4P0knKCJFTud72I90_I6jQz4pqNMH1X2ItMFxfP6WZQvXDc-vDx0tDd1L_PmW7PkrEGy_XtMEwCXp3pNXyTHlHjM8w3JM-88GzPGneDdw3KIe_PFPob4BltOYK5WInCZlc4QX0A-VfytgJfv74Z38LdVp_o9vKhCMh2DYqSOqw5-OXyeSiC6cWIYJF90PsfSI8YTsz3KFJrDMprA5V0pOI")' }}></div>
                    <div className="p-4">
                      <p className="text-lg font-bold text-gray-900">Career Fair</p>
                      <p className="text-gray-600">Connect with top companies.</p>
                      <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">Register Now</button>
                    </div>
                  </div>
                </div>
              </section>

              {/* My Registered Events Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">My Registered Events</h2>
                <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Event</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Time</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Location</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Workshop on Data Science</td>
                        <td className="px-6 py-4 text-gray-600">2024-07-15</td>
                        <td className="px-6 py-4 text-gray-600">10:00 AM</td>
                        <td className="px-6 py-4 text-gray-600">Science Building, Room 201</td>
                        <td className="px-6 py-4"><a className="font-semibold text-blue-600 hover:underline" href="#">View Details</a></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Networking Mixer</td>
                        <td className="px-6 py-4 text-gray-600">2024-07-20</td>
                        <td className="px-6 py-4 text-gray-600">6:00 PM</td>
                        <td className="px-6 py-4 text-gray-600">Student Union Ballroom</td>
                        <td className="px-6 py-4"><a className="font-semibold text-blue-600 hover:underline" href="#">View Details</a></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-gray-900 font-medium">Art Exhibition</td>
                        <td className="px-6 py-4 text-gray-600">2024-07-25</td>
                        <td className="px-6 py-4 text-gray-600">2:00 PM</td>
                        <td className="px-6 py-4 text-gray-600">Art Gallery</td>
                        <td className="px-6 py-4"><a className="font-semibold text-blue-600 hover:underline" href="#">View Details</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Discover Events Section */}
                <section className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Discover Events</h2>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <button className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm">All</button>
                    <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold text-sm hover:bg-gray-200">Academic</button>
                    <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold text-sm hover:bg-gray-200">Social</button>
                    <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold text-sm hover:bg-gray-200">Career</button>
                    <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold text-sm hover:bg-gray-200">Sports</button>
                    <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold text-sm hover:bg-gray-200">Arts</button>
                  </div>
                  <div className="relative mb-6">
                    <input className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Search for events..." type="text"/>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                      <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
                      <div className="w-full h-40 bg-center bg-no-repeat bg-cover transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDVmfloFh40G926lPQd5rr-2T_ERNR1nqt-7mq_5zG3HVRATZlnhlXC9ExmmJjmAMuRgmd95K3jBLTYE46FJQ10pRQtu712twLi-7oompKP1a10eJEEGF-AMMO3lxBpX6EB5e37ZE_-RoAJLPhnqVvbNfxcgcHxMXJ5sEJfUPwMzqsszpiqeck-uKx0PvyP0_UPxrjDcofdaZmu2lfPvDIc6pURL6qhheTM5Auk7yxz7UiV7V6HFvuJaip4yoDBr-GiFh0-MghcPTQ")' }}></div>
                      <div className="p-4">
                        <p className="font-bold text-gray-900">Campus Fest 2024</p>
                        <p className="text-sm text-gray-600">Join us for a day of fun and games!</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
                      <div className="w-full h-40 bg-center bg-no-repeat bg-cover transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC7qFbsFUML5gKaBVvKMcCq9ISG8NM1UAFC7OLiif9-DsUyn7GK9rduQLgHa7CpCBDfMgIF-8TJvrIfr3EjJFZR8sAj3QcfPn0TuizzHJDPdH0Y61TsX7vPJd388Yv1udGvVimiuMl5gC9Z7vXGJOLn8kgh0Izi-oQjDmpYUN4YW_ZexSac0yn0TyFVPjB4TNRVv0fQeaiX021ewBTSPkAN3ks-M4eDSD2wmw8Vs92OkZL4539-Upz5KQVO2_KQNKVC7PewSL5LFVw")' }}></div>
                      <div className="p-4">
                        <p className="font-bold text-gray-900">Tech Talk: Future of AI</p>
                        <p className="text-sm text-gray-600">Learn about the latest trends in AI.</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
                      <div className="w-full h-40 bg-center bg-no-repeat bg-cover transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBL1aVAzsYknl7twKGiGqVWxV1X9HZAb5slME7XLum6m0sxKAug3iLNpYeXQCs_bGSd3HpovFuYuUPQsukuvUkjAhNuqykOhDQ0x6o5o83I6LS66UbRgp0DH0LHFdgj23MG8NcSuBQ8RvoGAmwGvnVbIue-63VaIEEFJbw29QOce7e1y4FjEV-rupehnqkGtVCPpQtNkQHk4j-kgp00ur05y2fDbRJxVKX0tQkmK_9wzLLgEXH5qEQQdGjoSo1x7dufAGuVPyTurkE")' }}></div>
                      <div className="p-4">
                        <p className="font-bold text-gray-900">Career Fair</p>
                        <p className="text-sm text-gray-600">Connect with top companies.</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Announcements Section */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Announcements</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-yellow-400">
                      <p className="font-bold text-gray-900">College Closure</p>
                      <p className="text-sm text-gray-600">The college will be closed on July 4th for Independence Day.</p>
                      <p className="text-xs text-gray-500 mt-2">2024-07-01</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-blue-400">
                      <p className="font-bold text-gray-900">New Student Orientation</p>
                      <p className="text-sm text-gray-600">New student orientation will be held on August 15th.</p>
                      <p className="text-xs text-gray-500 mt-2">2024-06-25</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

