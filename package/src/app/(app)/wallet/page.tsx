"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { useTheme } from "@/lib/theme/context";
import { createClient } from "@/lib/supabase/client";
import RefundModal from "@/app/components/RefundModal";

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
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);

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
    <div style={{ 
      padding: "clamp(12px, 3vw, 20px) clamp(14px, 4vw, 24px)", 
      maxWidth: "min(600px, calc(100vw - 24px))", 
      margin: "0 auto", 
      paddingBottom: "clamp(16px, 4vw, 24px)",
      boxSizing: "border-box",
    }}>
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
          fontSize: "clamp(28px, 8vw, 40px)", 
          fontWeight: 900, 
          color: "var(--text-primary)",
          display: "flex", 
          alignItems: "center", 
          gap: "clamp(8px, 2vw, 14px)",
          position: "relative",
          flexWrap: "wrap",
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

        {/* Payment Methods */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          marginBottom: "16px", flexWrap: "wrap",
        }}>
          {/* PayPal */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 16px", background: "rgba(0,48,135,0.15)",
            borderRadius: "12px", border: "1px solid rgba(0,112,186,0.3)",
          }}>
            <img
              src="/images/paypal-logo.png"
              alt="PayPal"
              style={{ width: "22px", height: "22px", objectFit: "contain" }}
            />
            <span style={{ fontSize: "14px", color: "#0070ba", fontWeight: 800 }}>PayPal</span>
          </div>
          {/* JPMorgan Chase */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 16px", background: "rgba(17,122,202,0.15)",
            borderRadius: "12px", border: "1px solid rgba(17,122,202,0.35)",
          }}>
            {/* Chase octagon pinwheel logo */}
            <svg width="26" height="26" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M28,2 L72,2 L98,28 L98,72 L72,98 L28,98 L2,72 L2,28 Z" fill="#117ACA"/>
              {/* White offset cross creating 4 blue pinwheel sections */}
              <rect x="43" y="2" width="10" height="49" fill="white"/>
              <rect x="47" y="49" width="10" height="49" fill="white"/>
              <rect x="2" y="43" width="49" height="10" fill="white"/>
              <rect x="49" y="47" width="49" height="10" fill="white"/>
              <rect x="43" y="43" width="14" height="14" fill="white"/>
            </svg>
            <span style={{ fontSize: "14px", color: "#117ACA", fontWeight: 800 }}>Chase</span>
          </div>
          {/* Bank of America */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 16px", background: "rgba(218,41,28,0.1)",
            borderRadius: "12px", border: "1px solid rgba(218,41,28,0.25)",
          }}>
            {/* BofA diagonal stripes logo */}
            <svg width="36" height="22" viewBox="0 0 180 110" xmlns="http://www.w3.org/2000/svg">
              <rect width="180" height="110" rx="4" fill="white"/>
              {/* 3 blue diagonal stripes */}
              <polygon points="5,110 45,0 62,0 22,110" fill="#012169"/>
              <polygon points="22,110 62,0 79,0 39,110" fill="#012169"/>
              <polygon points="39,110 79,0 96,0 56,110" fill="#012169"/>
              {/* 3 red diagonal stripes */}
              <polygon points="84,110 124,0 141,0 101,110" fill="#DA291C"/>
              <polygon points="101,110 141,0 158,0 118,110" fill="#DA291C"/>
              <polygon points="118,110 158,0 175,0 180,0 180,15 135,110" fill="#DA291C"/>
            </svg>
            <span style={{ fontSize: "14px", color: "#DA291C", fontWeight: 800 }}>Bank of America</span>
          </div>
        </div>

        {/* Amount Selection */}
        <div style={{
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(120px, calc(50% - 6px)), 1fr))",
          gap: "clamp(8px, 2vw, 12px)", 
          marginBottom: "clamp(12px, 3vw, 18px)",
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
                fontSize: "clamp(14px, 4vw, 17px)", 
                fontWeight: 800,
                color: selectedAmount === amount.value ? "#fe2c55" : "var(--text-primary)",
                wordBreak: "break-word",
                textAlign: "center",
              }}>
                {amount.value === "all" ? `All ($${balance.toFixed(2)})` : amount.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* 3D Withdraw Button */}
        <button
          onClick={() => setShowWithdrawPopup(true)}
          className="btn-3d btn-3d-full btn-3d-dark"
          style={{
            fontFamily: "inherit",
            cursor: "pointer",
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

      {/* Refund Guarantee Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.25 }}
        style={{
          background: isDarkMode 
            ? "linear-gradient(135deg, rgba(37,244,238,0.08) 0%, rgba(37,244,238,0.03) 100%)"
            : "linear-gradient(135deg, rgba(37,244,238,0.12) 0%, rgba(37,244,238,0.06) 100%)",
          borderRadius: "20px", padding: "20px",
          border: `1px solid ${isDarkMode ? "rgba(37,244,238,0.2)" : "rgba(37,244,238,0.3)"}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Guarantee Badge */}
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "linear-gradient(135deg, #25f4ee, #00d4aa)",
          padding: "6px 12px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          boxShadow: "0 4px 12px rgba(37,244,238,0.3)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#000" }}>
            {t("refundGuarantee") || "Money-Back Guarantee"}
          </span>
        </div>

        {/* Content */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginTop: "32px" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(37,244,238,0.2), rgba(37,244,238,0.1))",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            border: "2px solid rgba(37,244,238,0.3)",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#25f4ee", marginBottom: "6px" }}>
              {t("refundTitle") || "30-Day Refund Policy"}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "16px" }}>
              {t("refundDesc") || "Not satisfied with your purchase? We offer a full refund within 30 days."}
            </p>
          </div>
        </div>
        
        {/* Centered 3D Button */}
        <button
          onClick={() => setShowRefundModal(true)}
          className="btn-3d btn-3d-cyan btn-3d-full btn-3d-animated"
          style={{
            width: "100%",
            marginTop: "16px",
            fontFamily: "inherit",
            fontSize: "15px",
            fontWeight: 700,
            padding: "14px 24px",
            background: "linear-gradient(135deg, #25f4ee 0%, #00d4aa 100%)",
            color: "#000",
            border: "none",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: "0 4px 0 0 #15a8a3, 0 8px 20px rgba(37, 244, 238, 0.35)",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          {t("requestRefundBtn") || "Request Refund"}
        </button>
      </motion.div>

      {/* Refund Modal */}
      <RefundModal isOpen={showRefundModal} onClose={() => setShowRefundModal(false)} />

      {/* Withdraw Popup */}
      <AnimatePresence>
        {showWithdrawPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWithdrawPopup(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)",
                borderRadius: "24px",
                padding: "32px 24px",
                maxWidth: "380px",
                width: "100%",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Icon */}
              <div style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,215,0,0.1))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                border: "2px solid rgba(255,215,0,0.3)",
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "12px",
              }}>
                Withdrawal Not Available
              </h3>

              {/* Message */}
              <p style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
                marginBottom: "8px",
              }}>
                Withdrawals are only available after reaching a minimum balance of:
              </p>

              {/* Amount */}
              <div style={{
                fontSize: "32px",
                fontWeight: 900,
                color: "#ffd700",
                marginBottom: "16px",
              }}>
                $5,000.00
              </div>

              {/* Current Balance */}
              <div style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "12px 16px",
                marginBottom: "24px",
              }}>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                  Your current balance:
                </span>
                <span style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#fff",
                  marginLeft: "8px",
                }}>
                  ${balance.toFixed(2)}
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                height: "8px",
                marginBottom: "8px",
                overflow: "hidden",
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((balance / 5000) * 100, 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #fe2c55, #ff6b8a)",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <p style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "24px",
              }}>
                {((balance / 5000) * 100).toFixed(1)}% of goal reached
              </p>

              {/* Close Button */}
              <button
                onClick={() => setShowWithdrawPopup(false)}
                className="btn-3d btn-3d-primary btn-3d-full"
                style={{ fontFamily: "inherit" }}
              >
                I Understand
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
