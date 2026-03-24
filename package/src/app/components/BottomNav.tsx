"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const tabs = [
    {
      href: "/",
      label: t("home"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#fe2c55" : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      href: "/course/tiktok-growth",
      label: t("class"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#25f4ee" : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          <line x1="12" y1="6" x2="12" y2="10"/>
          <line x1="12" y1="14" x2="12" y2="14.01"/>
        </svg>
      ),
    },
    {
      href: "/create",
      label: "",
      isCenter: true,
      icon: () => (
        <div style={{
          width: "44px", height: "32px", position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            position: "absolute", left: 0, width: "32px", height: "32px",
            borderRadius: "8px", background: "#25f4ee",
          }} />
          <div style={{
            position: "absolute", right: 0, width: "32px", height: "32px",
            borderRadius: "8px", background: "#fe2c55",
          }} />
          <div style={{
            position: "relative", width: "32px", height: "32px",
            borderRadius: "8px", background: "#fff", zIndex: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
        </div>
      ),
    },
    {
      href: "/support",
      label: t("support"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#25f4ee" : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
    },
    {
      href: "/wallet",
      label: t("wallet"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#ffd700" : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="bottom-nav"
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(0,0,0,0.98)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-around",
        minHeight: "68px",
        paddingTop: "8px",
        paddingLeft: "4px",
        paddingRight: "4px",
        paddingBottom: "max(8px, env(safe-area-inset-bottom, 8px))",
      }}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href} prefetch={true} style={{ textDecoration: "none" }}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "4px", padding: "8px 10px",
                position: "relative", cursor: "pointer",
              }}
            >
              {tab.isCenter ? (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  {tab.icon()}
                </motion.div>
              ) : (
                <>
                  <div style={{ position: "relative" }}>
                    {tab.icon(isActive)}
                  </div>
                  <span style={{
                    fontSize: "9px", fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                    transition: "color 0.2s",
                  }}>
                    {tab.label}
                  </span>
                </>
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
