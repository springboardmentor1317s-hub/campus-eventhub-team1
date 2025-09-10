import React from "react";

export const Login = () => {
  return (
    <div
      className="bg-[var(--background-color)] min-h-screen flex"
      style={{
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      }}
    >
      {/* Left Section */}
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 text-[var(--primary-color)]">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6_535)">
                    <path
                      clipRule="evenodd"
                      d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_535">
                      <rect fill="white" height="48" width="48" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--primary-text-color)]">
                Campus Connect
              </h1>
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--primary-text-color)]">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-[var(--secondary-text-color)]">
              Or{" "}
              <a
                className="font-medium text-[var(--primary-color)] hover:text-red-500"
                href="#"
              >
                register for a new account
              </a>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form className="space-y-6" method="POST" action="#">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--primary-text-color)]"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="form-input block w-full appearance-none rounded-md border-0 bg-[var(--input-bg-color)] px-3 py-3 placeholder-[var(--input-placeholder-color)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 sm:text-sm text-[var(--primary-text-color)]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[var(--primary-text-color)]"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="form-input block w-full appearance-none rounded-md border-0 bg-[var(--input-bg-color)] px-3 py-3 placeholder-[var(--input-placeholder-color)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 sm:text-sm text-[var(--primary-text-color)]"
                    />
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-[var(--primary-color)] hover:text-red-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="flex items-center justify-center space-x-4 pt-2">
                  <p className="text-sm font-medium text-[var(--primary-text-color)]">
                    Login as:
                  </p>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="student"
                      name="role"
                      defaultChecked
                      className="h-4 w-4 border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <label
                      htmlFor="student"
                      className="ml-2 block text-sm text-[var(--secondary-text-color)]"
                    >
                      Student
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="admin"
                      name="role"
                      className="h-4 w-4 border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <label
                      htmlFor="admin"
                      className="ml-2 block text-sm text-[var(--secondary-text-color)]"
                    >
                      Admin
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-[var(--primary-color)] py-3 px-4 text-base font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2"
                  >
                    <span className="material-symbols-outlined mr-2">
                      login
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB66gapLjZcnasUyehr_fEfHPMNPeBK1s7XIKmw5HciuYLPBROJnyBbHhBdd1SYg_iiAFPlhqOIeMZrMstya431OLPNUnwuUq8_2zjBKj0Cx27ZwqjY9_UWaP12CoabOjH96Ll9NSqvgW0Nf27WyEh5gfYuFjg_83qAYn52qRdd-rJpwzk6u84Zi6TP7dC1QWQJfcUYtnPggnLuUpQr4Nu1UMFDNXgradeEO9lv2WzV-WfQlERE-2VL74nYgB-Ofco7ILmn-RHswUPB"
          alt="University campus"
        />
        <div className="absolute inset-0 bg-[var(--primary-color)] opacity-30"></div>
      </div>
    </div>
  );
};
