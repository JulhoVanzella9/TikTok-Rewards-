"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCourseById } from "@/app/data/courses";
import { useTheme } from "@/lib/theme/context";

// Module images and gradients - TikTok style
const moduleStyles = [
  { gradient: "linear-gradient(135deg, #00f2ea 0%, #00c4b8 100%)", accent: "#00f2ea" },
  { gradient: "linear-gradient(135deg, #69c9d0 0%, #4db8bf 100%)", accent: "#69c9d0" },
  { gradient: "linear-gradient(135deg, #ee1d52 0%, #c91740 100%)", accent: "#ee1d52" },
  { gradient: "linear-gradient(135deg, #ff6b8a 0%, #fe2c55 100%)", accent: "#ff6b8a" },
];

const moduleTitles = [
  "TikTok Fundamentals",
  "Creating Viral Content", 
  "Advanced Monetization",
  "Scaling Your Results",
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
      background: isDarkMode ? "#000" : "#fafafa",
    }}>
      {/* Header */}
      <div style={{ 
        padding: "20px 16px 16px",
        borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      }}>
        <h1 style={{
          fontSize: "22px",
          fontWeight: 800,
          color: "var(--text-primary)",
          marginBottom: "4px",
        }}>
          TikTok Rewards
        </h1>
        <p style={{
          fontSize: "13px",
          color: "var(--text-muted)",
        }}>
          {course.modules.length} modules | {course.totalLessons} lessons
        </p>
      </div>

      {/* Module Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
        padding: "16px",
      }}>
        {course.modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link 
              href={`/course/${course.id}/lesson/${module.lessons[0]?.id}`}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: isDarkMode 
                    ? "#161622"
                    : "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                {/* Module Image Area */}
                <div style={{
                  height: "140px",
                  background: moduleStyles[index % moduleStyles.length].gradient,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Decorative pattern */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />

                  {/* TikTok Logo */}
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "14px",
                    background: "rgba(0,0,0,0.2)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "8px",
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#fff"/>
                    </svg>
                  </div>
                  
                  {/* TikTok REWARDS text */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: "15px",
                      fontWeight: 800,
                      color: "#fff",
                      textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}>
                      TikTok
                    </div>
                    <div style={{
                      fontSize: "18px",
                      fontWeight: 900,
                      color: "#ffd700",
                      textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      letterSpacing: "1px",
                    }}>
                      REWARDS
                    </div>
                  </div>

                  {/* Coin decoration */}
                  <div style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)",
                    boxShadow: "0 3px 10px rgba(255,215,0,0.5)",
                    border: "2px solid rgba(255,255,255,0.4)",
                  }} />
                </div>

                {/* Module Info */}
                <div style={{ padding: "14px" }}>
                  <div style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    marginBottom: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}>
                    Module 0{index + 1} |
                  </div>
                  <h3 style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                    minHeight: "36px",
                  }}>
                    {moduleTitles[index] || module.title}
                  </h3>
                  
                  {/* Progress bar - always at 0 for new users */}
                  <div style={{
                    marginTop: "12px",
                    height: "3px",
                    background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: "0%",
                      background: moduleStyles[index % moduleStyles.length].accent,
                      borderRadius: "2px",
                    }} />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          margin: "8px 16px 20px",
          padding: "16px 20px",
          background: isDarkMode 
            ? "linear-gradient(135deg, rgba(254,44,85,0.06) 0%, rgba(37,244,238,0.06) 100%)"
            : "linear-gradient(135deg, rgba(254,44,85,0.04) 0%, rgba(37,244,238,0.04) 100%)",
          borderRadius: "14px",
          border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "20px", fontWeight: 800, color: "#fe2c55" }}>
            {course.modules.length}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>Modules</div>
        </div>
        <div style={{ width: "1px", background: "var(--border-color)" }} />
        <div>
          <div style={{ fontSize: "20px", fontWeight: 800, color: "#25f4ee" }}>
            {course.totalLessons}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>Lessons</div>
        </div>
        <div style={{ width: "1px", background: "var(--border-color)" }} />
        <div>
          <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" }}>
            {course.totalDuration}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>Duration</div>
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
              borderRadius: "12px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              boxShadow: "0 4px 20px rgba(254,44,85,0.35)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Start Learning
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
