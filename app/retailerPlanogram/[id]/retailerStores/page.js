"use client";

import RoleGuard from "@/app/components/RoleGuard";
import AppLayout from "@/app/components/layout/AppLayout";
import { useState } from "react";

export default function RetailerStoresPage() {
  const [search, setSearch] = useState("");

  const stats = [
    {
      title: "Total Stores",
      value: "245",
      trend: "+8 this week",
    },
    {
      title: "Store Match",
      value: "220",
      trend: "25 Unmatched",
    },
    {
      title: "Regions",
      value: "12",
      trend: "3 Missing",
    },
    {
      title: "Districts",
      value: "34",
      trend: "2 Missing",
    },
    {
      title: "Channels",
      value: "8",
      trend: "Fully Mapped",
    },
  ];

  const stores = [
    {
      id: 1,
      status: "Matched",
      storeId: "ST1001",
      storeName: "Atlanta Downtown",
      region: "South",
      district: "Atlanta",
      channel: "Grocery",
      address: "123 Main Street",
    },
    {
      id: 2,
      status: "Matched",
      storeId: "ST1002",
      storeName: "Peachtree Market",
      region: "South",
      district: "Atlanta",
      channel: "Convenience",
      address: "456 Peachtree Rd",
    },
    {
      id: 3,
      status: "Not Matched",
      storeId: "ST1003",
      storeName: "Unknown Store",
      region: "-",
      district: "-",
      channel: "-",
      address: "-",
    },
    {
      id: 4,
      status: "Matched",
      storeId: "ST1004",
      storeName: "North Plaza",
      region: "North",
      district: "Charlotte",
      channel: "Hyper Market",
      address: "101 North Ave",
    },
    {
      id: 5,
      status: "Matched",
      storeId: "ST1005",
      storeName: "City Express",
      region: "West",
      district: "Dallas",
      channel: "Convenience",
      address: "550 City Road",
    },
  ];

  return (
    //     <RoleGuard
    //   allowedRoles={[
    //     "admin",
    //     "retailer",
    //   ]}
    // >
    <AppLayout>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Retailer Stores
          </h1>

          <p className="text-slate-500 mt-1">
            Validate and manage retailer store mappings
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50">
            Export
          </button>

          <button className="px-5 py-2 rounded-lg bg-[#F40009] text-white font-medium hover:bg-red-700">
            Upload Stores
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5"
          >
            <p className="text-sm text-slate-500">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold text-slate-900 mt-2">
              {item.value}
            </h2>

            <p className="text-xs text-emerald-600 mt-3">
              {item.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mb-6 rounded-2xl bg-blue-50 border border-blue-100 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-blue-900">
            Store Validation Summary
          </h3>

          <p className="text-sm text-blue-700 mt-1">
            220 stores matched successfully. 25 stores require review.
          </p>
        </div>

        <button className="font-medium text-blue-700 hover:text-blue-900">
          Review Unmatched →
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <select className="border border-slate-300 rounded-lg px-4 py-2">
              <option>Region</option>
              <option>District</option>
              <option>Status</option>
              <option>Channel</option>
            </select>

            <select className="border border-slate-300 rounded-lg px-4 py-2">
              <option>Select</option>
            </select>

            <button className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300">
              Clear
            </button>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Store ID or Store Name"
            className="w-80 px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>

        {/* Table */}
        <div className="overflow-auto max-h-[600px]">
          <table className="w-full min-w-[1400px]">
            <thead className="sticky top-0 bg-slate-50 z-10">
              <tr className="border-b border-slate-200">
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Store ID</th>
                <th className="text-left px-6 py-4">Store Name</th>
                <th className="text-left px-6 py-4">Region</th>
                <th className="text-left px-6 py-4">District</th>
                <th className="text-left px-6 py-4">Channel</th>
                <th className="text-left px-6 py-4">Address</th>
              </tr>
            </thead>

            <tbody>
              {stores.map((store) => (
                <tr
                  key={store.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    {store.status === "Matched" ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ Matched
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                        ✕ Not Matched
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-blue-600 font-medium">
                    {store.storeId}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {store.storeName}
                  </td>

                  <td className="px-6 py-4">
                    {store.region}
                  </td>

                  <td className="px-6 py-4">
                    {store.district}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      {store.channel}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {store.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="border-t border-slate-200 p-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">
              Rows per page
            </span>

            <select className="border border-slate-300 rounded px-3 py-1">
              <option>50</option>
              <option>100</option>
            </select>

            <span className="text-sm text-slate-600">
              Showing 1-50 of 245
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded">
              {"<<"}
            </button>

            <button className="px-3 py-1 border rounded">
              {"<"}
            </button>

            <span className="px-3 font-medium">
              1
            </span>

            <button className="px-3 py-1 border rounded">
              {">"}
            </button>

            <button className="px-3 py-1 border rounded">
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
    // </RoleGuard>
  );
}