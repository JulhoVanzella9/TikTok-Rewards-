"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
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

export default function AdminPanel() {
  const [tab, setTab] = useState<"reasons" | "test">("reasons");

  // Reasons tab
  const [requests, setRequests] = useState<RefundRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Test tab
  const [balanceMsg, setBalanceMsg] = useState<string | null>(null);
  const [settingBalance, setSettingBalance] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testReason, setTestReason] = useState("Test refund email");
  const [testSurvey, setTestSurvey] = useState<string[]>([SURVEY_OPTIONS[1]]);
  const [sending, setSending] = useState(false);
  const [sendMsg, setSendMsg] = useState<string | null>(null);

  // Bonus unlock (per-account)
  const [bonusStatus, setBonusStatus] = useState<{ up1: boolean; up2: boolean; up3: boolean } | null>(null);
  const [bonusBusy, setBonusBusy] = useState(false);
  const [bonusMsg, setBonusMsg] = useState<string | null>(null);

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

  const loadBonusStatus = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) { setBonusStatus(null); return; }
    try {
      const res = await fetch(`/api/entitlements?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      setBonusStatus({ up1: !!data.up1, up2: !!data.up2, up3: !!data.up3 });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    loadRequests();
    loadBonusStatus();
  }, [loadRequests, loadBonusStatus]);

  const changeBonus = async (action: "grant" | "revoke") => {
    setBonusBusy(true);
    setBonusMsg(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        setBonusMsg("You must be logged in to the app first.");
        setBonusBusy(false);
        return;
      }
      const res = await fetch("/api/admin/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: ADMIN_SECRET, email: user.email, action }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBonusMsg("Error: " + (data.error || "failed"));
      } else {
        setBonusMsg(action === "grant"
          ? `Bonuses unlocked for your account only (${user.email}).`
          : `Bonuses removed from your account (${user.email}).`);
        loadBonusStatus();
      }
    } catch {
      setBonusMsg("Connection error");
    }
    setBonusBusy(false);
  };

  const grant5k = async () => {
    setSettingBalance(true);
    setBalanceMsg(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setBalanceMsg("You must be logged in to the app first. Open the app, log in, then come back here.");
        setSettingBalance(false);
        return;
      }
      const { error } = await supabase
        .from("profiles")
        .update({ total_xp: 50000000, updated_at: new Date().toISOString() })
        .eq("id", user.id);
      if (error) {
        setBalanceMsg("Error: " + error.message);
      } else {
        setBalanceMsg("Done! Your balance is now $5,000.00. Open the wallet and tap Withdraw to test.");
      }
    } catch (e) {
      setBalanceMsg("Error: " + (e instanceof Error ? e.message : "unknown"));
    }
    setSettingBalance(false);
  };

  const toggleTestSurvey = (option: string) => {
    setTestSurvey((prev) =>
      prev.includes(option) ? prev.filter((r) => r !== option) : [...prev, option]
    );
  };

  const sendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendMsg(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSendMsg("You must be logged in to the app first.");
        setSending(false);
        return;
      }
      const res = await fetch("/api/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testEmail || user.email,
          fullName: "Test User",
          purchaseCode: "TEST-" + Date.now().toString().slice(-6),
          reason: testReason || "Test refund email",
          amount: "10,00",
          paymentMethod: "Credit Card",
          userId: user.id,
          surveyReasons: testSurvey,
          adminKey: ADMIN_SECRET,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSendMsg("Error: " + (data.message || data.error || "failed"));
      } else {
        setSendMsg("Refund email sent (limit bypassed). Request ID: " + data.requestId);
        loadRequests();
      }
    } catch {
      setSendMsg("Connection error");
    }
    setSending(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px",
    background: "rgba(0,0,0,0.4)",
    border: "2px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    color: "#fff", fontSize: "14px",
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)",
      color: "#fff", padding: "24px 16px 80px",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span style={{ fontSize: "22px", fontWeight: 900 }}>TikCash</span>
          <span style={{
            fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px",
            color: ACCENT, background: "rgba(254,44,85,0.12)", border: `1px solid ${ACCENT}55`,
            padding: "3px 10px", borderRadius: "20px",
          }}>Test Panel</span>
        </div>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>
          Private admin / test area. Keep this URL secret.
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {[
            { id: "reasons" as const, label: "Refund Reasons" },
            { id: "test" as const, label: "Test Tools" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "10px 18px", borderRadius: "10px", cursor: "pointer",
                fontFamily: "inherit", fontSize: "14px", fontWeight: 700,
                border: tab === t.id ? `2px solid ${ACCENT}` : "2px solid rgba(255,255,255,0.1)",
                background: tab === t.id ? "rgba(254,44,85,0.12)" : "rgba(255,255,255,0.03)",
                color: tab === t.id ? ACCENT : "rgba(255,255,255,0.7)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "reasons" ? (
          <>
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
                    {["Date", "Email", "Reason", "Survey answers", "Status"].map((h) => (
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
                      <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
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
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{
                            fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                            padding: "3px 8px", borderRadius: "6px",
                            background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)",
                          }}>{r.status}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Unlock bonuses (per-account) */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: `1px solid ${ACCENT}33`,
              borderRadius: "14px", padding: "20px",
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px" }}>Unlock bonuses for me</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", margin: "0 0 14px", lineHeight: 1.6 }}>
                Unlocks UP1, UP2 and UP3 for <strong style={{ color: ACCENT }}>your logged-in account only</strong> —
                it does not unlock for other users. You can remove it anytime.
              </p>

              {bonusStatus && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                  {([["UP1", bonusStatus.up1], ["UP2", bonusStatus.up2], ["UP3", bonusStatus.up3]] as const).map(([label, on]) => (
                    <span key={label} style={{
                      fontSize: "12px", fontWeight: 700, padding: "5px 10px", borderRadius: "8px",
                      background: on ? "rgba(254,44,85,0.14)" : "rgba(255,255,255,0.05)",
                      border: on ? `1px solid ${ACCENT}55` : "1px solid rgba(255,255,255,0.1)",
                      color: on ? ACCENT : "rgba(255,255,255,0.45)",
                    }}>
                      {label} {on ? "✓" : "✗"}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => changeBonus("grant")}
                  disabled={bonusBusy}
                  style={{
                    padding: "12px 20px", borderRadius: "10px", cursor: "pointer",
                    fontFamily: "inherit", fontSize: "14px", fontWeight: 700, border: "none",
                    background: ACCENT, color: "#fff", opacity: bonusBusy ? 0.6 : 1,
                  }}
                >
                  {bonusBusy ? "..." : "Unlock all bonuses for me"}
                </button>
                <button
                  onClick={() => changeBonus("revoke")}
                  disabled={bonusBusy}
                  style={{
                    padding: "12px 20px", borderRadius: "10px", cursor: "pointer",
                    fontFamily: "inherit", fontSize: "14px", fontWeight: 700,
                    border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.8)", opacity: bonusBusy ? 0.6 : 1,
                  }}
                >
                  Remove
                </button>
              </div>
              {bonusMsg && (
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "12px" }}>{bonusMsg}</p>
              )}
            </div>

            {/* Grant $5,000 */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px", padding: "20px",
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px" }}>Reach $5,000 instantly</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", margin: "0 0 16px", lineHeight: 1.6 }}>
                Sets your logged-in account balance to <strong style={{ color: ACCENT }}>$5,000.00</strong> so you can test
                the withdrawal &ldquo;Account Under Review&rdquo; screen.
              </p>
              <button
                onClick={grant5k}
                disabled={settingBalance}
                style={{
                  padding: "12px 20px", borderRadius: "10px", cursor: "pointer",
                  fontFamily: "inherit", fontSize: "14px", fontWeight: 700, border: "none",
                  background: ACCENT, color: "#fff", opacity: settingBalance ? 0.6 : 1,
                }}
              >
                {settingBalance ? "Setting..." : "Set my balance to $5,000"}
              </button>
              {balanceMsg && (
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "12px" }}>{balanceMsg}</p>
              )}
              <a href="/wallet" style={{ display: "inline-block", marginTop: "12px", color: ACCENT, fontSize: "13px", fontWeight: 700 }}>
                Open wallet →
              </a>
            </div>

            {/* Send test refund email */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px", padding: "20px",
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px" }}>Send test refund email</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", margin: "0 0 16px", lineHeight: 1.6 }}>
                Sends the support refund email (with the survey section) ignoring the 14-day limit.
                It also shows up in the Refund Reasons tab.
              </p>
              <form onSubmit={sendTestEmail} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Requester email (blank = your account email)"
                  style={inputStyle}
                />
                <input
                  type="text"
                  value={testReason}
                  onChange={(e) => setTestReason(e.target.value)}
                  placeholder="Reason text"
                  style={inputStyle}
                />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {SURVEY_OPTIONS.map((option) => {
                    const checked = testSurvey.includes(option);
                    return (
                      <label key={option} style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        padding: "8px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12px",
                        background: checked ? "rgba(254,44,85,0.1)" : "rgba(255,255,255,0.03)",
                        border: checked ? `1px solid ${ACCENT}55` : "1px solid rgba(255,255,255,0.1)",
                      }}>
                        <input type="checkbox" checked={checked} onChange={() => toggleTestSurvey(option)}
                          style={{ accentColor: ACCENT, cursor: "pointer" }} />
                        {option}
                      </label>
                    );
                  })}
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    padding: "12px 20px", borderRadius: "10px", cursor: "pointer",
                    fontFamily: "inherit", fontSize: "14px", fontWeight: 700, border: "none",
                    background: ACCENT, color: "#fff", opacity: sending ? 0.6 : 1, alignSelf: "flex-start",
                  }}
                >
                  {sending ? "Sending..." : "Send test email"}
                </button>
              </form>
              {sendMsg && (
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "12px" }}>{sendMsg}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
