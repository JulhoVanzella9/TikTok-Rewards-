"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { useTheme } from "@/lib/theme/context";

// Faster animation variants
const fadeIn = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };

export default function HomePage() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div style={{ 
      padding: "12px 16px", 
      maxWidth: "1200px", 
      margin: "0 auto",
      color: "var(--text-primary)",
      transition: "color 0.3s ease",
      paddingBottom: "20px",
    }}>
      {/* Video Tutorial Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.35 }}
        style={{
          borderRadius: "20px", overflow: "hidden", marginBottom: "16px",
          background: isDarkMode 
            ? "linear-gradient(135deg, rgba(254,44,85,0.08) 0%, rgba(37,244,238,0.05) 100%)"
            : "linear-gradient(135deg, rgba(254,44,85,0.12) 0%, rgba(37,244,238,0.08) 100%)",
          border: `1px solid var(--border-color)`,
          padding: "20px", position: "relative",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(254,44,85,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fe2c55">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <h2 style={{
            fontSize: "22px", fontWeight: 800, color: "#fe2c55",
          }}>
            {t("videoTutorial")}
          </h2>
        </div>
        
        <p style={{
          fontSize: "13px", 
          color: "var(--text-secondary)", 
          lineHeight: 1.5,
          marginBottom: "14px",
          transition: "color 0.3s ease",
        }}>
          {t("videoTutorialDesc")}
        </p>

        {/* Video Container */}
        <div style={{
          background: isDarkMode ? "#0a0a0f" : "#f0f0f5",
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid var(--border-color)`,
          transition: "all 0.3s ease",
        }}>
          {/* Video Header */}
          <div style={{
            padding: "16px 20px",
            display: "flex", alignItems: "center", gap: "12px",
            borderBottom: `1px solid var(--border-color)`,
            background: isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.8)",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: isDarkMode 
                ? "linear-gradient(135deg, #1a1a2e, #252542)"
                : "linear-gradient(135deg, #e8e8f0, #d0d0e0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid var(--border-color)`,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "#fff" : "#333"} strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                TikTok Rewards - How to Use
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Support Service
              </div>
            </div>
          </div>

          {/* Video Content */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
          }}>
            {/* Instructions */}
            <div style={{
              padding: "24px 20px",
              display: "flex", alignItems: "center",
            }}>
              <p style={{
                fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7,
                fontWeight: 500,
              }}>
                {t("videoInstructions")}
              </p>
            </div>

            {/* Video Player */}
            <div style={{
              padding: "20px",
              display: "flex", justifyContent: "center", alignItems: "center",
              position: "relative",
            }}>
              <div style={{
                width: "100%",
                maxWidth: "220px",
                aspectRatio: "9/16",
                background: isDarkMode 
                  ? "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)"
                  : "linear-gradient(180deg, #d0d0e0 0%, #b0b0c0 100%)",
                borderRadius: "16px",
                border: `2px solid var(--border-color)`,
                overflow: "hidden",
                position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {/* Play Button Overlay */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    background: "#fe2c55",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(254,44,85,0.4)",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </motion.div>
                
                {/* Video duration badge */}
                <div style={{
                  position: "absolute", bottom: "12px", right: "12px",
                  background: "rgba(0,0,0,0.7)", padding: "4px 8px",
                  borderRadius: "4px", fontSize: "11px", fontWeight: 600,
                  color: "#fff",
                }}>
                  2:45
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Install App Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const event = new CustomEvent("triggerInstallPrompt");
            window.dispatchEvent(event);
          }}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px 20px",
            background: "linear-gradient(135deg, rgba(37,244,238,0.15) 0%, rgba(37,244,238,0.08) 100%)",
            border: "1px solid rgba(37,244,238,0.25)",
            borderRadius: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#25f4ee" }}>
            {t("installApp") || "Install App on Home Screen"}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
