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
            <path d="M34.1451 10.7141C32.6227 8.99576 31.7497 6.78498 31.7459 4.5H25.0962V31.8C25.0485 33.1951 24.476 34.5201 23.4919 35.5048C22.5078 36.4895 21.1879 37.0605 19.8069 37.1045C16.8878 37.1045 14.5152 34.6973 14.5152 31.7318C14.5152 28.1641 17.8969 25.4473 21.4098 26.4891V19.6636C14.1598 18.7705 7.84152 24.4773 7.84152 31.7318C7.84152 38.7864 13.6098 43.8 19.7911 43.8C26.4098 43.8 31.7459 38.3914 31.7459 31.7318V17.8623C34.4179 19.7873 37.6319 20.8187 40.9311 20.8145V14.0682C40.9311 14.0682 37.0789 14.2377 34.1451 10.7141Z" fill="#25F4EE"/>
            <path d="M32.1451 8.7141C30.6227 6.99576 29.7497 4.78498 29.7459 2.5H23.0962V29.8C23.0485 31.1951 22.476 32.5201 21.4919 33.5048C20.5078 34.4895 19.1879 35.0605 17.8069 35.1045C14.8878 35.1045 12.5152 32.6973 12.5152 29.7318C12.5152 26.1641 15.8969 23.4473 19.4098 24.4891V17.6636C12.1598 16.7705 5.84152 22.4773 5.84152 29.7318C5.84152 36.7864 11.6098 41.8 17.7911 41.8C24.4098 41.8 29.7459 36.3914 29.7459 29.7318V15.8623C32.4179 17.7873 35.6319 18.8187 38.9311 18.8145V12.0682C38.9311 12.0682 35.0789 12.2377 32.1451 8.7141Z" fill="#FE2C55"/>
            <path d="M29.7459 2.5H23.0962V29.8C23.0485 31.1951 22.476 32.5201 21.4919 33.5048C20.5078 34.4895 19.1879 35.0605 17.8069 35.1045C14.8878 35.1045 12.5152 32.6973 12.5152 29.7318C12.5152 26.1641 15.8969 23.4473 19.4098 24.4891V17.6636C12.1598 16.7705 5.84152 22.4773 5.84152 29.7318C5.84152 36.7864 11.6098 41.8 17.7911 41.8C24.4098 41.8 29.7459 36.3914 29.7459 29.7318V15.8623C32.4179 17.7873 35.6319 18.8187 38.9311 18.8145V12.0682C36.1319 12.0187 33.5179 10.9873 31.4459 9.0623V2.5H29.7459Z" fill="white"/>
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
