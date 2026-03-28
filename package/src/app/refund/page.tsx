"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RefundPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [step, setStep] = useState<"legal" | "form">("legal");
  const [email, setEmail] = useState("");
  const [purchaseCode, setPurchaseCode] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !purchaseCode || !reason) return;
    
    setIsSubmitting(true);
    
    try {
      await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purchaseCode, reason }),
      });
    } catch (error) {
      console.error('Refund request error:', error);
    }
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)",
      padding: "20px 16px",
      paddingTop: "24px",
      paddingBottom: "calc(120px + env(safe-area-inset-bottom, 0px))",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowX: "hidden",
      width: "100%",
      maxWidth: "100vw",
      boxSizing: "border-box",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: step === "legal" ? "calc(100vw - 32px)" : "calc(100vw - 32px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {step === "legal" ? (
          <>
            {/* Back Button */}
            <Link 
              href="/support"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "rgba(255,255,255,0.7)",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                marginBottom: "16px",
                alignSelf: "flex-start",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Support
            </Link>

            <h2 style={{ 
              fontSize: "18px", fontWeight: 600, color: "rgba(255,255,255,0.7)", 
              marginBottom: "20px", textAlign: "center",
            }}>
              Community
            </h2>

            <div style={{
              background: "#000",
              padding: "24px 16px",
              width: "100%",
              textAlign: "center",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
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

              <button
                onClick={() => setStep("form")}
                className="btn-3d btn-3d-primary"
                style={{ fontFamily: "inherit", width: "100%", maxWidth: "280px" }}
              >
                Continue Request
              </button>
            </div>

            {/* Footer Links */}
            <div style={{ display: "flex", gap: "20px", marginTop: "24px", justifyContent: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Terms of Use</span>
              <span style={{ fontSize: "12px", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Privacy Policy</span>
            </div>
          </>
        ) : (
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
                  {t("requestSubmitted") || "Request Submitted!"}
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                  {t("weWillContact") || "We will contact you soon."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <button
                    type="button"
                    onClick={() => setStep("legal")}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "rgba(255,255,255,0.6)", padding: "4px", marginRight: "12px",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>
                    {t("requestRefund") || "Request Refund"}
                  </h3>
                </div>
                
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "8px", display: "block" }}>
                    {t("yourEmail") || "Your Email"}
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

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "8px", display: "block" }}>
                    Purchase or Transfer Code
                  </label>
                  <input
                    type="text"
                    value={purchaseCode}
                    onChange={(e) => setPurchaseCode(e.target.value)}
                    required
                    placeholder="Enter your purchase or transfer code..."
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
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "8px", display: "block" }}>
                    {t("refundReason") || "Reason for Refund"}
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    placeholder={t("describeReason") || "Describe your reason..."}
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
                  <Link
                    href="/"
                    className="btn-3d btn-3d-dark"
                    style={{ flex: 1, fontFamily: "inherit", textDecoration: "none", textAlign: "center" }}
                  >
                    {t("cancel") || "Cancel"}
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting || !email || !purchaseCode || !reason}
                    className="btn-3d btn-3d-primary"
                    style={{
                      flex: 1, fontFamily: "inherit",
                      opacity: isSubmitting || !email || !purchaseCode || !reason ? 0.6 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSubmitting ? (t("submitting") || "Submitting...") : (t("submit") || "Submit")}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
