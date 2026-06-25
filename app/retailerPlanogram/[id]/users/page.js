"use client";

import RoleGuard from "@/app/components/RoleGuard";
import AppLayout from "@/app/components/layout/AppLayout";
import App from "next/app";
import { useState } from "react";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "Frank Miller",
      email: "frank@company.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2025-06-04 09:15 AM",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john@company.com",
      role: "Manager",
      status: "Active",
      lastLogin: "2025-06-03 04:20 PM",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      email: "sarah@company.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2025-05-30 11:00 AM",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael@company.com",
      role: "User",
      status: "Pending",
      lastLogin: "-",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </span>
        );

      case "Inactive":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            Inactive
          </span>
        );

      case "Pending":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
            Pending
          </span>
        );

      default:
        return status;
    }
  };

  return (
    //  <RoleGuard allowedRoles={["admin"]}>
    <AppLayout>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Users
          </h1>

          <p className="text-slate-500 mt-1">
            Manage users and monitor account status
          </p>
        </div>

        <button className="px-5 py-2 rounded-lg bg-[#F40009] text-white font-medium hover:bg-red-700">
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Users
          </p>
          <h2 className="text-4xl font-bold mt-2">
            24
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Active Users
          </p>
          <h2 className="text-4xl font-bold mt-2 text-emerald-600">
            18
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Inactive Users
          </p>
          <h2 className="text-4xl font-bold mt-2 text-red-600">
            4
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending Approval
          </p>
          <h2 className="text-4xl font-bold mt-2 text-yellow-600">
            2
          </h2>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex justify-between items-center">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-80 px-4 py-2 border rounded-lg"
          />

          {/* <button className="px-4 py-2 border rounded-lg hover:bg-slate-50">
            Export
          </button> */}
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-6 py-4">
                  User
                </th>

                <th className="text-left px-6 py-4">
                  Email
                </th>

                <th className="text-left px-6 py-4">
                  Role
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>
{/* 
                <th className="text-left px-6 py-4">
                  Last Login
                </th> */}

                <th className="text-left px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold">
                        {user.name.charAt(0)}
                      </div> */}

                      <span className="font-medium">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>

                  {/* <td className="px-6 py-4">
                    {user.lastLogin}
                  </td> */}

                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-between items-center">
          <div className="text-sm text-slate-600">
            Showing 1-24 of 24 users
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded">
              {"<"}
            </button>

            <span className="px-3 font-medium">
              1
            </span>

            <button className="px-3 py-1 border rounded">
              {">"}
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
    // </RoleGuard>
  );
}