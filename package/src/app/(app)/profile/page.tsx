"use client";
import { motion } from "framer-motion";
import { courses } from "@/app/data/courses";
import Link from "next/link";

export default function ProfilePage() {
  const completed = courses.filter((c) => c.progress === 100).length;
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100).length;
  const totalHours = "21h 00min";

  const stats = [
    { value: String(courses.length), label: "Cursos", icon: "📚" },
    { value: String(completed), label: "Concluídos", icon: "✅" },
    { value: "7", label: "Streak", icon: "🔥" },
    { value: totalHours, label: "Assistido", icon: "⏱️" },
  ];

  const achievements = [
    { icon: "🔥", title: "7 Dias Streak", unlocked: true },
    { icon: "🎓", title: "Primeiro Curso", unlocked: true },
    { icon: "⭐", title: "Estrela", unlocked: true },
    { icon: "💎", title: "Expert", unlocked: false },
    { icon: "🏆", title: "Mestre", unlocked: false },
    { icon: "🚀", title: "Lenda", unlocked: false },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: "center", marginBottom: "32px", paddingTop: "10px",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          style={{
            width: "90px", height: "90px", borderRadius: "50%",
            background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
            margin: "0 auto 16px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "36px", fontWeight: 800,
            color: "#fff", boxShadow: "0 0 30px rgba(254,44,85,0.3)",
            position: "relative",
          }}
        >
          U
          <div style={{
            position: "absolute", bottom: "-2px", right: "-2px",
            width: "28px", height: "28px", borderRadius: "50%",
            background: "#25f4ee", border: "3px solid #000",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px",
          }}>
            ✓
          </div>
        </motion.div>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>
          Usuário
        </h2>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "16px" }}>
          @usuario · Membro desde 2025
        </p>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "10px 28px", fontSize: "14px", fontWeight: 700,
              background: "var(--gradient-button)", color: "#fff",
              border: "none", borderRadius: "10px", cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Editar Perfil
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "10px 20px", fontSize: "14px", fontWeight: 600,
              background: "rgba(255,255,255,0.06)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            ⚙️
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px", marginBottom: "32px",
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            style={{
              background: "var(--gradient-card)", borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "18px", textAlign: "center",
            }}
          >
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>{stat.icon}</div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#fff" }}>{stat.value}</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500, marginTop: "2px" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <section style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>
          Conquistas
        </h3>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px",
        }}>
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              style={{
                background: ach.unlocked ? "rgba(254,44,85,0.08)" : "rgba(255,255,255,0.02)",
                borderRadius: "16px", border: "1px solid",
                borderColor: ach.unlocked ? "rgba(254,44,85,0.15)" : "rgba(255,255,255,0.04)",
                padding: "16px 8px", textAlign: "center",
                opacity: ach.unlocked ? 1 : 0.4,
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "6px" }}>{ach.icon}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#fff" }}>{ach.title}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      {[
        { label: "Meus Certificados", icon: "📜", href: "#" },
        { label: "Histórico de Atividade", icon: "📊", href: "#" },
        { label: "Configurações", icon: "⚙️", href: "#" },
        { label: "Ajuda & Suporte", icon: "💬", href: "#" },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + i * 0.06 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px", marginBottom: "8px",
            background: "rgba(255,255,255,0.02)", borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.04)", cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>{item.label}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
