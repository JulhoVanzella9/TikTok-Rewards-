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
      {/* Video Tutorial Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.35 }}
        style={{
          borderRadius: "24px", overflow: "hidden", marginBottom: "32px",
          background: "linear-gradient(135deg, rgba(254,44,85,0.08) 0%, rgba(37,244,238,0.05) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "28px", position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(254,44,85,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fe2c55">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <h2 style={{
            fontSize: "22px", fontWeight: 800, color: "#fe2c55",
          }}>
            {t("videoTutorial")}
          </h2>
        </div>
        
        <p style={{
          fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6,
          marginBottom: "20px",
        }}>
          {t("videoTutorialDesc")}
        </p>

        {/* Video Container */}
        <div style={{
          background: "#000",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          {/* Video Header */}
          <div style={{
            padding: "16px 20px",
            display: "flex", alignItems: "center", gap: "12px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg, #1a1a2e, #252542)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
                TikTok Rewards - How to Use
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Support Service
              </div>
            </div>
          </div>

          {/* Video Content */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
          }}>
            {/* Instructions */}
            <div style={{
              padding: "24px 20px",
              display: "flex", alignItems: "center",
            }}>
              <p style={{
                fontSize: "15px", color: "rgba(255,255,255,0.9)", lineHeight: 1.7,
                fontWeight: 500,
              }}>
                {t("videoInstructions")}
              </p>
            </div>

            {/* Phone Mockup */}
            <div style={{
              padding: "20px",
              display: "flex", justifyContent: "center", alignItems: "center",
              position: "relative",
            }}>
              <div style={{
                width: "160px", height: "280px",
                background: "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)",
                borderRadius: "24px",
                border: "3px solid #333",
                overflow: "hidden",
                position: "relative",
              }}>
                {/* Phone Screen Content */}
                <div style={{
                  padding: "8px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  {/* App Header */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "4px 8px", marginBottom: "4px",
                  }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#fff" }}>TikTok Rewards</span>
                    <span style={{
                      fontSize: "8px", fontWeight: 700, color: "#fff",
                      background: "#fe2c55", padding: "2px 6px", borderRadius: "10px",
                    }}>$10.00</span>
                  </div>
                  
                  {/* Tabs */}
                  <div style={{
                    display: "flex", gap: "4px", padding: "0 4px", marginBottom: "8px",
                    fontSize: "7px", color: "rgba(255,255,255,0.5)",
                  }}>
                    <span>LIVE</span>
                    <span>Explore</span>
                    <span>Following</span>
                    <span style={{ color: "#fff", fontWeight: 700 }}>For You</span>
                  </div>

                  {/* Video Area */}
                  <div style={{
                    flex: 1,
                    background: "linear-gradient(180deg, #2a2a3e 0%, #1a1a2e 100%)",
                    borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}>
                    {/* Play Button */}
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "#fe2c55",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div style={{
                    display: "flex", justifyContent: "space-around",
                    padding: "8px 4px 4px",
                    fontSize: "6px", color: "rgba(255,255,255,0.5)",
                  }}>
                    <span>Home</span>
                    <span>Explore</span>
                    <span style={{ color: "#fff" }}>+</span>
                    <span>Progress</span>
                    <span>Wallet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

      {/* Your Courses */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: "16px",
        }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>
            {t("yourCourses")}
          </h2>
          <Link href="/my-courses" prefetch={true} style={{
            fontSize: "13px", fontWeight: 600, color: "#fe2c55",
          }}>
            {t("viewAll")}
          </Link>
        </div>
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
