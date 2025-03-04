import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import LoginForm from "./LoginForm";
import OnboardingFlow from "./OnboardingFlow";
import Dashboard from "../dashboard/Dashboard";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // Skip actual Supabase calls in development without credentials
        if (
          supabase.supabaseUrl === "https://placeholder-project.supabase.co"
        ) {
          console.log(
            "Using mock authentication - no Supabase credentials provided",
          );
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data.session);

        // Check if user has completed onboarding
        if (data.session) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("has_completed_onboarding")
            .eq("id", data.session.user.id)
            .single();

          if (profileError) throw profileError;

          // If profile exists but onboarding not completed
          if (profile && !profile.has_completed_onboarding) {
            setIsNewUser(true);
          }
        }
      } catch (error: any) {
        console.error("Error checking session:", error.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setLoading(true);

        if (event === "SIGNED_IN" && session) {
          // Check if new user
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("has_completed_onboarding")
            .eq("id", session.user.id)
            .single();

          if (error && error.code !== "PGRST116") {
            console.error("Error fetching profile:", error);
          }

          // If no profile or onboarding not completed
          if (!profile || !profile.has_completed_onboarding) {
            setIsNewUser(true);
          }
        }

        setLoading(false);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = async () => {
    try {
      if (session) {
        // Update profile to mark onboarding as completed
        const { error } = await supabase.from("profiles").upsert({
          id: session.user.id,
          has_completed_onboarding: true,
          updated_at: new Date(),
        });

        if (error) throw error;
        setIsNewUser(false);
      }
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is not authenticated, show login form
  if (!session) {
    return (
      <LoginForm onLogin={handleLogin} isLoading={loading} error={error} />
    );
  }

  // If user is authenticated but hasn't completed onboarding
  if (isNewUser) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // If user is authenticated and has completed onboarding, show dashboard or children
  return children ? <>{children}</> : <Dashboard />;
};

export default AuthLayout;
