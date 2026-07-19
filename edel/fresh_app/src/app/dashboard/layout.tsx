"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between border-b border-[#EAEAEA] py-4">
          <Link href="/" className="font-serif text-xl font-bold text-[#111]">Edel</Link>
          <Link href="/" className="text-sm text-[#6B6B6B] hover:text-[#111] transition-colors">العودة للرئيسية</Link>
        </nav>
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
