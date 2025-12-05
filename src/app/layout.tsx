"use client";

import { useState } from "react";
import "./globals.css";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import Providers from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <Header onMenuClick={toggleSidebar} />
          <div className="flex">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <main className="flex-1 lg:ml-64 p-6 lg:p-8">
              <div className="max-w-6xl mx-auto">{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
