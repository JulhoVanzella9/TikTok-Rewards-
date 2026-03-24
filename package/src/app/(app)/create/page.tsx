"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const videoData = [
  {
    videoSrc: "https://v0-tiktok-rewards.vercel.app/videos/video-1.mp4",
    title: "When the DJ drops your favorite song at the party",
    duration: "0:15",
    views: "89.3M",
    likes: "12.4M",
    creator: "@party.vibes",
  },
  {
    videoSrc: "https://v0-tiktok-rewards.vercel.app/videos/video-2.mp4",
    title: "POV: You finally beat that impossible level",
    duration: "0:22",
    views: "45.7M",
    likes: "8.9M",
    creator: "@gamer.moments",
  },
  {
    videoSrc: "https://v0-tiktok-rewards.vercel.app/videos/video-3.mp4",
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
  const [allRated, setAllRated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const cashSoundRef = useRef<HTMLAudioElement | null>(null);

  // Check Supabase for daily limit per user
  useEffect(() => {
    const checkUserLimit = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      // Get user's video rating data
      const { data: ratingData } = await supabase
        .from("video_ratings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (ratingData) {
        const lastDate = new Date(ratingData.last_rating_date);
        const now = new Date();
        const hoursDiff = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60);

        if (hoursDiff < 24 && ratingData.ratings_count >= 3) {
          // Limit reached - less than 24h and already rated 3 videos
          setLimitReached(true);
          setTotalEarned(ratingData.total_earned || 0);
        } else if (hoursDiff >= 24) {
          // Reset after 24 hours - update the record
          await supabase
            .from("video_ratings")
            .update({ 
              ratings_count: 0, 
              total_earned: 0,
              last_rating_date: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq("user_id", user.id);
        }
      }

      setLoading(false);
    };

    checkUserLimit();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (limitReached || loading) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [limitReached, loading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const playCashSound = () => {
    if (cashSoundRef.current) {
      cashSoundRef.current.currentTime = 0;
      cashSoundRef.current.play().catch(() => {});
    }
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

  const slideTo = useCallback((idx: number) => {
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
  }, [currentIndex, animating, loadedVideos, updateVideoMutes]);

  const goNext = useCallback(() => {
    if (currentIndex < videoData.length - 1) {
      slideTo(currentIndex + 1);
    }
  }, [currentIndex, slideTo]);

  const handleReaction = useCallback(async (reaction: string) => {
    if (ratings[currentIndex] !== null) return;
    if (animating) return;
    if (!userId) return;

    const amount = Math.floor(Math.random() * (57 - 32 + 1)) + 32;
    const newTotal = totalEarned + amount;
    setTotalEarned(newTotal);

    const newRatings = [...ratings];
    newRatings[currentIndex] = reaction;
    setRatings(newRatings);

    playCashSound();

    const emojis: Record<string, string> = { happy: "😊", neutral: "😐", sad: "😞" };
    const labels: Record<string, string> = { happy: "Loved it!", neutral: "Noted!", sad: "Got it!" };
    displayToast(emojis[reaction], `${labels[reaction]} +$${amount.toFixed(2)}`, reaction);

    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex]!.muted = true;
    }

    // Update Supabase
    const supabase = createClient();
    const ratingsCount = newRatings.filter(r => r !== null).length;

    // Upsert video_ratings
    await supabase
      .from("video_ratings")
      .upsert({
        user_id: userId,
        last_rating_date: new Date().toISOString(),
        total_earned: newTotal,
        ratings_count: ratingsCount,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });

    // Add XP to user profile (amount * 100 = XP points, so $45 = 4500 XP)
    const xpToAdd = amount * 100;
    const { data: profile } = await supabase
      .from("profiles")
      .select("total_xp")
      .eq("id", userId)
      .single();

    const currentXp = profile?.total_xp || 0;
    await supabase
      .from("profiles")
      .update({ 
        total_xp: currentXp + xpToAdd,
        updated_at: new Date().toISOString()
      })
      .eq("id", userId);

    // Check if all videos rated
    const allDone = newRatings.every((r) => r !== null);
    if (allDone) {
      setTimeout(() => {
        setAllRated(true);
        setTimeout(() => {
          setLimitReached(true);
        }, 2000);
      }, 1000);
    } else {
      setTimeout(() => {
        goNext();
      }, 900);
    }
  }, [ratings, currentIndex, animating, displayToast, goNext, totalEarned, userId]);

  useEffect(() => {
    if (loading) return;
    
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
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[index] = el;
  };

  // Loading screen
  if (loading) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "80vh", padding: "20px",
      }}>
        <div style={{
          width: "40px", height: "40px",
          border: "3px solid rgba(255,255,255,0.1)",
          borderTopColor: "#fe2c55",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not logged in
  if (!userId) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "80vh", padding: "20px", textAlign: "center",
      }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>
          Faca login para avaliar videos
        </h2>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
          Voce precisa estar logado para avaliar videos e ganhar dinheiro.
        </p>
      </div>
    );
  }

  // Limit reached screen
  if (limitReached) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "80vh", padding: "20px", textAlign: "center",
      }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{
            width: "100px", height: "100px", borderRadius: "50%",
            background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: "24px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}
        >
          Limite Diario Atingido!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", marginBottom: "16px", maxWidth: "320px", lineHeight: 1.6 }}
        >
          Voce ja avaliou todos os 3 videos de hoje. Volte em 24 horas para avaliar mais videos e continuar ganhando!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            background: "rgba(37,244,238,0.1)",
            border: "1px solid rgba(37,244,238,0.3)",
            borderRadius: "16px",
            padding: "20px 32px",
            marginBottom: "24px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#25f4ee", marginBottom: "4px" }}>Saldo adicionado a carteira</p>
          <p style={{ fontSize: "32px", fontWeight: 800, color: "#fff" }}>
            +${totalEarned > 0 ? totalEarned.toFixed(2) : "0.00"}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}
        >
          Seu saldo esta disponivel na aba Carteira
        </motion.p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px", paddingBottom: "100px" }}>
      <audio ref={cashSoundRef} src="https://v0-tiktok-rewards.vercel.app/sounds/cashregister.mp3" preload="auto" />

      {/* Toast de feedback */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            style={{
              position: "fixed", top: "33%", left: "50%", transform: "translateX(-50%)",
              zIndex: 200, display: "flex", alignItems: "center", gap: "8px",
              padding: "12px 24px",
              background: "rgba(20,20,24,0.95)",
              border: `1px solid ${toastData.type === "happy" ? "#22c55e" : toastData.type === "neutral" ? "#eab308" : "#fe2c55"}`,
              borderRadius: "12px", backdropFilter: "blur(20px)",
              fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ fontSize: "18px" }}>{toastData.emoji}</span>
            <span style={{ color: toastData.type === "happy" ? "#22c55e" : toastData.type === "neutral" ? "#eab308" : "#fe2c55" }}>
              {toastData.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All rated success message */}
      <AnimatePresence>
        {allRated && !limitReached && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 300,
              background: "rgba(0,0,0,0.9)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "linear-gradient(135deg, #22c55e, #25f4ee)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </motion.div>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
              Parabens!
            </h2>
            <p style={{ fontSize: "16px", color: "#25f4ee" }}>
              +${totalEarned.toFixed(2)} adicionados!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer de expiracao */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>Expires in</span>
        <span style={{ color: "#25f4ee", fontWeight: 700, fontSize: "14px" }}>{formatTime(timeLeft)}</span>
      </div>

      {/* Slider vertical de videos */}
      <div style={{ position: "relative", overflow: "hidden", borderRadius: "16px", height: "450px" }}>
        <div
          style={{
            transition: "transform 500ms ease-out",
            transform: `translateY(-${currentIndex * 450}px)`,
          }}
        >
          {videoData.map((video, index) => (
            <div key={index} style={{ position: "relative", width: "100%", height: "450px" }}>
              <div style={{
                position: "relative", height: "100%", borderRadius: "16px", overflow: "hidden",
                background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)",
              }}>
                {loadedVideos.includes(index) ? (
                  <video
                    ref={setVideoRef(index)}
                    src={video.videoSrc}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
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
                  <div style={{
                    position: "absolute", inset: 0, background: "#1a1a1a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      width: "40px", height: "40px",
                      border: "2px solid rgba(255,255,255,0.2)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}/>
                  </div>
                )}

                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)",
                }}/>

                {/* Video info */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{video.creator}</p>
                      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginTop: "4px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {video.title}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginTop: "8px" }}>
                        {video.views} views &nbsp; {video.likes} likes
                      </p>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", background: "rgba(0,0,0,0.5)", padding: "4px 8px", borderRadius: "4px" }}>
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Rated badge */}
                {ratings[index] !== null && (
                  <div style={{
                    position: "absolute", top: "12px", right: "12px",
                    background: "rgba(34,197,94,0.9)", color: "#fff",
                    padding: "4px 12px", borderRadius: "20px",
                    fontSize: "12px", fontWeight: 700,
                    display: "flex", alignItems: "center", gap: "4px",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Rated
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div style={{
          position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", gap: "8px", zIndex: 10,
        }}>
          {videoData.map((_, index) => (
            <div
              key={index}
              style={{
                width: "6px",
                height: index === currentIndex ? "24px" : "6px",
                borderRadius: "3px",
                transition: "all 300ms",
                background: index === currentIndex ? "#25f4ee" : ratings[index] !== null ? "#22c55e" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Pergunta */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "18px" }}>
          How do you feel about this video cover?
        </h2>
        <p style={{ color: "#25f4ee", fontSize: "14px", marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
          Select an option below
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </p>
      </div>

      {/* 3 Botoes de reacao */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "16px" }}>
        {/* Happy */}
        <motion.button
          whileHover={{ scale: ratings[currentIndex] === null ? 1.05 : 1 }}
          whileTap={{ scale: ratings[currentIndex] === null ? 0.95 : 1 }}
          onClick={() => handleReaction("happy")}
          disabled={ratings[currentIndex] !== null}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
            background: "transparent", border: "none", cursor: ratings[currentIndex] === null ? "pointer" : "default",
            opacity: ratings[currentIndex] !== null && ratings[currentIndex] !== "happy" ? 0.4 : 1,
            transform: ratings[currentIndex] === "happy" ? "scale(1.1)" : "scale(1)",
            transition: "all 300ms",
          }}
        >
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #25f4ee",
            background: ratings[currentIndex] === "happy" ? "rgba(37,244,238,0.2)" : "transparent",
            transition: "all 300ms",
          }}>
            <span style={{ fontSize: "30px" }}>😊</span>
          </div>
        </motion.button>

        {/* Neutral */}
        <motion.button
          whileHover={{ scale: ratings[currentIndex] === null ? 1.05 : 1 }}
          whileTap={{ scale: ratings[currentIndex] === null ? 0.95 : 1 }}
          onClick={() => handleReaction("neutral")}
          disabled={ratings[currentIndex] !== null}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
            background: "transparent", border: "none", cursor: ratings[currentIndex] === null ? "pointer" : "default",
            opacity: ratings[currentIndex] !== null && ratings[currentIndex] !== "neutral" ? 0.4 : 1,
            transform: ratings[currentIndex] === "neutral" ? "scale(1.1)" : "scale(1)",
            transition: "all 300ms",
          }}
        >
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #eab308",
            background: ratings[currentIndex] === "neutral" ? "rgba(234,179,8,0.2)" : "transparent",
            transition: "all 300ms",
          }}>
            <span style={{ fontSize: "30px" }}>😐</span>
          </div>
        </motion.button>

        {/* Sad */}
        <motion.button
          whileHover={{ scale: ratings[currentIndex] === null ? 1.05 : 1 }}
          whileTap={{ scale: ratings[currentIndex] === null ? 0.95 : 1 }}
          onClick={() => handleReaction("sad")}
          disabled={ratings[currentIndex] !== null}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
            background: "transparent", border: "none", cursor: ratings[currentIndex] === null ? "pointer" : "default",
            opacity: ratings[currentIndex] !== null && ratings[currentIndex] !== "sad" ? 0.4 : 1,
            transform: ratings[currentIndex] === "sad" ? "scale(1.1)" : "scale(1)",
            transition: "all 300ms",
          }}
        >
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #fe2c55",
            background: ratings[currentIndex] === "sad" ? "rgba(254,44,85,0.2)" : "transparent",
            transition: "all 300ms",
          }}>
            <span style={{ fontSize: "30px" }}>😞</span>
          </div>
        </motion.button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
