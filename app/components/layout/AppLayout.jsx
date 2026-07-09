"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import useAppTheme from "@/app/hooks/useAppTheme";

export default function AppLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const { bgSub, textPri } = useAppTheme();

  return (
    <div className="flex flex-col h-screen">
      <Navbar onToggleSidebar={() => setIsOpen((o) => !o)} isOpen={isOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto p-4" style={{ backgroundColor: bgSub, color: textPri }}>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}