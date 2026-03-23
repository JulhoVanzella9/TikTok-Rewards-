"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #0a0a1a 0%, #000000 50%, #0a0512 100%)",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "-10%", right: "-10%",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(254,44,85,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", bottom: "-10%", left: "-10%",
            width: "350px", height: "350px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,244,238,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "linear-gradient(145deg, rgba(26,26,46,0.95) 0%, rgba(18,18,30,0.98) 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "40px 32px",
          position: "relative",
          backdropFilter: "blur(40px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: "absolute", top: "20px", left: "20px",
            background: "none", border: "none", color: "rgba(255,255,255,0.5)",
            cursor: "pointer", fontSize: "24px", lineHeight: 1, padding: "4px",
          }}
        >
          ✕
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "36px", marginTop: "8px" }}
        >
          <h1 style={{
            fontSize: "26px", fontWeight: 800, color: "#fff",
            letterSpacing: "-0.5px", marginBottom: "4px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}>
            Log in to Tikmoney
            <span style={{
              width: "22px", height: "22px", borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.2)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", color: "rgba(255,255,255,0.3)", cursor: "pointer",
            }}>?</span>
          </h1>
        </motion.div>

        {/* Email input */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ marginBottom: "16px" }}
        >
          <div style={{
            position: "relative",
            borderRadius: "12px",
            border: focused ? "2px solid var(--tiktok-red)" : "2px solid rgba(255,255,255,0.1)",
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow: focused ? "0 0 0 4px rgba(254,44,85,0.1)" : "none",
            overflow: "hidden",
          }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                width: "100%", padding: "16px 18px", fontSize: "16px",
                background: "rgba(255,255,255,0.04)", border: "none",
                color: "#fff", outline: "none", fontFamily: "inherit",
              }}
            />
          </div>
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{ marginBottom: "28px" }}
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(254,44,85,0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="glow-btn"
              style={{
                width: "100%", padding: "16px", fontSize: "16px", fontWeight: 700,
                background: "var(--gradient-button)", color: "#fff",
                border: "none", borderRadius: "12px", cursor: "pointer",
                fontFamily: "inherit", letterSpacing: "0.3px",
              }}
            >
              Continue
            </motion.button>
          </Link>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            display: "flex", alignItems: "center", gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", fontWeight: 500 }}>OR</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        </motion.div>

        {/* Social buttons */}
        {[
          { icon: "f", label: "Continue with Facebook", color: "#1877F2", bg: "rgba(24,119,242,0.08)" },
          { icon: "G", label: "Continue with Google", color: "#fff", bg: "rgba(255,255,255,0.04)" },
          { icon: "", label: "Continue with Apple", color: "#fff", bg: "rgba(255,255,255,0.04)" },
        ].map((social, i) => (
          <motion.div
            key={social.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.08, duration: 0.4 }}
            style={{ marginBottom: "12px" }}
          >
            <Link href="/">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.15)",
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%", padding: "14px 18px", fontSize: "15px",
                  fontWeight: 600, background: social.bg,
                  color: "#fff", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
                  transition: "all 0.2s",
                }}
              >
                {social.icon === "f" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )}
                {social.icon === "G" && (
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                {social.icon === "" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                )}
                {social.label}
              </motion.button>
            </Link>
          </motion.div>
        ))}

        {/* Request Refund */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          style={{ marginTop: "20px" }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%", padding: "14px", fontSize: "14px", fontWeight: 700,
              background: "rgba(255,255,255,0.06)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Request Refund
          </motion.button>
        </motion.div>

        {/* Terms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          style={{
            textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.35)",
            marginTop: "20px", lineHeight: 1.6,
          }}
        >
          By continuing, you agree to our{" "}
          <span style={{ color: "var(--tiktok-red)", fontWeight: 600, cursor: "pointer" }}>Terms of Service</span>
          {" "}and acknowledge that you have read our{" "}
          <span style={{ fontWeight: 600, color: "#fff", cursor: "pointer" }}>Privacy Policy</span>.
        </motion.p>
      </motion.div>
    </div>
  );
}
