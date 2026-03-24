"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/app/components/BottomNav";
import TopBar from "@/app/components/TopBar";
import { createClient } from "@/lib/supabase/client";

// Cache the auth check result
let authCache: { checked: boolean; authenticated: boolean } = { checked: false, authenticated: false };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(!authCache.checked);
  const [isAuthenticated, setIsAuthenticated] = useState(authCache.authenticated);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    if (authCache.checked) {
      setIsAuthenticated(authCache.authenticated);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    authCache.checked = true;
    authCache.authenticated = !!session;
    
    if (!session) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    checkAuth();

    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        authCache = { checked: true, authenticated: false };
        router.push("/login");
      } else if (event === "SIGNED_IN") {
        authCache = { checked: true, authenticated: true };
        setIsAuthenticated(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAuth, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: "28px",
          height: "28px",
          border: "3px solid rgba(254,44,85,0.2)",
          borderTopColor: "#fe2c55",
          borderRadius: "50%",
          animation: "spin 0.6s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000", position: "relative" }}>
      <TopBar />
      <main style={{ 
        paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))", 
        minHeight: "100vh" 
      }}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
