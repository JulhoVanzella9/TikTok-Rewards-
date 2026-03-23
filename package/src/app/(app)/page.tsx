"use client";
import { motion } from "framer-motion";
import { courses } from "@/app/data/courses";
import CourseCard from "@/app/components/CourseCard";
import Link from "next/link";

export default function HomePage() {
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const recommended = courses.filter((c) => c.progress === 0);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          borderRadius: "24px", overflow: "hidden", marginBottom: "32px",
          background: "linear-gradient(135deg, rgba(254,44,85,0.15) 0%, rgba(37,244,238,0.08) 100%)",
          border: "1px solid rgba(254,44,85,0.12)",
          padding: "32px 28px", position: "relative",
        }}
      >
        <div style={{
          position: "absolute", top: "-30%", right: "-10%",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(254,44,85,0.2) 0%, transparent 70%)",
          filter: "blur(30px)", pointerEvents: "none",
        }} />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div style={{
            fontSize: "12px", fontWeight: 700, color: "#fe2c55",
            textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px",
          }}>
            🔥 Plataforma #1 de Cursos
          </div>
          <h1 style={{
            fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 900, color: "#fff",
            lineHeight: 1.2, marginBottom: "12px", letterSpacing: "-0.5px",
          }}>
            Aprenda. Crie. <br />
            <span style={{
              background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
              backgroundClip: "text", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Monetize.
            </span>
          </h1>
          <p style={{
            fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6,
            maxWidth: "400px", marginBottom: "20px",
          }}>
            Transforme seu conhecimento em renda com os melhores cursos de criação de conteúdo.
          </p>
          <Link href="/explore">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(254,44,85,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="glow-btn"
              style={{
                padding: "12px 28px", fontSize: "14px", fontWeight: 700,
                background: "var(--gradient-button)", color: "#fff",
                border: "none", borderRadius: "12px", cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Explorar Cursos →
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Row */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px", marginBottom: "32px",
      }}>
        {[
          { value: "6", label: "Cursos", color: "#fe2c55" },
          { value: "57", label: "Aulas", color: "#25f4ee" },
          { value: "7", label: "Streak 🔥", color: "#ff6b35" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            style={{
              background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}05)`,
              border: `1px solid ${stat.color}15`,
              borderRadius: "16px", padding: "16px", textAlign: "center",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: 800, color: stat.color }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Watching */}
      {inProgress.length > 0 && (
        <section style={{ marginBottom: "32px" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "16px",
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>
              Continuar Assistindo
            </h2>
            <Link href="/my-courses" style={{
              fontSize: "13px", fontWeight: 600, color: "#fe2c55",
            }}>
              Ver todos
            </Link>
          </div>
          <div style={{
            display: "flex", gap: "16px", overflowX: "auto",
            paddingBottom: "8px", scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}>
            {inProgress.map((course, i) => (
              <div key={course.id} style={{ minWidth: "280px", scrollSnapAlign: "start" }}>
                <CourseCard course={course} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended */}
      <section>
        <h2 style={{
          fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "16px",
        }}>
          Recomendados
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: "20px",
        }}>
          {recommended.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
