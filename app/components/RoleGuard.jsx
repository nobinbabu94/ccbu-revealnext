"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

export default function RoleGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return children;
}
