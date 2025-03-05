import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";
import Dashboard from "../dashboard/Dashboard";
import LoginForm from "../auth/LoginForm";
import OnboardingFlow from "../auth/OnboardingFlow";
import RecommendationsPage from "../recommendations/RecommendationsPage";
import AIRecommendationsPage from "../ai/AIRecommendationsPage";
import VirtualStylist from "../ai/VirtualStylist";
import PeriodTracker from "../tracking/PeriodTracker";
import HabitTracker from "../habits/HabitTracker";
import DailyRoutineBuilder from "../routines/DailyRoutineBuilder";
import LandingPage from "../../pages/LandingPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<LoginForm />} />
      <Route path="/onboarding" element={<OnboardingFlow />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <AuthLayout>
            <Dashboard />
          </AuthLayout>
        }
      />

      <Route
        path="/recommendations"
        element={
          <AuthLayout>
            <RecommendationsPage />
          </AuthLayout>
        }
      />

      <Route
        path="/ai-recommendations"
        element={
          <AuthLayout>
            <AIRecommendationsPage />
          </AuthLayout>
        }
      />

      <Route
        path="/virtual-stylist"
        element={
          <AuthLayout>
            <VirtualStylist />
          </AuthLayout>
        }
      />

      <Route
        path="/period-tracker"
        element={
          <AuthLayout>
            <PeriodTracker />
          </AuthLayout>
        }
      />

      <Route
        path="/habits"
        element={
          <AuthLayout>
            <HabitTracker />
          </AuthLayout>
        }
      />

      <Route
        path="/daily-routine"
        element={
          <AuthLayout>
            <DailyRoutineBuilder />
          </AuthLayout>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
