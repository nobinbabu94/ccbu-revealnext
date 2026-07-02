"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const publicRoutes = [
      "/login",
      "/forgot-password",
    ];

    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return null;
  }

  // Allow public pages
  const publicRoutes = [
    "/login",
    "/forgot-password",
  ];

  if (!user && publicRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return <>{children}</>;
}