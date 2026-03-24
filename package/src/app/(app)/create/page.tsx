"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const videoData = [
  {
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "When the DJ drops your favorite song at the party",
    duration: "0:15",
    views: "89.3M",
    likes: "12.4M",
    creator: "@party.vibes",
  },
  {
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    title: "POV: You finally beat that impossible level",
    duration: "0:22",
    views: "45.7M",
    likes: "8.9M",
    creator: "@gamer.moments",
  },
  {
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    title: "This dance trend is taking over TikTok",
    duration: "0:18",
    views: "156.2M",
    likes: "28.1M",
    creator: "@dance.central",
  },
];

export default function CreatePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<(string | null)[]>([null, null, null]);
  const [animating, setAnimating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ emoji: "", text: "", type: "" });
  const [totalEarned, setTotalEarned] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<number[]>([0]);
  const [timeLeft, setTimeLeft] = useState(7 * 60 + 30);
  const [limitReached, setLimitReached] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Check if already rated today
  useEffect(() => {
    const lastRated = localStorage.getItem("lastRatedDate");
    const today = new Date().toDateString();
    if (lastRated === today) {
      setLimitReached(true);
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || limitReached) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, limitReached]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const displayToast = useCallback((emoji: string, text: string, type: string) => {
    setToastData({ emoji, text, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 700);
  }, []);

  const updateVideoMutes = useCallback((activeIndex: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === activeIndex) {
          video.muted = false;
          video.play().catch(() => {});
        } else {
          video.muted = true;
          video.pause();
        }
      }
    });
  }, []);

  const slideTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= videoData.length) return;
      if (idx === currentIndex) return;
      if (animating) return;

      setAnimating(true);

      if (!loadedVideos.includes(idx)) {
        setLoadedVideos((prev) => [...prev, idx]);
      }

      if (idx + 1 < videoData.length && !loadedVideos.includes(idx + 1)) {
        setLoadedVideos((prev) => [...prev, idx + 1]);
      }

      setCurrentIndex(idx);

      setTimeout(() => {
        updateVideoMutes(idx);
      }, 300);

      setTimeout(() => {
        setAnimating(false);
      }, 500);
    },
    [currentIndex, animating, loadedVideos, updateVideoMutes]
  );

  const goNext = useCallback(() => {
    if (currentIndex < videoData.length - 1) {
      slideTo(currentIndex + 1);
    }
  }, [currentIndex, slideTo]);

  const handleReaction = useCallback(
    (reaction: string) => {
      if (ratings[currentIndex] !== null) return;
      if (animating) return;

      const amount = Math.floor(Math.random() * (57 - 32 + 1)) + 32;
      const newTotal = totalEarned + amount;
      setTotalEarned(newTotal);

      const newRatings = [...ratings];
      newRatings[currentIndex] = reaction;
      setRatings(newRatings);

      const emojis: Record<string, string> = { happy: "😊", neutral: "😐", sad: "😞" };
      const labels: Record<string, string> = { happy: "Loved it!", neutral: "Noted!", sad: "Got it!" };
      displayToast(emojis[reaction], `${labels[reaction]} +$${amount.toFixed(2)}`, reaction);

      if (videoRefs.current[currentIndex]) {
        videoRefs.current[currentIndex]!.muted = true;
      }

      if (currentIndex >= videoData.length - 1) {
        // All videos rated - show limit message
        setTimeout(() => {
          setLimitReached(true);
          localStorage.setItem("lastRatedDate", new Date().toDateString());
          localStorage.setItem("pendingBalance", String(newTotal));
        }, 1200);
      } else {
        setTimeout(() => {
          goNext();
        }, 900);
      }
    },
    [ratings, currentIndex, animating, displayToast, goNext, totalEarned]
  );

  useEffect(() => {
    if (!limitReached) {
      setTimeout(() => {
        updateVideoMutes(0);
      }, 500);

      setTimeout(() => {
        if (!loadedVideos.includes(1)) {
          setLoadedVideos((prev) => [...prev, 1]);
        }
        setTimeout(() => {
          if (!loadedVideos.includes(2)) {
            setLoadedVideos((prev) => [...prev, 2]);
          }
        }, 1000);
      }, 1500);
    }
  }, [limitReached]); // eslint-disable-line react-hooks/exhaustive-deps

  const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[index] = el;
  };

  // Limit reached screen
  if (limitReached) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #25f4ee 0%, #fe2c55 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}
        >
          Limite Diario Atingido!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "24px",
            maxWidth: "300px",
            lineHeight: 1.6,
          }}
        >
          Voce ja avaliou os 3 videos de hoje. Volte em 24 horas para avaliar mais videos e ganhar mais recompensas!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: "rgba(37,244,238,0.1)",
            border: "1px solid rgba(37,244,238,0.3)",
            borderRadius: "16px",
            padding: "20px 32px",
            marginBottom: "24px",
          }}
        >
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>
            Saldo adicionado a carteira
          </p>
          <p style={{ fontSize: "32px", fontWeight: 800, color: "#25f4ee" }}>
            ${totalEarned > 0 ? totalEarned.toFixed(2) : (Math.floor(Math.random() * 50) + 100).toFixed(2)}
          </p>
        </motion.div>

        <motion.a
          href="/wallet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            padding: "14px 32px",
            fontSize: "15px",
            fontWeight: 700,
            background: "linear-gradient(135deg, #fe2c55, #ff4070)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Ver Carteira
        </motion.a>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      {/* Toast de feedback */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75 }}
            style={{
              position: "fixed",
              top: "30%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "rgba(20,20,24,0.95)",
              border: `1px solid ${
                toastData.type === "happy" ? "#22c55e" : toastData.type === "neutral" ? "#eab308" : "#fe2c55"
              }`,
              borderRadius: "12px",
              backdropFilter: "blur(12px)",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <span style={{ fontSize: "18px" }}>{toastData.emoji}</span>
            <span
              style={{
                color: toastData.type === "happy" ? "#22c55e" : toastData.type === "neutral" ? "#eab308" : "#fe2c55",
              }}
            >
              {toastData.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer de expiracao */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>Expires in</span>
        <span style={{ color: "#25f4ee", fontWeight: 700, fontSize: "14px" }}>{formatTime(timeLeft)}</span>
      </motion.div>

      {/* Slider vertical de videos */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          height: "450px",
        }}
      >
        <div
          ref={sliderRef}
          style={{
            transition: "transform 0.5s ease-out",
            transform: `translateY(-${currentIndex * 450}px)`,
          }}
        >
          {videoData.map((video, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                height: "450px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {loadedVideos.includes(index) ? (
                  <video
                    ref={setVideoRef(index)}
                    src={video.videoSrc}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    autoPlay={index === currentIndex}
                    loop
                    playsInline
                    muted={index !== currentIndex}
                    preload={index === 0 ? "auto" : "metadata"}
                    onCanPlay={() => {
                      if (index === currentIndex && videoRefs.current[index]) {
                        videoRefs.current[index]!.play().catch(() => {});
                      }
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "#1a1a1a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "2px solid rgba(255,255,255,0.2)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  </div>
                )}

                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)",
                  }}
                />

                {/* Video info */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{video.creator}</p>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "12px",
                          marginTop: "4px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {video.title}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginTop: "8px" }}>
                        {video.views} views &nbsp; {video.likes} likes
                      </p>
                    </div>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "12px",
                        background: "rgba(0,0,0,0.5)",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Rated badge */}
                {ratings[index] !== null && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(34,197,94,0.9)",
                      color: "#fff",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Rated
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            zIndex: 10,
          }}
        >
          {videoData.map((_, index) => (
            <div
              key={index}
              style={{
                width: "6px",
                borderRadius: "3px",
                transition: "all 0.3s",
                height: index === currentIndex ? "24px" : "6px",
                background:
                  index === currentIndex ? "#25f4ee" : ratings[index] !== null ? "#22c55e" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "18px" }}>How do you feel about this video cover?</h2>
        <p
          style={{
            color: "#25f4ee",
            fontSize: "14px",
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          Select an option below
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </p>
      </div>

      {/* Reaction buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
        {[
          { type: "happy", emoji: "😊", color: "#25f4ee" },
          { type: "neutral", emoji: "😐", color: "#eab308" },
          { type: "sad", emoji: "😞", color: "#fe2c55" },
        ].map((reaction) => (
          <motion.button
            key={reaction.type}
            onClick={() => handleReaction(reaction.type)}
            disabled={ratings[currentIndex] !== null}
            whileHover={{ scale: ratings[currentIndex] === null ? 1.05 : 1 }}
            whileTap={{ scale: ratings[currentIndex] === null ? 0.95 : 1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              background: "transparent",
              border: "none",
              cursor: ratings[currentIndex] !== null ? "not-allowed" : "pointer",
              opacity:
                ratings[currentIndex] === reaction.type
                  ? 1
                  : ratings[currentIndex] !== null
                  ? 0.4
                  : 1,
              transform: ratings[currentIndex] === reaction.type ? "scale(1.1)" : "scale(1)",
              transition: "all 0.3s",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${reaction.color}`,
                background:
                  ratings[currentIndex] === reaction.type ? `${reaction.color}33` : "transparent",
                transition: "all 0.3s",
              }}
            >
              <span style={{ fontSize: "32px" }}>{reaction.emoji}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Earned so far */}
      {totalEarned > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: "center",
            marginTop: "24px",
            padding: "12px",
            background: "rgba(37,244,238,0.1)",
            borderRadius: "12px",
            border: "1px solid rgba(37,244,238,0.2)",
          }}
        >
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Ganhos ate agora</p>
          <p style={{ fontSize: "24px", fontWeight: 800, color: "#25f4ee" }}>${totalEarned.toFixed(2)}</p>
        </motion.div>
      )}

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
