"use client";
import { motion } from "framer-motion";
import { courses } from "@/app/data/courses";
import Link from "next/link";

export default function ProfilePage() {
  const completed = courses.filter((c) => c.progress === 100).length;
  const totalCourses = courses.length;
  const totalHours = "21h 00min";

  const stats = [
    { value: String(totalCourses), label: "Cursos", icon: "📚", color: "#fe2c55", bg: "rgba(254,44,85,0.08)" },
    { value: String(completed), label: "Concluídos", icon: "✅", color: "#25f4ee", bg: "rgba(37,244,238,0.08)" },
    { value: "7", label: "Streak", icon: "🔥", color: "#ff6b35", bg: "rgba(255,107,53,0.08)" },
    { value: totalHours, label: "Assistido", icon: "⏱️", color: "#a855f7", bg: "rgba(168,85,247,0.08)" },
  ];

  const menuItems = [
    { label: "Meus Certificados", icon: "📜", href: "/certificates", desc: "Veja seus certificados conquistados" },
    { label: "Histórico de Atividade", icon: "📊", href: "/activity", desc: "Acompanhe sua jornada de aprendizado" },
    { label: "Configurações", icon: "⚙️", href: "/settings", desc: "Personalize sua experiência" },
    { label: "Ajuda & Suporte", icon: "💬", href: "/help", desc: "Precisa de ajuda? Estamos aqui" },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "32px", paddingTop: "10px" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          style={{
            width: "100px", height: "100px", borderRadius: "50%",
            background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
            margin: "0 auto 16px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "40px", fontWeight: 800,
            color: "#fff",
            boxShadow: "0 0 40px rgba(254,44,85,0.3), 0 0 80px rgba(37,244,238,0.15)",
            position: "relative",
          }}
        >
          U
          <div style={{
            position: "absolute", bottom: "-2px", right: "-2px",
            width: "30px", height: "30px", borderRadius: "50%",
            background: "linear-gradient(135deg, #25f4ee, #00d4aa)",
            border: "3px solid #000",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", color: "#000", fontWeight: 800,
          }}>
            ✓
          </div>
        </motion.div>
        <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#fff", marginBottom: "4px" }}>
          Usuário
        </h2>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px" }}>
          @usuario · Membro desde 2025
        </p>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "10px 24px", fontSize: "14px", fontWeight: 600,
            background: "rgba(255,255,255,0.06)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Editar Perfil
        </motion.div>
      </motion.div>

      {/* Stats Grid - Premium */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px", marginBottom: "28px",
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.03, y: -2 }}
            style={{
              background: `linear-gradient(145deg, ${stat.bg}, rgba(255,255,255,0.02))`,
              borderRadius: "20px",
              border: `1px solid ${stat.color}20`,
              padding: "22px 16px", textAlign: "center",
              position: "relative", overflow: "hidden", cursor: "default",
            }}
          >
            <div style={{
              position: "absolute", top: "-20px", right: "-20px",
              width: "60px", height: "60px", borderRadius: "50%",
              background: `${stat.color}08`, filter: "blur(15px)",
            }} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08, type: "spring" }}
              style={{ fontSize: "24px", marginBottom: "8px" }}
            >
              {stat.icon}
            </motion.div>
            <div style={{
              fontSize: "26px", fontWeight: 900, color: stat.color,
              letterSpacing: "-0.5px", lineHeight: 1,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: "12px", color: "var(--text-muted)", fontWeight: 600,
              marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.5px",
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievements Button - Premium CTA */}
      <Link href="/achievements" style={{ textDecoration: "none" }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(254,44,85,0.25)" }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "linear-gradient(135deg, rgba(254,44,85,0.12), rgba(168,85,247,0.08))",
            borderRadius: "20px",
            border: "1px solid rgba(254,44,85,0.15)",
            padding: "22px 20px", marginBottom: "28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: "pointer", position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: "-30px", left: "-30px",
            width: "100px", height: "100px", borderRadius: "50%",
            background: "rgba(254,44,85,0.1)", filter: "blur(25px)",
          }} />
          <div style={{
            position: "absolute", bottom: "-20px", right: "40px",
            width: "80px", height: "80px", borderRadius: "50%",
            background: "rgba(168,85,247,0.08)", filter: "blur(20px)",
          }} />
          <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              style={{ fontSize: "32px" }}
            >
              🏆
            </motion.div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "#fff", marginBottom: "2px" }}>
                Conquistas
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                3 de 12 desbloqueadas · Ver progresso
              </div>
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px", position: "relative",
          }}>
            <div style={{
              display: "flex", gap: "-4px",
            }}>
              {["🔥", "🎓", "⭐"].map((e, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  style={{
                    fontSize: "16px", marginLeft: i > 0 ? "-4px" : 0,
                  }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </motion.div>
      </Link>

      {/* Menu Items - Improved */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
          Menu
        </h3>
        {menuItems.map((item, i) => (
          <Link key={item.label} href={item.href} style={{ textDecoration: "none" }}>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.06 }}
              whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.04)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 18px", marginBottom: "8px",
                background: "rgba(255,255,255,0.02)", borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.04)", cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px",
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                    {item.desc}
                  </div>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Explore CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ padding: "0 0 20px" }}
      >
        <Link href="/explore">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(254,44,85,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="glow-btn"
            style={{
              width: "100%", padding: "16px", fontSize: "15px", fontWeight: 700,
              background: "var(--gradient-button)", color: "#fff",
              border: "none", borderRadius: "14px", cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Explorar Cursos →
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
