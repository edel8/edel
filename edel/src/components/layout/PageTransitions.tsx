"use client";

import { motion, AnimatePresence, type Variants, type Transition, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

const pageTransition = {
  type: "spring",
  damping: 25,
  stiffness: 300,
  duration: 0.4,
};

export function PageTransition({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const modalVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContentVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

export function ModalTransition({ children, isOpen, onClose, className = "" }: { children: ReactNode; isOpen: boolean; onClose: () => void; className?: string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalVariants}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            variants={modalContentVariants}
            className="glass-strong rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ModalOverlay({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={modalVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ModalContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={modalContentVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const sidebarVariants = {
  initial: { x: -300 },
  animate: { x: 0 },
  exit: { x: -300 },
};

export function SidebarTransition({ children, isOpen, className = "" }: { children: ReactNode; isOpen: boolean; className?: string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial="initial"
          animate="animate"
          exit="exit"
          variants={sidebarVariants}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={className}
        >
          {children}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

const toastVariants = {
  initial: { opacity: 0, x: 100, scale: 0.9 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 100, scale: 0.9 },
};

export function ToastTransition({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={toastVariants}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function StaggerContainer({ children, className = "", ...props }: { children: ReactNode; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", ...props }: { children: ReactNode; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={staggerItem}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function FadeTransition({ children, className = "", delay = 0, ...props }: { children: ReactNode; className?: string; delay?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeVariants}
      transition={{ duration: 0.2, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const slideVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export function SlideTransition({ children, className = "", direction = "left", ...props }: { children: ReactNode; className?: string; direction?: "left" | "right" | "up" | "down" } & HTMLMotionProps<"div">) {
  const variants = {
    left: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 } },
    right: { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } },
    up: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } },
    down: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 } },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[direction]}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionComponent<Props extends Record<string, unknown>>(
  Component: React.ComponentType<Props>,
  variants: Variants = {},
  transition: Transition = {}
) {
  return motion(Component);
}

export function createMotionComponent<T extends React.ElementType>(
  component: T,
  variants?: Variants,
  transition?: Transition
) {
  return motion(component as string);
}