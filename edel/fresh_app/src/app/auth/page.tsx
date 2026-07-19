"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRight,
  Loader2,
  Check,
  X,
  Eye,
  EyeOff,
  Github,
} from "lucide-react";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.36 12.78c.02 2.5 2.2 3.33 2.23 3.34-.02.06-.35 1.2-1.16 2.38-.7 1.02-1.42 2.03-2.56 2.05-1.12.02-1.48-.66-2.76-.66-1.27 0-1.67.64-2.72.68-1.1.04-1.94-1.1-2.65-2.13-1.44-2.08-2.54-5.88-1.06-8.45.73-1.27 2.04-2.08 3.45-2.1 1.08-.02 2.1.73 2.76.73.65 0 1.88-.89 3.17-.76.54.02 2.05.22 3.02 1.64-.08.05-1.8 1.05-1.78 3.13M14.2 4.9c.57-.69.96-1.64.85-2.6-.82.03-1.82.55-2.42 1.24-.53.6-1 1.57-.87 2.5.92.07 1.86-.46 2.44-1.14" />
    </svg>
  );
}

type Mode = "login" | "signup";

const SOCIALS = [
  { id: "google", label: "Google", icon: GoogleIcon },
  { id: "apple", label: "Apple", icon: AppleIcon },
  { id: "github", label: "GitHub", icon: Github },
];

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "", confirm: "" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; rot: number; color: string; delay: number }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { signIn, signUp, signInWithProvider } = useAuth();

  const { scrollYProgress } = useScroll({ target: leftRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 250, damping: 18 });
  const springY = useSpring(my, { stiffness: 250, damping: 18 });
  const magneticTransform = useMotionTemplate`translate(${springX}px, ${springY}px)`;

  const handleMagneticMove = (e: React.MouseEvent) => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    mx.set(relX * 0.35);
    my.set(relY * 0.5);
  };

  const handleMagneticLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const spawnRipple = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };

  const spawnConfetti = () => {
    const colors = ["#9CAF88", "#E8DCCA", "#D6E5D0", "#1A1A1A", "#F5F1E8"];
    const pieces = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -40,
      rot: Math.random() * 360,
      color: colors[i % colors.length],
      delay: Math.random() * 0.2,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 2400);
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (mode === "signup" && !form.name.trim()) next.name = "الاسم مطلوب";
    if (mode === "login") {
      if (!form.username.trim()) next.username = "اسم المستخدم مطلوب";
    } else {
      if (!form.email.trim()) next.email = "البريد الإلكتروني مطلوب";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "صيغة البريد الإلكتروني غير صحيحة";
    }
    if (!form.password) next.password = "كلمة المرور مطلوبة";
    else if (form.password.length < 8) next.password = "8 أحرف على الأقل";
    if (mode === "signup" && form.confirm !== form.password) next.confirm = "كلمتا المرور غير متطابقتين";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validate()) return;
    setIsLoading(true);
    spawnRipple({ clientX: mousePos.x + 200, clientY: mousePos.y } as React.MouseEvent);

    if (mode === "login") {
      await new Promise((r) => setTimeout(r, 800));
      if (form.username === "edel" && form.password === "edel") {
        localStorage.setItem("edel_auth", "true");
        setSuccess(true);
        spawnConfetti();
        setTimeout(() => {
          setIsLoading(false);
          setSuccess(false);
          router.push("/dashboard");
        }, 1000);
      } else {
        setErrors({ username: "بيانات الدخول غير صحيحة. استخدم edel/edel." });
        setIsLoading(false);
      }
    } else {
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
      spawnConfetti();
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(false);
        router.push("/dashboard");
      }, 1400);
    }
  };

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setErrors({});
    setMode(next);
  };

  const handleSocial = useCallback(
    async (id: string) => {
      const map: Record<string, "google" | "github" | "apple"> = {
        google: "google",
        github: "github",
        apple: "apple",
      };
      try {
        await signInWithProvider(map[id]);
      } catch {
        /* noop */
      }
    },
    [signInWithProvider]
  );

  const handlePointerMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      className="relative min-h-screen w-full overflow-hidden bg-[#FAF8F5] font-sans text-[#1A1A1A]"
    >
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.3] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* ============ LEFT 50% — PAPER & INK ============ */}
        <section ref={leftRef} className="relative hidden overflow-hidden lg:block">
          <motion.div style={{ y: imgY }} className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop')",
                filter: "sepia(0.35) saturate(1.15) contrast(1.2) brightness(1.05)",
              }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/5 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-amber-900/10" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute left-10 top-10 z-20"
          >
            <div className="flex items-center gap-3">
              <div className="h-7 w-px bg-white/50" />
              <span className="font-serif text-lg font-light tracking-[0.35em] text-white/70">
                EDEL
              </span>
            </div>
          </motion.div>

          <motion.div style={{ y: overlayY }} className="absolute inset-x-0 bottom-0 z-20 px-10 pb-14">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="mb-6 h-px w-14 bg-white/30" />
              <h1 className="font-serif text-[4rem] leading-[0.92] tracking-tight text-white sm:text-[5rem] lg:text-[6rem]">
                {"مرحباً\nبعودتك"}
              </h1>
              <div className="mt-6 h-px w-20 bg-white/20" />
              <p className="mt-5 max-w-xs font-serif text-sm font-light leading-relaxed text-white/40">
                كتاب مفتوح، صفحة جديدة
              </p>
            </motion.div>
          </motion.div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(100% 100% at 50% 0%, transparent 35%, rgba(0,0,0,0.35) 100%)",
            }}
          />
        </section>

        {/* ============ RIGHT 50% — MINIMAL FORM ============ */}
        <section className="relative flex min-h-screen items-center justify-center bg-white px-6 py-16 sm:px-12 lg:px-16">
          <div className="relative z-10 w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-10"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-gray-600"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                العودة للرئيسية
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex gap-6">
                {(["login", "signup"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={cn(
                      "relative pb-1.5 text-sm font-medium transition-colors",
                      mode === m ? "text-black" : "text-gray-300 hover:text-gray-500"
                    )}
                  >
                    {mode === m && (
                      <motion.span
                        layoutId="mode-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {m === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <form onSubmit={onSubmit} className="space-y-5" noValidate>
                    <AnimatePresence initial={false}>
                      {mode === "signup" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <UnderlineField
                            id="name"
                            label="الاسم"
                            value={form.name}
                            error={errors.name}
                            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                            autoComplete="name"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {mode === "login" ? (
                      <UnderlineField
                        id="username"
                        label="اسم المستخدم"
                        value={form.username}
                        error={errors.username}
                        onChange={(v) => setForm((f) => ({ ...f, username: v }))}
                        autoComplete="username"
                      />
                    ) : (
                      <UnderlineField
                        id="email"
                        label="البريد الإلكتروني"
                        type="email"
                        value={form.email}
                        error={errors.email}
                        onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                        autoComplete="email"
                      />
                    )}

                    <UnderlineField
                      id="password"
                      label="كلمة المرور"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      error={errors.password}
                      onChange={(v) => setForm((f) => ({ ...f, password: v }))}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                      trailing={
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="text-gray-300 transition hover:text-gray-600"
                          aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      }
                    />

                    <AnimatePresence initial={false}>
                      {mode === "signup" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <UnderlineField
                            id="confirm"
                            label="تأكيد كلمة المرور"
                            type={showConfirm ? "text" : "password"}
                            value={form.confirm}
                            error={errors.confirm}
                            onChange={(v) => setForm((f) => ({ ...f, confirm: v }))}
                            autoComplete="new-password"
                            trailing={
                              <button
                                type="button"
                                onClick={() => setShowConfirm((s) => !s)}
                                className="text-gray-300 transition hover:text-gray-600"
                                aria-label={showConfirm ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                              >
                                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            }
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {mode === "login" && (
                      <div className="flex items-center justify-end">
                        <Link href="/forgot" className="text-xs font-medium text-gray-400 transition hover:text-black">
                          نسيت كلمة المرور؟
                        </Link>
                      </div>
                    )}

                    <div className="relative pt-2">
                      <motion.button
                        ref={buttonRef}
                        type="submit"
                        onMouseMove={handleMagneticMove}
                        onMouseLeave={handleMagneticLeave}
                        onClick={spawnRipple}
                        style={{ transform: magneticTransform }}
                        disabled={isLoading}
                        className={cn(
                          "group relative flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-base font-medium text-white transition-all",
                          "bg-black hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-80"
                        )}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {isLoading ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              جاري التحميل…
                            </>
                          ) : success ? (
                            <>
                              <Check className="h-5 w-5" />
                              تم بنجاح
                            </>
                          ) : (
                            <>
                              {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                        {ripples.map((r) => (
                          <motion.span
                            key={r.id}
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 4, opacity: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="absolute h-24 w-24 rounded-full bg-white/20"
                            style={{ left: r.x - 48, top: r.y - 48 }}
                          />
                        ))}
                        {success && (
                          <motion.span
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          />
                        )}
                      </motion.button>

                      <AnimatePresence>
                        {confetti.length > 0 && (
                          <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
                            {confetti.map((c) => (
                              <motion.span
                                key={c.id}
                                initial={{ opacity: 1, x: `${c.x}%`, y: "50%", rotate: 0, scale: 1 }}
                                animate={{ opacity: 0, y: `${c.y - 60}%`, rotate: c.rot, scale: 0.4 }}
                                transition={{ duration: 1.6, delay: c.delay, ease: "easeOut" }}
                                className="absolute h-2.5 w-2.5 rounded-sm"
                                style={{ background: c.color }}
                              />
                            ))}
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>

                  <div className="my-8 flex items-center gap-4">
                    <span className="h-px flex-1 bg-gray-100" />
                    <span className="text-xs uppercase tracking-[0.15em] text-gray-300">
                      أو تابع عبر
                    </span>
                    <span className="h-px flex-1 bg-gray-100" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {SOCIALS.map((s) => (
                      <SocialButton key={s.id} {...s} onPick={handleSocial} />
                    ))}
                  </div>

                  <p className="mt-8 text-center text-xs leading-relaxed text-gray-300">
                    بالمتابعة أنت توافق على{" "}
                    <Link href="/terms" className="font-medium text-gray-500 hover:text-black">الشروط</Link>{" "}
                    و{" "}
                    <Link href="/privacy" className="font-medium text-gray-500 hover:text-black">الخصوصية</Link>
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-12 text-center"
            >
              <p className="text-xs text-gray-300">
                صمم وطور بجهد شخصي بواسطة عادل الخالدي
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

function UnderlineField({
  id,
  label,
  type = "text",
  value,
  error,
  onChange,
  trailing,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  trailing?: React.ReactNode;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const showError = error && touched;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          "block text-xs font-medium transition-colors",
          focused ? "text-black" : showError ? "text-rose-500" : "text-gray-400"
        )}
      >
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          className={cn(
            "w-full bg-transparent py-2.5 pr-8 text-base text-black outline-none transition-colors",
            "border-b-2",
            showError
              ? "border-rose-400"
              : focused
              ? "border-black"
              : "border-gray-200 hover:border-gray-300"
          )}
        />
        {trailing && (
          <div className="absolute bottom-3 right-0 flex items-center">
            {trailing}
          </div>
        )}
      </div>
      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-500"
          >
            <X className="h-3 w-3" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SocialButton({
  id,
  label,
  icon: Icon,
  onPick,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onPick?: (id: string) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 15 });
  const sy = useSpring(ry, { stiffness: 200, damping: 15 });
  const transform = useMotionTemplate`perspective(600px) rotateX(${sx}deg) rotateY(${sy}deg)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(py * -14);
    ry.set(px * 14);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform }}
      whileTap={{ scale: 0.94 }}
      onClick={() => onPick?.(id)}
      className="flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
      aria-label={`Continue with ${label}`}
    >
      <Icon className="h-5 w-5 text-gray-600" />
    </motion.button>
  );
}
