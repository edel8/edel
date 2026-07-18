"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0)" },
  exit: { opacity: 0, y: -20, filter: "blur(10px)" },
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== "undefined" ? window.location.pathname : "/"}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function PageTransitionWithLayout({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== "undefined" ? window.location.pathname : "/"}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const fadeTransition = { duration: 0.2 };

export function FadeTransition({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== "undefined" ? window.location.pathname : "/"}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeVariants}
        transition={fadeTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

const slideVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const slideTransition = { type: "spring", stiffness: 300, damping: 30 };

export function SlideTransition({ children, direction = "horizontal" }: { children: ReactNode; direction?: "horizontal" | "vertical" }) {
  const variants = direction === "vertical"
    ? { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -30 } }
    : slideVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== "undefined" ? window.location.pathname : "/"}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={slideTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function StaggerContainer({ children, delay = 0.1 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { transition: { staggerChildren: delay } },
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
      }}
      style={{ transitionDelay: delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export function ModalTransition({ isOpen, onClose, children, className = "" }: { isOpen: boolean; onClose: () => void; children: ReactNode; className?: string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn("fixed inset-0 z-50 flex items-center justify-center p-4", className)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="w-full max-w-lg">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function ToastTransition({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={onClose}
        className="relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}