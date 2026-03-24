"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TopBar() {
  return (
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
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <motion.div whileHover={{ scale: 1.05 }} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Official TikTok Logo - Black with cyan/red glitch effect */}
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            {/* Cyan layer - offset left */}
            <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#25F4EE" transform="translate(-2, -1)"/>
            {/* Red layer - offset right */}
            <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#FE2C55" transform="translate(2, 1)"/>
            {/* Black main layer */}
            <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#fff"/>
          </svg>
          <span style={{
            fontSize: "18px",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.5px",
            fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
          }}>
            TikTok <span style={{ color: "#fe2c55" }}>Rewards</span>
          </span>
        </motion.div>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Profile Button */}
        <Link href="/profile">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "50%", width: "36px", height: "36px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(255,255,255,0.7)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </motion.button>
        </Link>
      </div>
    </motion.header>
  );
}
