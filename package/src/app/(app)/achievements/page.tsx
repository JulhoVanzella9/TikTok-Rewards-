"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type Achievement = {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
  xp: number;
  category: string;
};

const achievements: Achievement[] = [
  // Desbloqueadas
  { id: "first-lesson", icon: "🎬", title: "Primeira Aula", description: "Assista sua primeira aula", progress: 1, maxProgress: 1, unlocked: true, rarity: "common", xp: 50, category: "Início" },
  { id: "first-course", icon: "🎓", title: "Primeiro Curso", description: "Complete um curso inteiro", progress: 1, maxProgress: 1, unlocked: true, rarity: "common", xp: 100, category: "Cursos" },
  { id: "streak-7", icon: "🔥", title: "7 Dias Streak", description: "Mantenha um streak de 7 dias", progress: 7, maxProgress: 7, unlocked: true, rarity: "rare", xp: 200, category: "Dedicação" },
  // Em progresso
  { id: "streak-30", icon: "🔥", title: "30 Dias Streak", description: "Mantenha um streak de 30 dias", progress: 7, maxProgress: 30, unlocked: false, rarity: "epic", xp: 500, category: "Dedicação" },
  { id: "3-courses", icon: "📚", title: "Explorador", description: "Complete 3 cursos diferentes", progress: 1, maxProgress: 3, unlocked: false, rarity: "rare", xp: 300, category: "Cursos" },
  { id: "10-lessons", icon: "📖", title: "Estudioso", description: "Assista 10 aulas completas", progress: 6, maxProgress: 10, unlocked: false, rarity: "common", xp: 150, category: "Aulas" },
  { id: "all-modules", icon: "⭐", title: "Módulo Perfeito", description: "Complete todos os módulos de um curso", progress: 2, maxProgress: 4, unlocked: false, rarity: "rare", xp: 250, category: "Cursos" },
  { id: "5h-watch", icon: "⏱️", title: "Maratonista", description: "Assista 5 horas de conteúdo", progress: 3, maxProgress: 5, unlocked: false, rarity: "common", xp: 150, category: "Tempo" },
  { id: "20h-watch", icon: "🎯", title: "Dedicado", description: "Assista 20 horas de conteúdo", progress: 21, maxProgress: 20, unlocked: true, rarity: "epic", xp: 500, category: "Tempo" },
  // Bloqueadas
  { id: "all-courses", icon: "💎", title: "Expert Total", description: "Complete todos os 6 cursos", progress: 1, maxProgress: 6, unlocked: false, rarity: "legendary", xp: 1000, category: "Cursos" },
  { id: "streak-100", icon: "💀", title: "Imparável", description: "100 dias de streak consecutivos", progress: 7, maxProgress: 100, unlocked: false, rarity: "legendary", xp: 2000, category: "Dedicação" },
  { id: "speed-run", icon: "⚡", title: "Speed Run", description: "Complete um curso em menos de 24h", progress: 0, maxProgress: 1, unlocked: false, rarity: "epic", xp: 400, category: "Desafio" },
];

const rarityColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  common: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", text: "#aaa", glow: "transparent" },
  rare: { bg: "rgba(37,244,238,0.06)", border: "rgba(37,244,238,0.15)", text: "#25f4ee", glow: "rgba(37,244,238,0.15)" },
  epic: { bg: "rgba(168,85,247,0.06)", border: "rgba(168,85,247,0.15)", text: "#a855f7", glow: "rgba(168,85,247,0.15)" },
  legendary: { bg: "rgba(255,215,0,0.06)", border: "rgba(255,215,0,0.2)", text: "#ffd700", glow: "rgba(255,215,0,0.2)" },
};

const rarityLabels: Record<string, string> = {
  common: "Comum",
  rare: "Raro",
  epic: "Épico",
  legendary: "Lendário",
};

