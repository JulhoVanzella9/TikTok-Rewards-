"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import Image from "next/image";

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
            position: "fixed", 
            inset: 0,
            background: "#000",
            display: "flex", 
            flexDirection: "column",
            zIndex: 1000,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
          onClick={() => !isSubmitting && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              minHeight: "100%",
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 24px",
            }}
          >
            {step === "legal" ? (
              /* Legal Notice Step */
              <div style={{
                width: "100%",
                maxWidth: "700px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                {/* TikTok Rewards Logo */}
                <div style={{ 
                  marginBottom: "16px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}>
                  <Image 
                    src="/images/tiktok-rewards-logo.png" 
                    alt="TikTok Rewards" 
                    width={400} 
                    height={80}
                    style={{ 
                      objectFit: "contain", 
                      width: "80%",
                      maxWidth: "400px",
                      height: "auto",
                    }}
                    priority
                  />
                </div>

                <p style={{ 
                  fontSize: "18px", 
                  fontWeight: 600, 
                  color: "#fff", 
                  marginBottom: "40px", 
                  textAlign: "center",
                }}>
                  Community
                </p>

                {/* Legal Notice Box */}
                <div style={{
                  background: "#000",
                  padding: "48px 32px",
                  width: "100%",
                  textAlign: "center",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <h3 style={{ 
                    fontSize: "24px", 
                    fontWeight: 800, 
                    color: "#fff", 
                    marginBottom: "32px", 
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}>
                    LEGAL CONSEQUENCES NOTICE
                  </h3>

                  <p style={{ 
                    fontSize: "15px", 
                    color: "rgba(255,255,255,0.75)", 
                    lineHeight: 1.8, 
                    marginBottom: "40px",
                    maxWidth: "600px",
                    margin: "0 auto 40px",
                    textAlign: "center",
                  }}>
                    Please note that initiating a chargeback (a formal request to the credit provider to reverse an unrecognized transaction) without proper justification constitutes illegal conduct under the Fair Credit Billing Act (FCBA). These actions not only harm reputable and ethical businesses but also involve the refusal to acknowledge a legitimate transaction despite having received the product or service. Engaging in such practices may result in legal consequences. It is essential to maintain honesty in all online transactions to ensure a safe and trustworthy shopping environment for all parties involved.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep("form")}
                    style={{
                      padding: "16px 48px",
                      background: "#fe2c55",
                      border: "none", 
                      borderRadius: "8px",
                      color: "#fff", 
                      fontSize: "16px", 
                      fontWeight: 700,
                      cursor: "pointer", 
                      fontFamily: "inherit",
                    }}
                  >
                    Continue Request
                  </motion.button>
                </div>

                {/* Footer Links */}
                <div style={{ 
                  display: "flex", 
                  gap: "32px", 
                  marginTop: "48px",
                  justifyContent: "center", 
                }}>
                  <span style={{ 
                    fontSize: "14px", 
                    color: "#fff", 
                    fontWeight: 700, 
                    cursor: "pointer" 
                  }}>
                    Terms of Use
                  </span>
                  <span style={{ 
                    fontSize: "14px", 
                    color: "#fff", 
                    fontWeight: 700, 
                    cursor: "pointer" 
                  }}>
                    Privacy Policy
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  style={{
                    marginTop: "24px",
                    padding: "14px 40px",
                    background: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    color: "#000", 
                    fontSize: "14px", 
                    fontWeight: 700,
                    cursor: "pointer", 
                    fontFamily: "inherit",
                  }}
                >
                  Back to Start
                </motion.button>
              </div>
            ) : (
              /* Form Step */
              <div style={{
                background: "linear-gradient(145deg, rgba(26,26,46,0.98) 0%, rgba(18,18,30,0.99) 100%)",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "32px",
                width: "100%",
                maxWidth: "440px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              }}>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <div style={{
                      width: "72px", height: "72px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #25f4ee, #00d4aa)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 20px",
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
                      {t("requestSubmitted")}
                    </h3>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                      {t("weWillContact")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Back button */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
                      <button
                        type="button"
                        onClick={() => setStep("legal")}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          color: "rgba(255,255,255,0.6)", padding: "4px",
                          marginRight: "12px",
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff" }}>
                        {t("requestRefund")}
                      </h3>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "10px", display: "block" }}>
                        {t("yourEmail")}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="email@example.com"
                        style={{
                          width: "100%", padding: "16px 18px",
                          background: "rgba(0,0,0,0.5)",
                          border: "2px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          color: "#fff", fontSize: "15px",
                          outline: "none", fontFamily: "inherit",
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "28px" }}>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "10px", display: "block" }}>
                        {t("refundReason")}
                      </label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        placeholder={t("describeReason")}
                        rows={4}
                        style={{
                          width: "100%", padding: "16px 18px",
                          background: "rgba(0,0,0,0.5)",
                          border: "2px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          color: "#fff", fontSize: "15px",
                          outline: "none", fontFamily: "inherit",
                          resize: "vertical", minHeight: "120px",
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "14px" }}>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleClose}
                        disabled={isSubmitting}
                        style={{
                          flex: 1, padding: "16px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          borderRadius: "12px",
                          color: "#fff", fontSize: "15px", fontWeight: 700,
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
                          flex: 1, padding: "16px",
                          background: "#fe2c55",
                          border: "none", borderRadius: "12px",
                          color: "#fff", fontSize: "15px", fontWeight: 700,
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
