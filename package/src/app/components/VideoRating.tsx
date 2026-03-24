"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const videoData = [
  {
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-waving-on-a-video-call-43892-large.mp4",
    title: "When the DJ drops your favorite song at the party",
    duration: "0:15",
    views: "89.3M",
    likes: "12.4M",
    creator: "@party.vibes",
  },
  {
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-happily-in-a-room-4329-large.mp4",
    title: "POV: You finally beat that impossible level",
    duration: "0:22",
    views: "45.7M",
    likes: "8.9M",
    creator: "@gamer.moments",
  },
  {
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-earrings-39875-large.mp4",
    title: "This dance trend is taking over TikTok",
    duration: "0:18",
    views: "156.2M",
    likes: "28.1M",
    creator: "@dance.central",
  },
]

interface VideoRatingProps {
  onAllRated: (totalEarned: number) => void
  timeLeft: number
}

export default function VideoRating({ onAllRated, timeLeft }: VideoRatingProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ratings, setRatings] = useState<(string | null)[]>([null, null, null])
  const [animating, setAnimating] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastData, setToastData] = useState({ emoji: "", text: "", type: "" })
  const [totalEarned, setTotalEarned] = useState(0)
  const [loadedVideos, setLoadedVideos] = useState<number[]>([0])
  const [allCompleted, setAllCompleted] = useState(false)

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const cashSoundRef = useRef<HTMLAudioElement | null>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const playCashSound = () => {
    if (cashSoundRef.current) {
      cashSoundRef.current.currentTime = 0
      cashSoundRef.current.play().catch(() => { })
    }
  }

  const displayToast = useCallback((emoji: string, text: string, type: string) => {
    setToastData({ emoji, text, type })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 700)
  }, [])

  const updateVideoMutes = useCallback((activeIndex: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === activeIndex) {
          video.muted = false
          video.play().catch(() => { })
        } else {
          video.muted = true
          video.pause()
        }
      }
    })
  }, [])

  const slideTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= videoData.length) return
    if (idx === currentIndex) return
    if (animating) return

    setAnimating(true)

    if (!loadedVideos.includes(idx)) {
      setLoadedVideos(prev => [...prev, idx])
    }

    if (idx + 1 < videoData.length && !loadedVideos.includes(idx + 1)) {
      setLoadedVideos(prev => [...prev, idx + 1])
    }

    setCurrentIndex(idx)

    setTimeout(() => {
      updateVideoMutes(idx)
    }, 300)

    setTimeout(() => {
      setAnimating(false)
    }, 500)
  }, [currentIndex, animating, loadedVideos, updateVideoMutes])

  const goNext = useCallback(() => {
    if (currentIndex < videoData.length - 1) {
      slideTo(currentIndex + 1)
    }
  }, [currentIndex, slideTo])

  const handleReaction = useCallback((reaction: string) => {
    if (ratings[currentIndex] !== null) return
    if (animating) return

    const amount = Math.floor(Math.random() * (57 - 32 + 1)) + 32
    const newTotal = totalEarned + amount
    setTotalEarned(newTotal)

    const newRatings = [...ratings]
    newRatings[currentIndex] = reaction
    setRatings(newRatings)

    playCashSound()

    const emojis: Record<string, string> = { happy: "😊", neutral: "😐", sad: "😞" }
    const labels: Record<string, string> = { happy: "Loved it!", neutral: "Noted!", sad: "Got it!" }
    displayToast(emojis[reaction], `${labels[reaction]} +$${amount.toFixed(2)}`, reaction)

    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex]!.muted = true
    }

    if (currentIndex >= videoData.length - 1) {
      // Todos os 3 videos avaliados
      setTimeout(() => {
        setAllCompleted(true)
        onAllRated(newTotal)
      }, 1200)
    } else {
      setTimeout(() => {
        goNext()
      }, 900)
    }
  }, [ratings, currentIndex, animating, displayToast, goNext, onAllRated, totalEarned])

  useEffect(() => {
    setTimeout(() => {
      updateVideoMutes(0)
    }, 500)

    setTimeout(() => {
      if (!loadedVideos.includes(1)) {
        setLoadedVideos(prev => [...prev, 1])
      }
      setTimeout(() => {
        if (!loadedVideos.includes(2)) {
          setLoadedVideos(prev => [...prev, 2])
        }
      }, 1000)
    }, 1500)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[index] = el
  }

  // Tela de limite atingido
  if (allCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "linear-gradient(145deg, rgba(26,26,46,0.98) 0%, rgba(18,18,30,0.99) 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(37,244,238,0.2), rgba(37,244,238,0.05))",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          border: "2px solid rgba(37,244,238,0.3)",
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>
          Limite Diario Atingido!
        </h2>

        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", marginBottom: "24px", lineHeight: 1.6 }}>
          Voce avaliou todos os 3 videos disponiveis hoje e ganhou{" "}
          <span style={{ color: "#25f4ee", fontWeight: 700 }}>${totalEarned.toFixed(2)}</span>
        </p>

        <div style={{
          background: "rgba(254,44,85,0.1)",
          border: "1px solid rgba(254,44,85,0.2)",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "24px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span style={{ color: "#fe2c55", fontWeight: 700, fontSize: "16px" }}>
              Proximas avaliacoes em 24 horas
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
            Volte amanha para avaliar mais videos e ganhar mais!
          </p>
        </div>

        <div style={{
          background: "rgba(37,244,238,0.1)",
          border: "1px solid rgba(37,244,238,0.2)",
          borderRadius: "16px",
          padding: "20px",
        }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>
            Seu saldo foi adicionado a carteira
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span style={{ fontSize: "28px", fontWeight: 800, color: "#25f4ee" }}>
              ${totalEarned.toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Audio para som de caixa registradora */}
      <audio ref={cashSoundRef} src="https://assets.mixkit.co/active_storage/sfx/2058/2058-preview.mp3" preload="auto" />

      {/* Toast de feedback */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            style={{
              position: "fixed",
              top: "33%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "rgba(20,20,24,0.95)",
              border: `1px solid ${
                toastData.type === 'happy' ? '#22c55e' :
                toastData.type === 'neutral' ? '#eab308' : '#ef4444'
              }`,
              borderRadius: "12px",
              backdropFilter: "blur(12px)",
              fontSize: "14px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <span style={{ fontSize: "18px" }}>{toastData.emoji}</span>
            <span style={{
              color: toastData.type === 'happy' ? '#22c55e' :
                     toastData.type === 'neutral' ? '#eab308' : '#ef4444'
            }}>
              {toastData.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer de expiracao */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        marginBottom: "16px",
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Expires in</span>
        <span style={{ color: "#25f4ee", fontWeight: 700, fontSize: "14px" }}>{formatTime(timeLeft)}</span>
      </div>

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
              <div style={{
                position: "relative",
                height: "100%",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.1)",
              }}>
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
                        videoRefs.current[index]!.play().catch(() => { })
                      }
                    }}
                  />
                ) : (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "#1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      border: "2px solid rgba(255,255,255,0.2)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }} />
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

                {/* Info do video */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "16px",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{video.creator}</p>
                      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginTop: "4px" }}>{video.title}</p>
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginTop: "8px" }}>
                        {video.views} views &nbsp; {video.likes} likes
                      </p>
                    </div>
                    <span style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "12px",
                      background: "rgba(0,0,0,0.5)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}>
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Badge de avaliado */}
                {ratings[index] !== null && (
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(34,197,94,0.9)",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Rated
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dots de progresso na lateral */}
        <div style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          zIndex: 10,
        }}>
          {videoData.map((_, index) => (
            <div
              key={index}
              style={{
                width: "6px",
                borderRadius: "3px",
                transition: "all 0.3s",
                height: index === currentIndex ? "24px" : "6px",
                background: index === currentIndex ? "#25f4ee" :
                           ratings[index] !== null ? "#22c55e" : "rgba(255,255,255,0.3)",
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
        <p style={{
          color: "#25f4ee",
          fontSize: "14px",
          marginTop: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}>
          Select an option below
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </p>
      </div>

      {/* 3 Botoes de reacao */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        marginTop: "16px",
      }}>
        {/* Happy */}
        <motion.button
          onClick={() => handleReaction('happy')}
          disabled={ratings[currentIndex] !== null}
          whileHover={ratings[currentIndex] === null ? { scale: 1.05 } : {}}
          whileTap={ratings[currentIndex] === null ? { scale: 0.95 } : {}}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            background: "transparent",
            border: "none",
            cursor: ratings[currentIndex] !== null ? "default" : "pointer",
            transition: "all 0.3s",
            opacity: ratings[currentIndex] !== null && ratings[currentIndex] !== 'happy' ? 0.4 : 1,
            transform: ratings[currentIndex] === 'happy' ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid #25f4ee`,
            background: ratings[currentIndex] === 'happy' ? "rgba(37,244,238,0.2)" : "transparent",
            transition: "all 0.3s",
          }}>
            <span style={{ fontSize: "30px" }}>😊</span>
          </div>
        </motion.button>

        {/* Neutral */}
        <motion.button
          onClick={() => handleReaction('neutral')}
          disabled={ratings[currentIndex] !== null}
          whileHover={ratings[currentIndex] === null ? { scale: 1.05 } : {}}
          whileTap={ratings[currentIndex] === null ? { scale: 0.95 } : {}}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            background: "transparent",
            border: "none",
            cursor: ratings[currentIndex] !== null ? "default" : "pointer",
            transition: "all 0.3s",
            opacity: ratings[currentIndex] !== null && ratings[currentIndex] !== 'neutral' ? 0.4 : 1,
            transform: ratings[currentIndex] === 'neutral' ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid #eab308`,
            background: ratings[currentIndex] === 'neutral' ? "rgba(234,179,8,0.2)" : "transparent",
            transition: "all 0.3s",
          }}>
            <span style={{ fontSize: "30px" }}>😐</span>
          </div>
        </motion.button>

        {/* Sad */}
        <motion.button
          onClick={() => handleReaction('sad')}
          disabled={ratings[currentIndex] !== null}
          whileHover={ratings[currentIndex] === null ? { scale: 1.05 } : {}}
          whileTap={ratings[currentIndex] === null ? { scale: 0.95 } : {}}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            background: "transparent",
            border: "none",
            cursor: ratings[currentIndex] !== null ? "default" : "pointer",
            transition: "all 0.3s",
            opacity: ratings[currentIndex] !== null && ratings[currentIndex] !== 'sad' ? 0.4 : 1,
            transform: ratings[currentIndex] === 'sad' ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid #fe2c55`,
            background: ratings[currentIndex] === 'sad' ? "rgba(254,44,85,0.2)" : "transparent",
            transition: "all 0.3s",
          }}>
            <span style={{ fontSize: "30px" }}>😞</span>
          </div>
        </motion.button>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
