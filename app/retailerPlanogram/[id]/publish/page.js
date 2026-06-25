"use client";

import RoleGuard from "@/app/components/RoleGuard";
import AppLayout from "@/app/components/layout/AppLayout";
import { useState } from "react";


export default function PublishPage() {
  const [requests] = useState([
    {
      id: 1,
      requestName: "Retailer Products Validation",
      requestedBy: "Frank",
      requestDate: "2025-06-04",
      status: "Pending",
    },
    {
      id: 2,
      requestName: "Retailer Stores Validation",
      requestedBy: "Admin",
      requestDate: "2025-06-03",
      status: "Published",
    },
    {
      id: 3,
      requestName: "Weekly Sales Upload",
      requestedBy: "John",
      requestDate: "2025-06-02",
      status: "Failed",
    },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Published
          </span>
        );

      case "Pending":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            Pending
          </span>
        );

      case "Failed":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            Failed
          </span>
        );

      default:
        return status;
    }
  };

  const handlePublish = () => {
    alert("Publish triggered");
  };

  return (
    //  <RoleGuard
    //   allowedRoles={[
    //     "admin",
    //     "retailer",
    //   ]}
    // >
    <AppLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Publish
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage publish requests and monitor status.
          </p>
        </div>

        <button
          onClick={handlePublish}
          className="bg-[#F40009] hover:bg-red-700 text-white px-5 py-2 rounded-md font-medium transition-colors"
        >
          Publish
        </button>
      </div>

      {/* Request Status Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Request Status
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                  Request ID
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                  Request Name
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                  Requested By
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                  Request Date
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {request.id}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {request.requestName}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {request.requestedBy}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {request.requestDate}
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(request.status)}
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No publish requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
    // </RoleGuard>
  );
}