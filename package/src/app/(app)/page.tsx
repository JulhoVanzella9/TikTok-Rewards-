"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { useTheme } from "@/lib/theme/context";

// Premium animation variants with refined easing
const fadeInUp = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: { opacity: 1, y: 0 } 
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

export default function HomePage() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      style={{ 
        padding: "24px 20px", 
        maxWidth: "1200px", 
        margin: "0 auto",
        color: "var(--text-primary)",
      }}
    >
      {/* Video Tutorial Section */}
      <motion.div
        variants={fadeInUp}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderRadius: "20px", 
          overflow: "hidden", 
          marginBottom: "24px",
          background: isDarkMode 
            ? "linear-gradient(145deg, rgba(254,44,85,0.06) 0%, rgba(37,244,238,0.03) 100%)"
            : "linear-gradient(145deg, rgba(254,44,85,0.08) 0%, rgba(37,244,238,0.05) 100%)",
          border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          padding: "24px", 
          position: "relative",
        }}
      >
        {/* Subtle shine effect */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "50%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
          animation: "shimmer 3s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* Header */}
        <motion.div 
          variants={fadeInUp}
          style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{
              width: "44px", height: "44px", borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(254,44,85,0.2) 0%, rgba(254,44,85,0.1) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(254,44,85,0.15)",
              border: "1px solid rgba(254,44,85,0.15)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fe2c55">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </motion.div>
          <div>
            <h2 style={{
              fontSize: "20px", 
              fontWeight: 700, 
              color: "#fe2c55",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}>
              {t("videoTutorial")}
            </h2>
            <p style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginTop: "2px",
            }}>
              Learn how to maximize earnings
            </p>
          </div>
        </motion.div>

        {/* Video Container */}
        <motion.div 
          variants={scaleIn}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: isDarkMode 
              ? "linear-gradient(180deg, rgba(15,15,25,0.95) 0%, rgba(10,10,18,0.98) 100%)"
              : "linear-gradient(180deg, #f8f9fa 0%, #f0f1f3 100%)",
            borderRadius: "16px",
            overflow: "hidden",
            border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}`,
            boxShadow: isDarkMode 
              ? "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)"
              : "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {/* Video Header */}
          <div style={{
            padding: "14px 18px",
            display: "flex", alignItems: "center", gap: "12px",
            borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`,
            background: isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.6)",
          }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "12px",
              background: isDarkMode 
                ? "linear-gradient(135deg, rgba(30,30,50,0.8), rgba(40,40,65,0.6))"
                : "linear-gradient(135deg, #e5e5ea, #d1d1d6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)"} strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: "14px", 
                fontWeight: 600, 
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}>
                TikTok Rewards - How to Use
              </div>
              <div style={{ 
                fontSize: "12px", 
                color: "var(--text-muted)",
                marginTop: "1px", 
              }}>
                Official Guide
              </div>
            </div>
            {/* Status indicator */}
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "4px 10px",
              borderRadius: "20px",
              background: "rgba(37,244,238,0.1)",
              border: "1px solid rgba(37,244,238,0.15)",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#25f4ee",
                boxShadow: "0 0 6px #25f4ee",
                animation: "pulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#25f4ee" }}>
                NEW
              </span>
            </div>
          </div>

          {/* Video Content */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            minHeight: "280px",
          }}>
            {/* Instructions */}
            <div style={{
              padding: "24px 20px",
              display: "flex", 
              flexDirection: "column",
              justifyContent: "center",
              borderRight: `1px solid ${isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"}`,
            }}>
              <p style={{
                fontSize: "14px", 
                color: "var(--text-secondary)", 
                lineHeight: 1.75,
                fontWeight: 450,
                letterSpacing: "0.01em",
              }}>
                {t("videoInstructions")}
              </p>
              
              {/* CTA Button */}
              <motion.a
                href="/course/tiktok-growth"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{
                  marginTop: "20px",
                  padding: "12px 20px",
                  background: "linear-gradient(135deg, rgba(254,44,85,0.15) 0%, rgba(254,44,85,0.08) 100%)",
                  border: "1px solid rgba(254,44,85,0.2)",
                  borderRadius: "12px",
                  color: "#fe2c55",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "fit-content",
                  textDecoration: "none",
                }}
              >
                <span>Learn More</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.a>
            </div>

            {/* Video Player */}
            <div style={{
              padding: "20px",
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              position: "relative",
              background: isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
            }}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  width: "100%",
                  maxWidth: "180px",
                  aspectRatio: "9/16",
                  background: isDarkMode 
                    ? "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)"
                    : "linear-gradient(180deg, #e5e5ea 0%, #c7c7cc 100%)",
                  borderRadius: "16px",
                  border: `2px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`,
                  overflow: "hidden",
                  position: "relative",
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  boxShadow: isDarkMode 
                    ? "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)"
                    : "0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {/* Play Button */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(254,44,85,0.4), 0 0 0 4px rgba(254,44,85,0.1)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: "2px" }}>
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </motion.div>
                
                {/* Duration badge */}
                <div style={{
                  position: "absolute", 
                  bottom: "10px", 
                  right: "10px",
                  background: "rgba(0,0,0,0.75)", 
                  backdropFilter: "blur(8px)",
                  padding: "4px 8px",
                  borderRadius: "6px", 
                  fontSize: "11px", 
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "0.02em",
                }}>
                  2:45
                </div>

                {/* Progress bar */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "rgba(0,0,0,0.3)",
                }}>
                  <div style={{
                    width: "0%",
                    height: "100%",
                    background: "#fe2c55",
                    borderRadius: "0 3px 3px 0",
                  }} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
