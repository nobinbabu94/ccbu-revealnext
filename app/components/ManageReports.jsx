"use client";

import { useMemo, useState } from "react";
import DataTable from "./table/DataTable";

const projects = [
  {
    id: 1,
    created: "06-02-2026 3:22 AM",
    name: "Parker Kitchen",
    callPoints: "CONV RETAIL",
    timePeriod: "Spring 2026",
    setStatus: "Final",
    planograms: 571,
    products: 518,
    stores: 576,
    status: "In-Progress",
    user: 2
  },
  // {
  //   id: 2,
  //   created: "05-20-2026 11:53 PM",
  //   name: "RECAP_CARDENAS_MARKETS_SUPER_SSD_FC_SPRING_2026",
  //   callPoints: "SUPER",
  //   timePeriod: "Spring 2026",
  //   setStatus: "Final",
  //   planograms: 58,
  //   products: 283,
  //   stores: 59,
  //   status: "In-Progress",
  // },
  // {
  //   id: 3,
  //   created: "04-01-2026 8:00 AM",
  //   name: "ARCHIVED_PROJECT",
  //   callPoints: "SUPER",
  //   timePeriod: "Winter 2025",
  //   setStatus: "Final",
  //   planograms: 40,
  //   products: 100,
  //   stores: 25,
  //   status: "Archived",
  // },
];

export default function ManageReports() {
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");
  const [retailer, setRetailer] = useState("");

  const filtered = useMemo(() => {
    return projects
      .filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((p) =>
        retailer ? p.callPoints === retailer : true
      )
      .filter((p) =>
        activeTab === "active"
          ? p.status !== "Archived"
          : p.status === "Archived"
      );
  }, [search, retailer, activeTab]);

  const reload = () => {
    setSearch("");
    setRetailer("");
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

        {/* <div className="flex items-center gap-3">

          <select
            value={retailer}
            onChange={(e) => setRetailer(e.target.value)}
            className="h-10 min-w-[220px] px-3 border rounded-lg bg-white"
          >
            <option value="">Select Retailer</option>

            {Array.from(
              new Set(projects.map((p) => p.callPoints))
            ).map((cp) => (
              <option key={cp} value={cp}>
                {cp}
              </option>
            ))}
          </select>
        </div> */}

        <div className="flex items-center gap-3">

          <div className="relative">
            <input
              placeholder="Search retailer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-80 pl-10 pr-4 border rounded-lg bg-white"
            />

            <svg
              className="absolute left-3 top-3 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <button
            onClick={reload}
            className="h-10 px-4 border rounded-lg bg-white hover:bg-gray-50"
          >
            Reload
          </button>
        </div>
      </div>

      {/* Tabs */}
      {/* <div className="mb-5 border-b bg-white rounded-t-xl px-6 pt-4">

        <div className="flex gap-8">

          <button
            onClick={() => setActiveTab("active")}
            className={`pb-4 text-sm font-semibold transition ${
              activeTab === "active"
                ? "text-[#F40009] border-b-2 border-[#F40009]"
                : "text-gray-500"
            }`}
          >
            Active Projects
          </button>

          <button
            onClick={() => setActiveTab("archived")}
            className={`pb-4 text-sm font-semibold transition ${
              activeTab === "archived"
                ? "text-[#F40009] border-b-2 border-[#F40009]"
                : "text-gray-500"
            }`}
          >
            Archived Projects
          </button>
        </div>
      </div> */}

      <DataTable rows={filtered} />
    </div>
  );
}