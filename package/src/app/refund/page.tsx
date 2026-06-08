"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface ExistingRequest {
  id: string;
  purchase_code: string;
  status: string;
  created_at: string;
}

export default function RefundPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [step, setStep] = useState<"legal" | "acknowledge" | "form">("legal");
  const [email, setEmail] = useState("");
  const [purchaseCode, setPurchaseCode] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [reason, setReason] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [customerEmailSent, setCustomerEmailSent] = useState(false);
  const [existingRequests, setExistingRequests] = useState<ExistingRequest[]>([]);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Acknowledgment checkboxes
  const [ack1, setAck1] = useState(false);
  const [ack2, setAck2] = useState(false);
  const [ack3, setAck3] = useState(false);
  const [ack4, setAck4] = useState(false);
  const [ack5, setAck5] = useState(false);

  const allAcknowledged = ack1 && ack2 && ack3 && ack4 && ack5;

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        fetch(`/api/refund?userId=${user.id}`)
          .then(r => r.json())
          .then(data => {
            if (data.requests) {
              setExistingRequests(data.requests);
            }
          })
          .catch(() => {});
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !purchaseCode || !amount || !paymentMethod || !reason || !fullName) return;

    setIsSubmitting(true);
    setDuplicateError(null);

    try {
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, purchaseCode, reason, amount, paymentMethod, userId }),
      });

      const data = await response.json();

      if (response.status === 409 && data.error === 'duplicate_request') {
        setDuplicateError(data.message || 'You already have a refund request from this account.');
        setIsSubmitting(false);
        return;
      }

      if (response.status === 401 && data.error === 'authentication_required') {
        setDuplicateError(data.message || 'You must be logged in to submit a refund request.');
        setIsSubmitting(false);
        return;
      }

      if (!response.ok) {
        setDuplicateError(data.message || data.error || 'Failed to submit refund request');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setCustomerEmailSent(!!data.customerEmailSent);
      if (data.customerEmailError) {
        console.warn('[refund] Customer confirmation email not sent:', data.customerEmailError);
      }
    } catch (error) {
      console.error('Refund request error:', error);
      setDuplicateError('Connection error. Please try again.');
      setIsSubmitting(false);
    }
  };

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

  const WarningIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );

  return (
    <>
      <style>{`
        .refund-page-root { min-height: 100vh; min-height: 100dvh; }
        html, body { height: auto !important; overflow-y: auto !important; overflow-x: hidden !important; }
      `}</style>
      <div className="refund-page-root" style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)",
        padding: "20px 16px 120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
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
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "24px",
            }}>
              {/* Warning Header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "20px",
                padding: "12px",
                background: "rgba(254,44,85,0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(254,44,85,0.3)",
              }}>
                <WarningIcon />
                <h3 style={{
                  fontSize: "15px", fontWeight: 800, color: "#FE2C55",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  margin: 0,
                }}>
                  Legal Consequences Notice
                </h3>
                <WarningIcon />
              </div>

              {/* Main Legal Text */}
              <p style={{
                fontSize: "14px", color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7, marginBottom: "20px",
                textAlign: "left",
              }}>
                Please note that initiating a chargeback (a formal request to the credit provider to reverse an unrecognized transaction) without proper justification constitutes illegal conduct under the Fair Credit Billing Act (FCBA). These actions not only harm reputable and ethical businesses but also involve the refusal to acknowledge a legitimate transaction despite having received the product or service. Engaging in such practices may result in legal consequences. It is essential to maintain honesty in all online transactions to ensure a safe and trustworthy shopping environment for all parties involved.
              </p>

              {/* Refund & Dispute Policy Section */}
              <div style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "20px 16px",
                marginBottom: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <h4 style={{
                  fontSize: "14px", fontWeight: 800, color: "#fff",
                  marginBottom: "16px", textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  textAlign: "center",
                }}>
                  Refund & Dispute Policy
                </h4>

                <p style={{
                  fontSize: "13px", color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.7, marginBottom: "16px",
                  textAlign: "left",
                }}>
                  Before initiating any chargeback or dispute with your bank or card provider, you agree to contact our support team first to resolve the issue.
                </p>

                <p style={{
                  fontSize: "13px", color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.7, marginBottom: "16px",
                  textAlign: "left",
                }}>
                  Failure to contact us prior to opening a dispute may result in your case being formally contested with detailed evidence, including proof of access, usage logs, and acceptance of our terms.
                </p>

                <p style={{
                  fontSize: "13px", color: "#FE2C55",
                  lineHeight: 1.7, marginBottom: "12px",
                  textAlign: "left",
                  fontWeight: 600,
                }}>
                  Unresolved or abusive chargebacks may lead to:
                </p>

                <div style={{ paddingLeft: "8px", marginBottom: "16px" }}>
                  {[
                    "Permanent account suspension and loss of all earned balance",
                    "Complete and irreversible loss of access to all platform services",
                    "Internal fraud prevention flagging across affiliated platforms",
                    "Reporting the dispute with supporting documentation to financial institutions, which may affect your standing with payment providers",
                    "Formal legal action to recover costs associated with fraudulent disputes",
                    "Collection of all evidence (IP logs, device fingerprints, usage data, timestamps) for dispute contestation",
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      marginBottom: "10px",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" strokeWidth="2" style={{ marginTop: "3px", flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: "rgba(254,44,85,0.08)",
                  border: "1px solid rgba(254,44,85,0.2)",
                  borderRadius: "8px",
                  padding: "12px",
                }}>
                  <p style={{
                    fontSize: "12px", color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.7, margin: 0,
                    textAlign: "left",
                  }}>
                    We are committed to resolving any issue quickly and fairly. Please contact our support team before taking external action. All refund requests are reviewed individually and processed within 5-14 business days.
                  </p>
                </div>
              </div>

              {/* Additional Warning */}
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "14px",
                background: "rgba(254,44,85,0.08)",
                borderRadius: "10px",
                border: "1px solid rgba(254,44,85,0.2)",
                marginBottom: "20px",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: "#FE2C55" }}>Important:</strong> By proceeding with this refund request, you acknowledge that your account activity, access logs, IP addresses, and device information have been recorded and may be used as evidence in the event of a dispute or chargeback.
                </p>
              </div>

              <button
                onClick={() => setStep("acknowledge")}
                className="btn-3d btn-3d-primary"
                style={{ fontFamily: "inherit", width: "100%", maxWidth: "300px", display: "block", margin: "0 auto" }}
              >
                I Understand - Continue
              </button>
            </div>

            {/* Footer Links */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "24px", justifyContent: "center" }}>
              <span style={{ fontSize: "13px", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Terms of Use</span>
              <span style={{ fontSize: "13px", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Privacy Policy</span>
            </div>

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
        ) : step === "acknowledge" ? (
          /* Acknowledgment Step */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "rgba(0,0,0,0.6)",
              padding: "24px 20px",
              width: "100%",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
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
                Required Acknowledgments
              </h3>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "20px", lineHeight: 1.6 }}>
              Before proceeding with your refund request, you must acknowledge and agree to all of the following statements. This is a mandatory step required by our compliance department.
            </p>

            {[
              { checked: ack1, setter: setAck1, text: "I confirm that I have contacted or attempted to contact the support team before initiating this refund request." },
              { checked: ack2, setter: setAck2, text: "I understand that filing a chargeback or dispute without first attempting resolution through the platform's support channels may be treated as a fraudulent claim and will be formally contested with all available evidence." },
              { checked: ack3, setter: setAck3, text: "I acknowledge that my account activity, IP address, device information, and usage logs have been recorded and may be submitted to financial institutions, payment processors, and relevant authorities." },
              { checked: ack4, setter: setAck4, text: "I understand that abusive or fraudulent chargebacks may result in permanent account suspension, loss of all earned balance, fraud prevention flagging, and potential legal action." },
              { checked: ack5, setter: setAck5, text: "I confirm that all information I provide in this refund request is truthful and accurate. I understand that providing false information may constitute fraud." },
            ].map((item, i) => (
              <label
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "14px",
                  marginBottom: "10px",
                  background: item.checked ? "rgba(254,44,85,0.08)" : "rgba(255,255,255,0.03)",
                  borderRadius: "10px",
                  border: item.checked ? "1px solid rgba(254,44,85,0.25)" : "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => item.setter(e.target.checked)}
                  style={{
                    width: "18px",
                    height: "18px",
                    marginTop: "2px",
                    accentColor: "#FE2C55",
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                  {item.text}
                </span>
              </label>
            ))}

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <Link
                href="/"
                className="btn-3d btn-3d-dark"
                style={{ flex: 1, fontFamily: "inherit", textDecoration: "none", textAlign: "center" }}
              >
                Cancel
              </Link>
              <button
                onClick={() => allAcknowledged && setStep("form")}
                disabled={!allAcknowledged}
                className="btn-3d btn-3d-primary"
                style={{
                  flex: 1, fontFamily: "inherit",
                  opacity: allAcknowledged ? 1 : 0.4,
                  cursor: allAcknowledged ? "pointer" : "not-allowed",
                }}
              >
                Proceed to Form
              </button>
            </div>
          </motion.div>
        ) : (
          /* Form Step */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "linear-gradient(145deg, rgba(26,26,46,0.98) 0%, rgba(18,18,30,0.99) 100%)",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "20px",
              width: "100%",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
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
                  {t("requestSubmitted") || "Request Submitted"}
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "12px" }}>
                  Your refund request has been received and is under review.
                </p>
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                  padding: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <p style={{ fontSize: "13px", color: "#fff", fontWeight: 700, lineHeight: 1.6, margin: "0 0 10px" }}>
                    Your access will be removed within 14 days.
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
                    {customerEmailSent
                      ? "A confirmation email with your refund details has been sent to your email."
                      : "Your refund details have been registered."} Your purchase amount will be refunded within 14 days. Please do not initiate a chargeback during this period, as it may result in your request being denied and your account being flagged.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="btn-3d btn-3d-primary"
                  style={{ fontFamily: "inherit", width: "100%", marginTop: "20px" }}
                >
                  I Understand
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <button
                    type="button"
                    onClick={() => setStep("acknowledge")}
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

                {/* Step indicator */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "20px",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                }}>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>Policy</span>
                  <span>-</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>Acknowledgments</span>
                  <span>-</span>
                  <span style={{ color: "#25f4ee", fontWeight: 600 }}>Request Form</span>
                </div>

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
                        Refund already in progress
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", margin: 0 }}>
                      You already have an active refund request. Please wait for it to be processed before submitting a new one.
                    </p>
                  </div>
                )}

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

                {/* Full Name */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "8px", display: "block" }}>
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Enter your full legal name..."
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

                {/* Email */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "8px", display: "block" }}>
                    {t("yourEmail") || "Email Address"}
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

                {/* Purchase Code */}
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

                {/* Purchase Amount */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "8px", display: "block" }}>
                    Purchase Amount (US$)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    placeholder="e.g. 49.90"
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

                {/* Payment Method */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "8px", display: "block" }}>
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                    style={{
                      width: "100%", padding: "14px 16px",
                      background: "rgba(0,0,0,0.4)",
                      border: "2px solid rgba(255,255,255,0.12)",
                      borderRadius: "12px",
                      color: paymentMethod ? "#fff" : "rgba(255,255,255,0.4)", fontSize: "14px",
                      outline: "none", fontFamily: "inherit",
                      appearance: "none", WebkitAppearance: "none", MozAppearance: "none",
                    }}
                  >
                    <option value="" disabled style={{ color: "#000" }}>Select payment method...</option>
                    <option value="Credit Card" style={{ color: "#000" }}>Credit Card</option>
                    <option value="Debit Card" style={{ color: "#000" }}>Debit Card</option>
                    <option value="PayPal" style={{ color: "#000" }}>PayPal</option>
                    <option value="Bank Transfer" style={{ color: "#000" }}>Bank Transfer</option>
                    <option value="Other" style={{ color: "#000" }}>Other</option>
                  </select>
                </div>

                {/* Reason */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "8px", display: "block" }}>
                    {t("refundReason") || "Detailed Reason for Refund"}
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    placeholder="Please provide a detailed explanation for your refund request. Include specific reasons and any relevant information..."
                    rows={5}
                    style={{
                      width: "100%", padding: "14px 16px",
                      background: "rgba(0,0,0,0.4)",
                      border: "2px solid rgba(255,255,255,0.12)",
                      borderRadius: "12px",
                      color: "#fff", fontSize: "14px",
                      outline: "none", fontFamily: "inherit",
                      resize: "vertical", minHeight: "120px",
                    }}
                  />
                </div>

                {/* Final Warning */}
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "12px",
                  background: "rgba(254,44,85,0.08)",
                  borderRadius: "10px",
                  border: "1px solid rgba(254,44,85,0.2)",
                  marginBottom: "20px",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
                    By submitting this request, you confirm that you have read and agreed to the Refund & Dispute Policy. Your request will be reviewed by our compliance team. Processing time: 5-14 business days.
                  </p>
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
                    disabled={isSubmitting || !email || !purchaseCode || !amount || !paymentMethod || !reason || !fullName}
                    className="btn-3d btn-3d-primary"
                    style={{
                      flex: 1, fontFamily: "inherit",
                      opacity: isSubmitting || !email || !purchaseCode || !amount || !paymentMethod || !reason || !fullName ? 0.6 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSubmitting ? (t("submitting") || "Submitting...") : (t("submit") || "Submit Request")}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
    </>
  );
}
