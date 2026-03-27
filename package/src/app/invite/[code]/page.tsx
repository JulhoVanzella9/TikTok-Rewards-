"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function InviteRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  useEffect(() => {
    if (code) {
      // Store the referral code
      localStorage.setItem("referral_code", code);
      // Redirect to welcome page with ref parameter
      setTimeout(() => {
        router.push(`/welcome?ref=${code}`);
      }, 1500);
    }
  }, [code, router]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
      padding: "20px",
    }}>
      {/* Loading Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center" }}
      >
        {/* TikCash Logo */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity },
          }}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #25f4ee 0%, #fe2c55 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "0 12px 40px rgba(254,44,85,0.3), 0 8px 20px rgba(37,244,238,0.2)",
          }}
        >
          <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
            <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#fff"/>
            <text x="20" y="32" textAnchor="middle" fill="#fe2c55" fontSize="14" fontWeight="800" fontFamily="system-ui">$</text>
            <circle cx="36" cy="12" r="7" fill="#25f4ee" stroke="#fff" strokeWidth="2"/>
            <text x="36" y="15.5" textAnchor="middle" fill="#000" fontSize="9" fontWeight="800" fontFamily="system-ui">$</text>
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "12px",
          }}
        >
          Processing Invitation...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Redirecting you to your exclusive offer
        </motion.p>

        {/* Loading dots */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "24px",
        }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: i === 1 ? "#fe2c55" : "#25f4ee",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
