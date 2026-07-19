"use client";

import { forwardRef, useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { Eye, EyeOff, Check, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================================
   INPUT — floating label morphs to top on focus, sage border,
   focus scale + glow, error shake, optional show/hide password,
   leading/trailing icons, success state
   ============================================================ */

type InputVariant = "glass" | "solid" | "outline" | "ghost";
type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<HTMLMotionProps<"input">, "ref" | "size"> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
  leading?: ReactNode;
  trailing?: ReactNode;
  showPasswordToggle?: boolean;
  success?: boolean;
  containerClassName?: string;
}

const variantMap: Record<InputVariant, string> = {
  glass: "glass-input",
  solid: "bg-glass-white/70 border border-border-glass backdrop-blur-xl rounded-xl px-4 py-3.5",
  outline: "bg-transparent border border-border-glass rounded-xl px-4 py-3.5",
  ghost: "bg-transparent border-0 px-2 py-3",
};

const sizeMap: Record<InputSize, string> = {
  sm: "text-sm py-2.5",
  md: "text-base py-3.5",
  lg: "text-lg py-4",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      variant = "glass",
      inputSize = "md",
      leading,
      trailing,
      showPasswordToggle = false,
      success = false,
      id,
      type = "text",
      value,
      onFocus,
      onBlur,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);
    const [show, setShow] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const floated = focused || (value !== undefined && String(value).length > 0);
    const showError = error && touched;
    const resolvedType = showPasswordToggle ? (show ? "text" : "password") : type;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setTouched(true);
      onBlur?.(e);
    };

    const shake = (node: HTMLElement | null) => {
      node?.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-7px)" },
          { transform: "translateX(7px)" },
          { transform: "translateX(-4px)" },
          { transform: "translateX(4px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 380 }
      );
    };

    const borderState = showError
      ? "border-rose-400/60"
      : success
      ? "border-emerald-400/60"
      : focused
      ? "border-sage shadow-[0_0_0_4px_rgba(156,175,136,0.15)]"
      : "border-border-glass hover:border-sage/40";

    const wrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (showError && wrapperRef.current) shake(wrapperRef.current);
    }, [showError]);

    return (
      <div className={cn("w-full", containerClassName)}>
        <div
          ref={wrapperRef}
          className={cn(
            "relative flex items-center rounded-xl border bg-glass-white/50 backdrop-blur-xl px-4 transition-all duration-300",
            sizeMap[inputSize],
            borderState,
            focused && "scale-[1.01]"
          )}
        >
          {leading && <span className="mr-2.5 flex-shrink-0 text-mist-400">{leading}</span>}

          <div className="relative flex-1">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "pointer-events-none absolute left-0 origin-left transition-all duration-300",
                  floated
                    ? "top-1.5 text-[11px] font-medium tracking-wide text-sage-700"
                    : "top-1/2 -translate-y-1/2 text-mist-400"
                )}
              >
                {label}
              </label>
            )}
            <motion.input
              ref={(node) => {
                inputRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
              }}
              id={inputId}
              type={resolvedType}
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-invalid={showError ? "true" : "false"}
              aria-describedby={showError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
              className={cn(
                "w-full bg-transparent pt-4 text-foreground outline-none placeholder-transparent",
                className
              )}
              {...props}
            />
          </div>

          {success && !showPasswordToggle && (
            <Check className="ml-2 h-4 w-4 flex-shrink-0 text-emerald-500" />
          )}

          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="ml-2 flex-shrink-0 text-mist-400 transition hover:text-charcoal"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}

          {trailing && <span className="ml-2 flex-shrink-0">{trailing}</span>}
        </div>

        <AnimatePresence>
          {showError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              id={`${inputId}-error`}
              className="mt-1.5 flex items-center gap-1.5 pl-1 text-xs text-rose-500"
              role="alert"
            >
              <AlertCircle className="h-3 w-3" /> {error}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hint && !showError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id={`${inputId}-hint`}
              className="mt-1.5 pl-1 text-xs text-muted-foreground"
            >
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";

/* ---------- Textarea ---------- */
export const Textarea = forwardRef<HTMLTextAreaElement, InputProps & { rows?: number }>(
  (
    {
      className,
      label,
      error,
      hint,
      variant = "glass",
      inputSize = "md",
      leading,
      trailing,
      id,
      value,
      onFocus,
      onBlur,
      rows = 4,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const floated = focused || (value !== undefined && String(value).length > 0);
    const showError = error && touched;

    const borderState = showError
      ? "border-rose-400/60"
      : focused
      ? "border-sage shadow-[0_0_0_4px_rgba(156,175,136,0.15)]"
      : "border-border-glass hover:border-sage/40";

    return (
      <div className={cn("w-full", containerClassName)}>
        <div
          className={cn(
            "relative flex items-start rounded-xl border bg-glass-white/50 px-4 py-3 backdrop-blur-xl transition-all duration-300",
            borderState,
            focused && "scale-[1.01]"
          )}
        >
          {leading && <span className="mr-2.5 mt-1 flex-shrink-0 text-mist-400">{leading}</span>}
          <div className="relative flex-1">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "pointer-events-none absolute left-0 origin-left transition-all duration-300",
                  floated
                    ? "top-0 text-[11px] font-medium tracking-wide text-sage-700"
                    : "top-3 text-mist-400"
                )}
              >
                {label}
              </label>
            )}
            <textarea
              ref={(node) => {
                textareaRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
              }}
              id={inputId}
              rows={rows}
              value={value}
              onFocus={(e) => {
                setFocused(true);
                onFocus?.(e as any);
              }}
              onBlur={(e) => {
                setFocused(false);
                setTouched(true);
                onBlur?.(e as any);
              }}
              className={cn("w-full resize-y bg-transparent pt-5 text-foreground outline-none", sizeMap[inputSize], className)}
              aria-invalid={showError ? "true" : "false"}
              {...props as any}
            />
          </div>
        </div>

        <AnimatePresence>
          {showError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-1.5 flex items-center gap-1.5 pl-1 text-xs text-rose-500"
              role="alert"
            >
              <X className="h-3 w-3" /> {error}
            </motion.p>
          )}
        </AnimatePresence>

        {hint && !showError && (
          <p className="mt-1.5 pl-1 text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

/* ---------- Select ---------- */
export const Select = forwardRef<HTMLSelectElement, InputProps & { options: { value: string; label: string }[] }>(
  (
    {
      className,
      label,
      error,
      hint,
      variant = "glass",
      inputSize = "md",
      leading,
      options,
      id,
      value,
      onFocus,
      onBlur,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const floated = focused || (value !== undefined && String(value).length > 0);
    const showError = error && touched;

    const borderState = showError
      ? "border-rose-400/60"
      : focused
      ? "border-sage shadow-[0_0_0_4px_rgba(156,175,136,0.15)]"
      : "border-border-glass hover:border-sage/40";

    return (
      <div className={cn("w-full", containerClassName)}>
        <div
          className={cn(
            "relative flex items-center rounded-xl border bg-glass-white/50 px-4 backdrop-blur-xl transition-all duration-300",
            sizeMap[inputSize],
            borderState,
            focused && "scale-[1.01]"
          )}
        >
          {leading && <span className="mr-2.5 flex-shrink-0 text-mist-400">{leading}</span>}
          <div className="relative flex-1">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "pointer-events-none absolute left-0 origin-left transition-all duration-300",
                  floated ? "top-1.5 text-[11px] font-medium tracking-wide text-sage-700" : "top-1/2 -translate-y-1/2 text-mist-400"
                )}
              >
                {label}
              </label>
            )}
            <select
              ref={ref}
              id={inputId}
              value={value}
              onFocus={(e) => {
                setFocused(true);
                onFocus?.(e as any);
              }}
              onBlur={(e) => {
                setFocused(false);
                setTouched(true);
                onBlur?.(e as any);
              }}
              className={cn("w-full bg-transparent pt-4 text-foreground outline-none", className)}
              aria-invalid={showError ? "true" : "false"}
              {...props as any}
            >
              {options.map((o) => (
                <option key={o.value} value={o.value} className="bg-offwhite text-charcoal">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {hint && !showError && <p className="mt-1.5 pl-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

/* ---------- InputGroup ---------- */
export function InputGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex gap-2", className)}>{children}</div>;
}

/* ---------- InputAddon ---------- */
export function InputAddon({
  children,
  position = "left",
  className = "",
}: {
  children: ReactNode;
  position?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass-subtle flex items-center px-3 py-2 text-sm text-muted-foreground",
        position === "left" ? "rounded-r-none" : "rounded-l-none",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------- SearchInput ---------- */
export function SearchInput({
  className,
  placeholder = "Search…",
  ...props
}: InputProps) {
  return (
    <Input
      variant="glass"
      leading={<SearchIcon />}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
