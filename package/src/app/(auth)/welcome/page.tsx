"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WelcomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const refCode = searchParams.get("ref");
  const [referrerName, setReferrerName] = useState("a friend");

  useEffect(() => {
    if (refCode) {
      // Store referral code in localStorage for signup
      localStorage.setItem("referral_code", refCode);
    }
  }, [refCode]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: "linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
    }}>
      {/* Animated background elements */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(254,44,85,0.15) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: "20%",
            right: "5%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,244,238,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          maxWidth: "400px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* TikTok Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #25f4ee 0%, #fe2c55 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
            boxShadow: "0 12px 40px rgba(254,44,85,0.3), 0 8px 20px rgba(37,244,238,0.2)",
          }}
        >
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#fff"/>
          </svg>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "12px",
            lineHeight: 1.2,
          }}>
            You&apos;ve Been Invited!
          </h1>
          <p style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "8px",
            lineHeight: 1.5,
          }}>
            {referrerName} invited you to join
          </p>
          <p style={{
            fontSize: "22px",
            fontWeight: 700,
            background: "linear-gradient(90deg, #25f4ee 0%, #fe2c55 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "32px",
          }}>
            TikTok Rewards Program
          </p>
        </motion.div>

        {/* Bonus Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          style={{
            background: "linear-gradient(135deg, rgba(37,244,238,0.12) 0%, rgba(254,44,85,0.12) 100%)",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "28px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "8px",
          }}>
            Welcome Bonus
          </div>
          <div style={{
            fontSize: "42px",
            fontWeight: 800,
            color: "#25f4ee",
            textShadow: "0 0 40px rgba(37,244,238,0.5)",
          }}>
            $20.00
          </div>
          <div style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
            marginTop: "8px",
          }}>
            Earn when you rate your first video
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginBottom: "32px",
            textAlign: "left",
          }}
        >
          {[
            { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", text: "Earn money rating TikTok videos" },
            { icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", text: "Watch exclusive tutorials" },
            { icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", text: "Withdraw to PayPal or Pix" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 0",
              }}
            >
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(254,44,85,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%",
                padding: "18px",
                background: "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)",
                border: "none",
                borderRadius: "14px",
                color: "#fff",
                fontSize: "17px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0 8px 30px rgba(254,44,85,0.4)",
                marginBottom: "14px",
              }}
            >
              Claim Your $20 Bonus
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </Link>

          <Link href="/login">
            <button style={{
              width: "100%",
              padding: "16px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "14px",
              color: "rgba(255,255,255,0.7)",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
            }}>
              Already have an account? Login
            </button>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            marginTop: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Secure
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Verified
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Global
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
