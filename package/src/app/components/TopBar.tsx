"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useTheme } from "@/lib/theme/context";

const FlagUS = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" style={{ borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
    <rect width="24" height="18" fill="#B22234"/>
    <rect width="24" height="1.38" y="1.38" fill="#fff"/>
    <rect width="24" height="1.38" y="4.15" fill="#fff"/>
    <rect width="24" height="1.38" y="6.92" fill="#fff"/>
    <rect width="24" height="1.38" y="9.69" fill="#fff"/>
    <rect width="24" height="1.38" y="12.46" fill="#fff"/>
    <rect width="24" height="1.38" y="15.23" fill="#fff"/>
    <rect width="10" height="9.69" fill="#3C3B6E"/>
  </svg>
);

const FlagBR = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" style={{ borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
    <rect width="24" height="18" fill="#009c3b"/>
    <polygon points="12,2 22,9 12,16 2,9" fill="#ffdf00"/>
    <circle cx="12" cy="9" r="4" fill="#002776"/>
  </svg>
);

const FlagES = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" style={{ borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
    <rect width="24" height="18" fill="#c60b1e"/>
    <rect width="24" height="9" y="4.5" fill="#ffc400"/>
  </svg>
);

const languages = [
  { code: "en-US", label: "English", Flag: FlagUS },
  { code: "pt-BR", label: "Português", Flag: FlagBR },
  { code: "es-ES", label: "Español", Flag: FlagES },
];

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languagePopupOpen, setLanguagePopupOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode as "en-US" | "pt-BR" | "es-ES");
    setLanguagePopupOpen(false);
  };

  const menuItems = [
    { label: t("wallet"), href: "/wallet", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    )},
    { label: t("language"), href: "#language", isLanguage: true, icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )},
    { label: t("class"), href: "/course/tiktok-growth", icon: (
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
    { label: t("inviteFriends") || "Invite Friends", href: "#referral", isReferral: true, icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )},
    { label: t("installApp") || "Install App", href: "#install", isInstall: true, icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    )},
  ];

  // Animation variants
  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, damping: 25, stiffness: 300 }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring" as const, damping: 30, stiffness: 400 }
    }
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.05, type: "spring" as const, damping: 20, stiffness: 300 }
    })
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "sticky", top: 0, zIndex: 50,
          background: isDarkMode ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`,
          padding: "0 20px", height: "56px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
            }}
          >
            {/* TikTok Logo */}
            <div style={{ width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
                <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#25F4EE" transform="translate(-2, -1)"/>
                <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#FE2C55" transform="translate(2, 1)"/>
                <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill={isDarkMode ? "#fff" : "#000"}/>
              </svg>
            </div>
            <span style={{
              fontSize: "17px",
              fontWeight: 800,
              color: isDarkMode ? "#fff" : "#000",
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
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(true)}
            style={{
              background: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
              border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              borderRadius: "50%", width: "38px", height: "38px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
              transition: "all 0.3s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </motion.button>
        </div>
      </motion.header>

      {/* Menu Overlay */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => { setMenuOpen(false); setLanguagePopupOpen(false); }}
              style={{
                position: "fixed", inset: 0, zIndex: 100,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />
            
            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "300px", maxWidth: "85vw", zIndex: 101,
                background: isDarkMode 
                  ? "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)"
                  : "linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)",
                borderLeft: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                padding: "24px",
                display: "flex", flexDirection: "column",
                boxShadow: "-10px 0 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}
              >
                <h2 style={{ fontSize: "20px", fontWeight: 800, color: isDarkMode ? "#fff" : "#000" }}>
                  {t("menu")}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setMenuOpen(false); setLanguagePopupOpen(false); }}
                  style={{
                    background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                    border: "none",
                    borderRadius: "50%", width: "36px", height: "36px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: isDarkMode ? "#fff" : "#000",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </motion.button>
              </motion.div>

              {/* Menu Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {item.isLanguage ? (
                      <div style={{ position: "relative" }}>
                        <motion.button
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setLanguagePopupOpen(!languagePopupOpen)}
                          style={{
                            width: "100%",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            gap: "14px",
                            padding: "16px 18px", borderRadius: "14px",
                            background: languagePopupOpen 
                              ? (isDarkMode ? "rgba(254,44,85,0.15)" : "rgba(254,44,85,0.1)")
                              : (isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"),
                            border: languagePopupOpen 
                              ? "1px solid rgba(254,44,85,0.3)" 
                              : `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <span style={{ color: languagePopupOpen ? "#fe2c55" : (isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)") }}>
                              {item.icon}
                            </span>
                            <span style={{ 
                              fontSize: "15px", fontWeight: 600,
                              color: isDarkMode ? "#fff" : "#000",
                            }}>
                              {item.label}
                            </span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <currentLang.Flag />
                            <motion.svg 
                              animate={{ rotate: languagePopupOpen ? 180 : 0 }}
                              width="16" height="16" viewBox="0 0 24 24" fill="none" 
                              stroke={isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} 
                              strokeWidth="2"
                            >
                              <polyline points="6 9 12 15 18 9"/>
                            </motion.svg>
                          </div>
                        </motion.button>
                        
                        {/* Language Popup */}
                        <AnimatePresence>
                          {languagePopupOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ type: "spring", damping: 25, stiffness: 400 }}
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                marginTop: "8px",
                                background: isDarkMode ? "#1a1a1a" : "#fff",
                                borderRadius: "14px",
                                border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                                overflow: "hidden",
                                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                                zIndex: 10,
                              }}
                            >
                              {languages.map((lang, langIndex) => (
                                <motion.button
                                  key={lang.code}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: langIndex * 0.05 }}
                                  whileHover={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleLanguageSelect(lang.code)}
                                  style={{
                                    width: "100%",
                                    display: "flex", alignItems: "center", gap: "12px",
                                    padding: "14px 18px",
                                    background: language === lang.code 
                                      ? (isDarkMode ? "rgba(254,44,85,0.15)" : "rgba(254,44,85,0.1)")
                                      : "transparent",
                                    border: "none",
                                    borderBottom: langIndex < languages.length - 1 
                                      ? `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` 
                                      : "none",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                  }}
                                >
                                  <lang.Flag />
                                  <span style={{ 
                                    fontSize: "15px", fontWeight: language === lang.code ? 700 : 500,
                                    color: language === lang.code ? "#fe2c55" : (isDarkMode ? "#fff" : "#000"),
                                  }}>
                                    {lang.label}
                                  </span>
                                  {language === lang.code && (
                                    <motion.svg 
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      style={{ marginLeft: "auto" }}
                                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="3"
                                    >
                                      <polyline points="20 6 9 17 4 12"/>
                                    </motion.svg>
                                  )}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (item as { isReferral?: boolean }).isReferral ? (
                      <motion.button
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMenuOpen(false);
                          const event = new CustomEvent("openReferralModal");
                          window.dispatchEvent(event);
                        }}
                        style={{
                          width: "100%",
                          display: "flex", alignItems: "center", gap: "14px",
                          padding: "16px 18px", borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(254,44,85,0.15) 0%, rgba(254,44,85,0.08) 100%)",
                          border: "1px solid rgba(254,44,85,0.25)",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <span style={{ color: "#fe2c55" }}>{item.icon}</span>
                        <span style={{ fontSize: "15px", fontWeight: 600, color: isDarkMode ? "#fff" : "#000" }}>
                          {item.label}
                        </span>
                        <span style={{
                          marginLeft: "auto",
                          padding: "4px 8px",
                          background: "#fe2c55",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#fff",
                        }}>
                          +$5
                        </span>
                      </motion.button>
                    ) : (item as { isInstall?: boolean }).isInstall ? (
                      <motion.button
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMenuOpen(false);
                          const event = new CustomEvent("triggerInstallPrompt");
                          window.dispatchEvent(event);
                        }}
                        style={{
                          width: "100%",
                          display: "flex", alignItems: "center", gap: "14px",
                          padding: "16px 18px", borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(37,244,238,0.15) 0%, rgba(37,244,238,0.08) 100%)",
                          border: "1px solid rgba(37,244,238,0.25)",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <span style={{ color: "#25f4ee" }}>{item.icon}</span>
                        <span style={{ fontSize: "15px", fontWeight: 600, color: isDarkMode ? "#fff" : "#000" }}>
                          {item.label}
                        </span>
                        <span style={{
                          marginLeft: "auto",
                          padding: "4px 8px",
                          background: "rgba(37,244,238,0.2)",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#25f4ee",
                        }}>
                          PWA
                        </span>
                      </motion.button>
                    ) : (
                      <Link href={item.href} onClick={() => setMenuOpen(false)}>
                        <motion.div
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            display: "flex", alignItems: "center", gap: "14px",
                            padding: "16px 18px", borderRadius: "14px",
                            background: pathname === item.href 
                              ? (isDarkMode ? "rgba(254,44,85,0.15)" : "rgba(254,44,85,0.1)")
                              : (isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"),
                            border: pathname === item.href 
                              ? "1px solid rgba(254,44,85,0.3)" 
                              : `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          <span style={{ color: pathname === item.href ? "#fe2c55" : (isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)") }}>
                            {item.icon}
                          </span>
                          <span style={{ 
                            fontSize: "15px", fontWeight: 600,
                            color: pathname === item.href ? (isDarkMode ? "#fff" : "#000") : (isDarkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)"),
                          }}>
                            {item.label}
                          </span>
                          {pathname === item.href && (
                            <motion.div
                              layoutId="activeIndicator"
                              style={{
                                marginLeft: "auto",
                                width: "8px", height: "8px",
                                borderRadius: "50%",
                                background: "#fe2c55",
                                boxShadow: "0 0 10px rgba(254,44,85,0.5)",
                              }}
                            />
                          )}
                        </motion.div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 }}
                style={{ 
                  height: "1px", 
                  background: `linear-gradient(90deg, transparent, ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}, transparent)`,
                  margin: "24px 0" 
                }} 
              />

              {/* Dark/Light Mode Toggle */}
              <motion.div 
                custom={menuItems.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 18px", borderRadius: "14px",
                  background: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <motion.span 
                    animate={{ rotate: isDarkMode ? 0 : 360 }}
                    transition={{ duration: 0.5 }}
                    style={{ color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}
                  >
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
                  </motion.span>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: isDarkMode ? "#fff" : "#000" }}>
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  style={{
                    width: "52px", height: "30px", borderRadius: "15px",
                    background: isDarkMode 
                      ? "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)"
                      : "rgba(0,0,0,0.15)",
                    border: "none", cursor: "pointer", position: "relative",
                    transition: "background 0.3s",
                    boxShadow: isDarkMode ? "0 2px 10px rgba(254,44,85,0.3)" : "none",
                  }}
                >
                  <motion.div
                    animate={{ x: isDarkMode ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      width: "26px", height: "26px", borderRadius: "50%",
                      background: "#fff", position: "absolute", top: "2px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {isDarkMode ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2.5">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff9500" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="5"/>
                      </svg>
                    )}
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ 
                  marginTop: "auto", 
                  textAlign: "center",
                  paddingTop: "24px",
                }}
              >
                <p style={{ 
                  fontSize: "12px", 
                  color: isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                  fontWeight: 500,
                }}>
                  TikTok Rewards v1.0
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
