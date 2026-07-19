"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

type PaletteName = "ink" | "sand" | "charcoal" | "warm" | "emerald";

const palettes: { name: PaletteName; color: string; label: string }[] = [
  { name: "ink", color: "#111111", label: "حبر" },
  { name: "sand", color: "#8B7355", label: "رملي" },
  { name: "charcoal", color: "#4A4A4A", label: "فحمي" },
  { name: "warm", color: "#C4956A", label: "دافئ" },
  { name: "emerald", color: "#2D6A4F", label: "زمردي" },
];

const paletteColors: Record<PaletteName, Record<string, string>> = {
  ink: {
    "--bg": "#FFFCF5", "--fg": "#111111",
    "--card": "#FFFFFF", "--card-fg": "#111111",
    "--primary": "#111111", "--primary-fg": "#FFFCF5",
    "--secondary": "#F8F5F0", "--secondary-fg": "#111111",
    "--muted": "#F8F5F0", "--muted-fg": "#6B6B6B",
    "--accent": "#E8E2D9", "--accent-fg": "#111111",
    "--border": "#EAEAEA",
  },
  sand: {
    "--bg": "#F5F1E8", "--fg": "#1A1A1A",
    "--card": "#FAF6EF", "--card-fg": "#1A1A1A",
    "--primary": "#8B7355", "--primary-fg": "#F5F1E8",
    "--secondary": "#EDE8DD", "--secondary-fg": "#1A1A1A",
    "--muted": "#EDE8DD", "--muted-fg": "#7A7060",
    "--accent": "#E0D8C8", "--accent-fg": "#1A1A1A",
    "--border": "#D8D0C0",
  },
  charcoal: {
    "--bg": "#F0F0F0", "--fg": "#1E1E1E",
    "--card": "#FFFFFF", "--card-fg": "#1E1E1E",
    "--primary": "#4A4A4A", "--primary-fg": "#FFFFFF",
    "--secondary": "#E8E8E8", "--secondary-fg": "#1E1E1E",
    "--muted": "#E8E8E8", "--muted-fg": "#7A7A7A",
    "--accent": "#D4D4D4", "--accent-fg": "#1E1E1E",
    "--border": "#C8C8C8",
  },
  warm: {
    "--bg": "#FFF8F0", "--fg": "#1A1410",
    "--card": "#FFFCF7", "--card-fg": "#1A1410",
    "--primary": "#C4956A", "--primary-fg": "#FFF8F0",
    "--secondary": "#F5EDE0", "--secondary-fg": "#1A1410",
    "--muted": "#F5EDE0", "--muted-fg": "#8A7A6A",
    "--accent": "#E8DCCC", "--accent-fg": "#1A1410",
    "--border": "#DCCCB8",
  },
  emerald: {
    "--bg": "#F4F9F5", "--fg": "#0F1F18",
    "--card": "#FAFDFB", "--card-fg": "#0F1F18",
    "--primary": "#2D6A4F", "--primary-fg": "#F4F9F5",
    "--secondary": "#E4F0E8", "--secondary-fg": "#0F1F18",
    "--muted": "#E4F0E8", "--muted-fg": "#5A7A6A",
    "--accent": "#C8DCD0", "--accent-fg": "#0F1F18",
    "--border": "#B8CCC0",
  },
};

function applyPalette(name: PaletteName) {
  const colors = paletteColors[name];
  const root = document.documentElement;
  for (const [key, value] of Object.entries(colors)) {
    root.style.setProperty(key, value);
  }
  localStorage.setItem("edel-palette", name);
}

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
      applyPalette(storedPalette);
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
    applyPalette(name);
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
            className="absolute bottom-16 left-0 w-52 p-3 rounded-2xl shadow-none" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
          >
            <p className="text-xs font-medium text-muted-foreground mb-2 px-1">
              {dark ? "داكن" : "فاتح"}
            </p>
            <button
              onClick={toggleTheme}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm mb-3",
                !dark
                  ? "text-[#FFFCF5]"
                  : "text-muted-foreground hover:text-foreground",
                  !dark && { backgroundColor: "var(--primary)" }
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
                        ? "border-foreground"
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
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
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
