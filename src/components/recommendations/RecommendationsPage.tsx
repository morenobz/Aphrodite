import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRecommendationEngine } from "./RecommendationEngine";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  Sparkles,
  Shirt,
  ArrowRight,
  BookmarkPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecommendationsPageProps {
  userName?: string;
}

const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  userName = "Sarah",
}) => {
  // Mock user preferences - in a real app, these would come from user settings
  const [userPreferences, setUserPreferences] = useState({
    skinType: "combination" as const,
    fitnessLevel: "intermediate" as const,
    mentalFocus: ["anxiety", "sleep"],
    stylePreferences: ["minimalist", "professional"],
    cyclePhase: "follicular" as const,
    mood: "energetic",
  });

  const { recommendations, loading } = useRecommendationEngine(userPreferences);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const getTabIcon = (tabId: string) => {
    switch (tabId) {
      case "skincare":
        return <Sparkles className="h-5 w-5 text-pink-500" />;
      case "fitness":
        return <Heart className="h-5 w-5 text-purple-500" />;
      case "mental":
        return <Calendar className="h-5 w-5 text-indigo-500" />;
      case "style":
        return <Shirt className="h-5 w-5 text-violet-500" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  const getCyclePhaseText = (phase: string) => {
    switch (phase) {
      case "follicular":
        return "Follicular Phase (Days 1-14)";
      case "ovulatory":
        return "Ovulation Phase (Days 14-17)";
      case "luteal":
        return "Luteal Phase (Days 17-28)";
      case "menstrual":
        return "Menstrual Phase (Days 1-5)";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800"
          >
            Your Personalized Recommendations
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2"
          >
            <p className="text-gray-600">Tailored just for you, {userName}</p>
            {userPreferences.cyclePhase && (
              <Badge
                variant="outline"
                className="bg-pink-50 text-pink-700 border-pink-200 px-3 py-1"
              >
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {getCyclePhaseText(userPreferences.cyclePhase)}
              </Badge>
            )}
          </motion.div>
        </header>

        <Tabs defaultValue="skincare" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger
              value="skincare"
              className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
            >
              {getTabIcon("skincare")}
              <span className="ml-2">Skincare</span>
            </TabsTrigger>
            <TabsTrigger
              value="fitness"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              {getTabIcon("fitness")}
              <span className="ml-2">Fitness</span>
            </TabsTrigger>
            <TabsTrigger
              value="mental"
              className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700"
            >
              {getTabIcon("mental")}
              <span className="ml-2">Mental</span>
            </TabsTrigger>
            <TabsTrigger
              value="style"
              className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
            >
              {getTabIcon("style")}
              <span className="ml-2">Style</span>
            </TabsTrigger>
          </TabsList>

          {/* Skincare Tab */}
          <TabsContent value="skincare">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {recommendations.skincare.map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    color="pink"
                    icon={<Sparkles className="h-5 w-5 text-pink-500" />}
                    variants={itemVariants}
                  />
                ))}
              </motion.div>
            )}
          </TabsContent>

          {/* Fitness Tab */}
          <TabsContent value="fitness">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {recommendations.fitness.map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    color="purple"
                    icon={<Heart className="h-5 w-5 text-purple-500" />}
                    variants={itemVariants}
                  />
                ))}
              </motion.div>
            )}
          </TabsContent>

          {/* Mental Tab */}
          <TabsContent value="mental">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {recommendations.mental.map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    color="indigo"
                    icon={<Calendar className="h-5 w-5 text-indigo-500" />}
                    variants={itemVariants}
                  />
                ))}
              </motion.div>
            )}
          </TabsContent>

          {/* Style Tab */}
          <TabsContent value="style">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {recommendations.style.map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    color="violet"
                    icon={<Shirt className="h-5 w-5 text-violet-500" />}
                    variants={itemVariants}
                  />
                ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface RecommendationCardProps {
  recommendation: any;
  color: "pink" | "purple" | "indigo" | "violet";
  icon: React.ReactNode;
  variants: any;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  color,
  icon,
  variants,
}) => {
  const colorClasses = {
    pink: {
      border: "border-pink-200",
      bg: "bg-pink-50",
      text: "text-pink-700",
      button: "bg-pink-500 hover:bg-pink-600",
      badge: "bg-pink-100 text-pink-700",
    },
    purple: {
      border: "border-purple-200",
      bg: "bg-purple-50",
      text: "text-purple-700",
      button: "bg-purple-500 hover:bg-purple-600",
      badge: "bg-purple-100 text-purple-700",
    },
    indigo: {
      border: "border-indigo-200",
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      button: "bg-indigo-500 hover:bg-indigo-600",
      badge: "bg-indigo-100 text-indigo-700",
    },
    violet: {
      border: "border-violet-200",
      bg: "bg-violet-50",
      text: "text-violet-700",
      button: "bg-violet-500 hover:bg-violet-600",
      badge: "bg-violet-100 text-violet-700",
    },
  };

  return (
    <motion.div variants={variants}>
      <Card
        className={`overflow-hidden border ${colorClasses[color].border} hover:shadow-md transition-shadow duration-300 h-full flex flex-col`}
      >
        {recommendation.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={recommendation.imageUrl}
              alt={recommendation.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-3 right-3">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8"
              >
                <BookmarkPlus className="h-4 w-4 text-gray-700" />
              </Button>
            </div>
          </div>
        )}
        <CardHeader className={`${colorClasses[color].bg} pb-2`}>
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{recommendation.title}</CardTitle>
          </div>
          {recommendation.duration && (
            <Badge
              variant="outline"
              className={`${colorClasses[color].badge} font-normal mt-1`}
            >
              {recommendation.duration}
            </Badge>
          )}
          {recommendation.difficulty && (
            <Badge
              variant="outline"
              className={`${colorClasses[color].badge} font-normal mt-1 ml-2`}
            >
              {recommendation.difficulty.charAt(0).toUpperCase() +
                recommendation.difficulty.slice(1)}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="py-4 flex-grow">
          <CardDescription className="text-gray-600">
            {recommendation.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-3">
            {recommendation.tags
              .slice(0, 3)
              .map((tag: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-gray-50"
                >
                  {tag}
                </Badge>
              ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button className={`w-full text-white ${colorClasses[color].button}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RecommendationsPage;
