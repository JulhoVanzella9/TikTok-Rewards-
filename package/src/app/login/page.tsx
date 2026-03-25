"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import RefundModal from "@/app/components/RefundModal";
import ReferralWelcomePopup from "@/app/components/ReferralWelcomePopup";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [socialProvider, setSocialProvider] = useState<string | null>(null);

  const getRedirectUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/auth/callback`;
    }
    return process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      : "/auth/callback";
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "email" && email) {
      setStep("password");
    } else if (step === "password") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();

    if (isSignUp) {
      // First try to sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: email.split("@")[0],
            username: email.split("@")[0],
          },
        },
      });
      
      if (error) {
        // If user already exists, try to sign in instead
        if (error.message.includes("already registered")) {
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (signInError) {
            setError(signInError.message);
          } else if (signInData?.session) {
            window.location.href = "/";
          }
        } else {
          setError(error.message);
        }
      } else if (data.session) {
        // Direct login after signup (no email confirmation needed)
        // Process referral if exists
        const savedReferralCode = localStorage.getItem("referralCode") || referralCode;
        if (savedReferralCode && data.user) {
          try {
            await fetch("/api/referral/process", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                referralCode: savedReferralCode,
                userId: data.user.id 
              }),
            });
            localStorage.removeItem("referralCode");
          } catch (err) {
            console.log("Referral process error:", err);
          }
        }
        window.location.href = "/";
      } else if (data.user && !data.session) {
        // If no session but user exists, try to sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message);
        } else if (signInData?.session) {
          window.location.href = "/";
        }
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else if (data?.session) {
        window.location.href = "/";
      }
    }

    setLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    // Show email/password form with social provider branding
    setSocialProvider(provider);
    setIsSignUp(true);
    setStep("email");
    setError("");
  };

  const resetForm = () => {
    setError("");
    setSuccess("");
    setStep("email");
    setPassword("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #0a0a1a 0%, #000000 50%, #0a0512 100%)",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute", top: "-10%", right: "-10%",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(254,44,85,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "-10%", left: "-10%",
            width: "350px", height: "350px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,244,238,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "100%", maxWidth: "400px",
          background: "linear-gradient(145deg, rgba(26,26,46,0.98) 0%, rgba(18,18,30,0.99) 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "32px 28px",
          position: "relative",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px", position: "relative" }}>
          {(step === "password" || socialProvider) && (
            <button
              onClick={() => { 
                setStep("email"); 
                setError(""); 
                if (socialProvider) {
                  setSocialProvider(null);
                  setIsSignUp(false);
                }
              }}
              style={{
                position: "absolute", left: 0,
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.6)", padding: "4px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>
              {socialProvider ? `Continue with ${socialProvider}` : "Log in to TikTok Rewards"}
            </h1>
          </div>
        </div>

        {/* Error/Success messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                padding: "12px 16px", borderRadius: "12px",
                background: "rgba(254,44,85,0.1)",
                border: "1px solid rgba(254,44,85,0.2)",
                color: "#fe2c55", fontSize: "13px", fontWeight: 500,
                marginBottom: "16px", textAlign: "center",
              }}
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                padding: "12px 16px", borderRadius: "12px",
                background: "rgba(37,244,238,0.1)",
                border: "1px solid rgba(37,244,238,0.2)",
                color: "#25f4ee", fontSize: "13px", fontWeight: 500,
                marginBottom: "16px", textAlign: "center",
              }}
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleContinue}>
          {/* Email input - always visible */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                borderRadius: "12px",
                border: focusedField === "email" ? "2px solid #fe2c55" : "2px solid rgba(255,255,255,0.12)",
                transition: "all 0.2s",
                overflow: "hidden",
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                disabled={step === "password"}
                style={{
                  width: "100%", padding: "16px 18px", fontSize: "15px",
                  background: "transparent",
                  border: "none", color: "#fff", outline: "none", fontFamily: "inherit",
                  opacity: step === "password" ? 0.6 : 1,
                }}
              />
            </div>
          </div>

          {/* Password input - only in password step */}
          <AnimatePresence>
            {step === "password" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginBottom: "16px" }}
              >
                <div
                  style={{
                    borderRadius: "12px",
                    border: focusedField === "password" ? "2px solid #fe2c55" : "2px solid rgba(255,255,255,0.12)",
                    transition: "all 0.2s",
                    overflow: "hidden",
                    background: "rgba(0,0,0,0.4)",
                  }}
                >
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    required
                    minLength={6}
                    autoFocus
                    style={{
                      width: "100%", padding: "16px 18px", fontSize: "15px",
                      background: "transparent",
                      border: "none", color: "#fff", outline: "none", fontFamily: "inherit",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continue button */}
          <motion.button
            type="submit"
            disabled={loading || (step === "email" && !email) || (step === "password" && !password)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{
              width: "100%", padding: "16px", fontSize: "16px", fontWeight: 700,
              background: "#fe2c55",
              color: "#fff", border: "none", borderRadius: "12px",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              opacity: loading || (step === "email" && !email) || (step === "password" && !password) ? 0.6 : 1,
              marginBottom: "20px",
            }}
          >
            {loading ? "Loading..." : "Continue"}
          </motion.button>
        </form>

        {/* OR divider */}
        {step === "email" && !socialProvider && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>OR</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
            </div>

            {/* Social login buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                style={{
                  width: "100%", padding: "14px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
                  cursor: "pointer", color: "#fff", fontSize: "15px", fontWeight: 600,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button>

              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                style={{
                  width: "100%", padding: "14px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
                  cursor: "pointer", color: "#fff", fontSize: "15px", fontWeight: 600,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Apple")}
                style={{
                  width: "100%", padding: "14px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
                  cursor: "pointer", color: "#fff", fontSize: "15px", fontWeight: 600,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* Request Refund button */}
            <button
              type="button"
              onClick={() => setShowRefundModal(true)}
              style={{
                width: "100%", padding: "14px 18px",
                background: "rgba(45, 45, 80, 0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                cursor: "pointer", color: "#fff", fontSize: "15px", fontWeight: 600,
                fontFamily: "inherit",
                marginBottom: "20px",
              }}
            >
              Request Refund
            </button>
          </>
        )}

        {/* Toggle sign up */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <button
            onClick={() => { setIsSignUp(!isSignUp); resetForm(); }}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.5)", fontSize: "14px",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            {isSignUp ? (
              <>Already have an account? <span style={{ color: "#fe2c55", fontWeight: 600 }}>Log in</span></>
            ) : (
              <>{"Don't have an account?"} <span style={{ color: "#fe2c55", fontWeight: 600 }}>Sign up</span></>
            )}
          </button>
        </div>

        {/* Terms */}
        <p
          style={{
            textAlign: "center", fontSize: "11px", color: "rgba(255,255,255,0.35)",
            lineHeight: 1.6,
          }}
        >
          {"By continuing, you agree to our "}
          <span style={{ color: "#fe2c55", fontWeight: 600 }}>Terms of Service</span>
          {" and acknowledge that you have read our "}
          <span style={{ fontWeight: 600, color: "#fff" }}>Privacy Policy</span>.
        </p>
      </motion.div>

      {/* Refund Modal */}
      <RefundModal isOpen={showRefundModal} onClose={() => setShowRefundModal(false)} />
      
      {/* Referral Welcome Popup */}
      <ReferralWelcomePopup referralCode={referralCode} />
    </div>
  );
}
