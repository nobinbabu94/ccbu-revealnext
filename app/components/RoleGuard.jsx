"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";



export default function RoleGuard({
  children,
  allowedRoles = [],
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (
      allowedRoles.length &&
      !allowedRoles.includes(user.role)
    ) {
      router.replace("/unauthorized");
    }
  }, [user, loading, allowedRoles, router]);

  if (loading) return null;

  if (!user) return null;

  if (
    allowedRoles.length &&
    !allowedRoles.includes(user.role)
  ) {
    return null;
  }

  return children;
}