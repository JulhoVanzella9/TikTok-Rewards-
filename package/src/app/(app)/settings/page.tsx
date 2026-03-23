"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type SettingToggle = {
  id: string;
  label: string;
  description: string;
  defaultOn: boolean;
};

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    notifications: true,
    autoplay: true,
    darkMode: true,
    quality: false,
    sounds: true,
    progress: true,
  });

  const toggle = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    {
      title: "Notificações",
      icon: "🔔",
      settings: [
        { id: "notifications", label: "Notificações Push", description: "Receba lembretes de estudo e novidades" },
        { id: "sounds", label: "Sons", description: "Efeitos sonoros ao completar aulas" },
      ],
    },
    {
      title: "Reprodução",
      icon: "▶️",
      settings: [
        { id: "autoplay", label: "Autoplay", description: "Reproduzir próxima aula automaticamente" },
        { id: "quality", label: "Qualidade Alta", description: "Sempre reproduzir em alta definição (usa mais dados)" },
      ],
    },
    {
      title: "Aparência",
      icon: "🎨",
      settings: [
        { id: "darkMode", label: "Modo Escuro", description: "Tema escuro da interface" },
        { id: "progress", label: "Mostrar Progresso", description: "Exibir barra de progresso nos cursos" },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", paddingBottom: "100px" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}
      >
        <Link href="/profile" style={{
          width: "36px", height: "36px", borderRadius: "12px",
          background: "rgba(255,255,255,0.06)", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </Link>
        <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#fff" }}>Configurações</h1>
      </motion.div>

      {/* Settings Sections */}
      {sections.map((section, sIdx) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + sIdx * 0.1 }}
          style={{ marginBottom: "28px" }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            marginBottom: "14px",
          }}>
            <span style={{ fontSize: "18px" }}>{section.icon}</span>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{section.title}</h3>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.02)", borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.04)", overflow: "hidden",
          }}>
            {section.settings.map((setting, i) => (
              <motion.div
                key={setting.id}
                whileTap={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                onClick={() => toggle(setting.id)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "18px 20px", cursor: "pointer",
                  borderBottom: i < section.settings.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "2px" }}>
                    {setting.label}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {setting.description}
                  </div>
                </div>

                {/* Toggle Switch */}
                <div
                  style={{
                    width: "48px", height: "28px", borderRadius: "14px",
                    background: toggles[setting.id]
                      ? "linear-gradient(135deg, #fe2c55, #ff4070)"
                      : "rgba(255,255,255,0.1)",
                    position: "relative", flexShrink: 0, marginLeft: "14px",
                    transition: "background 0.3s",
                  }}
                >
                  <motion.div
                    animate={{ x: toggles[setting.id] ? 22 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      width: "24px", height: "24px", borderRadius: "12px",
                      background: "#fff", position: "absolute", top: "2px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Account Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginBottom: "28px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <span style={{ fontSize: "18px" }}>👤</span>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>Conta</h3>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.02)", borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.04)", overflow: "hidden",
        }}>
          {[
            { label: "Alterar Email", desc: "usuario@email.com" },
            { label: "Alterar Senha", desc: "Última alteração há 30 dias" },
            { label: "Idioma", desc: "Português (BR)" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 20px", cursor: "pointer",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.03)" : "none",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "2px" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.desc}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Danger Zone */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div style={{
          background: "rgba(254,44,85,0.04)", borderRadius: "18px",
          border: "1px solid rgba(254,44,85,0.08)", overflow: "hidden",
        }}>
          <motion.div
            whileTap={{ scale: 0.99 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 20px", cursor: "pointer",
              borderBottom: "1px solid rgba(254,44,85,0.06)",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#fe2c55" }}>
              Sair da Conta
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.99 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 20px", cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 600, color: "rgba(254,44,85,0.6)" }}>
              Excluir Conta
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(254,44,85,0.5)" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </motion.div>
        </div>
      </motion.section>

      {/* Version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ textAlign: "center", marginTop: "32px", fontSize: "11px", color: "var(--text-muted)" }}
      >
        TikMoney v1.0.0 · Made with ❤️
      </motion.div>
    </div>
  );
}
