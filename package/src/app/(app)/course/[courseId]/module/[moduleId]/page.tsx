"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCourseById, getModuleById } from "@/app/data/courses";
import { useTheme } from "@/lib/theme/context";

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const course = getCourseById(params.courseId as string);
  const module = getModuleById(params.courseId as string, params.moduleId as string);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  if (!course || !module) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "12px" }}>Module not found</h2>
        <Link href={`/course/${params.courseId}`} style={{ color: "#fe2c55", fontWeight: 600, fontSize: "14px" }}>
          Back to course
        </Link>
      </div>
    );
  }

  if (module.comingSoon) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        paddingBottom: "100px",
        background: isDarkMode ? "#000" : "#f8f8f8",
      }}>
        {/* Header */}
        <div style={{ 
          padding: "16px",
          background: isDarkMode ? "#000" : "#fff",
          borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => router.back()}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "var(--text-primary)", display: "flex", alignItems: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <h1 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
              {module.title}
            </h1>
          </div>
        </div>
        
        <div style={{ padding: "80px 20px", textAlign: "center" }}>
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>
            Coming Soon
          </h2>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "280px", margin: "0 auto" }}>
            This module is being prepared. Stay tuned for updates!
          </p>
        </div>
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
        padding: "16px",
        background: isDarkMode ? "#0a0a0a" : "#fff",
        borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => router.back()}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text-primary)", display: "flex", alignItems: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
            {module.title}
          </h1>
        </div>
      </div>

      {/* SubModules List */}
      <div style={{ padding: "0" }}>
        {module.subModules.map((subModule, index) => (
          <motion.div
            key={subModule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={`/course/${params.courseId}/module/${params.moduleId}/submodule/${subModule.id}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "20px 16px",
                background: isDarkMode ? "#0a0a0a" : "#fff",
                borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                transition: "background 0.2s",
              }}>
                {/* Number Badge */}
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: isDarkMode ? "#1a1a1a" : "#f0f0f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "16px",
                  color: "var(--text-primary)",
                  flexShrink: 0,
                }}>
                  {index + 1}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    fontSize: "15px", fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "4px",
                    lineHeight: 1.4,
                  }}>
                    {subModule.title}
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                  }}>
                    {subModule.lessons.length} lessons
                  </p>
                </div>

                {/* Arrow */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
