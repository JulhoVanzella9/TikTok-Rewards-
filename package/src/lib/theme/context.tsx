"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // This runs during server rendering too. Never touch browser globals here.
    if (typeof window === "undefined") return "dark";

    try {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    } catch {}

    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
    return "dark";
  });

  const applyTheme = (newTheme: Theme) => {
    // Apply to document
    document.documentElement.setAttribute("data-theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
    
    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", newTheme === "dark" ? "#000000" : "#f5f5f5");
    }

    // Keep body styles driven by CSS variables (global.css) to avoid first-load flashes.
    document.body.style.removeProperty("background-color");
    document.body.style.removeProperty("color");
  };

  // Keep DOM in sync whenever theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch {}
    applyTheme(newTheme);
    
    // Dispatch event for components that need to know
    window.dispatchEvent(new CustomEvent("themeChange", { detail: { theme: newTheme } }));
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
