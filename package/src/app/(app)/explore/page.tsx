"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/app/data/courses";
import CourseCard from "@/app/components/CourseCard";

const categories = ["Todos", ...Array.from(new Set(courses.map((c) => c.category)))];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Todos");

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = active === "Todos" || c.category === active;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: "relative", marginBottom: "20px",
        }}
      >
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"
          style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
        >
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar cursos, instrutores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "14px 18px 14px 48px", fontSize: "15px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px", color: "#fff", outline: "none", fontFamily: "inherit",
            transition: "all 0.3s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(254,44,85,0.3)";
            e.target.style.boxShadow = "0 0 0 4px rgba(254,44,85,0.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.08)";
            e.target.style.boxShadow = "none";
          }}
        />
      </motion.div>

      {/* Categories */}
      <div style={{
        display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px",
        marginBottom: "24px", scrollbarWidth: "none",
      }}>
        {categories.map((cat, i) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(cat)}
            style={{
              padding: "8px 18px", fontSize: "13px", fontWeight: 600,
              background: active === cat ? "var(--gradient-button)" : "rgba(255,255,255,0.04)",
              color: active === cat ? "#fff" : "var(--text-secondary)",
              border: active === cat ? "none" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px", cursor: "pointer", fontFamily: "inherit",
              whiteSpace: "nowrap", transition: "all 0.2s",
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Results */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
        gap: "20px",
      }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <CourseCard course={course} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center", padding: "60px 20px" }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
            Nenhum curso encontrado
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            Tente outros termos de busca
          </p>
        </motion.div>
      )}
    </div>
  );
}
