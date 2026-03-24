"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import VideoRating from "@/app/components/VideoRating";

// Faster animation variants
const fadeIn = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };

export default function HomePage() {
  const { t } = useI18n();
  const [balance, setBalance] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7 * 60 + 30); // 7:30 minutos
  const [hasCompletedToday, setHasCompletedToday] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || hasCompletedToday) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, hasCompletedToday]);

  const handleAllRated = (totalEarned: number) => {
    setBalance(prev => prev + totalEarned);
    setHasCompletedToday(true);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      {/* Saldo atual */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.35 }}
        style={{
          background: "linear-gradient(135deg, rgba(37,244,238,0.1) 0%, rgba(37,244,238,0.02) 100%)",
          borderRadius: "16px",
          border: "1px solid rgba(37,244,238,0.2)",
          padding: "16px 20px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "50%",
            background: "rgba(37,244,238,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>
              Saldo Disponivel
            </p>
            <p style={{ fontSize: "24px", fontWeight: 800, color: "#25f4ee" }}>
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Video Rating Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.35, delay: 0.1 }}
        style={{
          borderRadius: "24px", overflow: "hidden", marginBottom: "32px",
          background: "linear-gradient(135deg, rgba(254,44,85,0.08) 0%, rgba(37,244,238,0.05) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 20px", position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(254,44,85,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fe2c55">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fe2c55" }}>
              {t("videoTutorial")}
            </h2>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
              Avalie videos e ganhe recompensas
            </p>
          </div>
        </div>

        {/* Video Rating Component */}
        <VideoRating 
          onAllRated={handleAllRated}
          timeLeft={timeLeft}
        />
      </motion.div>
    </div>
  );
}
