"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";

const fadeIn = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

const withdrawAmounts = [
  { value: 0.4, label: "$0.40", badge: "onlyOnce" },
  { value: 1.5, label: "$1.50", badge: null },
  { value: 5, label: "$5.00", badge: null },
  { value: 10, label: "$10.00", badge: null },
];

export default function WalletPage() {
  const { t } = useI18n();
  const [selectedAmount, setSelectedAmount] = useState(0.4);
  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBalance = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("total_xp")
        .eq("id", user.id)
        .single();

      if (profile) {
        const xp = profile.total_xp || 0;
        setPoints(xp);
        setBalance(xp / 10000);
      }
      setLoading(false);
    };

    loadBalance();
  }, []);

  const formattedBalance = balance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", paddingBottom: "100px" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          display: "flex", alignItems: "center", gap: "16px",
          marginBottom: "24px",
        }}
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "rgba(255,255,255,0.05)", border: "none",
              color: "#fff", cursor: "pointer", padding: "10px",
              borderRadius: "12px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </motion.button>
        </Link>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#fff" }}>
          {t("redeemRewards")}
        </h1>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)",
          borderRadius: "24px", padding: "28px",
          marginBottom: "4px", position: "relative", overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: "absolute", top: "-20px", right: "-20px",
          width: "150px", height: "150px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)",
        }} />
        
        <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px", fontWeight: 600 }}>
          {t("yourBalance")}
        </div>
        <div style={{
          fontSize: "42px", fontWeight: 900, color: "#fff",
          display: "flex", alignItems: "center", gap: "16px",
          position: "relative",
        }}>
          {loading ? "..." : formattedBalance}
          <motion.div 
            whileHover={{ rotate: 15 }}
            style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "linear-gradient(145deg, #ffd700, #f0a500)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "28px", fontWeight: 900, color: "#fff",
              boxShadow: "0 8px 24px rgba(255,215,0,0.25)",
            }}
          >
            P
          </motion.div>
        </div>
        <div style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "6px" }}>
          = {points.toLocaleString()} {t("points")}
        </div>
      </motion.div>

      {/* Transactions Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: "0 0 24px 24px",
          padding: "16px 28px",
          marginBottom: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer",
          borderTop: "1px dashed rgba(255,255,255,0.08)",
          transition: "background 0.2s",
        }}
      >
        <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
          {t("yourTransactions")}: {formattedBalance}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </motion.div>

      {/* Withdraw Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.15 }}
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: "24px", padding: "28px",
          marginBottom: "20px",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>
          {t("withdrawMoney")}
        </h2>

        {/* Payment Method */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "24px",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "12px 18px", background: "rgba(0,48,135,0.15)",
            borderRadius: "12px", border: "1px solid rgba(0,112,186,0.3)",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0070ba">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .76-.648h6.979c2.317 0 4.098.583 5.291 1.732.53.512.914 1.102 1.146 1.757.249.699.349 1.494.298 2.365a6.766 6.766 0 0 1-.097.82 6.1 6.1 0 0 1-.19.774 4.91 4.91 0 0 1-.305.726c-.123.25-.263.49-.42.722-.17.249-.36.485-.568.708-.227.243-.478.468-.75.674a5.38 5.38 0 0 1-.937.58c-.344.18-.717.335-1.117.465-.418.134-.866.24-1.342.316a10.18 10.18 0 0 1-1.577.114h-1.2a1.164 1.164 0 0 0-1.15.981l-.09.513-1.12 7.093-.067.421z"/>
            </svg>
            <span style={{ fontSize: "15px", color: "#0070ba", fontWeight: 800 }}>PayPal</span>
          </div>
        </div>

        {/* Amount Selection */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px", marginBottom: "24px",
        }}>
          {withdrawAmounts.map((amount) => (
            <motion.button
              key={amount.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedAmount(amount.value)}
              style={{
                padding: "18px 8px",
                background: selectedAmount === amount.value
                  ? "linear-gradient(145deg, rgba(254,44,85,0.15), rgba(254,44,85,0.05))"
                  : "rgba(255,255,255,0.03)",
                border: selectedAmount === amount.value
                  ? "2px solid #fe2c55"
                  : "2px solid rgba(255,255,255,0.06)",
                borderRadius: "16px", cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: "4px",
                position: "relative",
                transition: "all 0.2s",
              }}
            >
              {amount.badge && (
                <div style={{
                  position: "absolute", top: "-10px", left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #fe2c55, #ff4070)",
                  color: "#fff",
                  fontSize: "9px", fontWeight: 700,
                  padding: "3px 8px", borderRadius: "6px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px rgba(254,44,85,0.3)",
                }}>
                  {t("onlyOnce")}
                </div>
              )}
              <span style={{
                fontSize: "17px", fontWeight: 800,
                color: selectedAmount === amount.value ? "#fe2c55" : "#fff",
              }}>
                {amount.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Withdraw Button */}
        <motion.button
          whileHover={{ scale: balance >= selectedAmount ? 1.02 : 1 }}
          whileTap={{ scale: balance >= selectedAmount ? 0.98 : 1 }}
          disabled={balance < selectedAmount}
          style={{
            width: "100%", padding: "18px", fontSize: "16px", fontWeight: 700,
            background: balance >= selectedAmount
              ? "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)"
              : "rgba(255,255,255,0.08)",
            color: balance >= selectedAmount ? "#fff" : "rgba(255,255,255,0.3)",
            border: "none", borderRadius: "16px", 
            cursor: balance >= selectedAmount ? "pointer" : "not-allowed",
            fontFamily: "inherit",
            boxShadow: balance >= selectedAmount ? "0 4px 20px rgba(254,44,85,0.3)" : "none",
            transition: "all 0.2s",
          }}
        >
          {t("withdrawMoney")}
        </motion.button>

        <p style={{
          fontSize: "12px", color: "var(--text-muted)",
          textAlign: "center", marginTop: "16px", lineHeight: 1.6,
        }}>
          {t("withdrawMinimum")} $0.40. {t("withdrawTime")}
        </p>
      </motion.div>
    </div>
  );
}
