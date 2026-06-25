"use client";

import Link from "next/link";

export default function DataTable({ rows }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

      <div className="overflow-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-gray-50 border-b z-10">

            <tr>
              {[
                "Created",
                "Project Name",
                // "Call Points",
                // "Time Period",
                "Set Status",
                "Planograms",
                "Products",
                "Stores",
                "Status",
                "Users"
              ].map((col) => (
                <th
                  key={col}
                  className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  {col}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>

            {rows.length ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4 text-sm">
                    {row.created}
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href={`/retailerPlanogram/${row.id}/uploads`}
                      className="text-[#F40009] hover:underline font-medium"
                    >
                      {row.name}
                    </Link>
                  </td>

                  {/* <td className="px-5 py-4 text-sm">
                    {row.callPoints}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {row.timePeriod}
                  </td> */}

                  <td className="px-5 py-4 text-sm">
                    {row.setStatus}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {row.planograms}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {row.products}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {row.stores}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === "Archived"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {row.user}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="py-16 text-center text-gray-500"
                >
                  No projects found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-4 border-t bg-gray-50">

        <div className="text-sm text-gray-600">
          Showing {rows.length} records
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-white">
            Previous
          </button>

          <button className="px-3 py-1 border rounded hover:bg-white">
            Next
          </button>
        </div>

      </div>
    </div>
  );
}