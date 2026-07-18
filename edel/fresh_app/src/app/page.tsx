"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  Brain,
  Heart,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Users,
  Activity,
  Moon,
  Sun,
  Star,
  Check,
  Play,
  Feather,
  Waves,
  Compass,
  Flower2,
  Wind,
  ChevronLeft,
  Globe,
  Lock,
  Smile,
  BookOpen,
  Gamepad2,
  MessageSquare,
  AlertTriangle,
  Lamp,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, LinkButton, IconButton } from "@/components/ui/button";
import { Card, FeatureCard, StatCard, BentoCard } from "@/components/ui/card";

const EASE = [0.34, 1.56, 0.64, 1] as const;

const FEATURES = [
  { icon: Brain, title: "مكتبة التعلم", desc: "افهم مشاعرك من خلال أدلة خبراء بلطف.", span: "md:col-span-2", tone: "from-sage/20 to-transparent" },
  { icon: Heart, title: "تتبع المزاج", desc: "تتبع مد وجزر مشاعرك الداخلية دون إصدار أحكام.", span: "md:col-span-1", tone: "from-rose-300/20 to-transparent" },
  { icon: Gamepad2, title: "ألعاب العقل", desc: "تدريب معرفي ممتع يتحول إلى هدوء.", span: "md:col-span-1", tone: "from-amber-300/20 to-transparent" },
  { icon: MessageSquare, title: "تواصل وتنفيس", desc: "غرفة هادئة لتُسمع وتُفهم من قبل من يسيرون في نفس الطريق.", span: "md:col-span-2", tone: "from-sage/20 to-transparent" },
  { icon: AlertTriangle, title: "دعم الأزمات", desc: "خطوط نجاة متاحة دائمًا عندما يقترب الظلام أكثر من اللازم.", span: "md:col-span-1", tone: "from-rose-300/20 to-transparent" },
  { icon: BookOpen, title: "الموسوعة العلاجية", desc: "اكتشف الأمراض النفسية وطرق علاجها بأسلوب علمي مبسط.", span: "md:col-span-2", tone: "from-mist-300/20 to-transparent" },
];

const STEPS = [
  { n: "01", title: "احضر", desc: "أخبرنا قليلاً عن مشاعرك. لا تشخيص، لا ضغط — مجرد نقطة بداية.", icon: Compass },
  { n: "02", title: "تنفس", desc: "نصوغ لك طقوسًا يومية من الممارسات الدقيقة المتناغمة مع طاقتك.", icon: Wind },
  { n: "03", title: "تعاف", desc: "من خلال العلاج السلوكي المعرفي واليوميات والمجتمع، تتراكم التحولات الصغيرة.", icon: Flower2 },
  { n: "04", title: "انمُ", desc: "شاهد مناظرك الداخلية تنعم. عُد إلى نفسك مرارًا وتكرارًا.", icon: Feather },
];

const STATS = [
  { label: "أعضاء يثقون بنا", value: "240ألف+", icon: Users, trend: "في ازدياد", trendUp: true },
  { label: "دقائق هدوء", value: "18مليون", icon: Activity, trend: "هذا العام", trendUp: true },
  { label: "جلسات علاجية", value: "3.2مليون", icon: Heart, trend: "مكتملة", trendUp: true },
  { label: "تحسن المزاج", value: "+34%", icon: Smile, trend: "في 30 يوم", trendUp: true },
];

const BRAIN_REGIONS = [
  { id: "prefrontal", label: "الفص الجبهي", desc: "مركز التفكير والتحكم والانتباه والتخطيط. يساعدك على اتخاذ القرارات السليمة.", x: 50, y: 25 },
  { id: "amygdala", label: "اللوزة الدماغية", desc: "مركز الخوف والاستجابات العاطفية. تلعب دورًا رئيسيًا في القلق واضطرابات المزاج.", x: 42, y: 58 },
  { id: "hippocampus", label: "الحصين", desc: "مسؤول عن تكوين الذكريات وتنظيمها. يتأثر بالاكتئاب المزمن والضغط النفسي.", x: 62, y: 62 },
];

