"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEntitlements } from "@/lib/hooks/useEntitlements";

const GOLD = "#ffd700";
const ACCENT = "#fe2c55";

export default function BonusHubPage() {
  const { up1, up2, up3, hasAny, loading } = useEntitlements();
  const count = [up1, up2, up3].filter(Boolean).length;

  const bonuses = [
    {
      key: "up1", owned: up1, href: "/create", cta: "Open in reviews", emoji: "🌐",
      title: "Multiplatform Expansion", tag: "UP1",
      perk: "+US$200 / day",
      desc: "Exclusive videos from YouTube, Instagram & Facebook. Earn across multiple platforms, not just TikTok.",
    },
    {
      key: "up2", owned: up2, href: "/bonus/ai", cta: "Activate AI", emoji: "🤖",
      title: "AI Assistant", tag: "UP2",
      perk: "3× earnings",
      desc: "Your AI learns how you rate and replicates it — every review counts as three. Triple productivity.",
    },
    {
      key: "up3", owned: up3, href: "/bonus/algorithm", cta: "Activate", emoji: "📈",
      title: "Refined Algorithm", tag: "UP3",
      perk: "Higher payouts",
      desc: "A premium feed that prioritizes bigger, higher-paying brands. More money for every video you review.",
    },
  ];

  return (
    <div style={{
      minHeight: "100dvh",
      background: "radial-gradient(1200px 480px at 50% -140px, rgba(255,215,0,0.14) 0%, rgba(255,215,0,0) 55%), linear-gradient(180deg, #0d0b05 0%, #0a0a0a 40%)",
      color: "#fff", padding: "22px 18px 70px",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <Link href="/" style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "18px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "26px" }}
        >
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 170 }}
            style={{
              width: "72px", height: "72px", borderRadius: "22px", margin: "0 auto 14px",
              background: `linear-gradient(135deg, ${GOLD}, #f0a500)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "34px",
              boxShadow: `0 12px 40px ${GOLD}44`,
            }}
          >✨</motion.div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, margin: "0 0 6px", letterSpacing: "-0.5px" }}>Your Expansions</h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", margin: "0 0 14px" }}>
            Premium upgrades unlocked on your account.
          </p>
          {!loading && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "12px", fontWeight: 800, color: GOLD,
              background: "rgba(255,215,0,0.1)", border: `1px solid ${GOLD}44`,
              padding: "6px 14px", borderRadius: "20px",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: count > 0 ? GOLD : "rgba(255,255,255,0.3)" }} />
              {count} of 3 active
            </span>
          )}
        </motion.div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: GOLD, animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {bonuses.map((b, i) => {
              const card = (
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  whileHover={b.owned ? { scale: 1.015 } : undefined}
                  style={{
                    position: "relative", overflow: "hidden",
                    borderRadius: "18px", padding: "18px",
                    background: b.owned
                      ? "linear-gradient(135deg, rgba(255,215,0,0.10) 0%, rgba(255,215,0,0.03) 100%)"
                      : "rgba(255,255,255,0.03)",
                    border: b.owned ? `1px solid ${GOLD}66` : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: b.owned ? `0 10px 34px ${GOLD}18` : "none",
                    opacity: b.owned ? 1 : 0.75,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px",
                      background: b.owned ? `linear-gradient(135deg, ${GOLD}, #f0a500)` : "rgba(255,255,255,0.06)",
                      filter: b.owned ? "none" : "grayscale(1)",
                    }}>{b.emoji}</div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "16px", fontWeight: 800, color: b.owned ? GOLD : "#fff" }}>{b.title}</span>
                        <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.5px", color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.07)", padding: "2px 6px", borderRadius: "5px" }}>{b.tag}</span>
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 800, color: b.owned ? "#fff" : "rgba(255,255,255,0.5)", marginBottom: "6px" }}>{b.perk}</div>
                      <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)", lineHeight: 1.55, margin: 0 }}>{b.desc}</p>
                    </div>

                    {!b.owned && (
                      <span style={{
                        flexShrink: 0, fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px",
                        padding: "4px 8px", borderRadius: "6px",
                        color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.08)",
                      }}>🔒 Locked</span>
                    )}
                  </div>

                  {b.owned ? (
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px",
                      marginTop: "14px", paddingTop: "12px", borderTop: `1px solid ${GOLD}22`,
                      fontSize: "13px", fontWeight: 800, color: ACCENT,
                    }}>
                      {b.cta}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  ) : (
                    <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "11.5px", color: "rgba(255,255,255,0.4)" }}>
                      Unlocks automatically after purchase.
                    </div>
                  )}
                </motion.div>
              );

              return b.owned ? (
                <Link key={b.key} href={b.href} style={{ textDecoration: "none" }}>{card}</Link>
              ) : (
                <div key={b.key}>{card}</div>
              );
            })}
          </div>
        )}

        {!loading && !hasAny && (
          <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.45)", textAlign: "center", marginTop: "18px", lineHeight: 1.6 }}>
            You don&apos;t own any expansions yet. Grab an upgrade to unlock these bonuses.
          </p>
        )}
      </div>
    </div>
  );
}
