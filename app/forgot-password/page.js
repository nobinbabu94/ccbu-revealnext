"use client";

import { useState } from "react";
import {
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] =
    useState("");

  const [step, setStep] = useState(1);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const sendCode = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await resetPassword({
        username: email,
      });

      setSuccess(
        "Verification code sent to your email."
      );

      setStep(2);
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Failed to send verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetUserPassword = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });

      setSuccess(
        "Password reset successful. Redirecting to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Password reset failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ open }) =>
    open ? (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M2 12C3.5 7.5 7.5 4.5 12 4.5C16.5 4.5 20.5 7.5 22 12C20.5 16.5 16.5 19.5 12 19.5C7.5 19.5 3.5 16.5 2 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ) : (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 3L21 21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M10.6 5.1C11.05 5.03 11.51 5 12 5C16.5 5 20.5 8 22 12C21.5 13.3 20.8 14.47 19.9 15.47M6.5 6.6C4.6 8 3.1 9.9 2 12C3.5 16 7.5 19 12 19C13.6 19 15.1 18.6 16.4 17.9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.9 9.9C9.4 10.4 9 11.15 9 12C9 13.66 10.34 15 12 15C12.85 15 13.6 14.6 14.1 14.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="text-blue-600"
              >
                <path
                  d="M12 15V15.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M17 8A5 5 0 1 0 7 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 11H19V20H5V11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              Forgot Password
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {step === 1
                ? "Enter your email to receive a verification code."
                : "Enter the verification code and create a new password."}
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {step === 1 ? (
            <form
              onSubmit={sendCode}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:bg-blue-300"
              >
                {loading
                  ? "Sending..."
                  : "Send Verification Code"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={
                resetUserPassword
              }
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Verification Code
                </label>

                <input
                  type="text"
                  value={code}
                  required
                  onChange={(e) =>
                    setCode(
                      e.target.value
                    )
                  }
                  placeholder="Enter verification code"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    required
                    minLength={8}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    tabIndex={-1}
                  >
                    <EyeIcon
                      open={
                        showPassword
                      }
                    />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:bg-blue-300"
              >
                {loading
                  ? "Resetting..."
                  : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setCode("");
                  setNewPassword("");
                  setError("");
                  setSuccess("");
                  setShowPassword(false);
                }}
                className="w-full text-sm text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Use a different email
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() =>
                router.push("/login")
              }
              className="text-sm cursor-pointer text-blue-600 hover:text-blue-700 hover:underline "
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}