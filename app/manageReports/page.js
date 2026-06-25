"use client";

import AppLayout from "@/app/components/layout/AppLayout";
import RoleGuard from "../components/RoleGuard";
import ManageReports from "../components/ManageReports";



export default function Page() {
  return (
    // <RoleGuard allowedRoles={["admin"]}>
      <AppLayout>
        <ManageReports />
      </AppLayout>
    // </RoleGuard>
  );
}