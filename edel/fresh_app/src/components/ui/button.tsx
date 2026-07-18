"use client";

import { forwardRef, useState, useRef, ReactNode, cloneElement, isValidElement } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, HTMLMotionProps } from "framer-motion";
import { Loader2, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================================
   BUTTON — premium with magnetic hover, ripple, loading,
   icon animation, multiple variants & sizes
   variants: primary | secondary | ghost | outline | destructive | sage | glass
   sizes: sm | md | lg | xl | icon
   ============================================================ */

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "destructive"
  | "sage"
  | "glass"
  | "charcoal";

type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  magnetic?: boolean;
  ripple?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  iconRight?: boolean;
  fullWidth?: boolean;
  success?: boolean;
  asChild?: boolean;
  children?: ReactNode;
  className?: string;
}

const variantMap: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-primary",
  secondary: "glass-button-secondary",
  ghost: "glass-button-ghost",
  outline: "glass-button-outline",
  destructive: "glass-button-destructive",
  sage: "bg-sage text-offwhite hover:bg-sage-600 shadow-[0_8px_24px_rgba(156,175,136,0.35)]",
  glass: "glass-button-primary",
  charcoal: "bg-charcoal text-offwhite hover:bg-charcoal/90 shadow-glass-strong",
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-xl gap-1.5",
  md: "px-5 py-2.5 text-base rounded-xl gap-2",
  lg: "px-7 py-3.5 text-lg rounded-2xl gap-2",
  xl: "px-9 py-4 text-xl rounded-2xl gap-2.5",
  icon: "p-3 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      magnetic = false,
      ripple = true,
      icon: Icon,
      iconRight = false,
      fullWidth = false,
      success = false,
      asChild = false,
      disabled,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    // magnetic
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const smx = useSpring(mx, { stiffness: 250, damping: 18 });
    const smy = useSpring(my, { stiffness: 250, damping: 18 });
    const magneticTransform = useMotionTemplate`translate(${smx}px, ${smy}px)`;

    const handleMagneticMove = (e: React.MouseEvent) => {
      if (!magnetic) return;
      const el = btnRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      mx.set(relX * 0.3);
      my.set(relY * 0.45);
    };

    const handleMagneticLeave = () => {
      mx.set(0);
      my.set(0);
    };

    const spawnRipple = (e: React.MouseEvent) => {
      if (!ripple) return;
      const el = btnRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      spawnRipple(e);
      onClick?.(e);
    };

    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<Record<string, unknown>>;
      return cloneElement(child, {
        className: cn(
          "group relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          variantMap[variant],
          sizeMap[size],
          fullWidth && "w-full",
          child.props.className as string | undefined,
          className
        ),
        ...props,
      } as Record<string, unknown>);
    }

    return (
      <motion.button
        ref={(node) => {
          btnRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        style={magnetic ? { transform: magneticTransform } : undefined}
        onMouseMove={handleMagneticMove}
        onMouseLeave={handleMagneticLeave}
        onClick={handleClick}
        disabled={disabled || loading}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-60",
          variantMap[variant],
          sizeMap[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {/* base subtle gradient sheen */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {/* ripples */}
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.45 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="pointer-events-none absolute h-20 w-20 rounded-full bg-white/30"
            style={{ left: r.x - 40, top: r.y - 40 }}
          />
        ))}

        {/* content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <Loader2 className="h-[1.1em] w-[1.1em] animate-spin" />
          ) : success ? (
            <Check className="h-[1.1em] w-[1.1em]" />
          ) : Icon && !iconRight ? (
            <Icon className="h-[1.1em] w-[1.1em] transition-transform duration-300 group-hover:scale-110" />
          ) : null}

          {children && <span>{children}</span>}

          {!loading && !success && Icon && iconRight ? (
            <Icon className="h-[1.1em] w-[1.1em] transition-transform duration-300 group-hover:translate-x-1" />
          ) : null}

          {!loading && !success && !Icon && iconRight ? (
            <ArrowRight className="h-[1.1em] w-[1.1em] transition-transform duration-300 group-hover:translate-x-1" />
          ) : null}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

/* ---------- ButtonGroup ---------- */
export function ButtonGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex items-center gap-3", className)}>{children}</div>;
}

/* ---------- IconButton — standalone circular ---------- */
export function IconButton({
  icon: Icon,
  variant = "ghost",
  size = "icon",
  className,
  label,
  ...props
}: {
  icon: React.ComponentType<{ className?: string }>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label: string;
} & Omit<HTMLMotionProps<"button">, "ref">) {
  return (
    <Button variant={variant} size={size} aria-label={label} className={className} icon={Icon} {...(props as any)} />
  );
}

/* ---------- LinkButton — anchor styled as button ---------- */
export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight = false,
  magnetic = false,
  className,
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ComponentType<{ className?: string }>;
  iconRight?: boolean;
  magnetic?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"a">, "ref" | "href">) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 250, damping: 18 });
  const smy = useSpring(my, { stiffness: 250, damping: 18 });
  const magneticTransform = useMotionTemplate`translate(${smx}px, ${smy}px)`;
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={magnetic ? { transform: magneticTransform } : undefined}
      onMouseMove={(e) => {
        if (!magnetic) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        my.set((e.clientY - rect.top - rect.height / 2) * 0.45);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variantMap[variant],
        sizeMap[size],
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {Icon && !iconRight && <Icon className="h-[1.1em] w-[1.1em] transition-transform duration-300 group-hover:scale-110" />}
        {children}
        {Icon && iconRight && <Icon className="h-[1.1em] w-[1.1em] transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
    </motion.a>
  );
}

/* ---------- Pill — small badge-like button ---------- */
export function Pill({
  children,
  active = false,
  className,
  ...props
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"button">, "ref">) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-sage text-offwhite shadow-[0_4px_16px_rgba(156,175,136,0.35)]"
          : "glass-subtle text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ---------- FloatingActionButton — fixed bottom-right ---------- */
export function FloatingActionButton({
  icon: Icon,
  label,
  onClick,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 250, damping: 18 });
  const smy = useSpring(my, { stiffness: 250, damping: 18 });
  const magneticTransform = useMotionTemplate`translate(${smx}px, ${smy}px)`;
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      aria-label={label}
      style={{ transform: magneticTransform }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left - rect.width / 2) * 0.35);
        my.set((e.clientY - rect.top - rect.height / 2) * 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-offwhite shadow-glass-strong",
        className
      )}
    >
      <Icon className="h-6 w-6" />
    </motion.button>
  );
}
