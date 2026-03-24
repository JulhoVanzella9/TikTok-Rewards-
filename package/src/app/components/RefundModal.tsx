"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RefundModal({ isOpen, onClose }: RefundModalProps) {
  const { t } = useI18n();
  const [step, setStep] = useState<"legal" | "form">("legal");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !reason) return;
    
    setIsSubmitting(true);
    
    try {
      await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reason }),
      });
    } catch (error) {
      console.error('Refund request error:', error);
    }
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setStep("legal");
    setEmail("");
    setReason("");
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.95)",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            padding: "16px", zIndex: 1000,
            flexDirection: "column",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
          onClick={() => !isSubmitting && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: step === "legal" ? "600px" : "420px",
              display: "flex", flexDirection: "column", alignItems: "center",
              margin: "auto",
              padding: "20px 0",
            }}
          >
            {step === "legal" ? (
              /* Legal Notice Step */
              <>
                {/* TikTok Rewards Logo - same as TopBar, centered */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  gap: "10px",
                  marginBottom: "24px",
                  width: "100%",
                  transform: "translateX(-20px)",
                }}>
                  <div style={{ 
                    width: "48px", height: "48px", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      {/* Cyan layer - offset left */}
                      <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#25F4EE" transform="translate(-2, -1)"/>
                      {/* Red layer - offset right */}
                      <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#FE2C55" transform="translate(2, 1)"/>
                      {/* White main layer */}
                      <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#fff"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.5px",
                    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
                    lineHeight: "48px",
                  }}>
                    TikTok<span style={{ color: "#fe2c55", marginLeft: "6px" }}>Rewards</span>
                  </span>
                </div>

                <h2 style={{ 
                  fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.7)", 
                  marginBottom: "20px", textAlign: "center",
                  width: "100%",
                }}>
                  Community
                </h2>

                <div style={{
                  background: "#000",
                  padding: "24px 16px",
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "12px",
                }}>
                  <h3 style={{ 
                    fontSize: "16px", fontWeight: 800, color: "#fff", 
                    marginBottom: "16px", letterSpacing: "0.5px",
                  }}>
                    LEGAL CONSEQUENCES NOTICE
                  </h3>

                  <p style={{ 
                    fontSize: "13px", color: "rgba(255,255,255,0.7)", 
                    lineHeight: 1.7, marginBottom: "24px",
                    textAlign: "left",
                  }}>
                    Please note that initiating a chargeback (a formal request to the credit provider to reverse an unrecognized transaction) without proper justification constitutes illegal conduct under the Fair Credit Billing Act (FCBA). These actions not only harm reputable and ethical businesses but also involve the refusal to acknowledge a legitimate transaction despite having received the product or service. Engaging in such practices may result in legal consequences. It is essential to maintain honesty in all online transactions to ensure a safe and trustworthy shopping environment for all parties involved.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep("form")}
                    style={{
                      padding: "14px 32px",
                      background: "#fe2c55",
                      border: "none", borderRadius: "8px",
                      color: "#fff", fontSize: "14px", fontWeight: 700,
                      cursor: "pointer", fontFamily: "inherit",
                      width: "100%",
                      maxWidth: "280px",
                    }}
                  >
                    Continue Request
                  </motion.button>
                </div>

                {/* Footer Links */}
                <div style={{ 
                  display: "flex", gap: "20px", marginTop: "24px",
                  justifyContent: "center", flexWrap: "wrap",
                }}>
                  <span style={{ fontSize: "12px", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
                    Terms of Use
                  </span>
                  <span style={{ fontSize: "12px", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
                    Privacy Policy
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  style={{
                    marginTop: "16px",
                    padding: "12px 28px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "8px",
                    color: "#fff", fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  Back to Start
                </motion.button>
              </>
            ) : (
              /* Form Step */
              <div style={{
                background: "linear-gradient(145deg, rgba(26,26,46,0.98) 0%, rgba(18,18,30,0.99) 100%)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "20px",
                width: "100%",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              }}>
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
                  <form onSubmit={handleSubmit}>
                    {/* Back button */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                      <button
                        type="button"
                        onClick={() => setStep("legal")}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          color: "rgba(255,255,255,0.6)", padding: "4px",
                          marginRight: "12px",
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>
                        {t("requestRefund")}
                      </h3>
                    </div>
                    
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", display: "block" }}>
                        {t("yourEmail")}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="email@example.com"
                        style={{
                          width: "100%", padding: "14px 16px",
                          background: "rgba(0,0,0,0.4)",
                          border: "2px solid rgba(255,255,255,0.12)",
                          borderRadius: "12px",
                          color: "#fff", fontSize: "14px",
                          outline: "none", fontFamily: "inherit",
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", display: "block" }}>
                        {t("refundReason")}
                      </label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        placeholder={t("describeReason")}
                        rows={4}
                        style={{
                          width: "100%", padding: "14px 16px",
                          background: "rgba(0,0,0,0.4)",
                          border: "2px solid rgba(255,255,255,0.12)",
                          borderRadius: "12px",
                          color: "#fff", fontSize: "14px",
                          outline: "none", fontFamily: "inherit",
                          resize: "vertical", minHeight: "100px",
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleClose}
                        disabled={isSubmitting}
                        style={{
                          flex: 1, padding: "14px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          color: "#fff", fontSize: "14px", fontWeight: 700,
                          cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        {t("cancel")}
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting || !email || !reason}
                        style={{
                          flex: 1, padding: "14px",
                          background: "#fe2c55",
                          border: "none", borderRadius: "12px",
                          color: "#fff", fontSize: "14px", fontWeight: 700,
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          fontFamily: "inherit",
                          opacity: isSubmitting || !email || !reason ? 0.6 : 1,
                        }}
                      >
                        {isSubmitting ? t("submitting") : t("submit")}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
