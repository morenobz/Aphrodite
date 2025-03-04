import { useState, useEffect } from "react";
import { UserPreferences } from "@/types/user";

export type RecommendationType =
  | "skincare"
  | "fitness"
  | "mental"
  | "style"
  | "nutrition";

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  imageUrl?: string;
  difficulty?: "easy" | "medium" | "hard";
  duration?: string;
  tags: string[];
  aiGenerated: boolean;
  personalizedReason?: string;
}

export interface AIRecommendationResponse {
  recommendations: Record<RecommendationType, Recommendation[]>;
  loading: boolean;
  error: string | null;
  refreshRecommendations: () => void;
}

export const useAIRecommendationEngine = (
  userPreferences: UserPreferences,
  cyclePhase?: string | null,
  mood?: string | null,
): AIRecommendationResponse => {
  const [recommendations, setRecommendations] = useState<
    Record<RecommendationType, Recommendation[]>
  >({
    skincare: [],
    fitness: [],
    mental: [],
    style: [],
    nutrition: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateAIRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call to an AI service
      // For now, we'll simulate AI-generated recommendations

      // Wait for a simulated API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate personalized recommendations based on user preferences
      const aiRecommendations = generatePersonalizedRecommendations(
        userPreferences,
        cyclePhase,
        mood,
      );

      setRecommendations(aiRecommendations);
    } catch (err) {
      console.error("Error generating AI recommendations:", err);
      setError("Failed to generate recommendations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateAIRecommendations();
  }, [userPreferences, cyclePhase, mood]);

  const refreshRecommendations = () => {
    generateAIRecommendations();
  };

  return { recommendations, loading, error, refreshRecommendations };
};

// Helper function to generate personalized recommendations
function generatePersonalizedRecommendations(
  preferences: UserPreferences,
  cyclePhase?: string | null,
  mood?: string | null,
): Record<RecommendationType, Recommendation[]> {
  // This would be much more sophisticated in a real AI implementation
  // For now, we'll create some sample recommendations based on the inputs

  const skinType = preferences.skinType || "normal";
  const fitnessLevel = preferences.fitnessLevel || "beginner";
  const mentalFocus = preferences.mentalFocus || [];
  const stylePreferences = preferences.stylePreferences || [];

  // Sample AI-generated recommendations
  const skincare: Recommendation[] = [
    {
      id: "ai-skin-1",
      type: "skincare",
      title: `AI Routine for ${skinType.charAt(0).toUpperCase() + skinType.slice(1)} Skin`,
      description: `A personalized skincare routine designed specifically for your ${skinType} skin type, considering your current concerns and goals.`,
      imageUrl:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
      duration: "10 minutes",
      tags: [skinType, "personalized", "AI-generated"],
      aiGenerated: true,
      personalizedReason: `Based on your ${skinType} skin type and current concerns, this routine focuses on optimal hydration and protection.`,
    },
    {
      id: "ai-skin-2",
      type: "skincare",
      title: cyclePhase ? `${cyclePhase} Phase Skincare` : "Adaptive Skincare",
      description:
        "Skincare recommendations that adapt to your hormonal cycle for optimal results.",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80",
      duration: "8 minutes",
      tags: [cyclePhase || "adaptive", "hormonal balance", "skincare"],
      aiGenerated: true,
      personalizedReason: cyclePhase
        ? `During your ${cyclePhase} phase, your skin needs specific care to address hormonal changes.`
        : "This routine adapts to your current skin needs.",
    },
  ];

  const fitness: Recommendation[] = [
    {
      id: "ai-fitness-1",
      type: "fitness",
      title: `AI ${fitnessLevel.charAt(0).toUpperCase() + fitnessLevel.slice(1)} Workout Plan`,
      description: `A personalized workout routine tailored to your ${fitnessLevel} fitness level and goals.`,
      imageUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
      difficulty:
        fitnessLevel === "beginner"
          ? "easy"
          : fitnessLevel === "intermediate"
            ? "medium"
            : "hard",
      duration: "25 minutes",
      tags: [fitnessLevel, "personalized", "AI-generated"],
      aiGenerated: true,
      personalizedReason: `This workout is designed for your ${fitnessLevel} level, focusing on progressive improvement while preventing burnout.`,
    },
    {
      id: "ai-fitness-2",
      type: "fitness",
      title: mood
        ? `Mood-Boosting ${mood.charAt(0).toUpperCase() + mood.slice(1)} Workout`
        : "Energy-Balancing Exercise",
      description:
        "Exercise designed to complement and enhance your current mood state.",
      imageUrl:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80",
      difficulty: "medium",
      duration: "20 minutes",
      tags: [mood || "balanced", "mood-enhancement", "energy"],
      aiGenerated: true,
      personalizedReason: mood
        ? `When you're feeling ${mood}, this workout helps optimize your energy and mental state.`
        : "This workout adapts to your current energy levels.",
    },
  ];

  const mental: Recommendation[] = [
    {
      id: "ai-mental-1",
      type: "mental",
      title:
        mentalFocus.length > 0
          ? `AI ${mentalFocus[0].charAt(0).toUpperCase() + mentalFocus[0].slice(1)} Support`
          : "Mental Wellness Boost",
      description:
        "Personalized mental wellness practices based on your current focus areas and needs.",
      imageUrl:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
      duration: "15 minutes",
      tags: [...mentalFocus, "mindfulness", "personalized"],
      aiGenerated: true,
      personalizedReason:
        mentalFocus.length > 0
          ? `Focusing on your ${mentalFocus.join(", ")} concerns with targeted mental wellness techniques.`
          : "General mental wellness support tailored to your profile.",
    },
    {
      id: "ai-mental-2",
      type: "mental",
      title: cyclePhase
        ? `${cyclePhase} Phase Mental Support`
        : "Adaptive Mental Wellness",
      description:
        "Mental wellness practices that adapt to your hormonal cycle and current mood.",
      imageUrl:
        "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=500&q=80",
      duration: "10 minutes",
      tags: [cyclePhase || "adaptive", "hormonal balance", "mental"],
      aiGenerated: true,
      personalizedReason: cyclePhase
        ? `During your ${cyclePhase} phase, these mental wellness techniques help balance mood fluctuations.`
        : "These techniques adapt to your current mental state.",
    },
  ];

  const style: Recommendation[] = [
    {
      id: "ai-style-1",
      type: "style",
      title:
        stylePreferences.length > 0
          ? `AI ${stylePreferences[0].charAt(0).toUpperCase() + stylePreferences[0].slice(1)} Style Guide`
          : "Personal Style Enhancement",
      description:
        "Personalized style recommendations based on your preferences and current trends.",
      imageUrl:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
      tags: [...stylePreferences, "personalized", "current trends"],
      aiGenerated: true,
      personalizedReason:
        stylePreferences.length > 0
          ? `Enhancing your ${stylePreferences.join(", ")} style preferences with personalized recommendations.`
          : "Style recommendations based on your profile and current trends.",
    },
    {
      id: "ai-style-2",
      type: "style",
      title: cyclePhase
        ? `${cyclePhase} Phase Style Guide`
        : "Adaptive Style Guide",
      description:
        "Style recommendations that adapt to your hormonal cycle and comfort needs.",
      imageUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
      tags: [cyclePhase || "adaptive", "comfort", "style"],
      aiGenerated: true,
      personalizedReason: cyclePhase
        ? `During your ${cyclePhase} phase, these style choices optimize both comfort and confidence.`
        : "These style recommendations adapt to your current comfort needs.",
    },
  ];

  const nutrition: Recommendation[] = [
    {
      id: "ai-nutrition-1",
      type: "nutrition",
      title: "AI Personalized Meal Plan",
      description:
        "Nutritional recommendations tailored to your health goals and preferences.",
      imageUrl:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
      duration: "Weekly plan",
      tags: ["balanced", "personalized", "nutrition"],
      aiGenerated: true,
      personalizedReason:
        "These meal suggestions are designed to support your overall wellness goals while considering your preferences.",
    },
    {
      id: "ai-nutrition-2",
      type: "nutrition",
      title: cyclePhase
        ? `${cyclePhase} Phase Nutrition`
        : "Hormone-Balancing Nutrition",
      description:
        "Nutritional recommendations that support hormonal balance throughout your cycle.",
      imageUrl:
        "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500&q=80",
      duration: "Daily suggestions",
      tags: [cyclePhase || "hormonal balance", "nutrition", "wellness"],
      aiGenerated: true,
      personalizedReason: cyclePhase
        ? `During your ${cyclePhase} phase, these foods help support your body's changing nutritional needs.`
        : "These nutritional choices support hormonal balance throughout your cycle.",
    },
  ];

  return {
    skincare,
    fitness,
    mental,
    style,
    nutrition,
  };
}
