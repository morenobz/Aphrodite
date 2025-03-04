import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, TrendingUp } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MoodOption {
  value: string;
  label: string;
  color: string;
  emoji: string;
}

interface MoodTrackerProps {
  title?: string;
  description?: string;
  onMoodSelect?: (mood: string) => void;
  selectedDate?: Date;
  moodHistory?: Array<{
    date: string;
    mood: string;
  }>;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({
  title = "Today's Mood",
  description = "How are you feeling today?",
  onMoodSelect = () => {},
  selectedDate = new Date(),
  moodHistory = [
    { date: "2023-06-01", mood: "happy" },
    { date: "2023-06-02", mood: "calm" },
    { date: "2023-06-03", mood: "tired" },
    { date: "2023-06-04", mood: "stressed" },
    { date: "2023-06-05", mood: "happy" },
  ],
}) => {
  const [selectedMood, setSelectedMood] = useState<string>("");

  const moodOptions: MoodOption[] = [
    { value: "happy", label: "Happy", color: "bg-yellow-100", emoji: "😊" },
    { value: "calm", label: "Calm", color: "bg-blue-100", emoji: "😌" },
    { value: "tired", label: "Tired", color: "bg-gray-100", emoji: "😴" },
    { value: "stressed", label: "Stressed", color: "bg-red-100", emoji: "😰" },
    { value: "sad", label: "Sad", color: "bg-indigo-100", emoji: "😢" },
    {
      value: "energetic",
      label: "Energetic",
      color: "bg-green-100",
      emoji: "⚡",
    },
    { value: "anxious", label: "Anxious", color: "bg-orange-100", emoji: "😬" },
    {
      value: "irritable",
      label: "Irritable",
      color: "bg-pink-100",
      emoji: "😠",
    },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
  };

  // Get mood data for the last 7 days
  const recentMoods = moodHistory.slice(0, 7).reverse();

  return (
    <Card className="border-purple-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 pb-4">
        <CardTitle className="text-xl font-semibold text-purple-800">
          {title}
        </CardTitle>
        <CardDescription className="text-purple-600">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <div className="grid grid-cols-4 gap-2">
          {moodOptions.map((mood) => (
            <motion.button
              key={mood.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood.value)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${mood.color} ${selectedMood === mood.value ? "ring-2 ring-purple-400" : ""}`}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Recent Mood History
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-purple-600 hover:text-purple-800 p-0 h-auto"
            >
              View All
            </Button>
          </div>

          <div className="space-y-2">
            {recentMoods.length > 0 ? (
              recentMoods.map((entry, index) => {
                const mood = moodOptions.find((m) => m.value === entry.mood);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${mood?.color || "bg-gray-100"} mr-3`}
                      >
                        <span>{mood?.emoji || "😐"}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {mood?.label || "Unknown"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{entry.date}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">
                No mood data recorded yet
              </p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 p-4 flex justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Today, {selectedDate.toLocaleDateString()}</span>
        </div>
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          disabled={!selectedMood}
        >
          Save Mood
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MoodTracker;
