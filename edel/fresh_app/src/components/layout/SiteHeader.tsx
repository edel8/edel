"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الأمراض", href: "/diseases" },
  { label: "توعية", href: "/awareness" },
  { label: "علاجي", href: "/treatments" },
  { label: "طبيعي", href: "/natural-treatments" },
  { label: "ألعاب", href: "/games" },
  { label: "فضفضة", href: "/vent" },
  { label: "عنا", href: "/about" },
  { label: "تواصل", href: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
  const [lang, setLang] = useState<"ar" | "en">("ar");

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);
      if (current > lastScroll.current && current > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-shadow duration-300",
          scrolled
            ? "bg-background/70 backdrop-blur-2xl shadow-glass border-b border-border-glass"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden group-hover:bg-primary/20 transition-colors">
                <span className="text-primary font-bold text-lg">E</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-foreground leading-tight">
                  Edel
                </span>
                <span className="text-[10px] text-muted-foreground/70 leading-tight -mt-0.5">
                  عِدل — مساحة آمنة لفهم ذاتك
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-glass-white dark:hover:bg-glass-dark transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="glass-button-secondary px-3 py-1.5 text-xs font-medium rounded-xl min-w-[44px] text-center"
                aria-label="Toggle language"
              >
                {lang === "ar" ? "EN" : "AR"}
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden glass-button p-2 rounded-xl"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 z-[70] w-72 bg-background/95 backdrop-blur-2xl border-l border-border-glass shadow-glass-strong"
          >
            <div className="flex items-center justify-between p-4 border-b border-border-glass">
              <span className="font-serif text-lg font-bold">Edel</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="glass-button p-2 rounded-xl"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-glass-white dark:hover:bg-glass-dark transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
