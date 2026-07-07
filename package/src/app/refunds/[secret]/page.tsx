"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { ADMIN_SECRET } from "@/lib/admin-secret";

const ACCENT = "#FE2C55";

interface RefundRow {
  id: string;
  email: string;
  purchaseCode: string;
  reason: string;
  survey: string[];
  status: string;
  createdAt: string;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function RefundReasonsPage() {
  const params = useParams();
  const secret = String(params?.secret ?? "");
  const authorized = secret === ADMIN_SECRET;

  const [requests, setRequests] = useState<RefundRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(`/api/admin/refunds?key=${encodeURIComponent(ADMIN_SECRET)}`);
      const data = await res.json();
      if (!res.ok) {
        setLoadError(data.error || "Failed to load");
      } else {
        setRequests(data.requests || []);
      }
    } catch {
      setLoadError("Connection error");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authorized) loadRequests();
  }, [authorized, loadRequests]);

  if (!authorized) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0a", color: "rgba(255,255,255,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: "14px",
      }}>
        Not found.
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)",
      color: "#fff", padding: "24px 16px 80px",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "22px", fontWeight: 900 }}>TikCash</span>
          <span style={{
            fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px",
            color: ACCENT, background: "rgba(254,44,85,0.12)", border: `1px solid ${ACCENT}55`,
            padding: "3px 10px", borderRadius: "20px",
          }}>Refund Reasons</span>
        </div>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "10px" }}>
          Private admin area. Keep this URL secret.
        </p>
        <a
          href={`/tools/${ADMIN_SECRET}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700,
            color: ACCENT, textDecoration: "none", marginBottom: "20px",
            background: "rgba(254,44,85,0.1)", border: `1px solid ${ACCENT}44`,
            padding: "8px 14px", borderRadius: "10px",
          }}
        >
          Go to Test Tools →
        </a>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
            {requests.length} request{requests.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={loadRequests}
            disabled={loading}
            style={{
              padding: "8px 16px", borderRadius: "8px", cursor: "pointer",
              fontFamily: "inherit", fontSize: "13px", fontWeight: 700,
              border: "none", background: ACCENT, color: "#fff",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loadError && (
          <div style={{
            background: "rgba(254,44,85,0.15)", border: `1px solid ${ACCENT}55`,
            borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "13px",
          }}>
            {loadError}
          </div>
        )}

        <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", minWidth: "760px" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                {["Date", "Email", "Reason", "Survey answers"].map((h) => (
                  <th key={h} style={{
                    textAlign: "left", padding: "12px 14px", fontWeight: 700,
                    color: "rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.1)",
                    whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 && !loading ? (
                <tr>
                  <td colSpan={4} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                    No refund requests yet.
                  </td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "rgba(255,255,255,0.75)" }}>
                      {formatDate(r.createdAt)}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 600 }}>{r.email}</td>
                    <td style={{ padding: "12px 14px", maxWidth: "260px", color: "rgba(255,255,255,0.8)" }}>{r.reason}</td>
                    <td style={{ padding: "12px 14px" }}>
                      {r.survey.length > 0 ? (
                        <ul style={{ margin: 0, paddingLeft: "18px" }}>
                          {r.survey.map((s, i) => (
                            <li key={i} style={{ marginBottom: "3px", color: ACCENT }}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