export default function LandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #9b8cff 1px, transparent 1px), linear-gradient(to bottom, #9b8cff 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <main className="relative z-10">
        <Hero />
        <FeaturesBento />
        <InteractiveBrain />
        <HowItWorks />
        <FinalCTA />
      </main>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.3]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2400&auto=format&fit=crop')",
            filter: "saturate(0.75) brightness(0.6)",
          }}
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,20,0.6) 0%, rgba(10,10,20,0.15) 35%, rgba(10,10,20,0.7) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(120% 80% at 15% 95%, rgba(155,140,255,0.35) 0%, transparent 55%)",
        }}
      />

      <div className="absolute right-[12%] top-[22%] z-10">
        <span className="relative flex h-24 w-24">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lavender-500 opacity-40" />
          <span className="relative inline-flex h-24 w-24 rounded-full bg-lavender-500/30 backdrop-blur-xl" />
        </span>
      </div>

      <div className="relative z-20 w-full px-6 pb-20 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="max-w-2xl"
        >
          <span className="glass-pill mb-6 inline-flex items-center gap-2 text-xs text-white/90">
            <Sparkles className="h-3.5 w-3.5 text-lavender-300" /> مساحة آمنة لفهم ذاتك
          </span>

          <h1 className="font-serif text-[3rem] leading-[0.95] tracking-tight text-white sm:text-[4.5rem] lg:text-[5.5rem]">
            {"عقلك\nبين أيدٍ أمينة.".split("").map((ch, i) => (
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
            إيدل is a quiet sanctuary for your mental wellness — therapy tools,
            mood tracking, and a community that holds you without judgment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <LinkButton href="/auth" variant="glass" size="lg" iconRight magnetic>
              ابدأ رحلتك
            </LinkButton>
            <button className="group flex items-center gap-3 rounded-full glass-subtle px-5 py-3.5 text-white backdrop-blur-xl transition hover:bg-glass-white/25">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Play className="h-4 w-4 fill-white" />
              </span>
              <span className="text-sm font-medium">شاهد الجولة</span>
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="mt-10 flex items-center gap-2 text-xs text-white/50"
          >
            <Feather className="h-3.5 w-3.5" /> خطة مجانية للأبد · بدون بطاقة ائتمان
          </motion.p>
        </motion.div>
      </div>

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

function FeaturesBento() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const py = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="features" ref={ref} className="relative px-6 py-28 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl"
      >
        <span className="glass-badge inline-flex items-center gap-2 text-xs text-lavender-700">
          <Sparkles className="h-3.5 w-3.5" /> كل ما تحتاج لتشعر بالأمان
        </span>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          أدوات متكاملة لـ <span className="text-lavender-600">رحلة الشفاء</span> الصامتة.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          ليس مجرد لوحة تحكم. رفيق حي ينمو معك ويلتقيك حيث أنت.
        </p>
      </motion.div>

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
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-glass-white text-lavender-700 transition-all duration-500 group-hover:scale-110">
                  <f.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold">{f.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-lavender-700 opacity-0 transition-all duration-400 group-hover:opacity-100">
                    استكشف <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.div>
          </BentoCard>
        ))}
      </div>

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

