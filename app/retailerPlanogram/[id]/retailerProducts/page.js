"use client";

import AppLayout from "@/app/components/layout/AppLayout";
import { useState } from "react";

export default function RetailerProductsPage() {
  const [search, setSearch] = useState("");

  const stats = [
    {
      title: "Total Products",
      value: "518",
      trend: "+12 this week",
    },
    {
      title: "Product Key Match",
      value: "459",
      trend: "59 Unmatched",
    },
    {
      title: "Categories",
      value: "31",
      trend: "15 From Planogram",
    },
    {
      title: "Manufacturers",
      value: "44",
      trend: "31 Mapped",
    },
    {
      title: "Sub Categories",
      value: "39",
      trend: "2 Missing",
    },
  ];

  const products = [
    {
      id: 1,
      status: "Matched",
      upc: "7618332850",
      masterUpc: "7618332850",
      productName: "Sparkling Water 16oz",
      manufacturer: "Company A",
      category: "Beverages",
      subCategory: "Water",
    },
    {
      id: 2,
      status: "Matched",
      upc: "1200002721",
      masterUpc: "1200002721",
      productName: "Energy Drink",
      manufacturer: "Company B",
      category: "Energy",
      subCategory: "Can",
    },
    {
      id: 3,
      status: "Not Matched",
      upc: "9999999999",
      masterUpc: "-",
      productName: "Unknown Product",
      manufacturer: "Missing Data",
      category: "-",
      subCategory: "-",
    },
  ];

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Retailer Products
          </h1>

          <p className="text-slate-500 mt-1">
            Validate and manage retailer product mappings
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50">
            Export
          </button>

          <button className="px-5 py-2 rounded-lg bg-[#F40009] text-white hover:bg-red-700 font-medium">
            Upload Products
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
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

      {/* Summary Banner */}
      <div className="mb-6 rounded-2xl bg-blue-50 border border-blue-100 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-blue-900">
            Product Validation Summary
          </h3>

          <p className="text-sm text-blue-700 mt-1">
            459 products matched successfully. 59 products
            require review.
          </p>
        </div>

        <button className="font-medium text-blue-700 hover:text-blue-900">
          Review Unmatched →
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <select className="border border-slate-300 rounded-lg px-4 py-2">
              <option>Category</option>
              <option>Manufacturer</option>
              <option>Status</option>
            </select>

            <select className="border border-slate-300 rounded-lg px-4 py-2">
              <option>Select</option>
            </select>

            <button className="px-4 py-2 bg-slate-200 rounded-lg">
              Clear
            </button>
          </div>

          <div className="flex gap-3">
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search UPC or Product Name"
              className="w-72 px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto max-h-[600px]">
          <table className="w-full min-w-[1200px]">
            <thead className="sticky top-0 bg-slate-50 z-10">
              <tr className="border-b border-slate-200">
                <th className="text-left px-6 py-4">
                  Status
                </th>
                <th className="text-left px-6 py-4">
                  UPC
                </th>
                <th className="text-left px-6 py-4">
                  Master UPC
                </th>
                <th className="text-left px-6 py-4">
                  Product Name
                </th>
                <th className="text-left px-6 py-4">
                  Manufacturer
                </th>
                <th className="text-left px-6 py-4">
                  Category
                </th>
                <th className="text-left px-6 py-4">
                  Sub Category
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    {row.status === "Matched" ? (
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
                    {row.upc}
                  </td>

                  <td className="px-6 py-4">
                    {row.masterUpc}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {row.productName}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      {row.manufacturer}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {row.category}
                  </td>

                  <td className="px-6 py-4">
                    {row.subCategory}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
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
              Showing 1-50 of 518
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
  );
}