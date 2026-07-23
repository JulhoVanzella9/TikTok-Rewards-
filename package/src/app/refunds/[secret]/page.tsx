"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ADMIN_SECRET } from "@/lib/admin-secret";

const ACCENT = "#FE2C55";

const SURVEY_OPTIONS = [
  "I couldn't withdraw / the withdrawal is taking too long",
  "Video limit",
  "Minimum withdrawal amount",
  "I couldn't access the courses",
  "I couldn't install the app on the home screen",
];

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
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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

  // Percentage of requests that flagged each survey reason, sorted worst-first
  const reasonStats = useMemo(() => {
    const total = requests.length;
    return SURVEY_OPTIONS.map((option) => {
      const count = requests.filter((r) => r.survey.includes(option)).length;
      return { option, count, percent: total > 0 ? (count / total) * 100 : 0 };
    }).sort((a, b) => b.percent - a.percent);
  }, [requests]);

  const filteredRequests = activeFilter
    ? requests.filter((r) => r.survey.includes(activeFilter))
    : requests;

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
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          <a
            href={`/tools/${ADMIN_SECRET}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700,
              color: ACCENT, textDecoration: "none",
              background: "rgba(254,44,85,0.1)", border: `1px solid ${ACCENT}44`,
              padding: "8px 14px", borderRadius: "10px",
            }}
          >
            Go to Test Tools →
          </a>
          <a
            href={`/refunds/${ADMIN_SECRET}/stats`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700,
              color: "#000", textDecoration: "none",
              background: ACCENT, border: `1px solid ${ACCENT}`,
              padding: "8px 14px", borderRadius: "10px",
            }}
          >
            View Chart →
          </a>
        </div>

        {/* Top Issues — percentage of requests, click to filter the table below */}
        {requests.length > 0 && (
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px", padding: "18px", marginBottom: "20px",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 800, margin: 0 }}>Top Issues</h3>
              {activeFilter && (
                <button
                  onClick={() => setActiveFilter(null)}
                  style={{
                    fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
                    padding: "5px 10px", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  Clear filter ✕
                </button>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {reasonStats.map(({ option, count, percent }) => {
                const active = activeFilter === option;
                return (
                  <button
                    key={option}
                    onClick={() => setActiveFilter(active ? null : option)}
                    disabled={count === 0}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      width: "100%", textAlign: "left", padding: "8px 10px",
                      background: active ? "rgba(254,44,85,0.12)" : "transparent",
                      border: active ? `1px solid ${ACCENT}55` : "1px solid transparent",
                      borderRadius: "8px", cursor: count === 0 ? "default" : "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <span style={{
                      flex: "0 0 40%", fontSize: "12.5px",
                      color: count === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.85)",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {option}
                    </span>
                    <div style={{ flex: 1, height: "10px", background: "rgba(255,255,255,0.06)", borderRadius: "5px", overflow: "hidden" }}>
                      <div style={{
                        width: `${percent}%`, height: "100%",
                        background: `linear-gradient(90deg, ${ACCENT}, #ff6b8a)`,
                        borderRadius: "5px", transition: "width 0.4s ease",
                      }} />
                    </div>
                    <span style={{ flex: "0 0 70px", textAlign: "right", fontSize: "12.5px", fontWeight: 800, color: ACCENT }}>
                      {percent.toFixed(0)}% <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>({count})</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
            {filteredRequests.length} request{filteredRequests.length !== 1 ? "s" : ""}
            {activeFilter && <span style={{ color: "rgba(255,255,255,0.4)" }}> (filtered)</span>}
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
              {filteredRequests.length === 0 && !loading ? (
                <tr>
                  <td colSpan={4} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                    {activeFilter ? "No requests match this filter." : "No refund requests yet."}
                  </td>
                </tr>
              ) : (
                filteredRequests.map((r) => (
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
