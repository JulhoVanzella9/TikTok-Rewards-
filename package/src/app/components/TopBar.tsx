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
          {/* Official TikTok Logo - Musical note with cyan outline and red shadow */}
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
            <path d="M72 18C72 18 72 58 72 62C72 76 60 86 46 86C32 86 22 76 22 62C22 48 32 38 46 38C50 38 54 39 57 41V18C57 18 72 18 72 18Z" fill="#FE2C55" transform="translate(3, 3)"/>
            <path d="M72 18C72 18 72 58 72 62C72 76 60 86 46 86C32 86 22 76 22 62C22 48 32 38 46 38C50 38 54 39 57 41V18C57 18 72 18 72 18Z" fill="#25F4EE" transform="translate(-3, -3)"/>
            <path d="M72 18C72 18 72 58 72 62C72 76 60 86 46 86C32 86 22 76 22 62C22 48 32 38 46 38C50 38 54 39 57 41V18C57 18 72 18 72 18Z" fill="white"/>
            <circle cx="46" cy="62" r="12" fill="black"/>
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
