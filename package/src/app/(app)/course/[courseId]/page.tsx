"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCourseById } from "@/app/data/courses";
import { useTheme } from "@/lib/theme/context";

// Module data with real TikTok-style content for 9 modules
const moduleData = [
  { 
    title: "Youtube Profits",
    subtitle: "44 lessons",
    gradient: "linear-gradient(135deg, #fe2c55 0%, #ff6b8a 100%)",
    icon: "M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
  },
  { 
    title: "ProfiTok: Bonus Program",
    subtitle: "33 lessons",
    gradient: "linear-gradient(135deg, #00f2ea 0%, #00c4b8 100%)",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z",
  },
  { 
    title: "Millionaire Mindset",
    subtitle: "12 lessons",
    gradient: "linear-gradient(135deg, #ffd700 0%, #ff9500 100%)",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  },
  { 
    title: "Recover Your Investment",
    subtitle: "8 lessons",
    gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
    icon: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
  },
  { 
    title: "Millionaire System",
    subtitle: "6 lessons",
    gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
    icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z",
  },
  { 
    title: "Increase Your Profits X3",
    subtitle: "9 lessons",
    gradient: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
    icon: "M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z",
  },
  { 
    title: "Lifetime Access",
    subtitle: "3 lessons",
    gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
    icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
  },
  { 
    title: "VIP Community",
    subtitle: "3 lessons",
    gradient: "linear-gradient(135deg, #f39c12 0%, #d68910 100%)",
    icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  },
  { 
    title: "ProfiUp Bonus Program",
    subtitle: "11 lessons",
    gradient: "linear-gradient(135deg, #1abc9c 0%, #16a085 100%)",
    icon: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
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
                      {module.lessons.length} lessons
                    </div>
                    <h3 style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                      minHeight: "36px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                    }}>
                      {module.title}
                    </h3>
                    
                    {/* Progress bar */}
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
