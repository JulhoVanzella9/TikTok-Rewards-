"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { courses } from "@/app/data/courses";
import CourseCard from "@/app/components/CourseCard";
import { useI18n } from "@/lib/i18n/context";

export default function HomePage() {
  const { t } = useI18n();

  // Get featured/first course
  const featuredCourse = useMemo(() => courses[0], []);

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ marginBottom: "24px" }}
      >
        <h1 style={{ 
          fontSize: "24px", fontWeight: 800, color: "#fff", marginBottom: "8px" 
        }}>
          {t("welcome")} TikTok Rewards
        </h1>
        <p style={{ 
          fontSize: "14px", color: "var(--text-muted)" 
        }}>
          {t("discoverCourses")}
        </p>
      </motion.div>

      {/* Featured Course */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <h2 style={{ 
          fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.7)", 
          marginBottom: "16px" 
        }}>
          {t("featuredCourse")}
        </h2>
        
        {featuredCourse && (
          <CourseCard course={featuredCourse} index={0} />
        )}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginTop: "24px",
        }}
      >
        <div style={{
          background: "rgba(37,244,238,0.08)",
          border: "1px solid rgba(37,244,238,0.2)",
          borderRadius: "16px",
          padding: "16px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "24px", fontWeight: 800, color: "#25f4ee" }}>
            {courses.length}
          </p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
            {t("coursesAvailable")}
          </p>
        </div>
        
        <div style={{
          background: "rgba(254,44,85,0.08)",
          border: "1px solid rgba(254,44,85,0.2)",
          borderRadius: "16px",
          padding: "16px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "24px", fontWeight: 800, color: "#fe2c55" }}>
            $39
          </p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
            {t("earnUpTo")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
