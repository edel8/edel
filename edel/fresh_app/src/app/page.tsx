"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  Leaf,
  Brain,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  Activity,
  Moon,
  Sun,
  Quote,
  Star,
  Check,
  Play,
  Feather,
  Waves,
  Compass,
  Flower2,
  Wind,
  ChevronRight,
  Globe,
  Lock,
  Smile,
  BookOpen,
  Gamepad2,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, LinkButton, IconButton } from "@/components/ui/button";
import { Card, FeatureCard, StatCard, BentoCard } from "@/components/ui/card";

/* ============================================================
   MINDWELL — LANDING MASTERPIECE
   6 sections, each a different composition anchor:
   S1 Hero: bottom-left over full-bleed image + scrubbing reveal
   S2 Trust: infinite marquee strip
   S3 Features: gapless bento grid, 3D hover + parallax
   S4 How it works: off-grid editorial pinned narrative
   S5 Testimonials: diagonal staggered square masonry
   S6 Final CTA: color-blocked diptych + radial vignette
   ============================================================ */

const EASE = [0.34, 1.56, 0.64, 1] as const;

const TRUST_LOGOS = [
  "Stanford Wellness", "Mindful Med", "Calm Clinic", "Harvard MIND", "Serenity Lab", "Northwell Care", "Lumen Health", "Aura Institute",
];

const FEATURES = [
  { icon: Brain, title: "CBT Playbook", desc: "Reframe anxious thoughts with guided cognitive restructuring, one gentle step at a time.", span: "md:col-span-2", tone: "from-sage/20 to-transparent" },
  { icon: Heart, title: "Mood & Energy", desc: "Track the tides of your inner weather without judgment.", span: "md:col-span-1", tone: "from-rose-300/20 to-transparent" },
  { icon: Gamepad2, title: "Mind Games", desc: "Playful cognitive training disguised as calm.", span: "md:col-span-1", tone: "from-amber-300/20 to-transparent" },
  { icon: MessageSquare, title: "Vent & Connect", desc: "A quiet room to be heard, held, and understood by others walking the same path.", span: "md:col-span-2", tone: "from-sage/20 to-transparent" },
  { icon: AlertTriangle, title: "Crisis Support", desc: "Always-available lifelines when the dark feels too close.", span: "md:col-span-1", tone: "from-rose-300/20 to-transparent" },
  { icon: BookOpen, title: "Learning Library", desc: "Understand anxiety, depression, and healing through gentle, expert-made guides.", span: "md:col-span-2", tone: "from-mist-300/20 to-transparent" },
];

const STEPS = [
  { n: "01", title: "Arrive", desc: "Tell us a little about how you've been feeling. No diagnosis, no pressure — just a starting point.", icon: Compass },
  { n: "02", title: "Breathe", desc: "We craft a daily ritual of micro-practices tuned to your energy, your season, your pace.", icon: Wind },
  { n: "03", title: "Heal", desc: "Through CBT, journaling, and community, small shifts compound into lasting calm.", icon: Flower2 },
  { n: "04", title: "Grow", desc: "Watch your inner landscape soften. Return to yourself, again and again.", icon: Sprout },
];

const TESTIMONIALS = [
  { name: "Maya R.", role: "Member · 8mo", quote: "I finally have a calm place that understands the quiet battles I never say out loud.", rating: 5, rotate: -2 },
  { name: "Jonah K.", role: "Member · 1yr", quote: "The breathing rituals changed how I meet my mornings. I'm softer with myself now.", rating: 5, rotate: 1.5 },
  { name: "Priya S.", role: "Member · 3mo", quote: "It feels less like an app and more like a friend who never judges.", rating: 5, rotate: -1.5 },
  { name: "Theo M.", role: "Member · 6mo", quote: "The CBT playbook helped me catch the thoughts that used to spiral me for days.", rating: 5, rotate: 2 },
  { name: "Lena B.", role: "Member · 2yr", quote: "Two years of steady, gentle progress. I didn't think this was possible for me.", rating: 5, rotate: -2.5 },
  { name: "Sam K.", role: "Member · 4mo", quote: "The community reminded me I'm not the only one. That changed everything.", rating: 5, rotate: 1 },
];

