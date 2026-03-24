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
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <motion.div whileHover={{ scale: 1.05 }} style={{ display: "flex", alignItems: "center" }}>
          {/* Official TikTok Logo */}
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            {/* Cyan layer - offset left */}
            <path d="M38.42 13.3a11.53 11.53 0 01-6.42-1.93 11.5 11.5 0 01-4.2-5.37h-6.3v27.18c0 3.67-2.97 6.64-6.64 6.64s-6.64-2.97-6.64-6.64 2.97-6.64 6.64-6.64c.73 0 1.43.12 2.08.34v-6.42a13.06 13.06 0 00-2.08-.17C8.07 20.29 2.5 25.86 2.5 32.65c0 6.79 5.57 12.35 12.36 12.35 6.79 0 12.36-5.56 12.36-12.35V19.83A17.78 17.78 0 0038.42 24V17.6c0 0 0-4.3 0-4.3z" fill="#25F4EE" transform="translate(-2, -2)"/>
            {/* Red layer - offset right */}
            <path d="M38.42 13.3a11.53 11.53 0 01-6.42-1.93 11.5 11.5 0 01-4.2-5.37h-6.3v27.18c0 3.67-2.97 6.64-6.64 6.64s-6.64-2.97-6.64-6.64 2.97-6.64 6.64-6.64c.73 0 1.43.12 2.08.34v-6.42a13.06 13.06 0 00-2.08-.17C8.07 20.29 2.5 25.86 2.5 32.65c0 6.79 5.57 12.35 12.36 12.35 6.79 0 12.36-5.56 12.36-12.35V19.83A17.78 17.78 0 0038.42 24V17.6c0 0 0-4.3 0-4.3z" fill="#FE2C55" transform="translate(2, 2)"/>
            {/* Black main layer */}
            <path d="M38.42 13.3a11.53 11.53 0 01-6.42-1.93 11.5 11.5 0 01-4.2-5.37h-6.3v27.18c0 3.67-2.97 6.64-6.64 6.64s-6.64-2.97-6.64-6.64 2.97-6.64 6.64-6.64c.73 0 1.43.12 2.08.34v-6.42a13.06 13.06 0 00-2.08-.17C8.07 20.29 2.5 25.86 2.5 32.65c0 6.79 5.57 12.35 12.36 12.35 6.79 0 12.36-5.56 12.36-12.35V19.83A17.78 17.78 0 0038.42 24V17.6c0 0 0-4.3 0-4.3z" fill="#000"/>
          </svg>
        </motion.div>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Achievements Button - Improved Design */}
        <Link href="/achievements">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,170,0,0.05))",
              border: "1px solid rgba(255,215,0,0.2)",
              borderRadius: "50%", width: "36px", height: "36px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffd700" stroke="#ffd700" strokeWidth="1">
              <circle cx="12" cy="8" r="6"/>
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" fill="none" strokeWidth="2"/>
            </svg>
          </motion.button>
        </Link>

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
