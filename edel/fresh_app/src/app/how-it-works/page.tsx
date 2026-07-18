"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Compass,
  TrendingUp,
  Users,
  Sparkles,
  ArrowLeft,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "١",
    title: "اختر ما يناسبك",
    subtitle: "اكتشف أدواتك",
    icon: Compass,
    description:
      "تصفح مكتبتنا التثقيفية واختر ما يتناسب مع احتياجاتك. فيديوهات تعليمية، تمارين تفاعلية، أدلة قابلة للتحميل، ومجتمع داعم ينتظرك.",
    details: [
      "مكتبة تثقيفية متكاملة",
      "تمارين علاج سلوكي معرفي",
      "ألعاب ذهنية تدريبية",
      "مجتمع داعم وآمن",
    ],
    color: "from-sage-500/20 to-sage-600/10",
    border: "border-sage-500/30",
    iconBg: "bg-sage-500/20 text-sage-600",
  },
  {
    number: "٢",
    title: "تابع تقدمك",
    subtitle: "راقب رحلتك",
    icon: TrendingUp,
    description:
      "سجل مشاعرك يومياً وتابع تطورك عبر رسوم بيانية بسيطة. لاحظ الأنماط، احتفل بالتقدم، وتعلم من التحديات. رحلتك النفسية بين يديك.",
    details: [
      "تتبع المزاج اليومي",
      "رسوم بيانية للتقدم",
      "تذكيرات يومية لطيفة",
      "تحليل الأنماط السلوكية",
    ],
    color: "from-lavender-500/20 to-lavender-600/10",
    border: "border-lavender-500/30",
    iconBg: "bg-lavender-500/20 text-lavender-600",
  },
  {
    number: "٣",
    title: "تواصل مع المجتمع",
    subtitle: "لست وحدك",
    icon: Users,
    description:
      "انضم لمجتمع آمن من أناس يشاركونك نفس الرحلة. تبادل الخبرات، قدم الدعم وتلقاه، واعرف أنك لست وحدك في هذا الطريق.",
    details: [
      "مجتمع داعم وآمن",
      "مشاركة قصص التعافي",
      "دعم متبادل بتعاطف",
      "نقاشات أسبوعية موجهة",
    ],
    color: "from-rose-500/20 to-rose-600/10",
    border: "border-rose-500/30",
    iconBg: "bg-rose-500/20 text-rose-600",
  },
];

const details = [
  { label: "مجاني بالكامل", icon: Check },
  { label: "خصوصية تامة", icon: Check },
  { label: "دعم 24 ساعة", icon: Check },
  { label: "محتوى عربي أصيل", icon: Check },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y: parallaxY }}
      className="relative"
    >
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-12">
        <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-border-glass bg-background shadow-glass lg:h-28 lg:w-28">
          <motion.div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full lg:h-24 lg:w-24",
              step.iconBg
            )}
          >
            <step.icon className="h-8 w-8 lg:h-10 lg:w-10" />
          </motion.div>
          <span className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-glow-primary lg:-left-3 lg:-top-3 lg:h-10 lg:w-10 lg:text-lg">
            {step.number}
          </span>
        </div>

        <div className="flex-1">
          <span className="text-sm font-medium text-primary">
            {step.subtitle}
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            {step.title}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            {step.description}
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {step.details.map((detail) => (
              <li
                key={detail}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full",
                    step.iconBg
                  )}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden w-48 shrink-0 lg:block">
          <div
            className={cn(
              "rounded-2xl border bg-gradient-to-br p-4",
              step.border,
              step.color
            )}
          >
            <step.icon className="mb-2 h-8 w-8" />
            <p className="text-sm font-medium text-foreground">
              الخطوة {step.number}
            </p>
            <p className="text-xs text-muted-foreground">{step.title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorksPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="glass-badge mb-4 inline-flex items-center gap-2 text-xs">
            <Sparkles className="h-3.5 w-3.5" /> رحلة وعي
          </span>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            كيف تعمل المنصة
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            ثلاث خطوات بسيطة لبدء رحلتك نحو فهم أعمق لذاتك وصحتك النفسية
          </p>
        </motion.div>

        <div className="sticky top-6 z-10 mx-auto mb-8 h-2 w-full max-w-3xl overflow-hidden rounded-full glass-strong">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full origin-right rounded-full bg-gradient-to-l from-primary to-sage-400"
          />
        </div>

        <div ref={sectionRef} className="relative">
          <div className="pointer-events-none absolute right-8 top-0 hidden h-full w-0.5 bg-border-glass lg:block">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full origin-top rounded-full bg-gradient-to-b from-primary to-sage-400"
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-3xl text-center"
        >
          <div className="glass-strong rounded-3xl p-8 sm:p-10">
            <h3 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              ابدأ رحلتك الآن
            </h3>
            <p className="mt-2 text-muted-foreground">
              المنصة مجانية بالكامل. لا توجد أي رسوم خفية أو اشتراكات.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {details.map((d) => (
                <span
                  key={d.label}
                  className="inline-flex items-center gap-1.5 rounded-full glass-subtle px-3 py-1.5 text-sm font-medium text-muted-foreground"
                >
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  {d.label}
                </span>
              ))}
            </div>
            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 sm:w-auto sm:inline-flex">
              ابدأ الآن
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