const STATS = [
  { label: "Members held", value: "240k+", icon: Users, trend: "growing", trendUp: true },
  { label: "Calm minutes", value: "18M", icon: Activity, trend: "this year", trendUp: true },
  { label: "Sessions done", value: "3.2M", icon: Heart, trend: "completed", trendUp: true },
  { label: "Avg. mood lift", value: "+34%", icon: Smile, trend: "in 30 days", trendUp: true },
];

export default function LandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-offwhite font-sans text-charcoal">
      {/* ===== GLOBAL TEXTURE: grid + noise second-read ===== */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Navbar scrolled={scrolled} theme={theme} setTheme={setTheme} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />

      <main className="relative z-10">
        <Hero />
        <TrustStrip />
        <FeaturesBento />
        <HowItWorks />
        <TestimonialsMasonry />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}

/* ============================================================
   NAVBAR — floating glass, theme toggle
   ============================================================ */
function Navbar({
  scrolled,
  theme,
  setTheme,
  mobileMenu,
  setMobileMenu,
}: {
  scrolled: boolean;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  mobileMenu: boolean;
  setMobileMenu: (v: boolean) => void;
}) {
  const links = [
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how" },
    { name: "Stories", href: "#stories" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
            scrolled
              ? "glass-strong shadow-glass"
              : "border border-transparent bg-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage text-offwhite">
              <Leaf className="h-[18px] w-[18px]" />
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight">Mindwell</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-mist-600 transition hover:bg-glass-white/60 hover:text-charcoal"
              >
                {l.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <IconButton
              icon={theme === "dark" ? Sun : Moon}
              variant="ghost"
              size="icon"
              label="Toggle theme"
              className="h-10 w-10"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <LinkButton href="/auth" variant="charcoal" size="sm" iconRight className="hidden sm:inline-flex">
              Sign in
            </LinkButton>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full glass-subtle md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Menu"
            >
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-charcoal" />
                <span className="block h-0.5 w-5 bg-charcoal" />
                <span className="block h-0.5 w-5 bg-charcoal" />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl glass-strong p-5 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a key={l.name} href={l.href} onClick={() => setMobileMenu(false)} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-glass-white/60">
                  {l.name}
                </a>
              ))}
              <LinkButton href="/auth" variant="charcoal" size="md" className="mt-2 w-full">
                Sign in
              </LinkButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   S1 — HERO — bottom-left over full-bleed image, scrubbing reveal
   ============================================================ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* full-bleed image with infinite slow zoom + parallax */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=2400&auto=format&fit=crop')",
            filter: "saturate(0.82) brightness(0.95)",
          }}
        />
      </motion.div>

      {/* tonal overlay */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0"
        // tonal overlay gradient
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,26,26,0.45) 0%, rgba(26,26,26,0.1) 30%, rgba(26,26,26,0.65) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(120% 80% at 15% 95%, rgba(156,175,136,0.4) 0%, transparent 55%)",
        }}
      />

      {/* breathing orb */}
      <div className="absolute right-[12%] top-[22%] z-10">
        <span className="relative flex h-20 w-20">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-40" />
          <span className="relative inline-flex h-20 w-20 rounded-full bg-sage/30 backdrop-blur-xl" />
        </span>
      </div>

      {/* BOTTOM-LEFT ANCHOR */}
      <div className="relative z-20 w-full px-6 pb-20 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="max-w-2xl"
        >
          <span className="glass-pill mb-6 inline-flex items-center gap-2 text-xs text-white">
            <Sparkles className="h-3.5 w-3.5 text-sage-light" /> A calmer mind, gently guided
          </span>

          {/* Giant statement with scrubbing reveal */}
          <h1 className="font-serif text-[3rem] leading-[0.95] tracking-tight text-white sm:text-[4.5rem] lg:text-[5.5rem]">
            {"Your mind,\nheld softly.".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.4 + i * 0.025, duration: 0.7, ease: "easeOut" }}
                className="inline-block whitespace-pre"
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-6 max-w-md text-lg font-light leading-relaxed text-white/85"
          >
            Mindwell is a quiet sanctuary for your mental wellness — therapy tools,
            mood tracking, and a community that holds you without judgment.
          </motion.p>

          {/* Banner-style CTA cluster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <LinkButton href="/auth" variant="sage" size="lg" iconRight magnetic>
              Begin your journey
            </LinkButton>
            <button className="group flex items-center gap-3 rounded-full glass-subtle px-5 py-3.5 text-white backdrop-blur-xl transition hover:bg-glass-white/25">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Play className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">Watch the 90s tour</span>
            </button>
          </motion.div>

          {/* tiny hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="mt-10 flex items-center gap-2 text-xs text-white/50"
          >
            <Feather className="h-3.5 w-3.5" /> Free forever plan · No card required
          </motion.p>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1"
        >
          <span className="h-2 w-1 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   S2 — TRUST STRIP — infinite marquee
   ============================================================ */
function TrustStrip() {
  const row = [...TRUST_LOGOS, ...TRUST_LOGOS];
  return (
    <section className="relative border-y border-border-subtle bg-bone/60 py-8">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-mist-400">
          Trusted by clinics, universities & minds worldwide
        </p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex w-max items-center gap-14 px-7"
        >
          {row.map((logo, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap text-lg font-serif font-semibold text-mist-400/80">
              <Leaf className="h-4 w-4 text-sage/70" />
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   S3 — FEATURES — gapless bento grid, 3D hover + parallax
   ============================================================ */
function FeaturesBento() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const py = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="features" ref={ref} className="relative px-6 py-28 sm:px-10 lg:px-16">
      {/* anchor: top-left lead */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl"
      >
        <span className="glass-badge inline-flex items-center gap-2 text-xs text-sage-700">
          <Sparkles className="h-3.5 w-3.5" /> Everything you need to feel held
        </span>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
          A whole toolkit for the <span className="text-sage-700">quiet work</span> of healing.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-600">
          Not another dashboard. A living, breathing companion that meets you where you are — and grows with you.
        </p>
      </motion.div>

      {/* Gapless bento grid */}
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <BentoCard
            key={f.title}
            span={f.span}
            className={cn("group min-h-[220px]", i % 2 === 0 ? "md:mt-0" : "md:mt-6")}
          >
            <motion.div style={i % 3 === 1 ? { y: py } : undefined} className="relative h-full">
              <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", f.tone)} />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-glass-white text-sage-700 transition-all duration-500 group-hover:scale-110">
                  <f.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-charcoal">{f.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist-600">{f.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sage-700 opacity-0 transition-all duration-400 group-hover:opacity-100">
                    Explore <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.div>
          </BentoCard>
        ))}
      </div>

      {/* anchor: bottom-right stat cluster */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-auto mt-16 flex max-w-6xl flex-col items-end gap-4"
      >
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   S4 — HOW IT WORKS — off-grid editorial, pinned narrative
   ============================================================ */
function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" ref={ref} className="relative bg-charcoal text-offwhite">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        {/* Left: sticky editorial lead */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="glass-badge inline-flex items-center gap-2 text-xs text-sage-light">
              <Compass className="h-3.5 w-3.5" /> The path is gentle
            </span>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Healing isn't a sprint.<br /> It's a slow return.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-offwhite/70">
              Four quiet movements. No pressure, no perfection — just a rhythm you can actually keep.
            </p>

            {/* progress rail */}
            <div className="mt-10 hidden h-48 w-px bg-white/15 lg:block">
              <motion.div style={{ height: progressHeight }} className="w-px bg-sage" />
            </div>
          </motion.div>
        </div>

        {/* Right: narrative steps with pinned reveal */}
        <div className="flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-sage/40 hover:bg-white/10"
            >
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-sage/10 blur-2xl transition-all duration-500 group-hover:bg-sage/25" />
              <div className="relative flex items-start gap-6">
                <span className="font-serif text-5xl font-semibold text-sage/60">{step.n}</span>
                <div>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/20 text-sage-light">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-md text-offwhite/70">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   S5 — TESTIMONIALS — diagonal staggered square masonry
   ============================================================ */
function TestimonialsMasonry() {
  return (
    <section id="stories" className="relative px-6 py-28 sm:px-10 lg:px-16">
      {/* anchor: centered statement */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="glass-badge inline-flex items-center gap-2 text-xs text-sage-700">
          <Quote className="h-3.5 w-3.5" /> Stories from the quiet
        </span>
        <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
          Held by thousands of <span className="text-sage-700">real people</span>.
        </h2>
      </motion.div>

      {/* diagonal staggered grid */}
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 50, rotate: t.rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: t.rotate }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: EASE }}
            whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
            className={cn(
              "rounded-3xl border border-border-glass bg-glass-white/55 p-7 backdrop-blur-xl",
              i % 2 === 0 ? "lg:mt-0" : "lg:mt-10"
            )}
            style={{ boxShadow: "0 8px 32px rgba(31,38,135,0.08)" }}
          >
            <div className="mb-4 flex items-center gap-1">
              {Array.from({ length: t.rating }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-sage text-sage" />
              ))}
            </div>
            <p className="font-serif text-lg leading-relaxed text-charcoal">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/20 font-semibold text-sage-700">
                {t.name[0]}
              </span>
              <div>
                <p className="text-sm font-medium text-charcoal">{t.name}</p>
                <p className="text-xs text-mist-400">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   S6 — FINAL CTA — color-blocked diptych + radial vignette
   ============================================================ */
function FinalCTA() {
  return (
    <section id="pricing" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2">
        {/* LEFT — sage color block */}
        <div className="relative flex flex-col justify-between bg-sage p-10 lg:p-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,0.25), transparent 55%)" }}
          />
          <div className="relative">
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] text-offwhite sm:text-5xl">
              Start where<br /> you are.
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-offwhite/85">
              No pressure. No perfect mornings required. Just one small, kind step today.
            </p>
          </div>
          <div className="relative mt-10 flex flex-wrap gap-3">
            <LinkButton href="/auth" variant="charcoal" size="lg" iconRight magnetic>
              Create free account
            </LinkButton>
            <LinkButton href="/auth" variant="ghost" size="lg" className="border border-offwhite/40 text-offwhite hover:bg-offwhite/15">
              Talk to us
            </LinkButton>
          </div>
        </div>

        {/* RIGHT — off-white with radial vignette + soft accent */}
        <div className="relative flex flex-col justify-center bg-offwhite p-10 lg:p-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(80% 80% at 80% 20%, rgba(156,175,136,0.18), transparent 60%)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-sage/15 text-sage-700">
              <Waves className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-3xl font-semibold text-charcoal">What you get, free</h3>
            <ul className="mt-6 space-y-3">
              {[
                "Daily mood & energy check-ins",
                "Starter CBT playbook (12 exercises)",
                "3 calming mind games",
                "Community access & crisis support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-mist-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage/20 text-sage-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-mist-400">
              Upgrade anytime · Cancel anytime · Your data stays yours
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const cols = [
    { title: "Product", items: ["Features", "Pricing", "CBT Playbook", "Mind Games", "Crisis Support"] },
    { title: "Company", items: ["About", "Careers", "Press", "Blog", "Contact"] },
    { title: "Resources", items: ["Help Center", "Community", "Guides", "Research", "API"] },
    { title: "Legal", items: ["Privacy", "Terms", "Security", "Cookies", "Accessibility"] },
  ];
  return (
    <footer className="relative border-t border-border-subtle bg-bone/50 px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-6">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage text-offwhite">
              <Leaf className="h-[18px] w-[18px]" />
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight text-charcoal">Mindwell</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-500">
            A calmer mind, gently guided. Mental wellness tools built with care, science, and a lot of heart.
          </p>
          <div className="mt-5 flex gap-2">
            {[Globe, Lock, ShieldCheck].map((Icon, i) => (
              <span key={i} className="flex h-9 w-9 items-center justify-center rounded-full glass-subtle text-sage-700">
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-sm font-semibold text-charcoal">{col.title}</p>
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-mist-500 transition hover:text-charcoal">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border-subtle pt-6 text-sm text-mist-400 sm:flex-row">
        <p>© {new Date().getFullYear()} Mindwell. Made with care.</p>
        <p className="flex items-center gap-1.5">
          <span className="flex h-2 w-2 rounded-full bg-sage" /> All systems calm
        </p>
      </div>
    </footer>
  );
}

/* small helper icon used above */
function Sprout(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7" />
      <path d="M13.5 4.2c0 2.4-1.8 4.3-4.2 4.3" />
      <path d="M18.5 4.2c0 3.5-2.6 6.3-6 6.3" />
    </svg>
  );
}
