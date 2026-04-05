"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ExistingRequest {
  id: string;
  purchase_code: string;
  status: string;
  created_at: string;
}

export default function RefundPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [step, setStep] = useState<"legal" | "form">("legal");
  const [email, setEmail] = useState("");
  const [purchaseCode, setPurchaseCode] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [existingRequests, setExistingRequests] = useState<ExistingRequest[]>([]);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  // Fetch existing refund requests on page load
  useEffect(() => {
    fetch('/api/refund')
      .then(r => r.json())
      .then(data => {
        if (data.requests) {
          setExistingRequests(data.requests);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !purchaseCode || !reason) return;
    
    setIsSubmitting(true);
    setDuplicateError(null);
    
    try {
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purchaseCode, reason }),
      });
      
      const data = await response.json();
      
      if (response.status === 409 && data.error === 'duplicate_request') {
        setDuplicateError(data.message || 'Refund already in progress for this purchase code');
        setIsSubmitting(false);
        return;
      }
      
      if (!response.ok) {
        setDuplicateError(data.error || 'Failed to submit refund request');
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Refund request error:', error);
      setDuplicateError('Connection error. Please try again.');
      setIsSubmitting(false);
    }
  };

  // TikCash Logo SVG component
  const TikCashLogo = () => (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
      <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#25F4EE" transform="translate(-2, -1)"/>
      <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#FE2C55" transform="translate(2, 1)"/>
      <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#fff"/>
      <text x="20" y="32" textAnchor="middle" fill="#000" fontSize="14" fontWeight="800">$</text>
      <circle cx="36" cy="12" r="7" fill="#25f4ee" stroke="#000" strokeWidth="2"/>
      <text x="36" y="15.5" textAnchor="middle" fill="#000" fontSize="9" fontWeight="800">$</text>
    </svg>
  );

  return (
    <div style={{
      minHeight: "100dvh",
      background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)",
      padding: "20px 16px",
      paddingTop: "env(safe-area-inset-top, 20px)",
      paddingBottom: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowX: "hidden",
      overflowY: "auto",
      width: "100%",
      maxWidth: "100vw",
      boxSizing: "border-box",
      WebkitOverflowScrolling: "touch",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 16px",
          boxSizing: "border-box",
        }}
      >
        {step === "legal" ? (
          <>
            {/* Header with Logo */}
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              marginBottom: "24px",
              marginTop: "10px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <TikCashLogo />
                <span style={{ fontSize: "22px", fontWeight: 800, color: "#fff" }}>TikCash</span>
              </div>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)" }}>Community</p>
            </div>

            {/* Legal Notice Card */}
            <div style={{
              background: "rgba(0,0,0,0.6)",
              padding: "24px 20px",
              width: "100%",
              textAlign: "center",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "24px",
            }}>
              <h3 style={{ 
                fontSize: "15px", fontWeight: 800, color: "#fff", 
                marginBottom: "20px", letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}>
                Legal Consequences Notice
              </h3>

              <p style={{ 
                fontSize: "14px", color: "rgba(255,255,255,0.75)", 
                lineHeight: 1.7, marginBottom: "28px",
                textAlign: "left",
              }}>
                Please note that initiating a chargeback (a formal request to the credit provider to reverse an unrecognized transaction) without proper justification constitutes illegal conduct under the Fair Credit Billing Act (FCBA). These actions not only harm reputable and ethical businesses but also involve the refusal to acknowledge a legitimate transaction despite having received the product or service. Engaging in such practices may result in legal consequences. It is essential to maintain honesty in all online transactions to ensure a safe and trustworthy shopping environment for all parties involved.
              </p>

              <button
                onClick={() => setStep("form")}
                className="btn-3d btn-3d-primary"
                style={{ fontFamily: "inherit", width: "100%", maxWidth: "300px" }}
              >
                Continue Request
              </button>
            </div>

            {/* Footer Links */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "24px", justifyContent: "center" }}>
              <span style={{ fontSize: "13px", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Terms of Use</span>
              <span style={{ fontSize: "13px", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Privacy Policy</span>
            </div>

            {/* Back to Start Button */}
            <Link
              href="/"
              className="btn-3d btn-3d-dark"
              style={{ 
                fontFamily: "inherit", 
                textDecoration: "none", 
                textAlign: "center",
                width: "100%",
                maxWidth: "300px",
                marginBottom: "20px",
              }}
            >
              Back to Start
            </Link>
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

                {/* Show existing pending/processing requests */}
                {existingRequests.filter(r => r.status === 'pending' || r.status === 'processing').length > 0 && (
                  <div style={{
                    background: "rgba(254, 44, 85, 0.15)",
                    border: "1px solid rgba(254, 44, 85, 0.3)",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    marginBottom: "16px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#FE2C55" }}>
                        Reembolso em processamento
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", margin: 0 }}>
                      Voce ja possui uma solicitacao de reembolso ativa. Aguarde o processamento antes de enviar uma nova.
                    </p>
                  </div>
                )}

                {/* Show duplicate error message */}
                {duplicateError && (
                  <div style={{
                    background: "rgba(254, 44, 85, 0.15)",
                    border: "1px solid rgba(254, 44, 85, 0.3)",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    marginBottom: "16px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#FE2C55" }}>
                        {duplicateError}
                      </span>
                    </div>
                  </div>
                )}
                
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
