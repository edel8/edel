"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4">
      <div className="relative flex max-w-md flex-col items-center gap-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">عذراً، حدث خطأ غير متوقع</h2>
          <p className="mt-2 text-sm text-muted-foreground">نحن نعمل على حل المشكلة. يرجى المحاولة مرة أخرى.</p>
        </div>
        <button
          onClick={reset}
          className={cn(
            "group relative inline-flex items-center gap-2 rounded-2xl bg-foreground px-6 py-3 text-sm font-semibold text-background",
            "transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          )}
        >
          <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
