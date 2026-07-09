"use client";

import { useTheme } from "@/app/components/ThemeProvider";

export default function useAppTheme() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return {
    theme,
    toggleTheme,
    isDark,
    bg: isDark ? "#191919" : "#ffffff",
    bgSub: isDark ? "#2a2a2a" : "#f9fafb",
    bgDrop: isDark ? "#242424" : "#ffffff",
    border: isDark ? "#333333" : "#e5e7eb",
    textPri: isDark ? "#e5e7eb" : "#1f2937",
    textSec: isDark ? "#9ca3af" : "#6b7280",
    hover: isDark ? "#242424" : "#f9fafb",
    accent: isDark ? "#94a3b8" : "#334155",
  };
}
