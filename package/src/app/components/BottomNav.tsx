"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { useState, useEffect } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      setIsDarkMode(savedTheme !== "light");
    };

    checkTheme();
    const interval = setInterval(checkTheme, 100);
    return () => clearInterval(interval);
  }, []);

  const inactiveColor = isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const textColor = isDarkMode ? "#fff" : "#000";

  const tabs = [
    {
      href: "/",
      label: t("home"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#fe2c55" : inactiveColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      href: "/course/tiktok-growth",
      label: t("class"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#25f4ee" : inactiveColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#25f4ee" : inactiveColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
    },
    {
      href: "/wallet",
      label: t("wallet"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#ffd700" : inactiveColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        background: isDarkMode ? "rgba(0,0,0,0.98)" : "rgba(255,255,255,0.98)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "space-around",
        height: "68px",
        paddingLeft: "4px",
        paddingRight: "4px",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href} prefetch={true} style={{ textDecoration: "none", flex: 1 }}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "4px", padding: "8px 0",
                cursor: "pointer", height: "100%",
              }}
            >
              {tab.isCenter ? (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  {tab.icon()}
                </motion.div>
              ) : (
                <>
                  <div style={{ 
                    width: "24px", height: "24px", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {tab.icon(isActive)}
                  </div>
                  <span style={{
                    fontSize: "10px", fontWeight: isActive ? 700 : 500,
                    color: isActive ? textColor : inactiveColor,
                    transition: "color 0.2s",
                    lineHeight: 1,
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
