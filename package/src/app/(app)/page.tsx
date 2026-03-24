"use client";
import { motion } from "framer-motion";
import { courses } from "@/app/data/courses";
import CourseCard from "@/app/components/CourseCard";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

// Faster animation variants
const fadeIn = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

export default function HomePage() {
  const { t } = useI18n();
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const recommended = courses.filter((c) => c.progress === 0).slice(0, 4);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.35 }}
        style={{
          borderRadius: "24px", overflow: "hidden", marginBottom: "32px",
          background: "linear-gradient(135deg, rgba(254,44,85,0.15) 0%, rgba(37,244,238,0.08) 100%)",
          border: "1px solid rgba(254,44,85,0.12)",
          padding: "32px 28px", position: "relative",
        }}
      >
        <div>
          <div style={{
            fontSize: "12px", fontWeight: 700, color: "#fe2c55",
            textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px",
          }}>
            {t("platformTagline")}
          </div>
          <h1 style={{
            fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 900, color: "#fff",
            lineHeight: 1.2, marginBottom: "12px", letterSpacing: "-0.5px",
          }}>
            {t("heroTitle1")} <br />
            <span style={{
              background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
              backgroundClip: "text", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {t("heroTitle2")}
            </span>
          </h1>
          <p style={{
            fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6,
            maxWidth: "400px", marginBottom: "20px",
          }}>
            {t("heroSubtitle")}
          </p>
          <Link href="/explore" prefetch={true}>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 8px 25px rgba(254,44,85,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "14px 32px", fontSize: "15px", fontWeight: 700,
                background: "linear-gradient(135deg, #fe2c55 0%, #ff4070 100%)",
                color: "#fff",
                border: "none", borderRadius: "50px", cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 15px rgba(254,44,85,0.3), 0 2px 0 #c41e40",
              }}
            >
              {t("exploreCourses")}
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px", marginBottom: "32px",
        }}
      >
        {[
          { value: "0", label: t("courses"), color: "#fe2c55" },
          { value: "0", label: t("lessons"), color: "#25f4ee" },
          { value: "0", label: t("streak"), color: "#ff6b35" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeIn}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.03 }}
            style={{
              background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}05)`,
              border: `1px solid ${stat.color}15`,
              borderRadius: "16px", padding: "16px", textAlign: "center",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: 800, color: stat.color }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Continue Watching */}
      {inProgress.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{ marginBottom: "32px" }}
        >
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "16px",
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>
              {t("continueWatching")}
            </h2>
            <Link href="/my-courses" prefetch={true} style={{
              fontSize: "13px", fontWeight: 600, color: "#fe2c55",
            }}>
              {t("viewAll")}
            </Link>
          </div>
          <div style={{
            display: "flex", gap: "16px", overflowX: "auto",
            paddingBottom: "8px", scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}>
            {inProgress.slice(0, 3).map((course, i) => (
              <div key={course.id} style={{ minWidth: "280px", scrollSnapAlign: "start" }}>
                <CourseCard course={course} index={i} />
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Recommended */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <h2 style={{
          fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "16px",
        }}>
          {t("recommended")}
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: "20px",
        }}>
          {recommended.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}
