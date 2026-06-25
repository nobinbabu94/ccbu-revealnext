"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import LoadingSpinner from "./loading/LoadingSpinner";

const PUBLIC_ROUTES = [
  "/login",
  "/forgot-password",
];

export default function AuthWrapper({
  children,
}) {
  const { user, loading } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // Not authenticated
    if (!user) {
      if (!PUBLIC_ROUTES.includes(pathname)) {
        router.replace("/login");
      }
      return;
    }

    // Authenticated
    if (PUBLIC_ROUTES.includes(pathname)) {
      switch (user.role) {
        case "admin":
          router.replace("/manageReports");
          break;

        case "retailer":
          router.replace("/retailerPlanogram");
          break;

        default:
          router.replace("/");
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    return <LoadingSpinner />;
  }

  if (user && PUBLIC_ROUTES.includes(pathname)) {
    return <LoadingSpinner />;
  }

  return children;
}