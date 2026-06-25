"use client";

import RoleGuard from "@/app/components/RoleGuard";
import AppLayout from "@/app/components/layout/AppLayout";
import { useParams } from "next/navigation";



export default function DashboardPage() {
  const params = useParams();
  const id = params?.id || '0';

  return (
    //   <RoleGuard
    //   allowedRoles={[
    //     "admin",
    //     "retailer",
    //   ]}
    // >
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Superset</h1>
        
      </div>
    </AppLayout>
    // </RoleGuard>
  );
}