const categories = ["Todas", "Início", "Cursos", "Aulas", "Dedicação", "Tempo", "Desafio"];

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXP = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

  const filtered = selectedCategory === "Todas"
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", paddingBottom: "100px" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}
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
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#fff" }}>Conquistas</h1>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            {unlockedCount} de {achievements.length} desbloqueadas
          </p>
        </div>
      </motion.div>

      {/* Trophy & XP Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          background: "linear-gradient(135deg, rgba(254,44,85,0.1), rgba(168,85,247,0.08), rgba(37,244,238,0.06))",
          borderRadius: "24px", border: "1px solid rgba(254,44,85,0.12)",
          padding: "28px 24px", marginBottom: "24px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: "-40px", left: "-40px", width: "120px", height: "120px",
          borderRadius: "50%", background: "rgba(254,44,85,0.08)", filter: "blur(30px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-30px", right: "-30px", width: "100px", height: "100px",
          borderRadius: "50%", background: "rgba(37,244,238,0.06)", filter: "blur(25px)",
        }} />

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: "56px", marginBottom: "12px", position: "relative" }}
        >
          🏆
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", gap: "32px", position: "relative" }}>
          <div>
            <div style={{ fontSize: "28px", fontWeight: 900, color: "#fff" }}>{unlockedCount}</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Conquistas
            </div>
          </div>
          <div style={{ width: "1px", background: "rgba(255,255,255,0.08)" }} />
          <div>
            <div style={{
              fontSize: "28px", fontWeight: 900,
              background: "linear-gradient(135deg, #ffd700, #ffaa00)",
              backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {totalXP}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              XP Total
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div style={{ marginTop: "20px", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>Progresso Geral</span>
            <span style={{ fontSize: "11px", color: "#fe2c55", fontWeight: 700 }}>
              {Math.round((unlockedCount / achievements.length) * 100)}%
            </span>
          </div>
          <div style={{ height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              style={{
                height: "100%", borderRadius: "4px",
                background: "linear-gradient(90deg, #fe2c55, #a855f7, #25f4ee)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          display: "flex", gap: "8px", overflowX: "auto", marginBottom: "20px",
          paddingBottom: "4px", scrollbarWidth: "none",
        }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px", fontSize: "12px", fontWeight: 600,
              background: selectedCategory === cat ? "var(--gradient-button)" : "rgba(255,255,255,0.04)",
              color: selectedCategory === cat ? "#fff" : "var(--text-muted)",
              border: selectedCategory === cat ? "none" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px", cursor: "pointer", fontFamily: "inherit",
              whiteSpace: "nowrap", flexShrink: 0,
            }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Achievements Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((ach, i) => {
            const rarity = rarityColors[ach.rarity];
            const progressPct = Math.min((ach.progress / ach.maxProgress) * 100, 100);

            return (
              <motion.div
                key={ach.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedAchievement(selectedAchievement?.id === ach.id ? null : ach)}
                style={{
                  background: ach.unlocked ? rarity.bg : "rgba(255,255,255,0.015)",
                  borderRadius: "18px",
                  border: `1px solid ${ach.unlocked ? rarity.border : "rgba(255,255,255,0.04)"}`,
                  padding: "18px", cursor: "pointer",
                  position: "relative", overflow: "hidden",
                  opacity: ach.unlocked ? 1 : (ach.progress > 0 ? 0.7 : 0.4),
                  boxShadow: ach.unlocked ? `0 0 20px ${rarity.glow}` : "none",
                }}
              >
                {/* Glow effect for unlocked */}
                {ach.unlocked && (
                  <div style={{
                    position: "absolute", top: "-20px", right: "-20px",
                    width: "80px", height: "80px", borderRadius: "50%",
                    background: rarity.glow, filter: "blur(25px)", opacity: 0.5,
                  }} />
                )}

                <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
                  {/* Icon */}
                  <motion.div
                    animate={ach.unlocked ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                    style={{
                      width: "52px", height: "52px", borderRadius: "16px",
                      background: ach.unlocked ? `${rarity.border}` : "rgba(255,255,255,0.03)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "26px", flexShrink: 0,
                      filter: ach.unlocked ? "none" : "grayscale(0.8)",
                    }}
                  >
                    {ach.unlocked ? ach.icon : (ach.progress > 0 ? ach.icon : "🔒")}
                  </motion.div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{
                        fontSize: "14px", fontWeight: 700,
                        color: ach.unlocked ? "#fff" : "var(--text-secondary)",
                      }}>
                        {ach.title}
                      </span>
                      <span style={{
                        fontSize: "9px", fontWeight: 700, padding: "2px 8px",
                        borderRadius: "10px", textTransform: "uppercase", letterSpacing: "0.5px",
                        background: `${rarity.border}`,
                        color: rarity.text,
                      }}>
                        {rarityLabels[ach.rarity]}
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
                      {ach.description}
                    </div>

                    {/* Progress Bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        flex: 1, height: "6px", borderRadius: "3px",
                        background: "rgba(255,255,255,0.06)", overflow: "hidden",
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPct}%` }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                          style={{
                            height: "100%", borderRadius: "3px",
                            background: ach.unlocked
                              ? `linear-gradient(90deg, ${rarity.text}, ${rarity.text}cc)`
                              : "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
                          }}
                        />
                      </div>
                      <span style={{
                        fontSize: "11px", fontWeight: 700, flexShrink: 0,
                        color: ach.unlocked ? rarity.text : "var(--text-muted)",
                      }}>
                        {ach.progress}/{ach.maxProgress}
                      </span>
                    </div>
                  </div>

                  {/* XP Badge */}
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    flexShrink: 0,
                  }}>
                    <div style={{
                      fontSize: "13px", fontWeight: 800,
                      color: ach.unlocked ? "#ffd700" : "var(--text-muted)",
                    }}>
                      +{ach.xp}
                    </div>
                    <div style={{ fontSize: "9px", color: "var(--text-muted)", fontWeight: 600 }}>XP</div>
                  </div>
                </div>

                {/* Expanded details */}
                {selectedAchievement?.id === ach.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    style={{
                      marginTop: "14px", paddingTop: "14px",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
                      <div>
                        <span style={{ color: "var(--text-muted)" }}>Categoria: </span>
                        <span style={{ color: "#fff", fontWeight: 600 }}>{ach.category}</span>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-muted)" }}>Status: </span>
                        <span style={{ color: ach.unlocked ? "#25f4ee" : "#ff6b35", fontWeight: 600 }}>
                          {ach.unlocked ? "Desbloqueada ✓" : `${Math.round(progressPct)}% completo`}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ marginTop: "24px" }}
      >
        <Link href="/profile">
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
            ← Voltar ao Perfil
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
