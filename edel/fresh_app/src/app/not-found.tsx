"use client";

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="relative flex max-w-md flex-col items-center gap-6 text-center">
        <div className="font-serif text-[8rem] font-bold leading-none tracking-tight text-primary/20">
          404
        </div>
        <div className="-mt-10">
          <h2 className="font-serif text-2xl font-semibold text-foreground">الصفحة غير موجودة</h2>
          <p className="mt-2 text-sm text-muted-foreground">الصفحة التي تبحث عنها قد تكون انتقلت أو تم حذفها.</p>
        </div>
        <Link
          href="/"
          className={cn(
            "group relative inline-flex items-center gap-2 rounded-2xl bg-foreground px-6 py-3 text-sm font-semibold text-background",
            "transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          )}
        >
          <Home className="h-4 w-4" />
          العودة إلى الرئيسية
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
