import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, BarChart2, Gift, User, Sparkles } from "lucide-react";

interface QuickNavItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

interface QuickNavigationProps {
  items?: QuickNavItem[];
}

const QuickNavigation = ({ items = defaultItems }: QuickNavigationProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-purple-800">
        Quick Access
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className={`overflow-hidden border-t-4 ${item.color} h-full`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div
                    className={`p-2 rounded-full ${item.color.replace("border", "bg").replace("-500", "-100")}`}
                  >
                    {item.icon}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-purple-500"
                  >
                    <ArrowRight size={16} />
                  </Button>
                </div>
                <CardTitle className="text-base mt-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="text-xs text-purple-600 hover:text-purple-800 p-0 h-auto"
                >
                  View {item.title}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const defaultItems: QuickNavItem[] = [
  {
    title: "Daily Routine",
    description: "Create and track your personalized daily routine",
    icon: <Sparkles size={20} className="text-pink-500" />,
    path: "/daily-routine",
    color: "border-pink-500",
  },
  {
    title: "AI Recommendations",
    description: "AI-powered personalized wellness suggestions",
    icon: <Gift size={20} className="text-indigo-500" />,
    path: "/ai-recommendations",
    color: "border-indigo-500",
  },
  {
    title: "Virtual Stylist",
    description: "AI fashion advice based on your preferences",
    icon: <BarChart2 size={20} className="text-purple-500" />,
    path: "/virtual-stylist",
    color: "border-purple-500",
  },
  {
    title: "Habit Tracker",
    description: "Track your daily habits and build consistency",
    icon: <User size={20} className="text-violet-500" />,
    path: "/habits",
    color: "border-violet-500",
  },
];

export default QuickNavigation;
