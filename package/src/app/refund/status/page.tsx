"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface RefundRequest {
  id: string;
  purchase_code: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

const SUPPORT_EMAIL = "accesssupport.ai@gmail.com";

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function addDays(value: string, days: number) {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function statusLabel(status?: string) {
  const normalized = String(status || "pending").toLowerCase();
  if (normalized === "approved" || normalized === "processed" || normalized === "completed") return "Approved";
  if (normalized === "rejected" || normalized === "denied") return "Rejected";
  if (normalized === "processing") return "Processing";
  return "Under review";
}

export default function RefundStatusPage() {
  const [request, setRequest] = useState<RefundRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);
      fetch(`/api/refund?userId=${user.id}`)
        .then(r => r.json())
        .then(data => {
          const requests = Array.isArray(data.requests) ? data.requests : [];
          setRequest(requests[0] || null);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    });
  }, []);

  const reviewDeadline = useMemo(() => {
    if (!request) return null;
    return addDays(request.created_at, 14);
  }, [request]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #000 0%, #09090d 100%)",
      color: "#fff",
      padding: "24px 16px 90px",
      boxSizing: "border-box",
    }}>
      <motion.main
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          width: "100%",
          maxWidth: "640px",
          margin: "0 auto",
          border: "1px solid rgba(254,44,85,0.35)",
          borderRadius: "18px",
          background: "linear-gradient(145deg, rgba(20,5,10,0.96), rgba(8,8,12,0.98))",
          boxShadow: "0 24px 60px rgba(0,0,0,0.42)",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
          <Link href="/support" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", display: "flex" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <h1 style={{ fontSize: "20px", fontWeight: 900, margin: 0 }}>
            Refund Status
          </h1>
        </div>

        {loading ? (
          <div style={{ padding: "50px 0", textAlign: "center", color: "rgba(255,255,255,0.62)", fontSize: "14px" }}>
            Loading refund status...
          </div>
        ) : !isLoggedIn ? (
          <div style={{ padding: "32px 0", textAlign: "center" }}>
            <h2 style={{ fontSize: "18px", margin: "0 0 10px", fontWeight: 900 }}>Sign in required</h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.62)", lineHeight: 1.6, margin: "0 0 22px" }}>
              Sign in to verify your refund request and review timeline.
            </p>
            <Link href="/login" className="btn-3d btn-3d-primary" style={{ textDecoration: "none", fontFamily: "inherit" }}>
              Go to Login
            </Link>
          </div>
        ) : !request ? (
          <div style={{ padding: "32px 0", textAlign: "center" }}>
            <h2 style={{ fontSize: "18px", margin: "0 0 10px", fontWeight: 900 }}>No refund request found</h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.62)", lineHeight: 1.6, margin: "0 0 22px" }}>
              This page appears after you submit a refund request from the support area.
            </p>
            <Link href="/support" className="btn-3d btn-3d-primary" style={{ textDecoration: "none", fontFamily: "inherit" }}>
              Open Support
            </Link>
          </div>
        ) : (
          <>
            <section style={{
              border: "1px solid rgba(254,44,85,0.42)",
              borderRadius: "16px",
              background: "linear-gradient(145deg, rgba(254,44,85,0.16), rgba(254,44,85,0.06))",
              padding: "18px",
              marginBottom: "18px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "rgba(254,44,85,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(254,44,85,0.4)",
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#FE2C55", textTransform: "uppercase" }}>
                    Current status
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 900 }}>
                    {statusLabel(request.status)}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.76)", margin: 0 }}>
                Your refund request was received and is being reviewed by support. Please do not open a bank or payment-platform chargeback while this 14-day review window is active.
              </p>
            </section>

            <section style={{ display: "grid", gap: "10px", marginBottom: "18px" }}>
              {[
                ["Request ID", request.id],
                ["Purchase code", request.purchase_code],
                ["Submitted", formatDate(request.created_at)],
                ["Review deadline", reviewDeadline ? formatDate(reviewDeadline) : "-"],
              ].map(([label, value]) => (
                <div key={label} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "13px 14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.045)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.52)", fontWeight: 700 }}>{label}</span>
                  <span style={{ fontSize: "12px", color: "#fff", fontWeight: 800, textAlign: "right", overflowWrap: "anywhere" }}>{value}</span>
                </div>
              ))}
            </section>

            <div style={{
              padding: "14px",
              borderRadius: "12px",
              background: "rgba(37,244,238,0.08)",
              border: "1px solid rgba(37,244,238,0.18)",
              color: "rgba(255,255,255,0.72)",
              fontSize: "12px",
              lineHeight: 1.6,
              marginBottom: "18px",
            }}>
              Need help with this refund? Send a message to support at <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#25F4EE", fontWeight: 800 }}>{SUPPORT_EMAIL}</a>.
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <Link href="/support" className="btn-3d btn-3d-dark" style={{ flex: 1, textAlign: "center", textDecoration: "none", fontFamily: "inherit" }}>
                Support
              </Link>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="btn-3d btn-3d-primary" style={{ flex: 1, textAlign: "center", textDecoration: "none", fontFamily: "inherit" }}>
                Message Support
              </a>
            </div>
          </>
        )}
      </motion.main>
    </div>
  );
}
