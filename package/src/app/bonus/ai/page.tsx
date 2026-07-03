"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEntitlements } from "@/lib/hooks/useEntitlements";

const GOLD = "#ffd700";
const ACCENT = "#fe2c55";
const STORAGE_KEY = "up2_ai_activated";

export default function ActivateAiPage() {
  const { up2, loading } = useEntitlements();
  const [activated, setActivated] = useState(false);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1") {
      setActivated(true);
    }
  }, []);

  const activate = () => {
    setActivating(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, "1");
      setActivated(true);
      setActivating(false);
    }, 1400);
  };

  return (
    <div style={{
      minHeight: "100dvh",
      background: "radial-gradient(circle at 50% 0%, #1a1508 0%, #0a0a0a 60%)",
      color: "#fff", padding: "24px 18px 60px",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{ width: "100%", maxWidth: "460px" }}>
        <Link href="/" style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back
        </Link>

        {loading ? (
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", marginTop: "60px" }}>Loading...</p>
        ) : !up2 ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔒</div>
            <h1 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "10px" }}>AI Assistant locked</h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              This bonus is not active on your account. It unlocks automatically after you purchase the AI Assistant (UP2).
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180 }}
                style={{
                  width: "88px", height: "88px", borderRadius: "50%", margin: "0 auto 16px",
                  background: `linear-gradient(135deg, ${GOLD}, #f0a500)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 10px 40px ${GOLD}55`,
                }}
              >
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                  <circle cx="8.5" cy="14.5" r="1.5" fill="#000"/><circle cx="15.5" cy="14.5" r="1.5" fill="#000"/>
                </svg>
              </motion.div>
              <span style={{
                fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px",
                color: GOLD, background: "rgba(255,215,0,0.1)", border: `1px solid ${GOLD}44`,
                padding: "4px 12px", borderRadius: "20px",
              }}>Bonus · UP2</span>
              <h1 style={{ fontSize: "26px", fontWeight: 900, margin: "14px 0 8px" }}>AI Assistant</h1>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                Your personal AI learns how you rate and replicates it automatically — so every video you review counts as <strong style={{ color: GOLD }}>three</strong>. Triple your productivity without working 3× more.
              </p>
            </div>

            {activated ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{
                  background: "rgba(255,215,0,0.08)", border: `1px solid ${GOLD}55`,
                  borderRadius: "16px", padding: "26px 20px", textAlign: "center",
                }}
              >
                <div style={{ fontSize: "44px", marginBottom: "10px" }}>⚡</div>
                <h2 style={{ fontSize: "20px", fontWeight: 800, color: GOLD, marginBottom: "10px" }}>Your AI is activated!</h2>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                  Get ready to boost your earnings big time — every review now counts <strong>triple</strong>. Head to the review tab and keep rating.
                </p>
                <Link href="/create" style={{
                  display: "inline-block", marginTop: "18px", padding: "13px 26px", borderRadius: "12px",
                  background: `linear-gradient(135deg, ${ACCENT}, #ff6b8a)`, color: "#fff",
                  fontWeight: 800, textDecoration: "none", fontSize: "14px",
                }}>Go rate videos →</Link>
              </motion.div>
            ) : (
              <button
                onClick={activate}
                disabled={activating}
                style={{
                  width: "100%", padding: "16px", borderRadius: "14px", border: "none", cursor: "pointer",
                  background: `linear-gradient(135deg, ${GOLD}, #f0a500)`, color: "#000",
                  fontSize: "16px", fontWeight: 900, fontFamily: "inherit",
                  boxShadow: `0 8px 24px ${GOLD}44`, opacity: activating ? 0.7 : 1,
                }}
              >
                {activating ? "Activating your AI..." : "Activate my AI (3×)"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
