"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCourseById } from "@/app/data/courses";
import { useTheme } from "@/lib/theme/context";

// Module card gradients
const moduleGradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
];

export default function CourseDetailPage() {
  const params = useParams();
  const course = getCourseById(params.courseId as string);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  if (!course) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>?</div>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "12px" }}>Course not found</h2>
        <Link href="/" style={{ color: "#fe2c55", fontWeight: 600, fontSize: "14px" }}>
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      paddingBottom: "100px",
      background: isDarkMode ? "#000" : "#f5f5f5",
    }}>
      {/* Header Tabs */}
      <div style={{
        display: "flex",
        gap: "8px",
        padding: "20px 16px 0",
        marginBottom: "24px",
        overflowX: "auto",
      }}>
        <div style={{
          padding: "10px 18px",
          background: "rgba(254,44,85,0.15)",
          border: "1px solid rgba(254,44,85,0.3)",
          borderRadius: "25px",
          color: "#fe2c55",
          fontSize: "13px",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}>
          TikTok Rewards Program
        </div>
        <div style={{
          padding: "10px 18px",
          background: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          borderRadius: "25px",
          color: "var(--text-secondary)",
          fontSize: "13px",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}>
          Programa de Recompensas
        </div>
      </div>

      {/* Title Section */}
      <div style={{ padding: "0 16px", marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "26px",
          fontWeight: 800,
          color: "var(--text-primary)",
          marginBottom: "12px",
          lineHeight: 1.2,
        }}>
          TikTok Rewards Program
        </h1>
        <div style={{
          width: "100px",
          height: "4px",
          background: "linear-gradient(90deg, #fe2c55 0%, #ff6b8a 100%)",
          borderRadius: "2px",
        }} />
      </div>

      {/* Module Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "14px",
        padding: "0 16px",
      }}>
        {course.modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link 
              href={`/course/${course.id}/lesson/${module.lessons[0]?.id}`}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: isDarkMode 
                    ? "linear-gradient(180deg, #1a1a2e 0%, #0d0d15 100%)"
                    : "#fff",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`,
                  boxShadow: isDarkMode 
                    ? "0 8px 32px rgba(0,0,0,0.4)"
                    : "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                {/* Module Header */}
                <div style={{
                  padding: "10px 14px",
                  background: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                }}>
                  <span style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    letterSpacing: "1.5px",
                  }}>
                    MODULE 0{index + 1}
                  </span>
                </div>

                {/* Module Image */}
                <div style={{
                  height: "130px",
                  background: moduleGradients[index % moduleGradients.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* TikTok Logo */}
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "rgba(0,0,0,0.25)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#fff"/>
                    </svg>
                  </div>
                  
                  {/* TikTok Rewards text */}
                  <div style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    right: "12px",
                  }}>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#fff",
                      textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      lineHeight: 1.1,
                    }}>
                      TikTok
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: 900,
                      color: "#ffd700",
                      textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      letterSpacing: "-0.5px",
                    }}>
                      REWARDS
                    </div>
                  </div>

                  {/* Decorative coins */}
                  <div style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)",
                    boxShadow: "0 4px 12px rgba(255,215,0,0.5)",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: "22px",
                    right: "22px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)",
                    boxShadow: "0 3px 8px rgba(255,215,0,0.4)",
                    opacity: 0.85,
                  }} />
                </div>

                {/* Module Info */}
                <div style={{ padding: "14px" }}>
                  <h3 style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: "2px",
                  }}>
                    Module 0{index + 1} |
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                  }}>
                    {module.title}
                  </p>
                  
                  {/* Progress bar */}
                  <div style={{
                    marginTop: "12px",
                    height: "3px",
                    background: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${index === 0 ? 30 : 0}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      style={{
                        height: "100%",
                        background: "linear-gradient(90deg, #fe2c55 0%, #25f4ee 100%)",
                        borderRadius: "2px",
                      }} 
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          margin: "28px 16px",
          padding: "20px",
          background: isDarkMode 
            ? "linear-gradient(135deg, rgba(254,44,85,0.08) 0%, rgba(37,244,238,0.08) 100%)"
            : "linear-gradient(135deg, rgba(254,44,85,0.06) 0%, rgba(37,244,238,0.06) 100%)",
          borderRadius: "18px",
          border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
          <div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#fe2c55" }}>
              {course.modules.length}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>Modules</div>
          </div>
          <div style={{ width: "1px", background: "var(--border-color)" }} />
          <div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#25f4ee" }}>
              {course.totalLessons}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>Lessons</div>
          </div>
          <div style={{ width: "1px", background: "var(--border-color)" }} />
          <div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)" }}>
              {course.totalDuration}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>Duration</div>
          </div>
        </div>
      </motion.div>

      {/* Start Course Button */}
      <div style={{ padding: "0 16px" }}>
        <Link href={`/course/${course.id}/lesson/${course.modules[0]?.lessons[0]?.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)",
              border: "none",
              borderRadius: "14px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              boxShadow: "0 4px 20px rgba(254,44,85,0.4)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Start Course
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
