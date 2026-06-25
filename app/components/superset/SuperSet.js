"use client";

import { lambdaGet } from "@/app/lamda/lambdaClient";
import { embedDashboard } from "@preset-sdk/embedded";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "../ThemeProvider";

const SuperSet = ({ EMBEDDED_ID, setGetTok, report }) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme()

  const loadingRef = useRef(false);
  const retryRef = useRef(null);

  const fetchGuestTokenFromBackend = useCallback(async () => {
    try {
      const url = `/getdashboardtoken/${EMBEDDED_ID}`;
      const res = await lambdaGet(url);

      const token =
        res?.response?.token ||
        res?.token ||
        res?.response?.body?.token ||
        null;

      if (!token) {
        console.warn("No token found in response", res);
        return null;
      }

      setGetTok?.(token);

      return token;
    } catch (error) {
      console.error("Error fetching guest token:", error);
      return null;
    }
  }, [EMBEDDED_ID, setGetTok]);

  const loadDashboard = useCallback(async () => {
    if (!EMBEDDED_ID || loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const mountPoint = document.getElementById("analytic2");
      const presetDashboard = process.env.NEXT_PUBLIC_PRESET_URL;

      if (!mountPoint || !presetDashboard) return;

      // Clear previous embed
      mountPoint.innerHTML = "";

      const dashboard = await embedDashboard({
        id: EMBEDDED_ID,
        supersetDomain: presetDashboard,
        mountPoint,
        fetchGuestToken: fetchGuestTokenFromBackend,
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: false,
        },
      });
      if (theme === "dark") {
        dashboard.setThemeMode("dark");
      }
      else {
        dashboard.setThemeMode("default");
      }

      // Verify iframe actually rendered
      clearTimeout(retryRef.current);

      retryRef.current = setTimeout(() => {
        const iframe = mountPoint.querySelector("iframe");

        if (!iframe) {
          console.warn(
            "Dashboard iframe not found. Reinitializing..."
          );
          loadDashboard();
        }
      }, 10000);
    } catch (error) {
      console.error("Error embedding dashboard:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [EMBEDDED_ID, fetchGuestTokenFromBackend, theme]);

  // Initial load
  useEffect(() => {
    loadDashboard();
  }, [loadDashboard, report]);

  // Reload when tab becomes active again
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "visible") {
  //       console.log(
  //         "Tab became active. Reloading dashboard..."
  //       );

  //       setTimeout(() => {
  //         loadDashboard();
  //       }, 500);
  //     }
  //   };

  //   document.addEventListener(
  //     "visibilitychange",
  //     handleVisibilityChange
  //   );

  //   return () => {
  //     document.removeEventListener(
  //       "visibilitychange",
  //       handleVisibilityChange
  //     );
  //   };
  // }, [loadDashboard]);

  // Fallback watchdog for stuck loading
  useEffect(() => {
    let timeout;

    if (loading) {
      timeout = setTimeout(() => {
        console.warn(
          "Dashboard loading timeout. Retrying..."
        );
        loadDashboard();
      }, 30000);
    }

    return () => clearTimeout(timeout);
  }, [loading, loadDashboard]);

  useEffect(() => {
    return () => {
      clearTimeout(retryRef.current);
    };
  }, []);

  return (
    <main className="w-full h-full relative">
      {loading && (
  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#0066B3]" />
  </div>
)}

      <div
        id="analytic2"
        className="w-full h-full"
      />
    </main>
  );
};

export default SuperSet;