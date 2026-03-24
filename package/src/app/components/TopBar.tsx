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
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            width: "30px", height: "30px", borderRadius: "8px",
            background: "#000",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Official TikTok Logo */}
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
            <path d="M34.1451 10.7141C32.6227 8.99576 31.7497 6.78498 31.7459 4.5H25.0962V31.8C25.0485 33.1951 24.476 34.5201 23.4919 35.5048C22.5078 36.4895 21.1879 37.0605 19.8069 37.1045C16.8878 37.1045 14.5152 34.6973 14.5152 31.7318C14.5152 28.1641 17.8969 25.4473 21.4098 26.4891V19.6636C14.1598 18.7705 7.84152 24.4773 7.84152 31.7318C7.84152 38.7864 13.6098 43.8 19.7911 43.8C26.4098 43.8 31.7459 38.3914 31.7459 31.7318V17.8623C34.4179 19.7873 37.6319 20.8187 40.9311 20.8145V14.0682C40.9311 14.0682 37.0789 14.2377 34.1451 10.7141Z" fill="white"/>
            <path d="M33.1451 9.7141C31.6227 7.99576 30.7497 5.78498 30.7459 3.5H24.0962V30.8C24.0485 32.1951 23.476 33.5201 22.4919 34.5048C21.5078 35.4895 20.1879 36.0605 18.8069 36.1045C15.8878 36.1045 13.5152 33.6973 13.5152 30.7318C13.5152 27.1641 16.8969 24.4473 20.4098 25.4891V18.6636C13.1598 17.7705 6.84152 23.4773 6.84152 30.7318C6.84152 37.7864 12.6098 42.8 18.7911 42.8C25.4098 42.8 30.7459 37.3914 30.7459 30.7318V16.8623C33.4179 18.7873 36.6319 19.8187 39.9311 19.8145V13.0682C39.9311 13.0682 36.0789 13.2377 33.1451 9.7141Z" fill="#25F4EE"/>
            <path d="M35.1451 11.7141C33.6227 9.99576 32.7497 7.78498 32.7459 5.5H26.0962V32.8C26.0485 34.1951 25.476 35.5201 24.4919 36.5048C23.5078 37.4895 22.1879 38.0605 20.8069 38.1045C17.8878 38.1045 15.5152 35.6973 15.5152 32.7318C15.5152 29.1641 18.8969 26.4473 22.4098 27.4891V20.6636C15.1598 19.7705 8.84152 25.4773 8.84152 32.7318C8.84152 39.7864 14.6098 44.8 20.7911 44.8C27.4098 44.8 32.7459 39.3914 32.7459 32.7318V18.8623C35.4179 20.7873 38.6319 21.8187 41.9311 21.8145V15.0682C41.9311 15.0682 38.0789 15.2377 35.1451 11.7141Z" fill="#FE2C55"/>
          </svg>
        </motion.div>
        <span style={{
          fontWeight: 800, fontSize: "16px", letterSpacing: "-0.3px",
          background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
          backgroundClip: "text", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          TikTok Rewards
        </span>
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
