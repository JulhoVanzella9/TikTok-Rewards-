"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import Image from "next/image";

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
      href: "/",
      label: "",
      isCenter: true,
      icon: () => (
        <div style={{
          width: "48px", height: "48px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Image
            src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/logo-7328701c910ebbccb5670085d243fc12.svg"
            alt="TikTok"
            width={40}
            height={40}
            unoptimized
          />
        </div>
      ),
    },
    {
      href: "/progress",
      label: t("progress"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#fe2c55" : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20V10"/>
          <path d="M18 20V4"/>
          <path d="M6 20v-4"/>
        </svg>
      ),
    },
    {
      href: "/achievements",
      label: t("achievements"),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#ffd700" : "none"} stroke={active ? "#ffd700" : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
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
                  {tab.icon(isActive)}
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
