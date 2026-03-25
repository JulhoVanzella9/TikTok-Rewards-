"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { useTheme } from "@/lib/theme/context";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const inactiveColor = isDarkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";
  const textColor = isDarkMode ? "#fff" : "#1a1a1a";
  const bgColor = isDarkMode ? "rgba(10,10,10,0.95)" : "rgba(255,255,255,0.95)";
  const borderColor = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const tabs = [
    {
      href: "/",
      label: t("home"),
      activeColor: "#fe2c55",
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#fe2c55" : "none"} stroke={active ? "#fe2c55" : inactiveColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      href: "/course/tiktok-growth",
      label: t("class"),
      activeColor: "#25f4ee",
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "rgba(37,244,238,0.15)" : "none"} stroke={active ? "#25f4ee" : inactiveColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      ),
    },
    {
      href: "/create",
      label: "",
      isCenter: true,
      activeColor: "#fff",
      icon: () => (
        <motion.div 
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: "48px", height: "34px", position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Cyan layer */}
          <motion.div 
            style={{
              position: "absolute", left: 0, width: "34px", height: "34px",
              borderRadius: "10px", background: "#25f4ee",
              boxShadow: "0 2px 8px rgba(37,244,238,0.3)",
            }}
          />
          {/* Red layer */}
          <motion.div 
            style={{
              position: "absolute", right: 0, width: "34px", height: "34px",
              borderRadius: "10px", background: "#fe2c55",
              boxShadow: "0 2px 8px rgba(254,44,85,0.3)",
            }}
          />
          {/* White center */}
          <motion.div 
            style={{
              position: "relative", width: "34px", height: "34px",
              borderRadius: "10px", background: "#fff", zIndex: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </motion.div>
        </motion.div>
      ),
    },
    {
      href: "/support",
      label: t("support"),
      activeColor: "#25f4ee",
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "rgba(37,244,238,0.15)" : "none"} stroke={active ? "#25f4ee" : inactiveColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
    },
    {
      href: "/wallet",
      label: t("wallet"),
      activeColor: "#ffd700",
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "rgba(255,215,0,0.15)" : "none"} stroke={active ? "#ffd700" : inactiveColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
    },
  ];

  return (
    <nav
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: bgColor,
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderTop: `1px solid ${borderColor}`,
        display: "flex", alignItems: "center", justifyContent: "space-around",
        height: "72px",
        paddingLeft: "8px",
        paddingRight: "8px",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href} prefetch={true} style={{ textDecoration: "none", flex: 1 }}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "6px", padding: "8px 0",
                cursor: "pointer", height: "100%",
                position: "relative",
              }}
            >
              {tab.isCenter ? (
                tab.icon()
              ) : (
                <>
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      style={{
                        position: "absolute",
                        top: "4px",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: tab.activeColor,
                        boxShadow: `0 0 8px ${tab.activeColor}`,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <motion.div 
                    animate={{ 
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    style={{ 
                      width: "24px", height: "24px", 
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {tab.icon(isActive)}
                  </motion.div>
                  <motion.span 
                    animate={{ 
                      opacity: isActive ? 1 : 0.5,
                    }}
                    style={{
                      fontSize: "10px", 
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? tab.activeColor : inactiveColor,
                      lineHeight: 1,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {tab.label}
                  </motion.span>
                </>
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
