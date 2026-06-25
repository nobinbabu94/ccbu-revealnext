"use client";

import RoleGuard from "./components/RoleGuard";
import { useState } from "react";
import SuperSet from "./components/superset/SuperSet";
import AppLayout from "@/app/components/layout/AppLayout";



export default function HomePage() {
  const embeddedId = process.env.NEXT_PUBLIC_EMBEDDED_ID


  const [getTok, setGetTok] = useState("");
  return (
    // <RoleGuard
    //   allowedRoles={[
    //     "admin",
    //     "retailer",
    //     "user",
    //   ]}
    // >
      <AppLayout>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        {/* <div
          id="superset-container"
          className="w-full h-screen"
        >
          {embeddedId !== "" && (
            <SuperSet
              EMBEDDED_ID={embeddedId}
              setGetTok={setGetTok}
            />
          )}
        </div> */}
      </AppLayout>
    // </RoleGuard>
  );
}