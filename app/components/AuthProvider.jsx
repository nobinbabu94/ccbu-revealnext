"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { usePathname } from "next/navigation";

import {
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession,
  signIn,
  signOut,
  confirmSignIn,
} from "aws-amplify/auth";
import { initAmplify } from "./amplifyConfig";

// Configure Amplify at module load time so it's ready before any auth call.
initAmplify();

const AuthContext = createContext(null);

const PUBLIC_ROUTES = [
  "/login",
  "/forgot-password",
];

export function AuthProvider({ children }) {
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const buildUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      return {
        username: currentUser.username,
        email: attributes.email || "",
        given_name: attributes.given_name || "",
        family_name: attributes.family_name || "",
      };
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const userData = await buildUser();
      setUser(userData);
      setLoading(false);
    };

    loadUser();
  }, [pathname]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await fetchAuthSession({ forceRefresh: true });
      } catch (err) {
        console.error("Session refresh failed", err);
        try {
          await signOut();
        } catch {}
        setUser(null);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const login = async ({ username, password }) => {
    const output = await signIn({ username, password });

    if (output.nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED") {
      // Signal to the login page that a new password is required.
      return { requiresNewPassword: true };
    }

    const userData = await buildUser();

    if (!userData) {
      throw new Error("Sign-in succeeded but could not retrieve user profile. Please try again.");
    }

    setUser(userData);
    return userData;
  };

  const completeNewPassword = async (newPassword) => {
    await confirmSignIn({ challengeResponse: newPassword });

    const userData = await buildUser();

    if (!userData) {
      throw new Error("Password updated but could not retrieve user profile. Please try again.");
    }

    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        completeNewPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
