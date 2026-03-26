"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCourseById } from "@/app/data/courses";
import { useTheme } from "@/lib/theme/context";

// Module images
const moduleImages = [
  "/images/modules/module-01.png",
  "/images/modules/module-02.png",
  "/images/modules/module-03.png",
  "/images/modules/module-04.png",
  "/images/modules/module-05.png",
  "/images/modules/module-06.png",
  "/images/modules/module-07.png",
  "/images/modules/module-08.png",
  "/images/modules/module-09.png",
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
            background: "#000",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
              <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#25F4EE" transform="translate(-2, -1)"/>
              <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#FE2C55" transform="translate(2, 1)"/>
              <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#fff"/>
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
            const moduleImage = moduleImages[index] || moduleImages[0];
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
                    opacity: module.comingSoon ? 0.5 : 1,
                    cursor: module.comingSoon ? "not-allowed" : "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}>
                    {/* Module Image */}
                    <div style={{
                      position: "relative",
                      aspectRatio: "1/1",
                      overflow: "hidden",
                    }}>
                      <img 
                        src={moduleImage} 
                        alt={module.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {module.comingSoon && (
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <span style={{
                            background: "rgba(254,44,85,0.9)",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#fff",
                            textTransform: "uppercase",
                          }}>
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Module Info */}
                    <div style={{ padding: "14px", background: isDarkMode ? "#0a0a0a" : "#fff" }}>
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
