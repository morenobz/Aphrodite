import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      {/* Navigation Bar */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h1 className="ml-2 text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Aphrodite
          </h1>
        </div>

        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full transition-colors shadow-md hover:shadow-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-purple-800 leading-tight"
            >
              Your Personal Journey to{" "}
              <span className="text-pink-500">Wellness</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg text-gray-600 leading-relaxed"
            >
              Aphrodite helps you discover balance and harmony in your life with
              personalized wellness recommendations, mood tracking, and goal
              setting designed specifically for women.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link to="/signup">
                <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full text-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
                  Begin Your Journey
                </button>
              </Link>
              <button className="px-8 py-3 border-2 border-purple-300 text-purple-600 hover:bg-purple-50 rounded-full text-lg font-semibold transition-colors">
                Learn More
              </button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-200 rounded-full opacity-50"></div>
              <div className="relative z-10 bg-white p-4 rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Woman enjoying wellness moment"
                  className="w-full h-auto rounded-xl shadow-sm"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="bg-purple-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-purple-800 mb-4"
              >
                Discover Our Features
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Aphrodite offers a suite of tools designed to enhance your
                wellness journey
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-14 w-14 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-3">
                  Personalized Recommendations
                </h3>
                <p className="text-gray-600">
                  Receive tailored wellness suggestions based on your unique
                  profile, preferences, and goals for beauty, nutrition, and
                  mental wellness.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-3">
                  Mood Tracking
                </h3>
                <p className="text-gray-600">
                  Monitor your emotional wellbeing with our intuitive mood
                  tracker. Identify patterns and gain insights into what affects
                  your mood.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-3">
                  Goal Setting
                </h3>
                <p className="text-gray-600">
                  Set and track wellness goals across different areas of your
                  life. Visualize your progress and celebrate your achievements.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-purple-800 mb-4"
              >
                Why Choose Aphrodite
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Our holistic approach to women's wellness sets us apart
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex"
              >
                <div className="mr-6">
                  <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-800 mb-2">
                    Personalized Experience
                  </h3>
                  <p className="text-gray-600">
                    Every recommendation is tailored to your unique needs and
                    preferences, ensuring a truly personalized wellness journey.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex"
              >
                <div className="mr-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-800 mb-2">
                    Holistic Approach
                  </h3>
                  <p className="text-gray-600">
                    We consider all aspects of your wellbeing - physical,
                    mental, and emotional - for a truly balanced approach to
                    wellness.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex"
              >
                <div className="mr-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-800 mb-2">
                    Privacy Focused
                  </h3>
                  <p className="text-gray-600">
                    Your data is secure and private. We prioritize your privacy
                    while providing you with valuable insights.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex"
              >
                <div className="mr-6">
                  <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-800 mb-2">
                    Supportive Community
                  </h3>
                  <p className="text-gray-600">
                    Join a community of like-minded women on their wellness
                    journeys, sharing experiences and supporting each other.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-pink-500 to-purple-600 py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Start Your Wellness Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white text-lg max-w-2xl mx-auto mb-8"
            >
              Join thousands of women who have transformed their lives with
              Aphrodite's personalized wellness approach.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/signup">
                <button className="px-8 py-4 bg-white text-purple-600 hover:bg-purple-50 rounded-full text-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
                  Sign Up for Free
                </button>
              </Link>
              <p className="text-white text-sm mt-4 opacity-80">
                No credit card required. Start your 30-day free trial today.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-purple-50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <h1 className="ml-2 text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Aphrodite
                </h1>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  About
                </a>
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  Features
                </a>
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  Privacy
                </a>
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  Terms
                </a>
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  Contact
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-purple-100 text-center text-purple-400 text-sm">
              © {new Date().getFullYear()} Aphrodite. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
