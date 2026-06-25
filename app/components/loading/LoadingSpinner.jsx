"use client";

import { useEffect, useState } from "react";

export default function LoadingSpinner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen z-[99999]
      ${
        mounted &&
        document.documentElement.classList.contains("dark")
          ? "bg-[#191919]"
          : "bg-white"
      }`}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#0066B3]" />
    </div>
  );
}