"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/context";

export default function LoginPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getRedirectUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/auth/callback`;
    }
    return process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      : "/auth/callback";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();

    if (isForgotPassword) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getRedirectUrl()}?type=recovery`,
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(t("checkEmail"));
      }
    } else if (isSignUp) {
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
        setError(error.message);
      } else if (data.user) {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) {
          setError(loginError.message);
        } else {
          window.location.href = "/";
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        window.location.href = "/";
      }
    }

    setLoading(false);
  };

  const resetForm = () => {
    setError("");
    setSuccess("");
    setEmail("");
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

      <div
        style={{
          width: "100%", maxWidth: "420px",
          background: "linear-gradient(145deg, rgba(26,26,46,0.95) 0%, rgba(18,18,30,0.98) 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "40px 32px",
          position: "relative",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              width: "60px", height: "60px", borderRadius: "16px",
              background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "28px", color: "#fff",
              margin: "0 auto 16px",
              boxShadow: "0 0 30px rgba(254,44,85,0.3)",
            }}
          >
            {isForgotPassword ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path d="M34.1451 10.7141C32.6227 8.99576 31.7497 6.78498 31.7459 4.5H25.0962V31.8C25.0485 33.1951 24.476 34.5201 23.4919 35.5048C22.5078 36.4895 21.1879 37.0605 19.8069 37.1045C16.8878 37.1045 14.5152 34.6973 14.5152 31.7318C14.5152 28.1641 17.8969 25.4473 21.4098 26.4891V19.6636C14.1598 18.7705 7.84152 24.4773 7.84152 31.7318C7.84152 38.7864 13.6098 43.8 19.7911 43.8C26.4098 43.8 31.7459 38.3914 31.7459 31.7318V17.8623C34.4179 19.7873 37.6319 20.8187 40.9311 20.8145V14.0682C40.9311 14.0682 37.0789 14.2377 34.1451 10.7141Z" fill="white"/>
              </svg>
            )}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: "4px" }}>
            {isForgotPassword ? t("recoverPassword") : isSignUp ? t("createAccount") : "TikTok Rewards"}
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
            {isForgotPassword
              ? "Enter your email to receive the link"
              : isSignUp
                ? "Create your account to get started"
                : "Welcome back!"}
          </p>
        </div>

        {/* Error/Success messages */}
        {error && (
          <div
            style={{
              padding: "12px 16px", borderRadius: "12px",
              background: "rgba(254,44,85,0.1)",
              border: "1px solid rgba(254,44,85,0.2)",
              color: "#fe2c55", fontSize: "13px", fontWeight: 600,
              marginBottom: "16px", textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              padding: "12px 16px", borderRadius: "12px",
              background: "rgba(37,244,238,0.1)",
              border: "1px solid rgba(37,244,238,0.2)",
              color: "#25f4ee", fontSize: "13px", fontWeight: 600,
              marginBottom: "16px", textAlign: "center",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                position: "relative", borderRadius: "12px",
                border: focusedField === "email" ? "2px solid var(--tiktok-red)" : "2px solid rgba(255,255,255,0.1)",
                transition: "border-color 0.3s, box-shadow 0.3s",
                boxShadow: focusedField === "email" ? "0 0 0 4px rgba(254,44,85,0.1)" : "none",
                overflow: "hidden",
              }}
            >
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                style={{
                  width: "100%", padding: "16px 18px", fontSize: "16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "none", color: "#fff", outline: "none", fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          {/* Password input */}
          {!isForgotPassword && (
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  position: "relative", borderRadius: "12px",
                  border: focusedField === "password" ? "2px solid var(--tiktok-red)" : "2px solid rgba(255,255,255,0.1)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  boxShadow: focusedField === "password" ? "0 0 0 4px rgba(254,44,85,0.1)" : "none",
                  overflow: "hidden",
                }}
              >
                <input
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  minLength={6}
                  style={{
                    width: "100%", padding: "16px 18px", fontSize: "16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "none", color: "#fff", outline: "none", fontFamily: "inherit",
                  }}
                />
              </div>
            </div>
          )}

          {/* Forgot password link */}
          {!isSignUp && !isForgotPassword && (
            <div style={{ textAlign: "right", marginBottom: "16px" }}>
              <button
                type="button"
                onClick={() => { setIsForgotPassword(true); resetForm(); }}
                style={{
                  background: "none", border: "none", color: "#fe2c55",
                  fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {t("forgotPassword")}
              </button>
            </div>
          )}

          {/* Submit button */}
          <div style={{ marginBottom: "24px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "16px", fontSize: "16px", fontWeight: 700,
                background: "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)",
                color: "#fff", border: "none", borderRadius: "16px",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit", letterSpacing: "0.3px",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 4px 15px rgba(254,44,85,0.3), inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 0 #c41e40",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseOver={(e) => { if (!loading) e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {loading
                ? t("loading")
                : isForgotPassword
                  ? t("sendRecoveryEmail")
                  : isSignUp
                    ? t("createAccount")
                    : t("login")}
            </button>
          </div>
        </form>

        {/* Toggle sign up / login / forgot password */}
        <div style={{ textAlign: "center" }}>
          {isForgotPassword ? (
            <button
              onClick={() => { setIsForgotPassword(false); resetForm(); }}
              style={{
                background: "none", border: "none",
                color: "rgba(255,255,255,0.5)", fontSize: "14px",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              <span style={{ color: "#fe2c55", fontWeight: 700 }}>{t("backToLogin")}</span>
            </button>
          ) : (
            <button
              onClick={() => { setIsSignUp(!isSignUp); resetForm(); }}
              style={{
                background: "none", border: "none",
                color: "rgba(255,255,255,0.5)", fontSize: "14px",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              {isSignUp ? (
                <>{t("hasAccount")} <span style={{ color: "#fe2c55", fontWeight: 700 }}>{t("login")}</span></>
              ) : (
                <>{t("noAccount")} <span style={{ color: "#fe2c55", fontWeight: 700 }}>{t("signUp")}</span></>
              )}
            </button>
          )}
        </div>

        {/* Terms */}
        <p
          style={{
            textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.35)",
            marginTop: "20px", lineHeight: 1.6,
          }}
        >
          {"By continuing, you agree to our "}
          <a href="/terms" style={{ color: "var(--tiktok-red)", fontWeight: 600, cursor: "pointer" }}>
            {t("termsOfUse")}
          </a>
          {" and acknowledge that you have read our "}
          <a href="/privacy" style={{ fontWeight: 600, color: "#fff", cursor: "pointer" }}>
            {t("privacyPolicy")}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
