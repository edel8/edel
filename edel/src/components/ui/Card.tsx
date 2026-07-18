"use client";

import { forwardRef, useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/* ============================================================
   CARD — premium glassmorphism with 3D tilt + glow variants
   variants: default | strong | subtle | interactive | outline
   padding: none | sm | md | lg | xl
   ============================================================ */

type CardVariant = "default" | "strong" | "subtle" | "interactive" | "outline" | "ghost";
type CardPadding = "none" | "sm" | "md" | "lg" | "xl";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: CardVariant;
  hover?: boolean;
  padding?: CardPadding;
  children?: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  tilt?: boolean;
  tiltStrength?: number;
  spotlight?: boolean;
}

const paddingMap: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

const variantMap: Record<CardVariant, string> = {
  default: "glass-card",
  strong: "glass-card-strong",
  subtle: "glass-subtle rounded-2xl",
  interactive: "glass-card glass-card-hover cursor-pointer",
  outline: "rounded-2xl border border-border-glass bg-transparent backdrop-blur-xl",
  ghost: "rounded-2xl bg-transparent",
};

const hoverMap: Partial<Record<CardVariant, string>> = {
  default: "glass-card-hover",
  strong: "glass-card-strong-hover",
  subtle: "hover:glass-strong hover:-translate-y-1 hover:shadow-glass-hover",
  outline: "hover:border-sage/40 hover:bg-glass-white/30 hover:-translate-y-1",
  ghost: "hover:bg-glass-white/20",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hover = false,
      padding = "md",
      glowOnHover = false,
      tilt = false,
      tiltStrength = 8,
      spotlight = false,
      children,
      onMouseMove,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const [spot, setSpot] = useState({ x: 50, y: 50 });

    // 3D tilt motion values
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 220, damping: 18 });
    const sry = useSpring(ry, { stiffness: 220, damping: 18 });
    const tiltTransform = useMotionTemplate`perspective(900px) rotateX(${srx}deg) rotateY(${sry}deg)`;

    const handleTilt = (e: React.MouseEvent) => {
      if (!tilt) return;
      const el = localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rx.set(py * -tiltStrength);
      ry.set(px * tiltStrength);
      if (spotlight) setSpot({ x: px * 100 + 50, y: py * 100 + 50 });
    };

    const resetTilt = () => {
      if (!tilt) return;
      rx.set(0);
      ry.set(0);
    };

    return (
      <motion.div
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        onMouseMove={(e) => {
          handleTilt(e);
          onMouseMove?.(e);
        }}
        onMouseLeave={resetTilt}
        style={tilt ? { transform: tiltTransform } : undefined}
        className={cn(
          variantMap[variant],
          hover && hoverMap[variant],
          paddingMap[padding],
          glowOnHover && "transition-shadow duration-500 hover:shadow-glow-primary",
          className
        )}
        {...props}
      >
        {spotlight && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            animate={{ background: `radial-gradient(280px circle at ${spot.x}% ${spot.y}%, rgba(156,175,136,0.18), transparent 60%)` }}
          />
        )}
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

/* ---------- CardHeader ---------- */
export const CardHeader = forwardRef<HTMLDivElement, HTMLMotionProps<"div"> & { className?: string; children?: ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <motion.div ref={ref} className={cn("mb-4 flex flex-col gap-1", className)} {...props}>
      {children}
    </motion.div>
  )
);
CardHeader.displayName = "CardHeader";

/* ---------- CardTitle ---------- */
export const CardTitle = forwardRef<HTMLHeadingElement, HTMLMotionProps<"h3"> & { className?: string; children?: ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <motion.h3 ref={ref} className={cn("font-serif text-xl font-semibold tracking-tight text-foreground", className)} {...props}>
      {children}
    </motion.h3>
  )
);
CardTitle.displayName = "CardTitle";

/* ---------- CardDescription ---------- */
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLMotionProps<"p"> & { className?: string; children?: ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <motion.p ref={ref} className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props}>
      {children}
    </motion.p>
  )
);
CardDescription.displayName = "CardDescription";

