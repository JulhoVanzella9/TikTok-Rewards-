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
            background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "16px", color: "#fff",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
            <path d="M34.1451 10.7141C32.6227 8.99576 31.7497 6.78498 31.7459 4.5H25.0962V31.8C25.0485 33.1951 24.476 34.5201 23.4919 35.5048C22.5078 36.4895 21.1879 37.0605 19.8069 37.1045C16.8878 37.1045 14.5152 34.6973 14.5152 31.7318C14.5152 28.1641 17.8969 25.4473 21.4098 26.4891V19.6636C14.1598 18.7705 7.84152 24.4773 7.84152 31.7318C7.84152 38.7864 13.6098 43.8 19.7911 43.8C26.4098 43.8 31.7459 38.3914 31.7459 31.7318V17.8623C34.4179 19.7873 37.6319 20.8187 40.9311 20.8145V14.0682C40.9311 14.0682 37.0789 14.2377 34.1451 10.7141Z" fill="white"/>
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

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/achievements">
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
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 9 8 12 8s5-4 7.5-4a2.5 2.5 0 0 1 0 5H18"/>
              <path d="M18 9v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/>
              <path d="M12 8v13"/>
            </svg>
          </motion.button>
        </Link>
      </div>
    </motion.header>
  );
}
