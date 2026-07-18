"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Brain,
  Heart,
  Gamepad2,
  MessageSquare,
  AlertTriangle,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "./DataProvider";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "CBT Playbook", href: "/cbt-playbook", icon: Brain },
  { name: "Emergency", href: "/emergency", icon: AlertTriangle },
  { name: "Vent & Connect", href: "/vent-connect", icon: MessageSquare },
  { name: "Disorders", href: "/disorders", icon: BookOpen },
  { name: "Mind Games", href: "/mind-games", icon: Gamepad2 },
  { name: "Therapy Suite", href: "/therapy-suite", icon: Heart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 glass-button p-2 rounded-xl"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: mobileOpen ? 0 : collapsed ? -80 : -280 }}
          exit={{ x: -300 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={cn(
            "fixed left-0 top-0 z-40 h-screen bg-background/80 backdrop-blur-xl border-r border-border-glass dark:border-border-glass-dark",
            "flex flex-col transition-all duration-300",
            collapsed ? "w-20" : "w-72",
            mobileOpen ? "translate-x-0" : "lg:translate-x-0"
          )}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b border-border-glass dark:border-border-glass-dark">
            {!collapsed && (
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="glass-strong p-2 rounded-xl">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <span className="font-serif text-xl font-bold text-foreground">Mindwell</span>
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "glass-button p-2 rounded-xl transition-all duration-300",
                collapsed && "rotate-180"
              )}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Main navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                    "group relative overflow-hidden",
                    isActive
                      ? "glass-strong text-primary"
                      : "text-muted-foreground hover:glass-subtle hover:text-foreground",
                    collapsed && "justify-center"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  <motion.div
                    layout
                    className={cn(
                      "flex-shrink-0 flex items-center justify-center",
                      isActive && "text-primary"
                    )}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </motion.div>
                  {!collapsed && (
                    <span className="font-medium text-sm white-space-nowrap">{item.name}</span>
                  )}
                  {isActive && !collapsed && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 3 }}
                      className="absolute left-0 top-0 bottom-0 bg-primary rounded-r-xl"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-border-glass dark:border-border-glass-dark">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="glass-strong p-2 rounded-xl">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Alex Morgan</p>
                  <p className="text-xs text-muted-foreground truncate">alex@mindwell.app</p>
                </div>
              )}
            </div>

            <div className="mt-3 space-y-2">
              <button
                onClick={toggleTheme}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                  "glass-button-secondary justify-center",
                  collapsed && "justify-center"
                )}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                {!collapsed && (
                  <span className="font-medium text-sm">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
                )}
              </button>

              <Link
                href="/profile"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                  "text-muted-foreground hover:glass-subtle hover:text-foreground",
                  collapsed && "justify-center"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium text-sm">Profile</span>}
              </Link>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      <style jsx>{`
        .white-space-nowrap {
          white-space: nowrap;
        }
      `}</style>
    </>
  );
}