/* ---------- CardContent ---------- */
export const CardContent = forwardRef<HTMLDivElement, HTMLMotionProps<"div"> & { className?: string; children?: ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <motion.div ref={ref} className={cn("", className)} {...props}>
      {children}
    </motion.div>
  )
);
CardContent.displayName = "CardContent";

/* ---------- CardFooter ---------- */
export const CardFooter = forwardRef<HTMLDivElement, HTMLMotionProps<"div"> & { className?: string; children?: ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <motion.div ref={ref} className={cn("mt-5 flex items-center gap-3", className)} {...props}>
      {children}
    </motion.div>
  )
);
CardFooter.displayName = "CardFooter";

/* ---------- CardGrid ---------- */
export function CardGrid({
  className,
  columns = 3,
  gap = "gap-6",
  children,
  ...props
}: HTMLMotionProps<"div"> & { columns?: 1 | 2 | 3 | 4; gap?: string; children?: ReactNode }) {
  const colClasses = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };
  return (
    <motion.div className={cn("grid", colClasses[columns], gap, className)} {...props}>
      {children}
    </motion.div>
  );
}

/* ---------- GlassCard (standalone interactive) ---------- */
export function GlassCard({
  className,
  children,
  tilt = true,
  glow = true,
  ...props
}: HTMLMotionProps<"div"> & { tilt?: boolean; glow?: boolean; children?: ReactNode }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${srx}deg) rotateY(${sry}deg)`;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!tilt) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rx.set(py * -10);
        ry.set(px * 10);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={tilt ? { transform } : undefined}
      whileHover={glow ? { y: -6, boxShadow: "0 30px 70px rgba(31,38,135,0.18)" } : { y: -6 }}
      className={cn("glass-strong rounded-2xl p-6", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ---------- FeatureCard — icon + title + description with staggered float ---------- */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index?: number;
  className?: string;
}) {
  return (
    <Card variant="interactive" tilt glowOnHover className={cn("group relative overflow-hidden", className)}>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sage/10 blur-2xl transition-all duration-500 group-hover:bg-sage/25" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        className="relative"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/15 text-sage-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-sage/25">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </motion.div>
    </Card>
  );
}

/* ---------- StatCard — big number with trend ---------- */
export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendUp = true,
  color = "text-sage-600",
  index = 0,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  trendUp?: boolean;
  color?: string;
  index?: number;
}) {
  return (
    <Card variant="default" hover padding="md">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06, duration: 0.45 }}
        className="flex items-start justify-between"
      >
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 font-serif text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={cn("mt-1 text-sm font-medium", trendUp ? "text-emerald-500" : "text-rose-500")}>
              {trend}
            </p>
          )}
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-glass-white", color)}>
          <Icon className="h-5 w-5" />
        </div>
      </motion.div>
    </Card>
  );
}

/* ---------- ProfileCard — avatar + name + meta ---------- */
export function ProfileCard({
  name,
  role,
  avatar,
  meta,
  className,
}: {
  name: string;
  role: string;
  avatar?: string;
  meta?: string;
  className?: string;
}) {
  return (
    <Card variant="strong" padding="md" className={cn("flex items-center gap-4", className)}>
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-sage/20 text-lg font-semibold text-sage-700">
        {avatar ? <img src={avatar} alt={name} className="h-full w-full object-cover" /> : name[0]}
      </div>
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{role}</p>
        {meta && <p className="mt-0.5 truncate text-xs text-sage-600">{meta}</p>}
      </div>
    </Card>
  );
}

/* ---------- BentoCard — gapless bento grid cell ---------- */
export function BentoCard({
  children,
  className,
  span = "col-span-1 row-span-1",
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  span?: string;
  tilt?: boolean;
}) {
  return (
    <Card
      variant="default"
      tilt={tilt}
      glowOnHover
      padding="lg"
      className={cn("relative overflow-hidden", span, className)}
    >
      {children}
    </Card>
  );
}
