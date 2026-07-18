"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { PageTransition } from "@/components/layout/PageTransition";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-72 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>
    </div>
  );
}