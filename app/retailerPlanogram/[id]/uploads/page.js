"use client";

import AppLayout from "@/app/components/layout/AppLayout";
import { useRef, useState } from "react";
// import { CalendarDays, Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";

export default function UploadsPage() {
  // ------------------------------------------------------------
  // STATES
  // ------------------------------------------------------------

  const [selectedDate, setSelectedDate] = useState("");

  const [activeTab, setActiveTab] = useState("product");

  const [files, setFiles] = useState({
    product: null,
    store: null,
    sales: null,
  });

  const inputRef = useRef(null);

  const uploadMenus = [
    {
      key: "product",
      title: "Master Product",
      description: "Upload retailer master product catalogue",
    },
    {
      key: "store",
      title: "Store Data",
      description: "Upload retailer store information",
    },
    {
      key: "sales",
      title: "Weekly Sales",
      description: "Upload weekly sales excel",
    },
  ];

  const current = uploadMenus.find((x) => x.key === activeTab);

  // ------------------------------------------------------------
  // FILE CHANGE
  // ------------------------------------------------------------

  const handleFileChange = (file) => {
    if (!file) return;

    setFiles((prev) => ({
      ...prev,
      [activeTab]: file,
    }));
  };

  // ------------------------------------------------------------
  // DRAG & DROP
  // ------------------------------------------------------------

  const [dragging, setDragging] = useState(false);

  const onDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8">


        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <label className="font-semibold mb-3 block">

            Reporting Date

          </label>

          <div className="relative w-72">

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-xl border pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />

          </div>

        </div>

        {/* ===================================================== */}
        {/* TABS */}
        {/* ===================================================== */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">

          <h2 className="font-semibold mb-5">

            Upload Datasets

          </h2>

          <div className="flex border-b border-gray-200">

            {uploadMenus.map(menu => {

              const uploaded = files[menu.key];

              return (

                <button
                  key={menu.key}
                  disabled={!selectedDate}
                  onClick={() => setActiveTab(menu.key)}
                  className={`

        px-6
        py-4
        text-sm
        font-semibold
        border-b-2
        transition

        ${activeTab === menu.key
                      ? "border-[#F40009] text-[#F40009]"
                      : "border-transparent text-gray-500 hover:text-[#F40009]"
                    }

        ${!selectedDate && "opacity-40 cursor-not-allowed"
                    }

        `}
                >

                  <div className="flex items-center gap-2">

                    {uploaded && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#16A34A"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}

                    {menu.title}

                  </div>

                </button>

              )

            })}

          </div>

        </div>

        {/* ===================================================== */}
        {/* UPLOAD PANEL */}
        {/* ===================================================== */}

        <div className="bg-white rounded-2xl shadow-sm border p-8">

          {!selectedDate ? (

            <div className="text-center py-16">

              {/* <CalendarDays
                size={48}
                className="mx-auto text-gray-400"
              /> */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="mx-auto text-gray-400"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>

              <h3 className="mt-4 text-xl font-semibold">

                Select a reporting date

              </h3>

              <p className="text-gray-500 mt-2">

                Choose a reporting date before uploading files.

              </p>

            </div>

          ) : (

            <>
              <div className="flex items-center gap-3 mb-6">

                <FileSpreadsheet
                  className="text-red-600"
                  size={28}
                />

                <div>

                  <h2 className="text-2xl font-bold">

                    {current.title}

                  </h2>

                  <p className="text-gray-500">

                    {current.description}

                  </p>

                </div>

              </div>

              <input
                ref={inputRef}
                type="file"
                accept=".xls,.xlsx"
                className="hidden"
                onChange={(e) =>
                  handleFileChange(e.target.files[0])
                }
              />

              <div
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={`rounded-2xl border-2 border-dashed p-14 transition

                ${dragging
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  }
                `}
              >
                {files[activeTab] ? (
                  <div className="text-center">

                    <div className="text-6xl mb-4">
                      ✅
                    </div>

                    <h3 className="text-xl font-semibold">
                      {files[activeTab].name}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      File selected successfully.
                    </p>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-6 rounded-lg bg-[#F40009] px-5 py-2.5 text-white hover:bg-[#d60008]"
                    >
                      Replace File
                    </button>

                  </div>
                ) : (
                  <div className="text-center">

                    <div className="flex justify-center">

                      <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center">

                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-[#F40009]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 12v8"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 16l4-4 4 4"
                          />
                        </svg>
                      </div>

                    </div>

                    <h3 className="mt-6 text-xl font-semibold">
                      Drag & Drop Excel File
                    </h3>

                    <p className="mt-2 text-gray-500">
                      Upload your {currentMenu.title.toLowerCase()} file.
                    </p>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-8 rounded-xl bg-[#F40009] px-6 py-3 font-semibold text-white hover:bg-[#d60008]"
                    >
                      Browse Files
                    </button>

                    <p className="mt-5 text-sm text-gray-500">
                      Supported formats: .xlsx & .xls
                    </p>

                  </div>
                )}

              </div>

            </>
          )}

        </div>

        {/* ================================================= */}
        {/* Upload History */}
        {/* ================================================= */}

        <div className="rounded-2xl bg-white border shadow-sm">

          <div className="border-b px-6 py-5">

            <h2 className="text-xl font-semibold">
              Upload History
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Previously uploaded datasets.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    Dataset
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    File Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    Uploaded By
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  {
                    dataset: "Master Product",
                    file: "master_products.xlsx",
                    user: "John Smith",
                    status: "Completed",
                    date: "2026-06-28",
                  },
                  {
                    dataset: "Store Data",
                    file: "store_data.xlsx",
                    user: "John Smith",
                    status: "Completed",
                    date: "2026-06-28",
                  },
                  {
                    dataset: "Weekly Sales",
                    file: "weekly_sales.xlsx",
                    user: "John Smith",
                    status: "Pending",
                    date: "-",
                  },
                ].map((row) => (

                  <tr
                    key={row.file}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-5 font-medium">
                      {row.dataset}
                    </td>

                    <td className="px-6 py-5">
                      {row.file}
                    </td>

                    <td className="px-6 py-5">
                      {row.user}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold

                        ${row.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >
                        {row.status}
                      </span>

                    </td>

                    <td className="px-6 py-5">
                      {row.date}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </AppLayout>
  );
}