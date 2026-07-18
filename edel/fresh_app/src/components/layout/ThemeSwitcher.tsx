"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("edel-theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !dark;
    setDark(next);
    if (next) {
      localStorage.setItem("edel-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("edel-theme", "light");
      document.documentElement.classList.remove("dark");
    }
    setOpen(false);
  }, [dark]);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-16 left-0 w-44 p-2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/5 shadow-lg dark:bg-[#0f0f1a]/95 dark:border-white/10"
          >
            <button
              onClick={toggleTheme}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm",
                !dark
                  ? "bg-black/5 text-foreground"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Sun className="h-4 w-4" />
              <span className="flex-1 text-right">فاتح</span>
            </button>
            <button
              onClick={toggleTheme}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm",
                dark
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
              )}
            >
              <Moon className="h-4 w-4" />
              <span className="flex-1 text-right">داكن</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-11 h-11 rounded-xl bg-white/80 backdrop-blur-2xl border border-black/5 shadow-lg dark:bg-[#0f0f1a]/80 dark:border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-105"
        aria-label="Toggle theme"
      >
        {dark ? (
          <Moon className="h-5 w-5 text-foreground" />
        ) : (
          <Sun className="h-5 w-5 text-foreground" />
        )}
      </button>
    </div>
  );
}