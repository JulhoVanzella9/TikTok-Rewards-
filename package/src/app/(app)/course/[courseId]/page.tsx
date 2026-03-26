"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCourseById } from "@/app/data/courses";
import { useTheme } from "@/lib/theme/context";

// Module visual data
const moduleStyles = [
  { gradient: "linear-gradient(135deg, #fe2c55 0%, #ff6b8a 100%)", icon: "M10 16.5l6-4.5-6-4.5v9z" },
  { gradient: "linear-gradient(135deg, #00f2ea 0%, #00c4b8 100%)", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" },
  { gradient: "linear-gradient(135deg, #ffd700 0%, #ff9500 100%)", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z" },
  { gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)", icon: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" },
  { gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" },
  { gradient: "linear-gradient(135deg, #27ae60 0%, #229954 100%)", icon: "M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" },
  { gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)", icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" },
  { gradient: "linear-gradient(135deg, #f39c12 0%, #d68910 100%)", icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z" },
  { gradient: "linear-gradient(135deg, #1abc9c 0%, #16a085 100%)", icon: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" },
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

  // Count total lessons
  const getTotalLessons = (moduleIndex: number) => {
    const module = course.modules[moduleIndex];
    if (!module || module.comingSoon) return 0;
    return module.subModules.reduce((acc, sm) => acc + sm.lessons.length, 0);
  };

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
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" }}>
              {course.title}
            </h1>
            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {course.modules.length} modules - {course.totalLessons} lessons
            </p>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div style={{ padding: "16px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
        }}>
          {course.modules.map((module, index) => {
            const style = moduleStyles[index] || moduleStyles[0];
            const totalLessons = getTotalLessons(index);
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={module.comingSoon ? "#" : `/course/${params.courseId}/module/${module.id}`}
                  style={{ textDecoration: "none" }}
                  onClick={(e) => module.comingSoon && e.preventDefault()}
                >
                  <div style={{
                    background: isDarkMode ? "#0f0f0f" : "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                    opacity: module.comingSoon ? 0.6 : 1,
                    cursor: module.comingSoon ? "not-allowed" : "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}>
                    {/* Module Icon Header */}
                    <div style={{
                      height: "80px",
                      background: style.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                        <path d={style.icon}/>
                      </svg>
                      {module.comingSoon && (
                        <div style={{
                          position: "absolute",
                          top: "8px", right: "8px",
                          background: "rgba(0,0,0,0.6)",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "10px",
                          fontWeight: 600,
                          color: "#fff",
                        }}>
                          Soon
                        </div>
                      )}
                    </div>
                    
                    {/* Module Info */}
                    <div style={{ padding: "14px" }}>
                      <h3 style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                        minHeight: "34px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                        marginBottom: "6px",
                      }}>
                        {module.title.replace("Module 0", "Module ").replace("ProfiUp 09", "Module 09")}
                      </h3>
                      <p style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                      }}>
                        {module.comingSoon ? "Coming Soon" : `${module.subModules.length} sections - ${totalLessons} lessons`}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
