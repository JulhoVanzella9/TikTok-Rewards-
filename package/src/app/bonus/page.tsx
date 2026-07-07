"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEntitlements } from "@/lib/hooks/useEntitlements";

const GOLD = "#ffd700";
const ACCENT = "#fe2c55";

function SparkleIcon({ size = 34, color = "#000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 3c.3 3.6 1.1 5.7 2.3 6.9C15.5 11.1 17.6 11.9 21 12c-3.6.3-5.7 1.1-6.9 2.3C12.9 15.5 12.1 17.6 12 21c-.3-3.6-1.1-5.7-2.3-6.9C8.5 12.9 6.4 12.1 3 12c3.6-.3 5.7-1.1 6.9-2.3C11.1 8.5 11.9 6.4 12 3z"/>
    </svg>
  );
}
function GlobeIcon({ size = 26, color = "#000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
    </svg>
  );
}
function RobotIcon({ size = 26, color = "#000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
      <circle cx="8.5" cy="14.5" r="1.5" fill={color}/><circle cx="15.5" cy="14.5" r="1.5" fill={color}/>
    </svg>
  );
}
function ChartIcon({ size = 26, color = "#000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M3 3v18h18"/><path d="M7 15l3-4 3 2 5-7"/>
    </svg>
  );
}
function LockIcon({ size = 11, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
      <rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  );
}

export default function BonusHubPage() {
  const { up1, up2, up3, hasAny, loading } = useEntitlements();
  const count = [up1, up2, up3].filter(Boolean).length;

  const bonuses = [
    {
      key: "up1", owned: up1, href: "/create", cta: "Open in reviews", Icon: GlobeIcon,
      title: "Multiplatform Expansion", tag: "UP1",
      perk: "Exclusive premium videos",
      desc: "Exclusive videos from YouTube, Instagram & Facebook. Earn across multiple platforms, not just TikTok.",
    },
    {
      key: "up2", owned: up2, href: "/bonus/ai", cta: "Activate AI", Icon: RobotIcon,
      title: "AI Assistant", tag: "UP2",
      perk: "3× earnings",
      desc: "Your AI learns how you rate and replicates it — every review counts as three. Triple productivity.",
    },
    {
      key: "up3", owned: up3, href: "/bonus/algorithm", cta: "Activate", Icon: ChartIcon,
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
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 12px 40px ${GOLD}44`,
            }}
          ><SparkleIcon /></motion.div>
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
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: b.owned ? `linear-gradient(135deg, ${GOLD}, #f0a500)` : "rgba(255,255,255,0.06)",
                    }}>
                      <b.Icon color={b.owned ? "#000" : "rgba(255,255,255,0.35)"} />
                    </div>

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
                        flexShrink: 0, display: "inline-flex", alignItems: "center", gap: "4px",
                        fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px",
                        padding: "4px 8px", borderRadius: "6px",
                        color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.08)",
                      }}><LockIcon /> Locked</span>
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
