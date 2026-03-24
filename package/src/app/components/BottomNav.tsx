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
      href: "/explore",
      label: t("explore"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#25f4ee" : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
    },
    {
      href: "/create",
      label: "",
      isCenter: true,
      icon: (_active: boolean) => (
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
      href: "/my-courses",
      label: t("courses"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#fe2c55" : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          <path d="M10 9l4 3-4 3V9z"/>
        </svg>
      ),
    },
    {
      href: "/profile",
      label: t("profile"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#fe2c55" : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
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
        paddingLeft: "8px",
        paddingRight: "8px",
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
                justifyContent: "center", gap: "4px", padding: "8px 16px",
                position: "relative", cursor: "pointer",
              }}
            >
              {tab.isCenter ? (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  {tab.icon(isActive)}
                </motion.div>
              ) : (
                <>
                  <div style={{ position: "relative" }}>
                    {tab.icon(isActive)}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        style={{
                          position: "absolute", bottom: "-8px", left: "50%",
                          transform: "translateX(-50%)", width: "4px", height: "4px",
                          borderRadius: "50%", background: "#fe2c55",
                        }}
                      />
                    )}
                  </div>
                  <span style={{
                    fontSize: "10px", fontWeight: isActive ? 700 : 500,
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
