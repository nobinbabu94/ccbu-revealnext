"use client";

import { useEffect, useState } from "react";
import {
  fetchUserAttributes,
  updateUserAttributes,
  updatePassword,
} from "aws-amplify/auth";

import RoleGuard from "../components/RoleGuard";
import AppLayout from "../components/layout/AppLayout";
import LoadingSpinner from "../components/loading/LoadingSpinner";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] =
    useState(false);
  const [savingPassword, setSavingPassword] =
    useState(false);

  const [form, setForm] = useState({
    given_name: "",
    family_name: "",
    email: "",
  });

  const [showPasswordForm, setShowPasswordForm] =
    useState(false);

  const [passwordForm, setPasswordForm] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const attributes =
        await fetchUserAttributes();

      setForm({
        given_name:
          attributes.given_name || "",
        family_name:
          attributes.family_name || "",
        email: attributes.email || "",
      });
    } catch (error) {
      console.error(
        "Failed to load user:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setSavingProfile(true);

      await updateUserAttributes({
        userAttributes: {
          given_name: form.given_name,
          family_name: form.family_name,
        },
      });

      alert(
        "Profile updated successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        error?.message ||
        "Failed to update profile"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    if (
      passwordForm.newPassword.length < 8
    ) {
      alert(
        "Password must be at least 8 characters"
      );
      return;
    }

    try {
      setSavingPassword(true);

      await updatePassword({
        oldPassword:
          passwordForm.currentPassword,
        newPassword:
          passwordForm.newPassword,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordForm(false);

      alert(
        "Password updated successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        error?.message ||
        "Failed to update password"
      );
    } finally {
      setSavingPassword(false);
    }
  };

  const fullName =
    `${form.given_name} ${form.family_name}`.trim();

  const initials =
    `${form.given_name?.[0] || ""}${form.family_name?.[0] || ""
      }`.toUpperCase() || "U";

  if (loading) {
    return (
      <RoleGuard
        allowedRoles={[
          "admin",
          "user",
          "retailer",
        ]}
      >
        <AppLayout>
          <LoadingSpinner />
          {/*
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="bg-white dark:bg-[#191919] rounded-2xl border border-gray-200 dark:border-[#2a2a2a] shadow-sm overflow-hidden">
              Loading profile...
            </div>
          </div>
        </AppLayout>*/}
        </AppLayout>
      </RoleGuard>
    );
  }

  return (
    // <RoleGuard
    //   allowedRoles={[
    //     "admin",
    //     "user",
    //     "retailer",
    //   ]}
    // >
      <AppLayout>
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Profile
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Manage your account
              information and security
              settings.
            </p>
          </div>

          {/* User Card */}
          <div className="bg-white dark:bg-[#191919] rounded-2xl border border-gray-200 dark:border-[#2a2a2a] shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#0066B3]/10 text-[#0066B3] flex items-center justify-center text-2xl font-bold">
                {initials}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {fullName}
                </h2>

                <p className="text-gray-500 dark:text-gray-400">
                  {form.email}
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <span className="flex items-center gap-2 text-green-600 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white dark:bg-[#191919] rounded-2xl border border-gray-200 dark:border-[#2a2a2a] shadow-sm p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile Information
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Update your personal
                information.
              </p>
            </div>

            <form
              onSubmit={
                handleProfileSubmit
              }
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={
                      form.given_name
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        given_name:
                          e.target.value,
                      })
                    }
                    className="
  w-full rounded-xl
  border border-gray-300
  dark:border-[#2a2a2a]

  bg-white
  dark:bg-[#252525]

  text-gray-900
  dark:text-white

  px-4 py-3
  focus:outline-none
  focus:ring-2
  focus:ring-[#0066B3]
"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={
                      form.family_name
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        family_name:
                          e.target.value,
                      })
                    }
                    className="
  w-full rounded-xl
  border border-gray-300
  dark:border-[#2a2a2a]

  bg-white
  dark:bg-[#252525]

  text-gray-900
  dark:text-white

  px-4 py-3
  focus:outline-none
  focus:ring-2
  focus:ring-[#0066B3]
"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="
  w-full rounded-xl
  border border-gray-300
  dark:border-[#2a2a2a]

  bg-white
  dark:bg-[#252525]

  text-gray-900
  dark:text-white

  px-4 py-3
  focus:outline-none
  focus:ring-2
  focus:ring-[#0066B3]
"
                />
              </div>

              <button
                type="submit"
                disabled={
                  savingProfile
                }
                className="px-5 py-3 bg-[#0066B3] hover:bg-[#00589C] disabled:opacity-50 text-white rounded-xl font-medium transition-colors cursor-pointer"
              >
                {savingProfile
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Security */}
          <div className="bg-white dark:bg-[#191919] rounded-2xl border border-gray-200 dark:border-[#2a2a2a] p-8 text-center dark:text-white">
            <button
              type="button"
              onClick={() =>
                setShowPasswordForm(
                  !showPasswordForm
                )
              }
              className="
  w-full flex items-center justify-between p-6
  hover:bg-gray-50 dark:hover:bg-[#252525]
  transition-colors
  cursor-pointer
"
            >
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Security
                </h2>

                <p className="text-gray-500 dark:text-gray-400">
                  Change your account
                  password.
                </p>
              </div>

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform duration-200 ${showPasswordForm
                  ? "rotate-180"
                  : ""
                  }`}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {showPasswordForm && (
              <div className="border-t border-gray-100 dark:border-[#2a2a2a] p-6">
                <form
                  onSubmit={
                    handlePasswordSubmit
                  }
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>

                    <input
                      type="password"
                      required
                      value={
                        passwordForm.currentPassword
                      }
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          currentPassword:
                            e.target.value,
                        })
                      }
                      className="
  w-full rounded-xl
  border border-gray-200 dark:border-[#2a2a2a]

  bg-gray-50 dark:bg-[#252525]

  px-4 py-3

  text-gray-500 dark:text-gray-400
"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>

                    <input
                      type="password"
                      required
                      value={
                        passwordForm.newPassword
                      }
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New
                      Password
                    </label>

                    <input
                      type="password"
                      required
                      value={
                        passwordForm.confirmPassword
                      }
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      savingPassword
                    }
                    className="px-5 py-3 bg-[#0066B3] hover:bg-[#00589C] disabled:opacity-50 text-white rounded-xl font-medium transition-colors cursor-pointer"
                  >
                    {savingPassword
                      ? "Updating..."
                      : "Update Password"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    // </RoleGuard>
  );
}