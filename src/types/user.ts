export interface UserPreferences {
  skinType?: "dry" | "oily" | "combination" | "normal" | "sensitive";
  fitnessLevel?: "beginner" | "intermediate" | "advanced" | "expert";
  mentalFocus?: string[];
  stylePreferences?: string[];
  nutritionPreferences?: string[];
  healthGoals?: string[];
  allergies?: string[];
  sleepHours?: number;
  stressLevel?: "low" | "moderate" | "high" | "severe";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  dateOfBirth?: string;
  preferences: UserPreferences;
  hasCompletedOnboarding: boolean;
  createdAt: string;
  updatedAt: string;
}
