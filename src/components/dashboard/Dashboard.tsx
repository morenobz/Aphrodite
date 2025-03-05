import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import GoalsSection from "./GoalsSection";
import MoodTracker from "./MoodTracker";
import QuickNavigation from "./QuickNavigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Bot } from "lucide-react";

interface UserPreferences {
  hairType?: string;
  dietQuality?: string;
  skinType?: string;
  fitnessLevel?: string;
}

interface DashboardProps {
  userName?: string;
  userAvatar?: string;
}

const Dashboard = ({
  userName = "Sarah Johnson",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
}: DashboardProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentMood, setCurrentMood] = useState<string>("");
  const [moodExplanation, setMoodExplanation] = useState<string>("");
  const [moodDialogOpen, setMoodDialogOpen] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<string>("");
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    hairType: "curly",
    dietQuality: "good",
    skinType: "combination",
    fitnessLevel: "intermediate",
  });

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

  // Load user preferences from storage
  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood);
    setMoodDialogOpen(true);
  };

  const handleMoodExplanationSubmit = () => {
    // Generate AI recommendation based on mood and explanation
    generateAiRecommendation(currentMood, moodExplanation);
    setMoodDialogOpen(false);
  };

  const generateAiRecommendation = (mood: string, explanation: string) => {
    // In a real app, this would be an API call to an AI service
    // For now, we'll simulate AI-generated recommendations

    // Simulate API delay
    setTimeout(() => {
      let recommendation = "";

      if (mood === "happy") {
        recommendation = `Great to hear you're feeling happy! To maintain this positive energy, consider a ${userPreferences.hairType === "curly" ? "hydrating hair mask" : "volumizing hair treatment"} to boost your confidence even more. Since your diet is ${userPreferences.dietQuality}, try adding some mood-boosting foods like berries and dark chocolate to sustain your good mood throughout the day.`;
      } else if (mood === "tired") {
        recommendation = `I notice you're feeling tired. For your ${userPreferences.hairType} hair, a quick refreshing dry shampoo might help you feel more put together with minimal effort. Also, since your diet quality is ${userPreferences.dietQuality}, consider adding more iron-rich foods and staying hydrated to boost your energy levels naturally.`;
      } else if (mood === "stressed") {
        recommendation = `I'm sorry to hear you're feeling stressed. A gentle scalp massage would be great for your ${userPreferences.hairType} hair and can help reduce tension. Given your ${userPreferences.dietQuality} diet, try incorporating more magnesium-rich foods like nuts and leafy greens, which can help manage stress levels.`;
      } else if (mood === "calm") {
        recommendation = `It's wonderful that you're feeling calm today. This is a perfect time for a deep conditioning treatment for your ${userPreferences.hairType} hair. With your ${userPreferences.dietQuality} diet, continue focusing on balanced meals with plenty of vegetables to maintain this sense of wellbeing.`;
      } else {
        recommendation = `Based on your mood and ${userPreferences.hairType} hair type, today might be a good day for a simple, low-maintenance hairstyle. Remember that your ${userPreferences.dietQuality} diet is supporting your overall wellness, so stay consistent with your healthy eating habits.`;
      }

      setAiRecommendation(recommendation);
    }, 1000);
  };

  // Get personalized content based on user preferences
  const getPersonalizedContent = () => {
    // Hair type specific recommendations
    const hairRecommendations: Record<string, string> = {
      curly: "Hydrating curl cream and diffusing techniques",
      straight: "Volumizing products and heat protection",
      wavy: "Wave-enhancing mousse and air-drying methods",
      coily: "Deep moisture treatments and protective styling",
      fine: "Lightweight products and gentle handling",
      thick: "Anti-frizz serums and layered cutting techniques",
      dry: "Intensive hydration and oil treatments",
      oily: "Clarifying shampoos and lightweight conditioners",
    };

    // Diet quality specific recommendations
    const dietRecommendations: Record<string, string> = {
      excellent: "Maintain your balanced nutrition with seasonal adjustments",
      good: "Consider adding more leafy greens and omega-3 rich foods",
      average: "Try meal prepping to increase vegetable and protein intake",
      needsImprovement: "Start with small changes like adding one fruit daily",
      poor: "Focus on replacing processed foods with whole alternatives",
    };

    return {
      hairTip:
        hairRecommendations[userPreferences.hairType || ""] ||
        "Personalized hair care routine",
      dietTip:
        dietRecommendations[userPreferences.dietQuality || ""] ||
        "Balanced nutrition plan",
    };
  };

  const personalizedContent = getPersonalizedContent();

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

          {/* Personalized Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg shadow-sm"
          >
            <h2 className="text-lg font-semibold text-purple-800 mb-2">
              Personalized For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm border border-purple-200">
                <h3 className="font-medium text-purple-700 mb-2">
                  Hair Care ({userPreferences.hairType})
                </h3>
                <p className="text-gray-700">{personalizedContent.hairTip}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm border border-purple-200">
                <h3 className="font-medium text-purple-700 mb-2">
                  Nutrition ({userPreferences.dietQuality})
                </h3>
                <p className="text-gray-700">{personalizedContent.dietTip}</p>
              </div>
            </div>
          </motion.div>

          {/* AI Recommendation */}
          {aiRecommendation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3"
            >
              <div className="bg-blue-100 p-2 rounded-full">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-800">
                  AI Recommendation
                </h3>
                <p className="text-sm text-blue-600 mt-1">{aiRecommendation}</p>
              </div>
            </motion.div>
          )}

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
                <MoodTracker onMoodSelect={handleMoodSelect} />
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

      {/* Mood Explanation Dialog */}
      <Dialog open={moodDialogOpen} onOpenChange={setMoodDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tell us more about your mood</DialogTitle>
            <DialogDescription>
              Sharing why you're feeling {currentMood} helps us provide better
              recommendations.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder={`Why are you feeling ${currentMood} today?`}
              value={moodExplanation}
              onChange={(e) => setMoodExplanation(e.target.value)}
              className="border-purple-200 min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMoodDialogOpen(false)}
              className="border-purple-200 text-purple-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleMoodExplanationSubmit}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
