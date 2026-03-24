"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";

const fadeIn = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

const withdrawAmounts = [
  { value: 0.4, label: "R$0,4", badge: "onlyOnce" },
  { value: 1.5, label: "R$1,5", badge: null },
  { value: 5, label: "R$5", badge: null },
  { value: 10, label: "R$10", badge: null },
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
        // Convert XP to balance (example: 10000 XP = R$1)
        setBalance(xp / 10000);
      }
      setLoading(false);
    };

    loadBalance();
  }, []);

  const formattedBalance = balance.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          display: "flex", alignItems: "center", gap: "16px",
          marginBottom: "24px",
        }}
      >
        <Link href="/profile">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "transparent", border: "none",
              color: "#fff", cursor: "pointer", padding: "8px",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </motion.button>
        </Link>
        <h1 style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>
          {t("redeemRewards")}
        </h1>
        <div style={{ marginLeft: "auto" }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "transparent", border: "none",
              color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: "8px",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
          borderRadius: "20px", padding: "24px",
          marginBottom: "4px", position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px" }}>
          {t("yourBalance")}
        </div>
        <div style={{
          fontSize: "36px", fontWeight: 900, color: "#fff",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          {loading ? "..." : formattedBalance}
          <div style={{
            width: "50px", height: "50px", borderRadius: "50%",
            background: "linear-gradient(135deg, #ffd700, #ffaa00)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "24px", fontWeight: 900, color: "#fff",
            boxShadow: "0 4px 15px rgba(255,215,0,0.3)",
          }}>
            P
          </div>
        </div>
        <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
          = {points.toLocaleString()} {t("points")}
        </div>
      </motion.div>

      {/* Transactions Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          background: "rgba(255,255,255,0.03)",
          borderRadius: "0 0 20px 20px",
          padding: "14px 24px",
          marginBottom: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer",
          borderTop: "1px dashed rgba(255,255,255,0.1)",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          {t("yourTransactions")}: {formattedBalance}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
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
          borderRadius: "20px", padding: "24px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>
          {t("withdrawMoney")}
        </h2>

        {/* Payment Methods */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          marginBottom: "20px", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t("bankTransfer")}</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ fontSize: "12px", color: "#00b2a9", fontWeight: 700 }}>pix</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ fontSize: "12px", color: "#00a859", fontWeight: 700 }}>PagBank</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ fontSize: "12px", color: "#003087", fontWeight: 700 }}>PayPal</span>
        </div>

        {/* Amount Selection */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px", marginBottom: "20px",
        }}>
          {withdrawAmounts.map((amount) => (
            <motion.button
              key={amount.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedAmount(amount.value)}
              style={{
                padding: "16px 8px",
                background: selectedAmount === amount.value
                  ? "rgba(254,44,85,0.1)"
                  : "rgba(255,255,255,0.03)",
                border: selectedAmount === amount.value
                  ? "2px solid #fe2c55"
                  : "2px solid rgba(255,255,255,0.06)",
                borderRadius: "12px", cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: "4px",
                position: "relative",
              }}
            >
              {amount.badge && (
                <div style={{
                  position: "absolute", top: "-8px", left: "50%",
                  transform: "translateX(-50%)",
                  background: "#fe2c55", color: "#fff",
                  fontSize: "8px", fontWeight: 700,
                  padding: "2px 6px", borderRadius: "4px",
                  whiteSpace: "nowrap",
                }}>
                  {t("onlyOnce")}
                </div>
              )}
              <span style={{
                fontSize: "16px", fontWeight: 800,
                color: selectedAmount === amount.value ? "#fe2c55" : "#fff",
              }}>
                {amount.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Withdraw Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={balance < selectedAmount}
          style={{
            width: "100%", padding: "16px", fontSize: "16px", fontWeight: 700,
            background: balance >= selectedAmount
              ? "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)"
              : "rgba(255,255,255,0.1)",
            color: balance >= selectedAmount ? "#fff" : "rgba(255,255,255,0.3)",
            border: "none", borderRadius: "50px", cursor: balance >= selectedAmount ? "pointer" : "not-allowed",
            fontFamily: "inherit",
          }}
        >
          {t("withdrawMoney")}
        </motion.button>

        <p style={{
          fontSize: "11px", color: "var(--text-muted)",
          textAlign: "center", marginTop: "12px", lineHeight: 1.5,
        }}>
          {t("withdrawMinimum")} R$0,4.
        </p>
      </motion.div>

      {/* Get Coins Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: "20px", padding: "24px",
          marginBottom: "20px",
          display: "flex", alignItems: "center", gap: "16px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
            {t("getCoins")}
          </h3>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
            {t("getCoinsDesc")}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: "16px", width: "100%", padding: "14px",
              fontSize: "14px", fontWeight: 700,
              background: "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)",
              color: "#fff", border: "none", borderRadius: "50px",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            {t("getCoinsBtn")}
          </motion.button>
        </div>
        <div style={{ fontSize: "60px", flexShrink: 0 }}>
          🌹
        </div>
      </motion.div>

      {/* Mobile Recharge Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.25 }}
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: "20px", padding: "24px",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "16px",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
            {t("mobileRecharge")}
          </h3>
          <div style={{ display: "flex", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "#ff0000", fontWeight: 700 }}>Claro</span>
            <span style={{ fontSize: "12px", color: "#003399", fontWeight: 700 }}>TIM</span>
            <span style={{ fontSize: "12px", color: "#660099", fontWeight: 700 }}>vivo</span>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "14px 16px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>+55</span>
          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }} />
          <input
            type="tel"
            placeholder="12345678901"
            style={{
              flex: 1, background: "transparent", border: "none",
              color: "#fff", fontSize: "14px", outline: "none",
              fontFamily: "inherit",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
