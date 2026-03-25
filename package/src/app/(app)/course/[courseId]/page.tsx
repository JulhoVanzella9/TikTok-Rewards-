"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCourseById, getAllLessons } from "@/app/data/courses";
import { useState } from "react";
import { useTheme } from "@/lib/theme/context";

export default function CourseDetailPage() {
  const params = useParams();
  const course = getCourseById(params.courseId as string);
  const [openModule, setOpenModule] = useState(0);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  if (!course) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤷</div>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "12px" }}>Course not found</h2>
        <Link href="/explore" style={{
          color: "#fe2c55", fontWeight: 600, fontSize: "14px",
        }}>← Back to catalog</Link>
      </div>
    );
  }

  const allLessons = getAllLessons(course);
  const firstLesson = allLessons[0];
  const gradients = [
    "linear-gradient(135deg, #fe2c55 0%, #8b31ff 100%)",
    "linear-gradient(135deg, #25f4ee 0%, #0052ff 100%)",
    "linear-gradient(135deg, #ff6b35 0%, #fe2c55 100%)",
    "linear-gradient(135deg, #8b31ff 0%, #25f4ee 100%)",
    "linear-gradient(135deg, #ff4081 0%, #ffab40 100%)",
    "linear-gradient(135deg, #00e676 0%, #25f4ee 100%)",
  ];
  const gradIdx = ["tiktok-growth","content-creator","monetizacao-digital","tiktok-shop","personal-brand","tiktok-ads"].indexOf(course.id);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          height: "240px", background: gradients[gradIdx >= 0 ? gradIdx : 0],
          position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <Link href={`/course/${course.id}/lesson/${firstLesson.id}`}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: "rgba(0,0,0,0.35)", backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </motion.div>
        </Link>

        <Link href="/explore" style={{
          position: "absolute", top: "16px", left: "16px",
          width: "36px", height: "36px", borderRadius: "50%",
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </Link>
      </motion.div>

      {/* Info */}
      <div style={{ padding: "24px 20px" }}>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
            <span style={{
              padding: "4px 12px", borderRadius: "20px", fontSize: "11px",
              fontWeight: 700, background: "rgba(254,44,85,0.12)", color: "#fe2c55",
            }}>{course.category}</span>
            {course.tags.map((tag) => (
              <span key={tag} style={{
                padding: "4px 10px", borderRadius: "20px", fontSize: "11px",
                fontWeight: 600, 
                background: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                color: "var(--text-muted)", 
                border: `1px solid var(--border-color)`,
              }}>{tag}</span>
            ))}
          </div>

          <h1 style={{
            fontSize: "24px", fontWeight: 900, color: "var(--text-primary)",
            lineHeight: 1.2, marginBottom: "12px",
          }}>
            {course.title}
          </h1>

          <p style={{
            fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6,
            marginBottom: "20px",
          }}>
            {course.description}
          </p>

          {/* Instructor */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px",
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, color: "#fff", fontSize: "16px",
            }}>
              {course.instructor[0]}
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                {course.instructor}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Instructor</div>
            </div>
          </div>

          {/* Progress */}
          {course.progress > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Progress</span>
                <span style={{ fontSize: "13px", color: "#25f4ee", fontWeight: 700 }}>{course.progress}%</span>
              </div>
              <div style={{
                height: "6px", borderRadius: "3px", 
                background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    height: "100%", borderRadius: "3px",
                    background: "linear-gradient(90deg, #fe2c55, #25f4ee)",
                  }}
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <Link href={`/course/${course.id}/lesson/${firstLesson.id}`}>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(254,44,85,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="glow-btn"
              style={{
                width: "100%", padding: "16px", fontSize: "16px", fontWeight: 700,
                background: "var(--gradient-button)", color: "#fff",
                border: "none", borderRadius: "14px", cursor: "pointer",
                fontFamily: "inherit", marginBottom: "32px",
              }}
            >
              {course.progress > 0 ? "▶ Continue Watching" : "▶ Start Course"}
            </motion.button>
          </Link>
        </motion.div>

        {/* Modules */}
        <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px" }}>
          Course Content
        </h2>

        {course.modules.map((mod, modIdx) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + modIdx * 0.08 }}
            style={{
              marginBottom: "12px", borderRadius: "16px", overflow: "hidden",
              background: isDarkMode 
                ? "linear-gradient(145deg, rgba(26,26,46,0.8) 0%, rgba(15,15,26,0.9) 100%)"
                : "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
              border: `1px solid var(--border-color)`,
            }}
          >
            {/* Module header */}
            <div
              onClick={() => setOpenModule(openModule === modIdx ? -1 : modIdx)}
              style={{
                padding: "16px 18px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#fe2c55", marginBottom: "4px" }}>
                  MODULE {modIdx + 1}
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                  {mod.title}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {mod.lessons.length} lessons
                </span>
                <motion.svg
                  animate={{ rotate: openModule === modIdx ? 180 : 0 }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke={isDarkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"} strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </motion.svg>
              </div>
            </div>

            {/* Lessons */}
            {openModule === modIdx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ borderTop: `1px solid var(--border-color)` }}
              >
                {mod.lessons.map((lesson, lesIdx) => {
                  const globalIdx = allLessons.findIndex((l) => l.id === lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      href={`/course/${course.id}/lesson/${lesson.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <motion.div
                        whileHover={{ backgroundColor: isDarkMode ? "rgba(254,44,85,0.05)" : "rgba(254,44,85,0.08)" }}
                        style={{
                          display: "flex", alignItems: "center", gap: "14px",
                          padding: "14px 18px",
                          borderBottom: lesIdx < mod.lessons.length - 1 
                            ? `1px solid var(--border-color)` 
                            : "none",
                          transition: "background-color 0.2s",
                        }}
                      >
                        <div style={{
                          width: "28px", height: "28px", borderRadius: "8px",
                          background: "rgba(254,44,85,0.1)", flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fe2c55", fontSize: "12px", fontWeight: 700,
                        }}>
                          {globalIdx + 1}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: "14px", fontWeight: 500, color: "var(--text-primary)",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}>
                            {lesson.title}
                          </div>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                            {lesson.duration}
                          </div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}>
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </motion.div>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
