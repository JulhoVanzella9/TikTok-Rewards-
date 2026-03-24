"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getLessonById, getAllLessons, getNextLesson, getPrevLesson } from "@/app/data/courses";
import { useState } from "react";
import { useProgress } from "@/lib/hooks/useProgress";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;
  const [showList, setShowList] = useState(false);
  const [saving, setSaving] = useState(false);
  const { markLessonComplete, isLessonCompleted } = useProgress();

  const result = getLessonById(courseId, lessonId);
  if (!result) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2 style={{ color: "#fff" }}>Aula não encontrada</h2>
        <Link href="/explore" style={{ color: "#fe2c55", fontWeight: 600 }}>← Voltar</Link>
      </div>
    );
  }

  const { course, lesson } = result;
  const allLessons = getAllLessons(course);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const nextLesson = getNextLesson(course, lessonId);
  const prevLesson = getPrevLesson(course, lessonId);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 20px",
      }}>
        <Link href={`/course/${courseId}`} style={{
          display: "flex", alignItems: "center", gap: "8px",
          color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          <span style={{
            maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>{course.title}</span>
        </Link>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowList(!showList)}
          style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px", padding: "8px 14px", cursor: "pointer",
            color: "#fff", fontSize: "12px", fontWeight: 600, fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: "6px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          {currentIndex + 1}/{allLessons.length}
        </motion.button>
      </div>

      <div style={{ display: "flex", gap: "0" }}>
        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Video */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "relative", paddingTop: "56.25%", background: "#000",
              borderRadius: "0",
            }}
          >
            <iframe
              src={lesson.videoUrl}
              style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={lesson.title}
            />
          </motion.div>

          {/* Lesson info */}
          <div style={{ padding: "20px" }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <span style={{
                  padding: "3px 10px", borderRadius: "20px", fontSize: "11px",
                  fontWeight: 700, background: "rgba(254,44,85,0.12)", color: "#fe2c55",
                }}>
                  Aula {currentIndex + 1} de {allLessons.length}
                </span>
                <span style={{
                  padding: "3px 10px", borderRadius: "20px", fontSize: "11px",
                  fontWeight: 600, background: "rgba(255,255,255,0.04)",
                  color: "var(--text-muted)",
                }}>
                  {lesson.duration}
                </span>
              </div>

              <h1 style={{
                fontSize: "20px", fontWeight: 800, color: "#fff",
                lineHeight: 1.3, marginBottom: "12px",
              }}>
                {lesson.title}
              </h1>

              <p style={{
                fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7,
                marginBottom: "24px",
              }}>
                {lesson.description}
              </p>

              {/* Navigation buttons */}
              <div style={{
                display: "flex", gap: "12px", flexDirection: "row",
                flexWrap: "wrap",
              }}>
                {prevLesson && (
                  <Link href={`/course/${courseId}/lesson/${prevLesson.id}`} style={{ flex: 1, minWidth: "140px" }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: "100%", padding: "14px", fontSize: "13px", fontWeight: 600,
                        background: "rgba(255,255,255,0.04)", color: "var(--text-secondary)",
                        border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px",
                        cursor: "pointer", fontFamily: "inherit", display: "flex",
                        alignItems: "center", justifyContent: "center", gap: "6px",
                      }}
                    >
                      Anterior
                    </motion.button>
                  </Link>
                )}
                {nextLesson ? (
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(254,44,85,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    disabled={saving}
                    onClick={async () => {
                      setSaving(true);
                      await markLessonComplete(courseId, lessonId, allLessons.length);
                      router.push(`/course/${courseId}/lesson/${nextLesson.id}`);
                    }}
                    style={{
                      flex: 1, minWidth: "140px",
                      padding: "14px", fontSize: "13px", fontWeight: 700,
                      background: "var(--gradient-button)", color: "#fff",
                      border: "none", borderRadius: "12px", cursor: saving ? "wait" : "pointer",
                      fontFamily: "inherit", display: "flex",
                      alignItems: "center", justifyContent: "center", gap: "6px",
                      opacity: saving ? 0.7 : 1,
                    }}
                  >
                    {saving ? "Salvando..." : "Concluir e Avançar"}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={saving}
                    onClick={async () => {
                      setSaving(true);
                      await markLessonComplete(courseId, lessonId, allLessons.length);
                      router.push(`/course/${courseId}`);
                    }}
                    style={{
                      flex: 1, minWidth: "140px",
                      padding: "14px", fontSize: "13px", fontWeight: 700,
                      background: "linear-gradient(135deg, #25f4ee, #5ff7f2)", color: "#000",
                      border: "none", borderRadius: "12px", cursor: saving ? "wait" : "pointer",
                      fontFamily: "inherit", opacity: saving ? 0.7 : 1,
                    }}
                  >
                    {saving ? "Salvando..." : "Concluir Curso"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sidebar - desktop only or toggle */}
        {showList && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              width: "320px", flexShrink: 0, borderLeft: "1px solid rgba(255,255,255,0.04)",
              background: "rgba(255,255,255,0.01)", maxHeight: "calc(100vh - 68px)",
              overflow: "auto", position: "sticky", top: "56px",
            }}
          >
            <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
                Conteúdo do Curso
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                {currentIndex + 1} / {allLessons.length} aulas
              </div>
            </div>

            {course.modules.map((mod) => (
              <div key={mod.id}>
                <div style={{
                  padding: "10px 18px", background: "rgba(255,255,255,0.02)",
                  fontSize: "11px", fontWeight: 700, color: "#fe2c55",
                  textTransform: "uppercase", letterSpacing: "0.5px",
                }}>
                  {mod.title}
                </div>
                {mod.lessons.map((les) => {
                  const isActive = les.id === lessonId;
                  const gIdx = allLessons.findIndex((l) => l.id === les.id);
                  const isCompleted = isLessonCompleted(courseId, les.id);
                  return (
                    <Link
                      key={les.id}
                      href={`/course/${courseId}/lesson/${les.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{
                        display: "flex", alignItems: "center", gap: "12px",
                        padding: "12px 18px", cursor: "pointer",
                        background: isActive ? "rgba(254,44,85,0.08)" : "transparent",
                        borderLeft: isActive ? "3px solid #fe2c55" : "3px solid transparent",
                        transition: "all 0.2s",
                      }}>
                        <div style={{
                          width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0,
                          background: isActive ? "#fe2c55" : isCompleted ? "#25f4ee" : "rgba(255,255,255,0.04)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "10px", fontWeight: 700, color: isActive || isCompleted ? "#fff" : "#666",
                        }}>
                          {isActive ? "▶" : isCompleted ? "✓" : gIdx + 1}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{
                            fontSize: "13px", fontWeight: isActive ? 600 : 400,
                            color: isActive ? "#fff" : "var(--text-secondary)",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}>
                            {les.title}
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{les.duration}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
