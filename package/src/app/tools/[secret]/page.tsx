"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { ADMIN_SECRET } from "@/lib/admin-secret";

const ACCENT = "#FE2C55";

// Valores em inglês = o que fica salvo no banco (vem do formulário do cliente).
// NÃO traduzir estes — só o rótulo exibido (SURVEY_LABELS_PT abaixo).
const SURVEY_OPTIONS = [
  "I couldn't withdraw / the withdrawal is taking too long",
  "Video limit",
  "Minimum withdrawal amount",
  "I couldn't access the courses",
  "I couldn't install the app on the home screen",
];

const SURVEY_LABELS_PT: Record<string, string> = {
  "I couldn't withdraw / the withdrawal is taking too long": "Não consegui sacar / o saque está demorando muito",
  "Video limit": "Limite de vídeos",
  "Minimum withdrawal amount": "Valor mínimo de saque",
  "I couldn't access the courses": "Não consegui acessar os cursos",
  "I couldn't install the app on the home screen": "Não consegui instalar o app na tela inicial",
};

export default function TestToolsPage() {
  const params = useParams();
  const secret = String(params?.secret ?? "");
  const authorized = secret === ADMIN_SECRET;

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
  // Preview toggles (localStorage) — enable/disable each bonus in the app without removing them
  const [deact, setDeact] = useState<{ up1: boolean; up2: boolean; up3: boolean }>({ up1: false, up2: false, up3: false });

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
    if (!authorized) return;
    loadBonusStatus();
    if (typeof window !== "undefined") {
      setDeact({
        up1: localStorage.getItem("bonus_up1_deactivated") === "1",
        up2: localStorage.getItem("bonus_up2_deactivated") === "1",
        up3: localStorage.getItem("bonus_up3_deactivated") === "1",
      });
    }
  }, [authorized, loadBonusStatus]);

  const toggleDeact = (key: "up1" | "up2" | "up3") => {
    const storageKey = `bonus_${key}_deactivated`;
    const next = !deact[key];
    if (next) localStorage.setItem(storageKey, "1");
    else localStorage.removeItem(storageKey);
    setDeact((d) => ({ ...d, [key]: next }));
    setBonusMsg(next
      ? `${key.toUpperCase()} desativado para pré-visualização (continua liberado).`
      : `${key.toUpperCase()} reativado.`);
  };

  const changeBonus = async (action: "grant" | "revoke") => {
    setBonusBusy(true);
    setBonusMsg(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        setBonusMsg("Você precisa estar logado no app primeiro.");
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
        setBonusMsg("Erro: " + (data.error || "falhou"));
      } else {
        if (action === "grant") {
          // Make sure the preview toggles aren't hiding what we just unlocked
          localStorage.removeItem("bonus_up1_deactivated");
          localStorage.removeItem("bonus_up2_deactivated");
          localStorage.removeItem("bonus_up3_deactivated");
          setDeact({ up1: false, up2: false, up3: false });
        }
        setBonusMsg(action === "grant"
          ? `Bônus liberados só para a sua conta (${user.email}).`
          : `Bônus removidos da sua conta (${user.email}).`);
        loadBonusStatus();
      }
    } catch {
      setBonusMsg("Erro de conexão");
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
        setBalanceMsg("Você precisa estar logado no app primeiro. Abra o app, faça login e volte aqui.");
        setSettingBalance(false);
        return;
      }
      const { error } = await supabase
        .from("profiles")
        .update({ total_xp: 50000000, updated_at: new Date().toISOString() })
        .eq("id", user.id);
      if (error) {
        setBalanceMsg("Erro: " + error.message);
      } else {
        setBalanceMsg("Pronto! Seu saldo agora é US$ 5.000,00. Abra a carteira e clique em Sacar pra testar.");
      }
    } catch (e) {
      setBalanceMsg("Erro: " + (e instanceof Error ? e.message : "desconhecido"));
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
        setSendMsg("Você precisa estar logado no app primeiro.");
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
        setSendMsg("Erro: " + (data.message || data.error || "falhou"));
      } else {
        setSendMsg("E-mail de reembolso enviado (limite ignorado). ID do pedido: " + data.requestId);
      }
    } catch {
      setSendMsg("Erro de conexão");
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

  if (!authorized) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0a", color: "rgba(255,255,255,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: "14px",
      }}>
        Não encontrado.
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
          }}>Ferramentas de Teste</span>
        </div>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "10px" }}>
          Área administrativa / de teste privada. Mantenha esta URL em segredo.
        </p>
        <a
          href={`/refunds/${ADMIN_SECRET}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700,
            color: ACCENT, textDecoration: "none", marginBottom: "20px",
            background: "rgba(254,44,85,0.1)", border: `1px solid ${ACCENT}44`,
            padding: "8px 14px", borderRadius: "10px",
          }}
        >
          Ir para Motivos de Reembolso →
        </a>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Unlock bonuses (per-account) */}
          <div style={{
            background: "rgba(255,255,255,0.03)", border: `1px solid ${ACCENT}33`,
            borderRadius: "14px", padding: "20px",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px" }}>Liberar bônus pra mim</h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", margin: "0 0 14px", lineHeight: 1.6 }}>
              Libera UP1, UP2 e UP3 <strong style={{ color: ACCENT }}>só para a sua conta logada</strong> —
              não libera para outros usuários. Você pode remover a qualquer momento.
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
                {bonusBusy ? "..." : "Liberar todos os bônus pra mim"}
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
                Remover
              </button>
            </div>

            <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.7)", margin: "0 0 4px" }}>
                Pré-visualização — ligar/desligar cada bônus no app
              </p>
              <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.4)", margin: "0 0 12px", lineHeight: 1.5 }}>
                Só esconde/mostra um bônus no app deste navegador. NÃO remove da sua conta.
              </p>
              {([
                { key: "up1", label: "Multiplataforma (UP1)" },
                { key: "up2", label: "Assistente de IA (UP2)" },
                { key: "up3", label: "Algoritmo Refinado (UP3)" },
              ] as const).map((item) => {
                const on = !deact[item.key];
                return (
                  <div key={item.key} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 12px", marginBottom: "8px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: on ? "#fff" : "rgba(255,255,255,0.5)" }}>
                      {item.label}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, color: on ? ACCENT : "rgba(255,255,255,0.4)", width: "26px", textAlign: "right" }}>
                        {on ? "ON" : "OFF"}
                      </span>
                      <button
                        onClick={() => toggleDeact(item.key)}
                        aria-label={`ativar/desativar ${item.key}`}
                        style={{
                          width: "44px", height: "24px", borderRadius: "12px", border: "none", cursor: "pointer",
                          background: on ? ACCENT : "rgba(255,255,255,0.18)", position: "relative", padding: 0,
                          transition: "background 0.2s", flexShrink: 0,
                        }}
                      >
                        <span style={{
                          position: "absolute", top: "3px", left: on ? "23px" : "3px",
                          width: "18px", height: "18px", borderRadius: "50%", background: "#fff",
                          transition: "left 0.2s",
                        }} />
                      </button>
                    </div>
                  </div>
                );
              })}
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
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px" }}>Chegar a US$ 5.000 na hora</h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", margin: "0 0 16px", lineHeight: 1.6 }}>
              Define o saldo da sua conta logada em <strong style={{ color: ACCENT }}>US$ 5.000,00</strong> pra você testar
              a tela de saque &ldquo;Conta em Análise&rdquo;.
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
              {settingBalance ? "Definindo..." : "Definir meu saldo em US$ 5.000"}
            </button>
            {balanceMsg && (
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "12px" }}>{balanceMsg}</p>
            )}
            <a href="/wallet" style={{ display: "inline-block", marginTop: "12px", color: ACCENT, fontSize: "13px", fontWeight: 700 }}>
              Abrir carteira →
            </a>
          </div>

          {/* Send test refund email */}
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px", padding: "20px",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px" }}>Enviar e-mail de reembolso de teste</h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", margin: "0 0 16px", lineHeight: 1.6 }}>
              Envia o pedido de reembolso (com a seção da pesquisa) ignorando o limite de 14 dias.
              Também aparece na página de Motivos de Reembolso.
            </p>
            <form onSubmit={sendTestEmail} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="E-mail do solicitante (vazio = e-mail da sua conta)"
                style={inputStyle}
              />
              <input
                type="text"
                value={testReason}
                onChange={(e) => setTestReason(e.target.value)}
                placeholder="Texto do motivo"
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
                      {SURVEY_LABELS_PT[option] ?? option}
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
                {sending ? "Enviando..." : "Enviar e-mail de teste"}
              </button>
            </form>
            {sendMsg && (
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "12px" }}>{sendMsg}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
