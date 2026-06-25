"use client";

import RoleGuard from "@/app/components/RoleGuard";
import AppLayout from "@/app/components/layout/AppLayout";
import { useState, useRef } from "react";

// SVG Icons
const UploadIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

const FileIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

export default function UploadsPage() {
  const [activeTab, setActiveTab] = useState("master");

  const [masterProductModal, setMasterProductModal] = useState(false);
  const [storeModal, setStoreModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [step, setStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);

  const [files, setFiles] = useState({
    product: null,
    store: null,
    sales: null,
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (key, file) => {
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [key]: file,
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        handleFileChange(current.key, file);
      }
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const skipStep = () => {
    nextStep();
  };

  const uploadSteps = [
    {
      key: "product",
      title: "Master Product Data",
      description: "Upload retailer master product data in Excel format.",
    },
    {
      key: "store",
      title: "Store Data",
      description: "Upload retailer store data in Excel format.",
    },
    {
      key: "sales",
      title: "Weekly Sales Data",
      description: "Upload retailer weekly sales data in Excel format.",
    },
  ];

  const current = uploadSteps[step - 1];

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
    <AppLayout>
      <div className="space-y-8 max-w-6xl flex flex-col gap-2">
        {/* Step Indicator */}
        <div className="mb-10 bg-white p-4 rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            {/* <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Upload Retailer Data
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Step {step} of {uploadSteps.length}
              </p>
            </div> */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Step {step} of {uploadSteps.length}
            </p>
            <span className="rounded-full bg-red-50 dark:bg-red-500/10 px-3 py-1 text-sm font-semibold text-[#F40009]">
              {Math.round((step / uploadSteps.length) * 100)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-[#F40009] transition-all duration-500"
              style={{
                width: `${(step / uploadSteps.length) * 100}%`,
              }}
            />
          </div>

          {/* Stepper */}
          <div className="flex items-start justify-between pb-4">
            {uploadSteps.map((item, idx) => {
              const completed = step > idx + 1;
              const active = step === idx + 1;

              return (
                <div
                  key={item.key}
                  className="relative flex flex-1 flex-col items-center"
                >
                  {idx !== uploadSteps.length - 1 && (
                    <div
                      className={`absolute top-5 left-1/2 h-1 w-full ${completed
                        ? "bg-[#F40009]"
                        : "bg-gray-200 dark:bg-zinc-700"
                        }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all duration-300 ${completed
                      ? "border-[#F40009] bg-[#F40009] text-white"
                      : active
                        ? "border-[#F40009] bg-white dark:bg-zinc-900 text-[#F40009] ring-4 ring-red-100 dark:ring-red-500/20"
                        : "border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-500"
                      }`}
                  >
                    {completed ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      idx + 1
                    )}
                  </div>

                  <div className="mt-3 text-center">
                    <p
                      className={`text-sm font-semibold ${active
                        ? "text-[#F40009]"
                        : "text-gray-800 dark:text-gray-200"
                        }`}
                    >
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {completed
                        ? "Completed"
                        : active
                          ? "Current Step"
                          : "Pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upload Card */}
        <div className="flex flex-col items-center rounded-lg bg-gray-50">
          {/* Upload Card */}
          <div className="w-full max-w-lg">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl px-8 py-4 text-center transition-all duration-300 ${dragActive
                ? "border-[#F40009] bg-[#F40009]/5"
                : "border-gray-300 dark:border-gray-700 hover:border-[#F40009]/50"
                }`}
            >
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-[#F40009]/10 flex items-center justify-center">
                  <FileIcon className="w-7 h-7 text-[#F40009]" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {current.title}
              </h2>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {current.description}
              </p>

              {/* Hidden Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) =>
                  handleFileChange(current.key, e.target.files?.[0] || null)
                }
                className="hidden"
              />

              {/* Upload Area */}
              <div className="mt-8 flex flex-col items-center">
                <UploadIcon
                  className={`w-10 h-10 transition ${dragActive
                    ? "text-[#F40009]"
                    : "text-gray-400 dark:text-gray-500"
                    }`}
                />

                {files[current.key] ? (
                  <>
                    <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-white break-all">
                      {files[current.key].name}
                    </p>

                    <span className="mt-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      ✓ File Selected
                    </span>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 text-sm text-[#F40009] hover:underline font-medium"
                    >
                      Choose another file
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mt-4 text-base font-medium text-gray-900 dark:text-white">
                      Drag & Drop your Excel file
                    </p>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      or
                    </p>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-3 rounded-lg bg-[#F40009] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#D60008] transition"
                    >
                      Browse Files
                    </button>

                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                      Supports <strong>.xlsx</strong> and <strong>.xls</strong> • Max
                      size 10MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 p-2">
              <button
                disabled={step === 1}
                onClick={prevStep}
                className="rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600 px-5 py-2.5 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Back
              </button>

              <div className="flex gap-3">
                {step < 3 ? (
                  <>
                    <button
                      onClick={skipStep}
                      className="rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600 px-5 py-2.5 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      Skip
                    </button>

                    <button
                      onClick={nextStep}
                      className="rounded-lg cursor-pointer bg-[#F40009] px-6 py-2.5 font-medium text-white hover:bg-[#D60008] shadow-md hover:shadow-lg transition"
                    >
                      Next Step
                    </button>
                  </>
                ) : (
                  <button className="rounded-lg bg-[#F40009] px-6 py-2.5 font-medium text-white hover:bg-[#D60008] shadow-md hover:shadow-lg transition">
                    Complete Upload
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Requests */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4">



          {/* Tabs */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-8 py-5 dark:border-zinc-80 p-4">

            <div className="flex flex-wrap gap-3">

              {[
                {
                  key: "master",
                  label: "Weekly Sales Data",
                },
                {
                  key: "store",
                  label: "Master Product",
                },
                {
                  key: "status",
                  label: "Store Data",
                },
              ].map((tab) => (

                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all

          ${activeTab === tab.key
                      ? "bg-[#F40009] text-white shadow-lg shadow-red-500/20"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                    }`}
                >
                  {tab.label}
                </button>

              ))}

            </div>

            {/* Search */}

            <div className="relative w-full max-w-xs">

              <input
                type="text"
                placeholder="Search uploads..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#F40009] focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-[#F40009]"
              />

              <svg
                className="absolute left-3 top-3.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.2-5.2m2.2-5.3a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

            </div>

          </div>

          {/* Table */}

          <div className="overflow-x-auto p-2">

            <table className="min-w-full">

              <thead className="sticky top-0 bg-gray-50 dark:bg-zinc-800">

                <tr className="border-b border-gray-200 dark:border-zinc-700">

                  <th className="px-8 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                    Request
                  </th>

                  <th className="px-8 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                    File
                  </th>

                  <th className="px-8 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                    Uploaded By
                  </th>

                  <th className="px-8 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                    Status
                  </th>

                  <th className="px-8 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {requestData[activeTab].map((row) => (

                  <tr
                    key={row.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                  >

                    {/* Request */}

                    <td className="px-8 py-5 font-semibold text-gray-900 dark:text-white">
                      {row.id}
                    </td>

                    {/* File */}

                    <td className="px-8 py-5">

                      <div className="flex items-center gap-3">

                        <div className="rounded-lg bg-red-50 p-2 dark:bg-red-500/10">

                          <FileIcon className="h-5 w-5 text-[#F40009]" />

                        </div>

                        <span className="font-medium text-gray-900 dark:text-white">
                          {row.fileName}
                        </span>

                      </div>

                    </td>

                    {/* User */}

                    <td className="px-8 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F40009] text-sm font-semibold text-white">

                          {row.uploadedBy
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}

                        </div>

                        <span className="text-gray-700 dark:text-zinc-300">

                          {row.uploadedBy}

                        </span>

                      </div>

                    </td>

                    {/* Status */}

                    <td className="px-8 py-5">

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold

                ${row.status === "Completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                          }`}
                      >

                        {row.status === "Completed" ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
                        )}

                        {row.status}

                      </span>

                    </td>

                    {/* Date */}

                    <td className="px-8 py-5 whitespace-nowrap text-gray-500 dark:text-zinc-400">

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