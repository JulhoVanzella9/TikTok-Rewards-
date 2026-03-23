"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Course } from "@/app/data/courses";

export default function CourseCard({ course, index }: { course: Course; index: number }) {
  const gradients = [
    "linear-gradient(135deg, #fe2c55 0%, #8b31ff 100%)",
    "linear-gradient(135deg, #25f4ee 0%, #0052ff 100%)",
    "linear-gradient(135deg, #ff6b35 0%, #fe2c55 100%)",
    "linear-gradient(135deg, #8b31ff 0%, #25f4ee 100%)",
    "linear-gradient(135deg, #ff4081 0%, #ffab40 100%)",
    "linear-gradient(135deg, #00e676 0%, #25f4ee 100%)",
  ];

  return (
    <Link href={`/course/${course.id}`} style={{ textDecoration: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        style={{
          borderRadius: "20px", overflow: "hidden",
          background: "var(--gradient-card)",
          border: "1px solid rgba(255,255,255,0.06)",
          cursor: "pointer", position: "relative",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Thumbnail */}
        <div style={{
          height: "200px", background: gradients[index % gradients.length],
          position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Play button */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "rgba(0,0,0,0.35)", backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </motion.div>

          {/* Duration badge */}
          <div style={{
            position: "absolute", bottom: "12px", right: "12px",
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
            padding: "4px 10px", borderRadius: "20px",
            fontSize: "12px", fontWeight: 600, color: "#fff",
          }}>
            {course.totalDuration}
          </div>

          {/* Category */}
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            padding: "4px 12px", borderRadius: "20px",
            fontSize: "11px", fontWeight: 600, color: "#fff",
            letterSpacing: "0.3px",
          }}>
            {course.category}
          </div>

          {course.progress === 100 && (
            <div style={{
              position: "absolute", top: "12px", right: "12px",
              background: "rgba(37,244,238,0.9)", padding: "4px 10px",
              borderRadius: "20px", fontSize: "11px", fontWeight: 700,
              color: "#000",
            }}>
              ✓ Concluído
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "18px" }}>
          <h3 style={{
            fontSize: "16px", fontWeight: 700, color: "#fff",
            marginBottom: "8px", lineHeight: 1.3,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {course.title}
          </h3>

          <p style={{
            fontSize: "13px", color: "var(--text-secondary)",
            lineHeight: 1.5, marginBottom: "14px",
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as any, overflow: "hidden",
          }}>
            {course.description}
          </p>

          {/* Progress bar */}
          {course.progress > 0 && course.progress < 100 && (
            <div style={{ marginBottom: "14px" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                marginBottom: "6px",
              }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Progresso</span>
                <span style={{ fontSize: "11px", color: "#25f4ee", fontWeight: 700 }}>{course.progress}%</span>
              </div>
              <div style={{
                height: "3px", borderRadius: "2px",
                background: "rgba(255,255,255,0.06)",
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                  style={{
                    height: "100%", borderRadius: "2px",
                    background: "linear-gradient(90deg, #fe2c55, #25f4ee)",
                  }}
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 700, color: "#fff",
              }}>
                {course.instructor[0]}
              </div>
              <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                {course.instructor}
              </span>
            </div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {course.totalLessons} aulas
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
