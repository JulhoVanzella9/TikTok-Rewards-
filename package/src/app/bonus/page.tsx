"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEntitlements } from "@/lib/hooks/useEntitlements";

const GOLD = "#ffd700";

export default function BonusHubPage() {
  const { up1, up2, up3, hasAny, loading } = useEntitlements();

  const items = [
    up1 && {
      href: "/create", emoji: "🌐", title: "Multiplatform Expansion",
      desc: "Exclusive videos from YouTube, Instagram & Facebook. Open the review tab and pick Multiplatform.",
    },
    up2 && {
      href: "/bonus/ai", emoji: "🤖", title: "AI Assistant (3×)",
      desc: "Your AI replicates your ratings — every review counts as three.",
    },
    up3 && {
      href: "/bonus/algorithm", emoji: "📈", title: "Refined Algorithm",
      desc: "A premium feed with higher-paying brands. More money per video.",
    },
  ].filter(Boolean) as { href: string; emoji: string; title: string; desc: string }[];

  return (
    <div style={{
      minHeight: "100vh", minHeight: "100dvh",
      background: "radial-gradient(circle at 50% 0%, #1a1508 0%, #0a0a0a 60%)",
      color: "#fff", padding: "24px 18px 60px",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <Link href="/" style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "22px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span style={{ fontSize: "26px" }}>✨</span>
          <h1 style={{ fontSize: "24px", fontWeight: 900, margin: 0 }}>Your Expansions</h1>
        </div>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginBottom: "22px" }}>
          The bonuses unlocked on your account.
        </p>

        {loading ? (
          <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", marginTop: "40px" }}>Loading...</p>
        ) : !hasAny ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔒</div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              You don&apos;t have any expansions yet. They unlock automatically when you buy an upgrade.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {items.map((it) => (
              <Link key={it.href + it.title} href={it.href} style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "18px", borderRadius: "16px",
                    background: "rgba(255,215,0,0.06)", border: `1px solid ${GOLD}40`,
                  }}
                >
                  <div style={{ fontSize: "30px", flexShrink: 0 }}>{it.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: GOLD, marginBottom: "3px" }}>{it.title}</div>
                    <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{it.desc}</div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" style={{ flexShrink: 0 }}>
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
