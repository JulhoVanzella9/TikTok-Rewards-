"use client";

interface TikCashLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  isDarkMode?: boolean;
}

export default function TikCashLogo({ size = "md", showText = true, isDarkMode = true }: TikCashLogoProps) {
  const sizes = {
    sm: { icon: 24, text: 14, gap: 6 },
    md: { icon: 30, text: 18, gap: 8 },
    lg: { icon: 36, text: 22, gap: 10 },
  };

  const s = sizes[size];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: `${s.gap}px` }}>
      {/* TikCash Icon - Musical note shape with dollar coin */}
      <div style={{ 
        width: `${s.icon}px`, 
        height: `${s.icon}px`, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        position: "relative",
      }}>
        <svg width={s.icon} height={s.icon} viewBox="0 0 48 48" fill="none">
          {/* Musical note base shape - cyan shadow */}
          <path 
            d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" 
            fill="#25F4EE"
            transform="translate(-2, -1)"
          />
          {/* Musical note base shape - red shadow */}
          <path 
            d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" 
            fill="#FE2C55"
            transform="translate(2, 1)"
          />
          {/* Main musical note shape */}
          <path 
            d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" 
            fill={isDarkMode ? "#fff" : "#000"}
          />
          {/* Dollar sign inside the circle */}
          <text 
            x="20" 
            y="32" 
            textAnchor="middle" 
            fill={isDarkMode ? "#000" : "#fff"}
            fontSize="14"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            $
          </text>
          {/* Coin stack indicator at top right */}
          <circle cx="36" cy="12" r="8" fill="#25F4EE" stroke={isDarkMode ? "#000" : "#fff"} strokeWidth="2"/>
          <text 
            x="36" 
            y="16" 
            textAnchor="middle" 
            fill="#000"
            fontSize="10"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            $
          </text>
        </svg>
      </div>
      
      {/* Text */}
      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{
            fontSize: `${s.text}px`,
            fontWeight: 700,
            color: isDarkMode ? "#fff" : "#000",
            letterSpacing: "-0.3px",
            fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
          }}>
            TikCash
          </span>
        </div>
      )}
    </div>
  );
}
