"use client";

interface TikTokLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  isDarkMode?: boolean;
}

export default function TikTokLogo({ size = "md", showText = true, isDarkMode = true }: TikTokLogoProps) {
  const sizes = {
    sm: { icon: 20, text: 14, gap: 6 },
    md: { icon: 26, text: 18, gap: 8 },
    lg: { icon: 32, text: 22, gap: 10 },
  };

  const s = sizes[size];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: `${s.gap}px` }}>
      {/* TikTok Icon */}
      <div style={{ width: `${s.icon}px`, height: `${s.icon}px`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={s.icon} height={s.icon} viewBox="0 0 48 48" fill="none">
          <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#25F4EE" transform="translate(-2, -1)"/>
          <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill="#FE2C55" transform="translate(2, 1)"/>
          <path d="M33.5 7.7c-1.3-1.5-2.1-3.4-2.1-5.2h-5.7v23.3c0 3.1-2.5 5.7-5.7 5.7s-5.7-2.5-5.7-5.7 2.5-5.7 5.7-5.7c.6 0 1.2.1 1.8.3v-5.5c-.6-.1-1.2-.1-1.8-.1-6.2 0-11.2 5-11.2 11.2S13.8 37 20 37s11.2-5 11.2-11.2V14.5c2.3 1.6 5.1 2.6 8.1 2.5v-5.5c-2.2-.1-4.3-1.4-5.8-3.8z" fill={isDarkMode ? "#fff" : "#000"}/>
        </svg>
      </div>
      
      {/* Text */}
      {showText && (
        <span style={{
          fontSize: `${s.text}px`,
          fontWeight: 700,
          color: isDarkMode ? "#fff" : "#000",
          letterSpacing: "-0.3px",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}>
          TikTok <span style={{ color: "#25f4ee" }}>Rewards</span>
        </span>
      )}
    </div>
  );
}
