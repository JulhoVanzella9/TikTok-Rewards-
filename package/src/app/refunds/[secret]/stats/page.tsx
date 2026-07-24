"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
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

interface RefundRow {
  id: string;
  email: string;
  survey: string[];
}

export default function RefundStatsPage() {
  const params = useParams();
  const secret = String(params?.secret ?? "");
  const authorized = secret === ADMIN_SECRET;

  const [requests, setRequests] = useState<RefundRow[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/refunds?key=${encodeURIComponent(ADMIN_SECRET)}`);
      const data = await res.json();
      if (res.ok) setRequests(data.requests || []);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authorized) loadRequests();
  }, [authorized, loadRequests]);

  const total = requests.length;
  const noAnswer = requests.filter((r) => r.survey.length === 0).length;

  const stats = useMemo(() => {
    return SURVEY_OPTIONS.map((option) => {
      const count = requests.filter((r) => r.survey.includes(option)).length;
      return { option, count, percent: total > 0 ? (count / total) * 100 : 0 };
    }).sort((a, b) => b.percent - a.percent);
  }, [requests, total]);

  const topPercent = stats[0]?.percent ?? 0;

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
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "22px", fontWeight: 900 }}>TikCash</span>
          <span style={{
            fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px",
            color: ACCENT, background: "rgba(254,44,85,0.12)", border: `1px solid ${ACCENT}55`,
            padding: "3px 10px", borderRadius: "20px",
          }}>Gráfico de Motivos de Reembolso</span>
        </div>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "10px" }}>
          Área administrativa privada. Mantenha esta URL em segredo.
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
          <a
            href={`/refunds/${ADMIN_SECRET}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700,
              color: ACCENT, textDecoration: "none",
              background: "rgba(254,44,85,0.1)", border: `1px solid ${ACCENT}44`,
              padding: "8px 14px", borderRadius: "10px",
            }}
          >
            ← Voltar para a lista
          </a>
          <button
            onClick={loadRequests}
            disabled={loading}
            style={{
              padding: "8px 16px", borderRadius: "10px", cursor: "pointer",
              fontFamily: "inherit", fontSize: "13px", fontWeight: 700,
              border: "none", background: ACCENT, color: "#fff",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Carregando..." : "Atualizar"}
          </button>
        </div>

        {/* Resumo */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "26px" }}>
          <div style={{ flex: "1 1 140px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "16px" }}>
            <div style={{ fontSize: "28px", fontWeight: 900 }}>{total}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Total de pedidos</div>
          </div>
          <div style={{ flex: "1 1 140px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "16px" }}>
            <div style={{ fontSize: "28px", fontWeight: 900, color: ACCENT }}>{topPercent.toFixed(0)}%</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Taxa do maior problema</div>
          </div>
          <div style={{ flex: "1 1 140px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "16px" }}>
            <div style={{ fontSize: "28px", fontWeight: 900 }}>{noAnswer}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Sem resposta na pesquisa</div>
          </div>
        </div>

        {/* Gráfico */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px", padding: "22px",
        }}>
          <h3 style={{ fontSize: "15px", fontWeight: 800, margin: "0 0 20px" }}>
            % de pedidos que marcaram cada motivo
          </h3>

          {total === 0 ? (
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textAlign: "center", padding: "30px 0" }}>
              Ainda não há pedidos de reembolso.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {stats.map((s, i) => (
                <div key={s.option}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "6px", gap: "10px" }}>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
                      {SURVEY_LABELS_PT[s.option] ?? s.option}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: ACCENT, whiteSpace: "nowrap" }}>
                      {s.percent.toFixed(1)}% <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>({s.count})</span>
                    </span>
                  </div>
                  <div style={{ height: "16px", background: "rgba(255,255,255,0.06)", borderRadius: "8px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.percent}%` }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                      style={{
                        height: "100%", borderRadius: "8px",
                        background: `linear-gradient(90deg, ${ACCENT}, #ff6b8a)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.35)", marginTop: "16px", lineHeight: 1.6 }}>
          As porcentagens são calculadas em relação ao total de pedidos de reembolso. Como os usuários podem selecionar
          mais de um motivo, os valores podem somar mais de 100%.
        </p>
      </div>
    </div>
  );
}