function InteractiveBrain() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <section className="relative bg-gradient-to-b from-background via-lavender-50/40 to-background px-6 py-28 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl text-center"
      >
        <span className="glass-badge inline-flex items-center gap-2 text-xs text-lavender-700">
          <Brain className="h-3.5 w-3.5" /> اعرف دماغك
        </span>
        <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          رحلة في <span className="text-lavender-600">خريطة العقل</span>
        </h2>
        <p className="mt-5 mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
          حرّك المؤشر فوق مناطق الدماغ لتعرف وظائفها، واضغط لقراءة المزيد
        </p>
      </motion.div>

      <div className="mx-auto mt-16 max-w-2xl">
        <div className="relative flex justify-center">
          <svg viewBox="0 0 400 400" className="w-full max-w-md h-auto">
            <defs>
              <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#9b8cff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#9b8cff" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="200" cy="200" r="160" fill="url(#brainGlow)" />

            {/* Brain outline */}
            <motion.path
              d="M200 60 C130 60 70 110 70 180 C70 240 100 280 130 310 C150 335 170 350 200 350 C230 350 250 335 270 310 C300 280 330 240 330 180 C330 110 270 60 200 60Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-lavender-300"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Central sulcus */}
            <motion.path
              d="M130 180 C160 160 240 160 270 180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-lavender-400"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.5 }}
            />

            {/* Prefrontal cortex (front lobe) - top front region */}
            <motion.ellipse
              cx="175" cy="130" rx="60" ry="40"
              fill={hoveredRegion === "prefrontal" || activeRegion === "prefrontal" ? "rgba(155,140,255,0.3)" : "rgba(155,140,255,0.1)"}
              stroke={hoveredRegion === "prefrontal" ? "#9b8cff" : "rgba(155,140,255,0.3)"}
              strokeWidth={hoveredRegion === "prefrontal" ? "3" : "1.5"}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredRegion("prefrontal")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setActiveRegion(activeRegion === "prefrontal" ? null : "prefrontal")}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
            <text x="155" y="125" fontSize="9" fill="currentColor" className="pointer-events-none select-none text-muted-foreground">
              الفص الجبهي
            </text>

            {/* Amygdala - lower middle */}
            <motion.ellipse
              cx="170" cy="260" rx="30" ry="20"
              fill={hoveredRegion === "amygdala" || activeRegion === "amygdala" ? "rgba(244,63,94,0.3)" : "rgba(244,63,94,0.1)"}
              stroke={hoveredRegion === "amygdala" ? "#f43f5e" : "rgba(244,63,94,0.3)"}
              strokeWidth={hoveredRegion === "amygdala" ? "3" : "1.5"}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredRegion("amygdala")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setActiveRegion(activeRegion === "amygdala" ? null : "amygdala")}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.6 }}
            />
            <text x="148" y="255" fontSize="9" fill="currentColor" className="pointer-events-none select-none text-muted-foreground">
              اللوزة
            </text>

            {/* Hippocampus - lower back */}
            <motion.ellipse
              cx="240" cy="250" rx="35" ry="18"
              fill={hoveredRegion === "hippocampus" || activeRegion === "hippocampus" ? "rgba(52,211,153,0.3)" : "rgba(52,211,153,0.1)"}
              stroke={hoveredRegion === "hippocampus" ? "#34d399" : "rgba(52,211,153,0.3)"}
              strokeWidth={hoveredRegion === "hippocampus" ? "3" : "1.5"}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredRegion("hippocampus")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setActiveRegion(activeRegion === "hippocampus" ? null : "hippocampus")}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
            />
            <text x="218" y="246" fontSize="9" fill="currentColor" className="pointer-events-none select-none text-muted-foreground">
              الحصين
            </text>
          </svg>
        </div>

        <AnimatePresence mode="wait">
          {activeRegion && (
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto mt-8 max-w-lg rounded-2xl glass-strong p-6 text-center"
            >
              {BRAIN_REGIONS.filter(r => r.id === activeRegion).map(r => (
                <div key={r.id}>
                  <h4 className="font-serif text-xl font-semibold text-lavender-700">{r.label}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" ref={ref} className="relative bg-charcoal text-offwhite">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="glass-badge inline-flex items-center gap-2 text-xs text-lavender-300">
              <Compass className="h-3.5 w-3.5" /> الطريق لطيف
            </span>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              الشفاء ليس سباقًا.<br /> إنه عودة هادئة.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-offwhite/70">
              أربع حركات هادئة. لا ضغط، لا كمال — فقط إيقاع يمكنك الاستمرار عليه.
            </p>
            <div className="mt-10 hidden h-48 w-px bg-white/15 lg:block">
              <motion.div style={{ height: progressHeight }} className="w-px bg-lavender-500" />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-lavender-500/40 hover:bg-white/10"
            >
              <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-lavender-500/10 blur-2xl transition-all duration-500 group-hover:bg-lavender-500/25" />
              <div className="relative flex items-start gap-6">
                <span className="font-serif text-5xl font-semibold text-lavender-500/60">{step.n}</span>
                <div>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-500/20 text-lavender-300">
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

function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2">
        <div className="relative flex flex-col justify-between bg-lavender-600 p-10 lg:p-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,0.25), transparent 55%)" }}
          />
          <div className="relative">
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
              ابدأ من<br /> حيث أنت.
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/85">
              لا ضغط. لا صباح مثالي مطلوب.只需 خطوة لطيفة واحدة اليوم.
            </p>
          </div>
          <div className="relative mt-10 flex flex-wrap gap-3">
            <LinkButton href="/auth" variant="charcoal" size="lg" iconRight magnetic>
              أنشئ حساب مجاني
            </LinkButton>
            <LinkButton href="/auth" variant="ghost" size="lg" className="border border-white/40 text-white hover:bg-white/15">
              تواصل معنا
            </LinkButton>
          </div>
        </div>

        <div className="relative flex flex-col justify-center bg-background p-10 lg:p-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(80% 80% at 80% 20%, rgba(155,140,255,0.12), transparent 60%)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-lavender-500/15 text-lavender-700">
              <Waves className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-3xl font-semibold">ما تحصل عليه مجانًا</h3>
            <ul className="mt-6 space-y-3">
              {[
                "تتبع يومي للمزاج والطاقة",
                "مكتبة تعلم شاملة عن الصحة النفسية",
                "موسوعة الأمراض النفسية",
                "تمارين التنفس والتأمل",
                "دعم المجتمع والمساعدة في الأزمات",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lavender-500/20 text-lavender-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              يمكنك الترقية في أي وقت · إلغاء في أي وقت · بياناتك تبقى ملكك
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
