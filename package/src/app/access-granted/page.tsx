"use client";
import { motion } from "framer-motion";

export default function AccessGrantedPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 16px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      {/* Congratulations Banner */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "linear-gradient(135deg, #fe2c55 0%, #ff3366 50%, #fe2c55 100%)",
          borderRadius: "16px",
          padding: "20px 24px",
          textAlign: "center",
          marginBottom: "24px",
          boxShadow: "0 8px 32px rgba(254, 44, 85, 0.3)",
        }}
      >
        <h1 style={{
          fontSize: "28px",
          fontWeight: 800,
          color: "#fff",
          margin: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}>
          🎁 CONGRATULATIONS! 🎁
        </h1>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "linear-gradient(180deg, rgba(37,244,238,0.08) 0%, rgba(37,244,238,0.02) 100%)",
          border: "1px solid rgba(37,244,238,0.2)",
          borderRadius: "20px",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <h2 style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#fff",
          margin: "0 0 20px 0",
        }}>
          Access Granted
        </h2>

        <p style={{
          fontSize: "16px",
          color: "rgba(255,255,255,0.8)",
          lineHeight: 1.6,
          margin: "0 0 20px 0",
        }}>
          To access, simply log in with the <strong style={{ color: "#fff" }}>same email</strong> used during purchase and use the password 🤩
        </p>

        {/* Password Box */}
        <div style={{
          background: "rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          padding: "14px 24px",
          marginBottom: "24px",
          display: "inline-block",
        }}>
          <span style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "1px",
          }}>
            myacess2026
          </span>
        </div>

        {/* Check Email Section */}
        <div style={{ marginBottom: "8px" }}>
          <p style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 12px 0",
          }}>
            Check your email:
          </p>
          <p style={{
            fontSize: "15px",
            color: "#25f4ee",
            lineHeight: 1.5,
            margin: 0,
          }}>
            All Access Details Have Been Sent To Your Registered Email!
          </p>
        </div>
      </motion.div>

      {/* Access Button Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(37,244,238,0.05)",
          border: "1px solid rgba(37,244,238,0.1)",
          borderRadius: "20px",
          padding: "24px",
          marginTop: "16px",
          textAlign: "center",
        }}
      >
        <a
          href="https://tik-cash.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            width: "100%",
            background: "linear-gradient(135deg, #25f4ee 0%, #1ed4cf 100%)",
            color: "#000",
            fontSize: "18px",
            fontWeight: 800,
            padding: "18px 24px",
            borderRadius: "14px",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "1px",
            boxShadow: "0 4px 0 0 #15a8a4, 0 8px 24px rgba(37,244,238,0.3)",
            transition: "all 0.2s",
          }}
        >
          CLICK HERE TO ACCESS
        </a>

        <p style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.5,
          margin: "20px 0 0 0",
        }}>
          {"Don't worry! When you click the button above, a new page will open."}
        </p>

        <p style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.5,
          margin: "16px 0 0 0",
        }}>
          For any questions, send a message to support at{" "}
          <a
            href="mailto:accesssupport.ai@gmail.com"
            style={{
              color: "#fff",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            accesssupport.ai@gmail.com
          </a>
        </p>
      </motion.div>

      {/* TikCash Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{
          marginTop: "32px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#25F4EE" transform="translate(-2, -1)"/>
          <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#FE2C55" transform="translate(2, 1)"/>
          <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#fff"/>
          <text x="20" y="32" textAnchor="middle" fill="#000" fontSize="14" fontWeight="800">$</text>
          <circle cx="36" cy="12" r="7" fill="#25F4EE" stroke="#000" strokeWidth="2"/>
          <text x="36" y="15.5" textAnchor="middle" fill="#000" fontSize="9" fontWeight="800">$</text>
        </svg>
        <span style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#fff",
        }}>
          TikCash
        </span>
      </motion.div>
    </div>
  );
}
