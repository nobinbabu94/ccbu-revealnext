"use client";

import RoleGuard from "@/app/components/RoleGuard";
import AppLayout from "@/app/components/layout/AppLayout";
import { useState } from "react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("master");

    const [masterProductModal, setMasterProductModal] = useState(false);
    const [storeModal, setStoreModal] = useState(false);
    const [statusModal, setStatusModal] = useState(false);

    const requestData = {
        master: [
            {
                id: "MP-001",
                fileName: "Master_Product_Jan.xlsx",
                uploadedBy: "John Smith",
                status: "Completed",
                date: "2025-01-12",
            },
            {
                id: "MP-002",
                fileName: "Master_Product_Feb.xlsx",
                uploadedBy: "Sarah Lee",
                status: "Processing",
                date: "2025-01-18",
            },
        ],
        store: [
            {
                id: "ST-001",
                fileName: "Store_List.xlsx",
                uploadedBy: "David Brown",
                status: "Completed",
                date: "2025-01-15",
            },
        ],
        status: [
            {
                id: "TS-001",
                fileName: "Status_Table.xlsx",
                uploadedBy: "Mike Wilson",
                status: "Completed",
                date: "2025-01-20",
            },
        ],
    };

    return (
        //  <RoleGuard
        //   allowedRoles={[
        //     "admin",
        //     "retailer",
        //   ]}
        // >
        <AppLayout>
            Settings
        </AppLayout>
        // </RoleGuard>
    );
}