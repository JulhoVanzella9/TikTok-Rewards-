"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCourseById } from "@/app/data/courses";
import { useTheme } from "@/lib/theme/context";

// Module data with real TikTok-style content
const moduleData = [
  { 
    title: "TikTok Fundamentals",
    subtitle: "Getting Started",
    gradient: "linear-gradient(135deg, #00f2ea 0%, #00c4b8 100%)",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  { 
    title: "Creating Viral Content",
    subtitle: "Content Strategy",
    gradient: "linear-gradient(135deg, #ff6b8a 0%, #fe2c55 100%)",
    icon: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z",
  },
  { 
    title: "Advanced Monetization",
    subtitle: "Making Money",
    gradient: "linear-gradient(135deg, #ffd700 0%, #ff9500 100%)",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z",
  },
  { 
    title: "Scaling Your Results",
    subtitle: "Growth Hacks",
    gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
    icon: "M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z",
  },
];

export default function CourseDetailPage() {
  const params = useParams();
  const course = getCourseById(params.courseId as string);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  if (!course) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
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
      background: isDarkMode ? "#000" : "#f8f8f8",
    }}>
      {/* Header */}
      <div style={{ 
        padding: "20px 16px 16px",
        background: isDarkMode ? "#000" : "#fff",
        borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" }}>
              TikTok Rewards
            </h1>
            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {course.modules.length} modules | {course.totalLessons} lessons
            </p>
          </div>
        </div>
      </div>

      {/* Module Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
        padding: "16px",
      }}>
        {course.modules.map((module, index) => {
          const data = moduleData[index] || moduleData[0];
          return (
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
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: isDarkMode ? "#161622" : "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                    boxShadow: isDarkMode ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Module Card Image */}
                  <div style={{
                    height: "130px",
                    background: data.gradient,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {/* Background decoration */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.15,
                      background: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                   radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                    }} />
                    
                    {/* Module number badge */}
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      padding: "4px 10px",
                      background: "rgba(0,0,0,0.25)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#fff",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}>
                      Module 0{index + 1}
                    </div>

                    {/* Center icon */}
                    <div style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                        <path d={data.icon}/>
                      </svg>
                    </div>
                  </div>

                  {/* Module Info */}
                  <div style={{ padding: "14px" }}>
                    <div style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      marginBottom: "4px",
                    }}>
                      {data.subtitle}
                    </div>
                    <h3 style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                      minHeight: "36px",
                    }}>
                      {data.title}
                    </h3>
                    
                    {/* Progress bar - always 0% for new users */}
                    <div style={{
                      marginTop: "12px",
                      height: "4px",
                      background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%",
                        width: "0%",
                        borderRadius: "2px",
                        background: data.gradient,
                      }} />
                    </div>
                    <div style={{
                      marginTop: "6px",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                    }}>
                      {module.lessons.length} lessons
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          margin: "8px 16px 20px",
          padding: "16px 20px",
          background: isDarkMode ? "#161622" : "#fff",
          borderRadius: "14px",
          border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
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
        <div style={{ width: "1px", background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }} />
        <div>
          <div style={{ fontSize: "20px", fontWeight: 800, color: "#25f4ee" }}>
            {course.totalLessons}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>Lessons</div>
        </div>
        <div style={{ width: "1px", background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }} />
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
