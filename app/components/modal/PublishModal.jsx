"use client";

import { createPortal } from "react-dom";
import { apiGet, apiPost } from "@/lib/api";
import { useCallback, useEffect, useRef, useState } from "react";

const PUBLISH_POLL_INTERVAL_MS = 10000;

function normalizePublishStatus(value) {
  const status = String(value ?? "").toLowerCase();
  if (status === "processing") return "processing";
  if (["completed", "complete", "success", "succeeded"].includes(status)) return "success";
  if (["failed", "failure", "error"].includes(status)) return "failed";
  return status || "unknown";
}

/**
 * Publish popup for the Weekly Sales Upload page.
 * Opens immediately on trigger, kicks off POST /retailers/{rid}/publish,
 * then polls GET /retailers/{rid}/publish/{requestid} every ~4s while the
 * popup stays open and the status is "Processing". The request id is used
 * only internally to poll — it is never shown to the user.
 */
export function PublishModal({ retailerId, theme, onClose, onSuccess }) {
  const { bg, border, textPri, textSec, accent } = theme;

  const [phase, setPhase] = useState("starting"); // starting | processing | success | failed | error
  const [error, setError] = useState(null);

  const closedRef = useRef(false);
  const pollTimerRef = useRef(null);

  const canClose = phase !== "starting";

  const stopPolling = useCallback(() => {
    closedRef.current = true;
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const handleClose = useCallback(() => {
    if (!canClose) return;
    stopPolling();
    onClose();
  }, [canClose, stopPolling, onClose]);

  // Applies a publish response to state. Returns true when the status is terminal.
  const applyResult = useCallback((payload) => {
    if (payload?.error) setError(payload.error);

    const normalized = normalizePublishStatus(payload?.status);

    if (normalized === "processing") {
      setPhase("processing");
      return false;
    }
    if (normalized === "failed") {
      setPhase("failed");
      setError(payload?.error ?? "Publish failed");
    } else {
      setPhase("success");
      if (!closedRef.current) onSuccess?.();
    }
    return true;
  }, [onSuccess]);

  const waitForNextPoll = useCallback(() => {
    return new Promise((resolve) => {
      pollTimerRef.current = setTimeout(() => {
        pollTimerRef.current = null;
        resolve();
      }, PUBLISH_POLL_INTERVAL_MS);
    });
  }, []);

  const pollStatus = useCallback(async (requestid) => {
    while (!closedRef.current) {
      await waitForNextPoll();
      if (closedRef.current) return;

      try {
        const res = await apiGet(`/retailers/${retailerId}/publish/${requestid}`);
        if (closedRef.current) return;
        const payload = res?.data ?? res;
        if (applyResult(payload)) return;
      } catch (err) {
        if (!closedRef.current) {
          setPhase("error");
          setError(err.message);
        }
        return;
      }
    }
  }, [retailerId, applyResult, waitForNextPoll]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    closedRef.current = false;

    const startPublish = async () => {
      try {
        const res = await apiPost(`/retailers/${retailerId}/publish`);
        if (closedRef.current) return;
        const payload = res?.data ?? res;
        const terminal = applyResult(payload);
        if (!terminal && payload?.requestid && !closedRef.current) pollStatus(payload.requestid);
      } catch (err) {
        if (!closedRef.current) {
          setPhase("error");
          setError(err.message);
        }
      }
    };

    startPublish();

    return () => stopPolling();
  }, [retailerId, applyResult, pollStatus, stopPolling]);

  if (typeof document === "undefined") return null;

  const isProcessing = phase === "starting" || phase === "processing";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: bg, borderColor: border }}
        className="w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: border }}>
          <h2 className="text-xl font-semibold" style={{ color: textPri }}>Publish Data</h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={!canClose}
            className="text-2xl cursor-pointer leading-none hover:opacity-60 transition disabled:cursor-not-allowed disabled:opacity-40"
            style={{ color: textSec }}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="p-6">
          {isProcessing && (
            <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 px-4 text-center">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-transparent" style={{ borderTopColor: accent }} />
              <p className="text-sm font-medium" style={{ color: textSec }}>
                {phase === "starting"
                  ? "Starting publish..."
                  : "Publishing started. Please wait while your data is being processed."}
              </p>
            </div>
          )}

          {phase === "success" && (
            <div className="flex flex-col items-center gap-4 px-4 pb-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: textPri }}>Publish completed successfully.</p>
            </div>
          )}

          {phase === "failed" && (
            <div className="flex flex-col items-center gap-4 px-4 pb-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: "#dc2626" }}>{error || "Publish failed."}</p>
            </div>
          )}

          {/* {phase === "error" && (
            <div className="flex flex-col items-center gap-4 px-4 pb-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: "#dc2626" }}>{error || "Something went wrong."}</p>
            </div>
          )} */}

          {/* {(phase === "processing" || phase === "success") && error && (
            <div className="mt-4 rounded-lg border px-4 py-3 text-sm" style={{ borderColor: border, color: "#dc2626" }}>
              {error}
            </div>
          )} */}
        </div>

        <div className="flex items-center justify-end gap-3 border-t px-6 py-4" style={{ borderColor: border }}>
          <button
            type="button"
            onClick={handleClose}
            disabled={!canClose}
            className="rounded-lg border cursor-pointer px-4 py-2 text-sm font-medium transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: border, color: textPri }}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
