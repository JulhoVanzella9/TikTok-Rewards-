"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { useTheme } from "@/lib/theme/context";
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

          {/* Video Player - Full Width */}
          <div style={{
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            padding: "clamp(8px, 1.5vw, 16px)",
          }}>
            <div style={{
              width: "100%",
              maxWidth: "200px",
              aspectRatio: "9/16",
              background: isDarkMode 
                ? "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)"
                : "linear-gradient(180deg, #d0d0e0 0%, #b0b0c0 100%)",
              borderRadius: "clamp(12px, 1.5vw, 18px)",
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
                  width: "clamp(44px, 6vw, 64px)", 
                  height: "clamp(44px, 6vw, 64px)", 
                  borderRadius: "50%",
                  background: "#fe2c55",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(254,44,85,0.4)",
                }}
              >
                <svg style={{ width: "clamp(18px, 2.5vw, 28px)", height: "clamp(18px, 2.5vw, 28px)" }} viewBox="0 0 24 24" fill="#fff">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </motion.div>
              
              {/* Video duration badge */}
              <div style={{
                position: "absolute", 
                bottom: "clamp(8px, 1.2vw, 14px)", 
                right: "clamp(8px, 1.2vw, 14px)",
                background: "rgba(0,0,0,0.7)", 
                padding: "clamp(3px, 0.6vw, 8px) clamp(6px, 1vw, 12px)",
                borderRadius: "6px", 
                fontSize: "clamp(10px, 1.3vw, 14px)", 
                fontWeight: 600,
                color: "#fff",
              }}>
                2:45
              </div>
            </div>
          </div>
        </div>

        {/* Install App Button - Always visible */}
        <button
          className="btn-3d btn-3d-cyan btn-3d-full btn-3d-animated btn-3d-icon-grow"
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
      
    </div>
  );
}
