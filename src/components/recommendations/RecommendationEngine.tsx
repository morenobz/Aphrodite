import { useState, useEffect } from "react";

type RecommendationType = "skincare" | "fitness" | "mental" | "style";

interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  imageUrl?: string;
  difficulty?: "easy" | "medium" | "hard";
  duration?: string;
  tags: string[];
}

interface UserPreferences {
  skinType?: "dry" | "oily" | "combination" | "normal" | "sensitive";
  fitnessLevel?: "beginner" | "intermediate" | "advanced" | "expert";
  mentalFocus?: string[];
  stylePreferences?: string[];
  cyclePhase?: "menstrual" | "follicular" | "ovulatory" | "luteal" | null;
  mood?: string;
}

export const useRecommendationEngine = (userPreferences: UserPreferences) => {
  const [recommendations, setRecommendations] = useState<{
    skincare: Recommendation[];
    fitness: Recommendation[];
    mental: Recommendation[];
    style: Recommendation[];
  }>({
    skincare: [],
    fitness: [],
    mental: [],
    style: [],
  });

  const [loading, setLoading] = useState(true);

  // Mock database of recommendations
  const allRecommendations: Record<RecommendationType, Recommendation[]> = {
    skincare: [
      {
        id: "s1",
        type: "skincare",
        title: "Hydrating Face Mask",
        description: "A soothing mask perfect for dry or sensitive skin types.",
        imageUrl:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80",
        duration: "15 minutes",
        tags: ["dry", "sensitive", "hydration"],
      },
      {
        id: "s2",
        type: "skincare",
        title: "Oil Control Routine",
        description:
          "A three-step routine to manage oily skin and prevent breakouts.",
        imageUrl:
          "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
        duration: "10 minutes",
        tags: ["oily", "acne-prone", "cleansing"],
      },
      {
        id: "s3",
        type: "skincare",
        title: "Gentle Exfoliation",
        description:
          "A mild exfoliation technique suitable for all skin types.",
        imageUrl:
          "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=500&q=80",
        duration: "5 minutes",
        tags: ["all skin types", "exfoliation", "glow"],
      },
      {
        id: "s4",
        type: "skincare",
        title: "Hormonal Acne Treatment",
        description:
          "Targeted care for hormonal breakouts during luteal phase.",
        imageUrl:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80",
        duration: "10 minutes",
        tags: ["hormonal", "acne", "luteal phase"],
      },
      {
        id: "s5",
        type: "skincare",
        title: "Calming Redness Routine",
        description:
          "Soothe irritated skin with these gentle products and techniques.",
        imageUrl:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
        duration: "8 minutes",
        tags: ["sensitive", "redness", "calming"],
      },
    ],
    fitness: [
      {
        id: "f1",
        type: "fitness",
        title: "Low-Impact Morning Stretch",
        description: "Gentle stretching routine to start your day with energy.",
        imageUrl:
          "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=500&q=80",
        difficulty: "easy",
        duration: "10 minutes",
        tags: ["beginner", "stretching", "morning"],
      },
      {
        id: "f2",
        type: "fitness",
        title: "HIIT Cardio Blast",
        description: "High-intensity interval training to boost metabolism.",
        imageUrl:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
        difficulty: "hard",
        duration: "25 minutes",
        tags: ["advanced", "cardio", "weight loss"],
      },
      {
        id: "f3",
        type: "fitness",
        title: "Menstrual Phase Yoga",
        description:
          "Gentle yoga poses designed for comfort during your period.",
        imageUrl:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
        difficulty: "easy",
        duration: "20 minutes",
        tags: ["menstrual phase", "yoga", "comfort"],
      },
      {
        id: "f4",
        type: "fitness",
        title: "Energy-Boosting Workout",
        description:
          "Medium intensity workout perfect for the follicular phase.",
        imageUrl:
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80",
        difficulty: "medium",
        duration: "30 minutes",
        tags: ["follicular phase", "energy", "strength"],
      },
      {
        id: "f5",
        type: "fitness",
        title: "Mood-Lifting Dance Routine",
        description: "Fun dance workout to improve mood and energy levels.",
        imageUrl:
          "https://images.unsplash.com/photo-1535648451240-482a0bbd6e02?w=500&q=80",
        difficulty: "medium",
        duration: "15 minutes",
        tags: ["mood", "dance", "energy"],
      },
    ],
    mental: [
      {
        id: "m1",
        type: "mental",
        title: "Guided Anxiety Relief",
        description: "A calming meditation focused on reducing anxiety.",
        imageUrl:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
        duration: "10 minutes",
        tags: ["anxiety", "meditation", "calm"],
      },
      {
        id: "m2",
        type: "mental",
        title: "Sleep Improvement Routine",
        description:
          "Evening practices to help you fall asleep faster and sleep better.",
        imageUrl:
          "https://images.unsplash.com/photo-1511295742362-92c96b5adb63?w=500&q=80",
        duration: "15 minutes",
        tags: ["sleep", "evening", "relaxation"],
      },
      {
        id: "m3",
        type: "mental",
        title: "PMS Mood Support",
        description:
          "Mindfulness techniques to manage mood swings during luteal phase.",
        imageUrl:
          "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=500&q=80",
        duration: "12 minutes",
        tags: ["luteal phase", "mood", "PMS"],
      },
      {
        id: "m4",
        type: "mental",
        title: "Focus Enhancement",
        description: "Techniques to improve concentration and productivity.",
        imageUrl:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
        duration: "8 minutes",
        tags: ["focus", "productivity", "work"],
      },
      {
        id: "m5",
        type: "mental",
        title: "Self-Compassion Practice",
        description: "Exercises to develop greater kindness toward yourself.",
        imageUrl:
          "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=500&q=80",
        duration: "10 minutes",
        tags: ["self-love", "compassion", "mental health"],
      },
    ],
    style: [
      {
        id: "st1",
        type: "style",
        title: "Minimalist Capsule Wardrobe",
        description:
          "Create a versatile wardrobe with fewer, high-quality pieces.",
        imageUrl:
          "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
        tags: ["minimalist", "capsule", "sustainable"],
      },
      {
        id: "st2",
        type: "style",
        title: "Color Analysis Guide",
        description: "Discover which colors complement your skin tone best.",
        imageUrl:
          "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=500&q=80",
        tags: ["color analysis", "personal style", "skin tone"],
      },
      {
        id: "st3",
        type: "style",
        title: "Comfortable Period Outfits",
        description:
          "Stylish yet comfortable outfit ideas for your menstrual phase.",
        imageUrl:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
        tags: ["menstrual phase", "comfort", "style"],
      },
      {
        id: "st4",
        type: "style",
        title: "Confidence-Boosting Looks",
        description:
          "Outfit formulas designed to help you feel your best during important moments.",
        imageUrl:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80",
        tags: ["confidence", "professional", "special occasion"],
      },
      {
        id: "st5",
        type: "style",
        title: "Seasonal Color Trends",
        description: "Current season color trends and how to incorporate them.",
        imageUrl:
          "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=500&q=80",
        tags: ["trends", "seasonal", "color"],
      },
    ],
  };

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Filter recommendations based on user preferences
      const filteredRecommendations = {
        skincare: filterSkincare(userPreferences),
        fitness: filterFitness(userPreferences),
        mental: filterMental(userPreferences),
        style: filterStyle(userPreferences),
      };

      setRecommendations(filteredRecommendations);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userPreferences]);

  // Filter functions for each recommendation type
  const filterSkincare = (prefs: UserPreferences): Recommendation[] => {
    let filtered = [...allRecommendations.skincare];

    // Filter by skin type if specified
    if (prefs.skinType) {
      filtered = filtered.filter(
        (rec) =>
          rec.tags.includes(prefs.skinType!) ||
          rec.tags.includes("all skin types"),
      );
    }

    // Consider cycle phase for hormonal recommendations
    if (prefs.cyclePhase) {
      const phaseSpecific = filtered.filter((rec) =>
        rec.tags.includes(prefs.cyclePhase + " phase"),
      );

      // If we have phase-specific recommendations, prioritize them
      if (phaseSpecific.length > 0) {
        return [
          ...phaseSpecific,
          ...filtered.filter(
            (rec) => !rec.tags.includes(prefs.cyclePhase + " phase"),
          ),
        ].slice(0, 3);
      }
    }

    // Sort by relevance (this would be more sophisticated in a real app)
    return filtered.slice(0, 3);
  };

  const filterFitness = (prefs: UserPreferences): Recommendation[] => {
    let filtered = [...allRecommendations.fitness];

    // Filter by fitness level if specified
    if (prefs.fitnessLevel) {
      filtered = filtered.filter(
        (rec) =>
          rec.tags.includes(prefs.fitnessLevel!) ||
          (prefs.fitnessLevel === "beginner" && rec.difficulty === "easy") ||
          (prefs.fitnessLevel === "intermediate" &&
            (rec.difficulty === "easy" || rec.difficulty === "medium")) ||
          (prefs.fitnessLevel === "advanced" && rec.difficulty !== "easy"),
      );
    }

    // Consider cycle phase
    if (prefs.cyclePhase) {
      const phaseSpecific = filtered.filter((rec) =>
        rec.tags.includes(prefs.cyclePhase + " phase"),
      );

      if (phaseSpecific.length > 0) {
        return [
          ...phaseSpecific,
          ...filtered.filter(
            (rec) => !rec.tags.includes(prefs.cyclePhase + " phase"),
          ),
        ].slice(0, 3);
      }
    }

    // Consider mood
    if (prefs.mood) {
      const moodSpecific = filtered.filter((rec) =>
        rec.tags.includes(prefs.mood),
      );

      if (moodSpecific.length > 0) {
        filtered = [
          ...moodSpecific,
          ...filtered.filter((rec) => !rec.tags.includes(prefs.mood!)),
        ];
      }
    }

    return filtered.slice(0, 3);
  };

  const filterMental = (prefs: UserPreferences): Recommendation[] => {
    let filtered = [...allRecommendations.mental];

    // Filter by mental focus areas if specified
    if (prefs.mentalFocus && prefs.mentalFocus.length > 0) {
      const focusFiltered = filtered.filter((rec) =>
        prefs.mentalFocus!.some((focus) => rec.tags.includes(focus)),
      );

      if (focusFiltered.length > 0) {
        filtered = focusFiltered;
      }
    }

    // Consider cycle phase
    if (prefs.cyclePhase) {
      const phaseSpecific = filtered.filter((rec) =>
        rec.tags.includes(prefs.cyclePhase + " phase"),
      );

      if (phaseSpecific.length > 0) {
        return [
          ...phaseSpecific,
          ...filtered.filter(
            (rec) => !rec.tags.includes(prefs.cyclePhase + " phase"),
          ),
        ].slice(0, 3);
      }
    }

    // Consider mood
    if (prefs.mood) {
      const moodSpecific = filtered.filter((rec) =>
        rec.tags.includes(prefs.mood),
      );

      if (moodSpecific.length > 0) {
        filtered = [
          ...moodSpecific,
          ...filtered.filter((rec) => !rec.tags.includes(prefs.mood!)),
        ];
      }
    }

    return filtered.slice(0, 3);
  };

  const filterStyle = (prefs: UserPreferences): Recommendation[] => {
    let filtered = [...allRecommendations.style];

    // Filter by style preferences if specified
    if (prefs.stylePreferences && prefs.stylePreferences.length > 0) {
      const styleFiltered = filtered.filter((rec) =>
        prefs.stylePreferences!.some((style) => rec.tags.includes(style)),
      );

      if (styleFiltered.length > 0) {
        filtered = styleFiltered;
      }
    }

    // Consider cycle phase
    if (prefs.cyclePhase) {
      const phaseSpecific = filtered.filter((rec) =>
        rec.tags.includes(prefs.cyclePhase + " phase"),
      );

      if (phaseSpecific.length > 0) {
        return [
          ...phaseSpecific,
          ...filtered.filter(
            (rec) => !rec.tags.includes(prefs.cyclePhase + " phase"),
          ),
        ].slice(0, 3);
      }
    }

    return filtered.slice(0, 3);
  };

  return { recommendations, loading };
};
