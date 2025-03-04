import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import AppRoutes from "./routes/AppRoutes";

const Home: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error: any) {
        console.error("Error checking session:", error.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <AppRoutes />
    </div>
  );
};

export default Home;
