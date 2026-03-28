"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AccessGrantedPage() {
  const [copied, setCopied] = useState(false);
  const password = "myacess2026";

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0a 50%, #000 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 16px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Animated Background Particles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 400, 
              y: -20,
              opacity: 0.3,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{ 
              y: "100vh",
              opacity: [0.3, 0.6, 0.3],
              rotate: 360,
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: i % 2 === 0 ? "#fe2c55" : "#25f4ee",
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Confetti Burst Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.8, ease: "backOut" }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Congratulations Banner */}
        <motion.div
          animate={{ 
            boxShadow: [
              "0 8px 32px rgba(254, 44, 85, 0.3)",
              "0 12px 48px rgba(254, 44, 85, 0.5)",
              "0 8px 32px rgba(254, 44, 85, 0.3)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "linear-gradient(135deg, #fe2c55 0%, #ff1744 50%, #fe2c55 100%)",
            borderRadius: "20px",
            padding: "24px 32px",
            textAlign: "center",
            marginBottom: "24px",
            position: "relative",
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Sparkle Effects */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ position: "absolute", top: "-8px", left: "-8px", fontSize: "24px" }}
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            style={{ position: "absolute", top: "-8px", right: "-8px", fontSize: "24px" }}
          >
            ✨
          </motion.div>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <motion.span
              animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ fontSize: "36px" }}
            >
              🎁
            </motion.span>
            <h1 style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              letterSpacing: "2px",
            }}>
              CONGRATULATIONS!
            </h1>
            <motion.span
              animate={{ rotate: [5, -5, 5], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
              style={{ fontSize: "36px" }}
            >
              🎁
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "linear-gradient(180deg, rgba(37,244,238,0.12) 0%, rgba(37,244,238,0.03) 100%)",
          border: "1px solid rgba(37,244,238,0.25)",
          borderRadius: "24px",
          padding: "36px 28px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #25f4ee 0%, #1ed4cf 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "0 8px 32px rgba(37,244,238,0.4)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </motion.div>

        <h2 style={{
          fontSize: "32px",
          fontWeight: 800,
          color: "#fff",
          margin: "0 0 8px 0",
          background: "linear-gradient(90deg, #fff 0%, #25f4ee 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Access Granted
        </h2>

        <p style={{
          fontSize: "14px",
          color: "#25f4ee",
          fontWeight: 600,
          margin: "0 0 24px 0",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}>
          Your Premium Account is Ready
        </p>

        <div style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "24px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.7,
            margin: 0,
          }}>
            To access, log in with the <strong style={{ color: "#fff" }}>same email</strong> used during purchase and use the password below
          </p>
        </div>

        {/* Password Box - Enhanced */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.5)",
            margin: "0 0 8px 0",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
            Your Password
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyPassword}
            style={{
              background: "linear-gradient(135deg, rgba(37,244,238,0.15) 0%, rgba(37,244,238,0.05) 100%)",
              border: "2px solid #25f4ee",
              borderRadius: "14px",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <span style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "2px",
              fontFamily: "monospace",
            }}>
              {password}
            </span>
            <motion.div
              animate={copied ? { scale: [1, 1.2, 1] } : {}}
              style={{
                background: copied ? "#25f4ee" : "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {copied ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              )}
            </motion.div>
          </motion.div>
          <p style={{
            fontSize: "12px",
            color: copied ? "#25f4ee" : "rgba(255,255,255,0.4)",
            margin: "8px 0 0 0",
            transition: "color 0.2s",
          }}>
            {copied ? "Password copied!" : "Click to copy"}
          </p>
        </div>

        {/* Email Notification */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            background: "linear-gradient(135deg, rgba(254,44,85,0.1) 0%, rgba(254,44,85,0.05) 100%)",
            border: "1px solid rgba(254,44,85,0.3)",
            borderRadius: "12px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "rgba(254,44,85,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 6l-10 7L2 6"/>
            </svg>
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff", margin: 0 }}>
              Check Your Email
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", margin: "2px 0 0 0" }}>
              Access details sent to your registered email
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Access Button Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          width: "100%",
          maxWidth: "420px",
          marginTop: "20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.a
          href="https://tik-cash.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            width: "100%",
            background: "linear-gradient(135deg, #25f4ee 0%, #1ed4cf 50%, #17b8b3 100%)",
            color: "#000",
            fontSize: "18px",
            fontWeight: 800,
            padding: "20px 28px",
            borderRadius: "16px",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "1px",
            boxShadow: "0 6px 0 0 #0f8a87, 0 12px 32px rgba(37,244,238,0.4)",
            transition: "all 0.2s",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 3h6v6M14 10l6.1-6.1M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
          </svg>
          CLICK HERE TO ACCESS
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
            margin: "20px 0 0 0",
            textAlign: "center",
          }}
        >
          A new tab will open when you click the button above
        </motion.p>
      </motion.div>

      {/* Support Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          width: "100%",
          maxWidth: "420px",
          marginTop: "24px",
          padding: "20px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.6)",
          margin: 0,
        }}>
          Need help? Contact our support team
        </p>
        <a
          href="mailto:accesssupport.ai@gmail.com"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 600,
            marginTop: "8px",
            textDecoration: "none",
            padding: "8px 16px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "8px",
            transition: "all 0.2s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M22 6l-10 7L2 6"/>
          </svg>
          accesssupport.ai@gmail.com
        </a>
      </motion.div>

      {/* TikCash Logo Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#25F4EE" transform="translate(-2, -1)"/>
            <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#FE2C55" transform="translate(2, 1)"/>
            <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#fff"/>
            <text x="20" y="32" textAnchor="middle" fill="#000" fontSize="14" fontWeight="800">$</text>
            <circle cx="36" cy="12" r="7" fill="#25F4EE" stroke="#000" strokeWidth="2"/>
            <text x="36" y="15.5" textAnchor="middle" fill="#000" fontSize="9" fontWeight="800">$</text>
          </svg>
          <span style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#fff",
          }}>
            TikCash
          </span>
        </div>
        <p style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.3)",
          margin: 0,
        }}>
          Start earning with every video you watch
        </p>
      </motion.div>
    </div>
  );
}
