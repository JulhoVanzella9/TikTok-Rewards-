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

const internationalCarriers = [
  { name: "T-Mobile", color: "#E20074" },
  { name: "AT&T", color: "#00A8E0" },
  { name: "Verizon", color: "#CD040B" },
  { name: "Vodafone", color: "#E60000" },
];

export default function WalletPage() {
  const { t } = useI18n();
  const [selectedAmount, setSelectedAmount] = useState(0.4);
  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

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

        {/* Payment Methods */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "24px", flexWrap: "wrap",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 14px", background: "rgba(255,255,255,0.04)",
            borderRadius: "8px",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>{t("bankTransfer")}</span>
          </div>
          <div style={{ padding: "8px 14px", background: "rgba(0,178,169,0.1)", borderRadius: "8px" }}>
            <span style={{ fontSize: "13px", color: "#00b2a9", fontWeight: 800 }}>PIX</span>
          </div>
          <div style={{ padding: "8px 14px", background: "rgba(0,168,89,0.1)", borderRadius: "8px" }}>
            <span style={{ fontSize: "13px", color: "#00a859", fontWeight: 800 }}>PagBank</span>
          </div>
          <div style={{ padding: "8px 14px", background: "rgba(0,48,135,0.15)", borderRadius: "8px" }}>
            <span style={{ fontSize: "13px", color: "#0070ba", fontWeight: 800 }}>PayPal</span>
          </div>
        </div>

        {/* Amount Selection */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
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
          {t("withdrawMinimum")} $0.40.
        </p>
      </motion.div>

      {/* Get Coins Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
        style={{
          background: "linear-gradient(145deg, rgba(255,100,150,0.08), rgba(255,50,100,0.03))",
          borderRadius: "24px", padding: "28px",
          marginBottom: "20px",
          display: "flex", alignItems: "center", gap: "20px",
          border: "1px solid rgba(254,44,85,0.1)",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
            {t("getCoins")}
          </h3>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {t("getCoinsDesc")}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: "18px", width: "100%", padding: "14px",
              fontSize: "14px", fontWeight: 700,
              background: "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)",
              color: "#fff", border: "none", borderRadius: "14px",
              cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 4px 15px rgba(254,44,85,0.25)",
            }}
          >
            {t("getCoinsBtn")}
          </motion.button>
        </div>
        <div style={{ 
          fontSize: "64px", flexShrink: 0,
          filter: "drop-shadow(0 4px 12px rgba(255,100,150,0.3))",
        }}>
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
          borderRadius: "24px", padding: "28px",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "20px",
        }}>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#fff" }}>
            {t("mobileRecharge")}
          </h3>
        </div>
        
        {/* International Carriers */}
        <div style={{
          display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap",
        }}>
          {internationalCarriers.map((carrier) => (
            <div 
              key={carrier.name}
              style={{ 
                padding: "8px 14px", 
                background: `${carrier.color}15`,
                borderRadius: "8px",
                border: `1px solid ${carrier.color}30`,
              }}
            >
              <span style={{ 
                fontSize: "12px", 
                color: carrier.color, 
                fontWeight: 700 
              }}>
                {carrier.name}
              </span>
            </div>
          ))}
        </div>

        {/* Phone Input */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "4px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            style={{
              background: "#1a1a2e",
              border: "none",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              padding: "14px 12px",
              borderRadius: "12px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="+1" style={{ background: "#1a1a2e", color: "#fff" }}>+1 US</option>
            <option value="+44" style={{ background: "#1a1a2e", color: "#fff" }}>+44 UK</option>
            <option value="+49" style={{ background: "#1a1a2e", color: "#fff" }}>+49 DE</option>
            <option value="+33" style={{ background: "#1a1a2e", color: "#fff" }}>+33 FR</option>
            <option value="+34" style={{ background: "#1a1a2e", color: "#fff" }}>+34 ES</option>
            <option value="+39" style={{ background: "#1a1a2e", color: "#fff" }}>+39 IT</option>
            <option value="+81" style={{ background: "#1a1a2e", color: "#fff" }}>+81 JP</option>
            <option value="+86" style={{ background: "#1a1a2e", color: "#fff" }}>+86 CN</option>
            <option value="+55" style={{ background: "#1a1a2e", color: "#fff" }}>+55 BR</option>
            <option value="+52" style={{ background: "#1a1a2e", color: "#fff" }}>+52 MX</option>
          </select>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{
              flex: 1, background: "transparent", border: "none",
              color: "#fff", fontSize: "15px", outline: "none",
              fontFamily: "inherit", padding: "14px 8px",
            }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: "20px", width: "100%", padding: "16px",
            fontSize: "15px", fontWeight: 700,
            background: "rgba(255,255,255,0.06)",
            color: "#fff", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",
            cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
