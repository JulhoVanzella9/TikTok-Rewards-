"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const menuItems = [
    { label: "Wallet", href: "/wallet", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    )},
    { label: "Language", href: "/profile", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )},
    { label: "Courses", href: "/course/tiktok-rewards", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    )},
    { label: "TikTok Rewards", href: "/create", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    )},
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(0,0,0,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          padding: "0 20px", height: "56px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
            }}
          >
            {/* Official TikTok Logo */}
            <div style={{ width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
                <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#25F4EE" transform="translate(-2, -1)"/>
                <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#FE2C55" transform="translate(2, 1)"/>
                <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#fff"/>
              </svg>
            </div>
            <span style={{
              fontSize: "17px",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.3px",
              fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
              lineHeight: "26px",
            }}>
              TikTok<span style={{ color: "#fe2c55", marginLeft: "4px" }}>Rewards</span>
            </span>
          </motion.div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Hamburger Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(true)}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "50%", width: "36px", height: "36px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(255,255,255,0.7)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </motion.button>
        </div>
      </motion.header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 100,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(4px)",
              }}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "280px", zIndex: 101,
                background: "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)",
                borderLeft: "1px solid rgba(255,255,255,0.1)",
                padding: "20px",
                display: "flex", flexDirection: "column",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>Menu</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.1)", border: "none",
                    borderRadius: "50%", width: "32px", height: "32px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "#fff",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </motion.button>
              </div>

              {/* Menu Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: "flex", alignItems: "center", gap: "14px",
                        padding: "14px 16px", borderRadius: "12px",
                        background: pathname === item.href ? "rgba(254,44,85,0.15)" : "rgba(255,255,255,0.04)",
                        border: pathname === item.href ? "1px solid rgba(254,44,85,0.3)" : "1px solid transparent",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <span style={{ color: pathname === item.href ? "#fe2c55" : "rgba(255,255,255,0.7)" }}>
                        {item.icon}
                      </span>
                      <span style={{ 
                        fontSize: "15px", fontWeight: 600,
                        color: pathname === item.href ? "#fff" : "rgba(255,255,255,0.8)",
                      }}>
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "24px 0" }} />

              {/* Dark/Light Mode Toggle */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px", borderRadius: "12px",
                background: "rgba(255,255,255,0.04)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>
                    {isDarkMode ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                      </svg>
                    )}
                  </span>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  style={{
                    width: "48px", height: "28px", borderRadius: "14px",
                    background: isDarkMode ? "#fe2c55" : "rgba(255,255,255,0.2)",
                    border: "none", cursor: "pointer", position: "relative",
                    transition: "background 0.3s",
                  }}
                >
                  <motion.div
                    animate={{ x: isDarkMode ? 22 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      width: "24px", height: "24px", borderRadius: "50%",
                      background: "#fff", position: "absolute", top: "2px",
                    }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
