"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";

const fadeIn = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

const faqItems = [
  {
    question: "How do I earn points?",
    answer: "You earn points by watching videos, completing courses, and engaging with content. Each video watched gives you XP that converts to points for withdrawal."
  },
  {
    question: "How long does withdrawal take?",
    answer: "Withdrawals are processed within 7 business days. You will receive a confirmation email once your withdrawal is complete."
  },
  {
    question: "What is the minimum withdrawal amount?",
    answer: "The minimum withdrawal amount is $0.40. The first withdrawal of $0.40 can only be done once per account."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our support team through this page by using the contact form below or by submitting a refund request if needed."
  },
  {
    question: "Why was my withdrawal rejected?",
    answer: "Withdrawals may be rejected if the account information is incorrect or if there are suspicious activities. Please ensure your payment details are accurate."
  },
];

export default function SupportPage() {
  const { t } = useI18n();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundEmail, setRefundEmail] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRefundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundEmail || !refundReason) return;
    
    setIsSubmitting(true);
    
    try {
      // Send refund request via API
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: refundEmail, reason: refundReason }),
      });
      
      if (!response.ok) throw new Error('Failed to submit');
    } catch (error) {
      console.error('Refund request error:', error);
    }
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setShowRefundModal(false);
      setSubmitted(false);
      setRefundEmail("");
      setRefundReason("");
    }, 2000);
  };

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
          {t("support")}
        </h1>
      </motion.div>

      {/* Support Hero */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        style={{
          background: "linear-gradient(145deg, rgba(37,244,238,0.1) 0%, rgba(254,44,85,0.05) 100%)",
          borderRadius: "24px", padding: "28px",
          marginBottom: "24px", textAlign: "center",
          border: "1px solid rgba(37,244,238,0.1)",
        }}
      >
        <div style={{
          width: "64px", height: "64px", borderRadius: "50%",
          background: "linear-gradient(135deg, #25f4ee, #00d4aa)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
          boxShadow: "0 8px 24px rgba(37,244,238,0.25)",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
          {t("howCanWeHelp")}
        </h2>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6 }}>
          {t("supportDesc")}
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.1 }}
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px",
          marginBottom: "24px",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowRefundModal(true)}
          style={{
            padding: "20px 16px",
            background: "linear-gradient(145deg, rgba(254,44,85,0.1), rgba(254,44,85,0.05))",
            border: "1px solid rgba(254,44,85,0.15)",
            borderRadius: "16px", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
            {t("requestRefund")}
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open('mailto:julhoeduardo7@gmail.com?subject=Help%20Request%20-%20TikTok%20Rewards', '_blank')}
          style={{
            padding: "20px 16px",
            background: "linear-gradient(145deg, rgba(37,244,238,0.1), rgba(37,244,238,0.05))",
            border: "1px solid rgba(37,244,238,0.15)",
            borderRadius: "16px", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
            {t("helpCenter")}
          </span>
        </motion.button>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.15 }}
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: "24px", padding: "24px",
          marginBottom: "24px",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>
          {t("frequentlyAsked")}
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={false}
              style={{
                background: expandedFaq === index ? "rgba(255,255,255,0.04)" : "transparent",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                style={{
                  width: "100%", padding: "16px",
                  background: "transparent", border: "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff", textAlign: "left" }}>
                  {item.question}
                </span>
                <motion.svg
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </motion.svg>
              </button>
              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{
                      padding: "0 16px 16px",
                      fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6,
                    }}>
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: "24px", padding: "24px",
          border: "1px solid rgba(255,255,255,0.04)",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
          {t("stillNeedHelp")}
        </h3>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px", lineHeight: 1.6 }}>
          {t("contactUsDesc")}
        </p>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          padding: "12px 20px", background: "rgba(255,255,255,0.04)", borderRadius: "12px",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span style={{ fontSize: "13px", color: "#25f4ee", fontWeight: 600 }}>
            support@tiktokrewards.com
          </span>
        </div>
      </motion.div>

      {/* Refund Modal */}
      <AnimatePresence>
        {showRefundModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.8)", zIndex: 1000,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "20px",
            }}
            onClick={() => !isSubmitting && setShowRefundModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#1a1a2e",
                borderRadius: "24px", padding: "28px",
                width: "100%", maxWidth: "400px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #25f4ee, #00d4aa)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
                    {t("requestSubmitted")}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    {t("weWillContact")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRefundSubmit}>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>
                    {t("requestRefund")}
                  </h3>
                  
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", display: "block" }}>
                      {t("yourEmail")}
                    </label>
                    <input
                      type="email"
                      value={refundEmail}
                      onChange={(e) => setRefundEmail(e.target.value)}
                      required
                      placeholder="email@example.com"
                      style={{
                        width: "100%", padding: "14px 16px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px", color: "#fff",
                        fontSize: "14px", fontFamily: "inherit",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", display: "block" }}>
                      {t("refundReason")}
                    </label>
                    <textarea
                      value={refundReason}
                      onChange={(e) => setRefundReason(e.target.value)}
                      required
                      placeholder={t("describeReason")}
                      rows={4}
                      style={{
                        width: "100%", padding: "14px 16px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px", color: "#fff",
                        fontSize: "14px", fontFamily: "inherit",
                        outline: "none", resize: "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowRefundModal(false)}
                      disabled={isSubmitting}
                      style={{
                        flex: 1, padding: "14px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px", color: "#fff",
                        fontSize: "14px", fontWeight: 600,
                        cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      {t("cancel")}
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      style={{
                        flex: 1, padding: "14px",
                        background: "linear-gradient(135deg, #fe2c55, #ff4070)",
                        border: "none", borderRadius: "12px",
                        color: "#fff", fontSize: "14px", fontWeight: 700,
                        cursor: "pointer", fontFamily: "inherit",
                        opacity: isSubmitting ? 0.7 : 1,
                      }}
                    >
                      {isSubmitting ? t("submitting") : t("submit")}
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
