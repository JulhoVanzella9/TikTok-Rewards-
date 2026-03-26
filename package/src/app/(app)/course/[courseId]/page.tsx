"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCourseById } from "@/app/data/courses";
import { useTheme } from "@/lib/theme/context";

// Module images for different courses
const courseModuleImages: Record<string, string[]> = {
  "tiktok-rewards-program": [
    "/images/modules/module-01.png",
    "/images/modules/module-02.png",
    "/images/modules/module-03.png",
    "/images/modules/module-04.png",
    "/images/modules/module-05.png",
    "/images/modules/module-06.png",
    "/images/modules/module-07.png",
    "/images/modules/module-08.png",
    "/images/modules/module-09.png",
  ],
  "tiktok-community": [
    "/images/modules/tc-module-01.jpg",
    "/images/modules/tc-module-02.jpg",
    "/images/modules/tc-module-03.jpg",
    "/images/modules/tc-module-04.jpg",
  ],
  "money-robot": [
    "/images/modules/mr-module-01.jpg",
    "/images/modules/mr-module-02.jpg",
    "/images/modules/mr-module-03.jpg",
    "/images/modules/mr-module-04.jpg",
    "/images/modules/mr-module-05.jpg",
    "/images/modules/mr-module-06.jpg",
  ],
};

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
    const courseModule = course.modules[moduleIndex];
    if (!courseModule || courseModule.comingSoon) return 0;
    return courseModule.subModules.reduce((acc, sm) => acc + sm.lessons.length, 0);
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
            const courseImages = courseModuleImages[course.id] || courseModuleImages["tiktok-rewards-program"];
            const moduleImage = courseImages[index] || courseImages[0] || "/images/modules/module-01.png";
            const totalLessons = getTotalLessons(index);
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.04,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Link
                  href={module.comingSoon ? "#" : `/course/${params.courseId}/module/${module.id}`}
                  style={{ textDecoration: "none" }}
                  onClick={(e) => module.comingSoon && e.preventDefault()}
                >
                  <motion.div 
                    whileHover={module.comingSoon ? {} : { y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}
                    whileTap={module.comingSoon ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      background: isDarkMode ? "#0f0f0f" : "#fff",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                      opacity: module.comingSoon ? 0.5 : 1,
                      cursor: module.comingSoon ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    }}>
                    {/* Module Image */}
                    <div style={{
                      position: "relative",
                      aspectRatio: "1/1",
                      overflow: "hidden",
                    }}>
                      <motion.img 
                        src={moduleImage} 
                        alt={module.title}
                        whileHover={module.comingSoon ? {} : { scale: 1.05 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transformOrigin: "center",
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
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
