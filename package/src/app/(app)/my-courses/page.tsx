"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/app/data/courses";
import CourseCard from "@/app/components/CourseCard";
import Link from "next/link";

const tabs = ["Todos", "Em Andamento", "Concluídos"];

export default function MyCoursesPage() {
  const [tab, setTab] = useState(0);

  const enrolled = courses.filter((c) => c.progress > 0);
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const completed = courses.filter((c) => c.progress === 100);
  const displayed = tab === 0 ? enrolled : tab === 1 ? inProgress : completed;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: "24px", fontWeight: 800, color: "#fff", marginBottom: "20px",
        }}
      >
        Meus Cursos
      </motion.h1>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: "4px", marginBottom: "24px",
        background: "rgba(255,255,255,0.03)", borderRadius: "14px",
        padding: "4px", border: "1px solid rgba(255,255,255,0.06)",
      }}>
        {tabs.map((t, i) => (
          <motion.button
            key={t}
            whileTap={{ scale: 0.97 }}
            onClick={() => setTab(i)}
            style={{
              flex: 1, padding: "10px", fontSize: "13px", fontWeight: 600,
              background: tab === i ? "var(--gradient-button)" : "transparent",
              color: tab === i ? "#fff" : "var(--text-muted)",
              border: "none", borderRadius: "10px", cursor: "pointer",
              fontFamily: "inherit", transition: "color 0.2s",
            }}
          >
            {t}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      {displayed.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: "20px",
        }}>
          <AnimatePresence mode="popLayout">
            {displayed.map((course, i) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <CourseCard course={course} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center", padding: "60px 20px" }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📚</div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
            Nenhum curso aqui ainda
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px" }}>
            Comece a explorar nossos cursos
          </p>
          <Link href="/explore">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "12px 28px", fontSize: "14px", fontWeight: 700,
                background: "var(--gradient-button)", color: "#fff",
                border: "none", borderRadius: "12px", cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Explorar Cursos
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
