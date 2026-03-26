"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { useTheme } from "@/lib/theme/context";
import { createClient } from "@/lib/supabase/client";
import ParticleField from "../components/ParticleField";
import ScrollReveal from "../components/ScrollReveal";
import Link from "next/link";

// Premium animation variants with spring physics
const fadeIn = { 
  hidden: { opacity: 0, y: 20, scale: 0.97 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    }
  } 
};

export default function HomePage() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadBalance = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("total_xp")
        .eq("id", user.id)
        .single();
      if (profile) {
        setBalance((profile.total_xp || 0) / 10000);
      }
    };
    loadBalance();
  }, []);

  return (
    <div style={{ 
      padding: "clamp(8px, 2vw, 24px) clamp(12px, 3vw, 40px)", 
      maxWidth: "800px", 
      margin: "0 auto",
      color: "var(--text-primary)",
      transition: "color 0.3s ease",
      paddingBottom: "100px",
      position: "relative",
    }}>
      {/* Interactive Particle Background - reduced for mobile performance */}
      <ParticleField 
        particleCount={15}
        interactive={false}
        className="gpu-accelerated"
      />
      {/* Balance Display */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          display: "flex", alignItems: "center", justifyContent: "flex-end", 
          marginBottom: "12px",
        }}
      >
        <div style={{ 
          display: "flex", alignItems: "center", gap: "6px",
          padding: "6px 12px",
          background: "rgba(0,0,0,0.6)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 500 }}>Balance</span>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
            ${balance.toFixed(2)}
          </span>
        </div>
      </motion.div>
      {/* Video Tutorial Section - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: "clamp(16px, 2vw, 24px)", 
          overflow: "hidden", 
          marginBottom: "clamp(12px, 2vw, 24px)",
          background: isDarkMode 
            ? "linear-gradient(135deg, rgba(254,44,85,0.08) 0%, rgba(37,244,238,0.05) 100%)"
            : "linear-gradient(135deg, rgba(254,44,85,0.12) 0%, rgba(37,244,238,0.08) 100%)",
          border: `1px solid var(--border-color)`,
          padding: "clamp(16px, 3vw, 28px)", 
          position: "relative",
        }}
      >
        {/* Header - Responsive */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1.5vw, 14px)", marginBottom: "clamp(6px, 1vw, 12px)" }}>
          <div style={{
            width: "clamp(32px, 5vw, 48px)", 
            height: "clamp(32px, 5vw, 48px)", 
            borderRadius: "50%",
            background: "rgba(254,44,85,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg style={{ width: "clamp(14px, 2vw, 22px)", height: "clamp(14px, 2vw, 22px)" }} viewBox="0 0 24 24" fill="#fe2c55">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <h2 style={{
            fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 800, color: "#fe2c55",
          }}>
            {t("videoTutorial")}
          </h2>
        </div>
        
        <p style={{
          fontSize: "clamp(12px, 1.5vw, 16px)", 
          color: "var(--text-secondary)", 
          lineHeight: 1.5,
          marginBottom: "clamp(10px, 2vw, 18px)",
        }}>
          {t("videoTutorialDesc")}
        </p>

        {/* Video Container - Responsive */}
        <div style={{
          background: isDarkMode ? "#0a0a0f" : "#f0f0f5",
          borderRadius: "clamp(12px, 2vw, 18px)",
          overflow: "hidden",
          border: `1px solid var(--border-color)`,
        }}>
          {/* Video Header */}
          <div style={{
            padding: "clamp(10px, 2vw, 18px) clamp(12px, 2vw, 20px)",
            display: "flex", alignItems: "center", gap: "clamp(10px, 1.5vw, 16px)",
            borderBottom: `1px solid var(--border-color)`,
            background: isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.8)",
          }}>
            <div style={{
              width: "clamp(28px, 4vw, 44px)", 
              height: "clamp(28px, 4vw, 44px)", 
              borderRadius: "50%",
              background: isDarkMode 
                ? "linear-gradient(135deg, #1a1a2e, #252542)"
                : "linear-gradient(135deg, #e8e8f0, #d0d0e0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid var(--border-color)`,
              flexShrink: 0,
            }}>
              <svg style={{ width: "clamp(12px, 1.5vw, 20px)", height: "clamp(12px, 1.5vw, 20px)" }} viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "#fff" : "#333"} strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "clamp(13px, 1.8vw, 18px)", fontWeight: 700, color: "var(--text-primary)" }}>
                TikTok Rewards - How to Use
              </div>
              <div style={{ fontSize: "clamp(11px, 1.4vw, 15px)", color: "var(--text-muted)" }}>
                Support Service
              </div>
            </div>
          </div>

          {/* Video Content - Side by side layout */}
          <div style={{
            display: "flex",
            alignItems: "stretch",
          }}>
            {/* Instructions */}
            <div style={{
              flex: 1,
              padding: "clamp(12px, 2vw, 24px)",
              display: "flex", alignItems: "center",
            }}>
              <p style={{
                fontSize: "clamp(12px, 1.6vw, 17px)", 
                color: "var(--text-secondary)", 
                lineHeight: 1.6,
                fontWeight: 500,
              }}>
                {t("videoInstructions")}
              </p>
            </div>

            {/* Video Player - Responsive */}
            <div style={{
              padding: "clamp(12px, 2vw, 24px)",
              display: "flex", justifyContent: "center", alignItems: "center",
            }}>
              <div style={{
                width: "clamp(100px, 15vw, 180px)",
                aspectRatio: "9/16",
                background: isDarkMode 
                  ? "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)"
                  : "linear-gradient(180deg, #d0d0e0 0%, #b0b0c0 100%)",
                borderRadius: "clamp(10px, 1.5vw, 16px)",
                border: `1px solid var(--border-color)`,
                overflow: "hidden",
                position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {/* Play Button Overlay */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: "clamp(36px, 5vw, 56px)", 
                    height: "clamp(36px, 5vw, 56px)", 
                    borderRadius: "50%",
                    background: "#fe2c55",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(254,44,85,0.4)",
                  }}
                >
                  <svg style={{ width: "clamp(16px, 2vw, 24px)", height: "clamp(16px, 2vw, 24px)" }} viewBox="0 0 24 24" fill="#fff">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </motion.div>
                
                {/* Video duration badge */}
                <div style={{
                  position: "absolute", 
                  bottom: "clamp(6px, 1vw, 12px)", 
                  right: "clamp(6px, 1vw, 12px)",
                  background: "rgba(0,0,0,0.7)", 
                  padding: "clamp(2px, 0.5vw, 6px) clamp(5px, 1vw, 10px)",
                  borderRadius: "4px", 
                  fontSize: "clamp(9px, 1.2vw, 13px)", 
                  fontWeight: 600,
                  color: "#fff",
                }}>
                  2:45
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Install App Button - Always visible */}
        <button
          className="btn-3d btn-3d-cyan btn-3d-full"
          onClick={() => {
            const event = new CustomEvent("triggerInstallPrompt");
            window.dispatchEvent(event);
          }}
          style={{
            marginTop: "clamp(12px, 2vw, 24px)",
            gap: "clamp(10px, 1.5vw, 14px)",
            fontFamily: "inherit",
            padding: "clamp(12px, 2vw, 18px) clamp(20px, 3vw, 32px)",
            fontSize: "clamp(14px, 1.8vw, 18px)",
          }}
        >
          <svg style={{ width: "clamp(18px, 2.5vw, 24px)", height: "clamp(18px, 2.5vw, 24px)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {t("installApp") || "Install App"}
        </button>
      </motion.div>

      {/* Refund Guarantee Section */}
      <ScrollReveal animation="slide-up" delay={0.2}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            borderRadius: "clamp(16px, 2vw, 24px)",
            overflow: "hidden",
            marginTop: "clamp(16px, 3vw, 28px)",
            background: isDarkMode 
              ? "linear-gradient(135deg, rgba(37,244,238,0.08) 0%, rgba(254,44,85,0.05) 100%)"
              : "linear-gradient(135deg, rgba(37,244,238,0.12) 0%, rgba(254,44,85,0.08) 100%)",
            border: `1px solid ${isDarkMode ? "rgba(37,244,238,0.2)" : "rgba(37,244,238,0.3)"}`,
            padding: "clamp(20px, 4vw, 32px)",
            position: "relative",
          }}
        >
          {/* Guarantee Badge */}
          <div style={{
            position: "absolute",
            top: "clamp(12px, 2vw, 20px)",
            right: "clamp(12px, 2vw, 20px)",
            background: "linear-gradient(135deg, #25f4ee, #00d4aa)",
            padding: "clamp(6px, 1vw, 10px) clamp(12px, 2vw, 18px)",
            borderRadius: "clamp(20px, 3vw, 30px)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px, 1vw, 10px)",
            boxShadow: "0 4px 15px rgba(37,244,238,0.3)",
          }}>
            <svg style={{ width: "clamp(14px, 2vw, 20px)", height: "clamp(14px, 2vw, 20px)" }} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
            <span style={{ 
              fontSize: "clamp(10px, 1.4vw, 14px)", 
              fontWeight: 700, 
              color: "#000",
              whiteSpace: "nowrap",
            }}>
              {t("refundGuarantee") || "Money-Back Guarantee"}
            </span>
          </div>

          {/* Header */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "clamp(10px, 2vw, 16px)", 
            marginBottom: "clamp(12px, 2vw, 20px)",
            marginTop: "clamp(36px, 5vw, 0px)",
          }}>
            <div style={{
              width: "clamp(44px, 7vw, 64px)",
              height: "clamp(44px, 7vw, 64px)",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(37,244,238,0.2), rgba(37,244,238,0.1))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "2px solid rgba(37,244,238,0.3)",
            }}>
              <svg style={{ width: "clamp(22px, 3.5vw, 32px)", height: "clamp(22px, 3.5vw, 32px)" }} viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 8l-4 4-2-2"/>
                <path d="M8 12l2 2 4-4"/>
              </svg>
            </div>
            <div>
              <h2 style={{
                fontSize: "clamp(20px, 3.5vw, 30px)",
                fontWeight: 800,
                color: "#25f4ee",
                lineHeight: 1.2,
              }}>
                {t("refundTitle") || "30-Day Refund Policy"}
              </h2>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 17px)",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "clamp(16px, 3vw, 24px)",
          }}>
            {t("refundDesc") || "Not satisfied with your purchase? No problem! We offer a full refund within 30 days of your subscription. Your satisfaction is our priority."}
          </p>

          {/* Benefits List */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px, 1.5vw, 14px)",
            marginBottom: "clamp(20px, 3vw, 28px)",
          }}>
            {[
              { icon: "check-circle", text: t("refundBenefits") || "Full refund, no questions asked within 30 days" },
              { icon: "clock", text: t("refundProcess") || "Quick and easy refund process" },
              { icon: "headphones", text: t("refundSupport") || "Dedicated support team to assist you" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(10px, 1.5vw, 14px)",
                  padding: "clamp(10px, 1.5vw, 14px) clamp(14px, 2vw, 18px)",
                  background: isDarkMode ? "rgba(37,244,238,0.05)" : "rgba(37,244,238,0.08)",
                  borderRadius: "clamp(10px, 1.5vw, 14px)",
                  border: `1px solid ${isDarkMode ? "rgba(37,244,238,0.1)" : "rgba(37,244,238,0.15)"}`,
                }}
              >
                <div style={{
                  width: "clamp(24px, 3vw, 32px)",
                  height: "clamp(24px, 3vw, 32px)",
                  borderRadius: "50%",
                  background: "rgba(37,244,238,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {item.icon === "check-circle" && (
                    <svg style={{ width: "clamp(12px, 1.5vw, 16px)", height: "clamp(12px, 1.5vw, 16px)" }} viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                  {item.icon === "clock" && (
                    <svg style={{ width: "clamp(12px, 1.5vw, 16px)", height: "clamp(12px, 1.5vw, 16px)" }} viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  )}
                  {item.icon === "headphones" && (
                    <svg style={{ width: "clamp(12px, 1.5vw, 16px)", height: "clamp(12px, 1.5vw, 16px)" }} viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2.5">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                    </svg>
                  )}
                </div>
                <span style={{
                  fontSize: "clamp(12px, 1.6vw, 15px)",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/support" style={{ textDecoration: "none", display: "block" }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-3d btn-3d-full"
              style={{
                background: "linear-gradient(135deg, #25f4ee, #00d4aa)",
                color: "#000",
                fontWeight: 700,
                fontFamily: "inherit",
                padding: "clamp(14px, 2.5vw, 20px) clamp(24px, 4vw, 40px)",
                fontSize: "clamp(14px, 2vw, 18px)",
                gap: "clamp(10px, 1.5vw, 14px)",
                border: "none",
                boxShadow: "0 4px 20px rgba(37,244,238,0.3)",
              }}
            >
              <svg style={{ width: "clamp(18px, 2.5vw, 24px)", height: "clamp(18px, 2.5vw, 24px)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              {t("requestRefundBtn") || "Request Refund"}
            </motion.button>
          </Link>
        </motion.div>
      </ScrollReveal>
    </div>
  );
}
