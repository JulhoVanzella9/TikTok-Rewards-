"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { useTheme } from "@/lib/theme/context";
import { createClient } from "@/lib/supabase/client";

const fadeIn = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

const withdrawAmounts: { value: number | "all"; label: string; badge: string | null }[] = [
  { value: 30, label: "$30.00", badge: "onlyOnce" },
  { value: 50, label: "$50.00", badge: null },
  { value: 100, label: "$100.00", badge: null },
  { value: "all", label: "All Value", badge: null },
];

export default function WalletPage() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [selectedAmount, setSelectedAmount] = useState<number | "all">(30);
  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  // Calcula o valor real do saque (se "all", usa o saldo total)
  const actualWithdrawAmount = selectedAmount === "all" ? balance : selectedAmount;

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
    <div style={{ padding: "12px 16px", maxWidth: "600px", margin: "0 auto", paddingBottom: "20px" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "16px",
        }}
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", 
              border: "none",
              color: "var(--text-primary)", cursor: "pointer", padding: "10px",
              borderRadius: "12px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </motion.button>
        </Link>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" }}>
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
          background: isDarkMode 
            ? "linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)"
            : "linear-gradient(145deg, #ffffff 0%, #f0f0f5 100%)",
          borderRadius: "20px", padding: "20px",
          marginBottom: "4px", position: "relative", overflow: "hidden",
          border: `1px solid var(--border-color)`,
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
          fontSize: "36px", fontWeight: 900, color: "var(--text-primary)",
          display: "flex", alignItems: "center", gap: "12px",
          position: "relative",
        }}>
          {loading ? "..." : formattedBalance}
          <motion.div 
            whileHover={{ rotate: 15 }}
            style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "linear-gradient(145deg, #ffd700, #f0a500)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px", fontWeight: 900, color: "#fff",
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
        whileHover={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
        style={{
          background: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          borderRadius: "0 0 20px 20px",
          padding: "12px 20px",
          marginBottom: "16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer",
          borderTop: `1px dashed var(--border-color)`,
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
          background: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          borderRadius: "20px", padding: "16px",
          marginBottom: "16px",
          border: `1px solid var(--border-color)`,
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "14px" }}>
          {t("withdrawMoney")}
        </h2>

        {/* Payment Method */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          marginBottom: "16px",
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
          gap: "10px", marginBottom: "16px",
        }}>
          {withdrawAmounts.map((amount) => (
            <motion.button
              key={amount.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedAmount(amount.value)}
              style={{
                padding: "14px 8px",
                background: selectedAmount === amount.value
                  ? "linear-gradient(145deg, rgba(254,44,85,0.15), rgba(254,44,85,0.05))"
                  : isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                border: selectedAmount === amount.value
                  ? "2px solid #fe2c55"
                  : `2px solid var(--border-color)`,
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
                color: selectedAmount === amount.value ? "#fe2c55" : "var(--text-primary)",
              }}>
                {amount.value === "all" ? `All ($${balance.toFixed(2)})` : amount.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* 3D Withdraw Button */}
        <button
          disabled={balance < 5000 || balance < actualWithdrawAmount || actualWithdrawAmount <= 0}
          className={`btn-3d btn-3d-full ${balance >= 5000 && balance >= actualWithdrawAmount && actualWithdrawAmount > 0 ? "btn-3d-primary" : "btn-3d-dark"}`}
          style={{
            fontFamily: "inherit",
            opacity: balance >= 5000 && balance >= actualWithdrawAmount && actualWithdrawAmount > 0 ? 1 : 0.5,
            cursor: balance >= 5000 && balance >= actualWithdrawAmount && actualWithdrawAmount > 0 ? "pointer" : "not-allowed",
          }}
        >
          {t("withdrawMoney")} {selectedAmount === "all" && balance > 0 ? `($${balance.toFixed(2)})` : ""}
        </button>

        <p style={{
          fontSize: "12px", color: "var(--text-muted)",
          textAlign: "center", marginTop: "16px", lineHeight: 1.6,
        }}>
          Minimum balance to withdraw: $5,000.00. {t("withdrawTime")}
        </p>
      </motion.div>
    </div>
  );
}
