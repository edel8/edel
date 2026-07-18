"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

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
  const { locale, setLocale, direction } = useI18n();

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
    const next = locale === "ar" ? "en" : "ar";
    setLocale(next);
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#FFFCF5]/90 border-b border-[#EAEAEA]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-full border border-[#EAEAEA] flex items-center justify-center bg-white">
                <span className="text-[#111] font-bold text-lg">E</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-[#111] leading-tight">
                  Edel
                </span>
                <span className="text-[10px] text-[#6B6B6B] leading-tight -mt-0.5">
                  مساحة آمنة لفهم ذاتك
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-[#6B6B6B] hover:text-[#111] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="paper-btn-outline px-3 py-1.5 text-xs font-medium min-w-[44px] text-center"
                aria-label="Toggle language"
              >
                {locale === "ar" ? "EN" : "AR"}
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden paper-btn-outline p-2"
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
            className="fixed inset-0 z-[60] bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: direction === "rtl" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: direction === "rtl" ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed top-0 bottom-0 z-[70] w-72 bg-[#FFFCF5] border-l border-[#EAEAEA]",
              direction === "rtl" ? "left-0 border-l" : "right-0 border-r"
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-[#EAEAEA]">
              <span className="font-serif text-lg font-bold">Edel</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="paper-btn-outline p-2"
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
                  className="block px-4 py-3 text-sm font-medium text-[#6B6B6B] hover:text-[#111] rounded-xl hover:bg-[#F8F5F0] transition-all"
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
