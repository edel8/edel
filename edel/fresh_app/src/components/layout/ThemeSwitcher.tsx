"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

type PaletteName = "ink" | "sand" | "charcoal" | "warm" | "emerald";

const palettes: { name: PaletteName; color: string; label: string }[] = [
  { name: "ink", color: "#111111", label: "حبر" },
  { name: "sand", color: "#E8E2D9", label: "رملي" },
  { name: "charcoal", color: "#4A4A4A", label: "فحمي" },
  { name: "warm", color: "#D4A574", label: "دافئ" },
  { name: "emerald", color: "#2D6A4F", label: "زمردي" },
];

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [palette, setPalette] = useState<PaletteName>("ink");

  useEffect(() => {
    const storedTheme = localStorage.getItem("edel-theme");
    const storedPalette = localStorage.getItem("edel-palette") as PaletteName | null;

    if (storedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
    if (storedPalette && palettes.some(p => p.name === storedPalette)) {
      setPalette(storedPalette);
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

  const changePalette = useCallback((name: PaletteName) => {
    setPalette(name);
    localStorage.setItem("edel-palette", name);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50" dir="ltr">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-16 left-0 w-52 p-3 rounded-2xl bg-white border border-[#EAEAEA] shadow-none dark:bg-[#222] dark:border-[#333]"
          >
            <p className="text-xs font-medium text-muted-foreground mb-2 px-1">
              {dark ? "داكن" : "فاتح"}
            </p>
            <button
              onClick={toggleTheme}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm mb-3",
                !dark
                  ? "bg-[#111] text-[#FFFCF5]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="flex-1 text-right">{dark ? "داكن" : "فاتح"}</span>
            </button>

            <p className="text-xs font-medium text-muted-foreground mb-2 px-1 flex items-center gap-1.5">
              <Palette className="h-3 w-3" /> الألوان
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {palettes.map((p) => (
                <button
                  key={p.name}
                  onClick={() => changePalette(p.name)}
                  className={cn(
                    "w-full aspect-square rounded-lg transition-all duration-200 border-2",
                    palette === p.name
                      ? "border-[#111]"
                      : "border-transparent hover:scale-105"
                  )}
                  style={{ backgroundColor: p.color }}
                  aria-label={p.label}
                  title={p.label}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-11 h-11 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center transition-all duration-200 hover:scale-105"
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
