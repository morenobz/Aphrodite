import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import GoalsSection from "./GoalsSection";
import MoodTracker from "./MoodTracker";
import QuickNavigation from "./QuickNavigation";

interface DashboardProps {
  userName?: string;
  userAvatar?: string;
}

const Dashboard = ({
  userName = "Sarah Johnson",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
}: DashboardProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample affirmations data
  const affirmations = [
    "I am worthy of love and respect.",
    "My beauty radiates from within.",
    "I embrace my unique qualities with confidence.",
    "I am becoming the best version of myself every day.",
    "I nurture my body, mind, and spirit with love.",
  ];

  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);

  // Function to cycle through affirmations
  const cycleAffirmation = () => {
    const currentIndex = affirmations.indexOf(currentAffirmation);
    const nextIndex = (currentIndex + 1) % affirmations.length;
    setCurrentAffirmation(affirmations[nextIndex]);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userName={userName}
        userAvatar={userAvatar}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-800"
            >
              Welcome back, {userName.split(" ")[0]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600"
            >
              Let's continue your wellness journey today
            </motion.p>
          </header>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Goals */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GoalsSection />
              </motion.div>
            </div>

            {/* Right Column - Affirmations and Mood */}
            <div className="space-y-6">
              {/* Affirmations Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-purple-800">
                    Daily Affirmation
                  </h2>
                  <button
                    onClick={cycleAffirmation}
                    className="text-pink-600 hover:text-pink-800 text-sm font-medium"
                  >
                    New Affirmation
                  </button>
                </div>
                <motion.div
                  key={currentAffirmation}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg font-medium text-purple-700 italic"
                >
                  "{currentAffirmation}"
                </motion.div>
              </motion.div>

              {/* Mood Tracker */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <MoodTracker />
              </motion.div>
            </div>
          </div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <QuickNavigation />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
