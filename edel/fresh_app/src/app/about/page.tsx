"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Heart,
  Eye,
  Target,
  Sparkles,
  Shield,
  BookOpen,
  Quote,
  Code2,
  Calendar,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Star,
    title: "الجودة",
    desc: "كل جزء في المنصة صُمم بعناية فائقة لضمان أفضل تجربة",
    color: "from-amber-400/20 to-amber-500/10",
    iconBg: "bg-amber-500/20 text-amber-600",
  },
  {
    icon: Shield,
    title: "الخصوصية",
    desc: "بياناتك آمنة ومشفرة. خصوصيتك خط أحمر لا يمكن تخطيه",
    color: "from-sage-400/20 to-sage-500/10",
    iconBg: "bg-sage-500/20 text-sage-600",
  },
  {
    icon: Heart,
    title: "الأمل",
    desc: "نؤمن أن التغيير ممكن لكل إنسان مهما كانت الظروف",
    color: "from-rose-400/20 to-rose-500/10",
    iconBg: "bg-rose-500/20 text-rose-600",
  },
  {
    icon: BookOpen,
    title: "العلم",
    desc: "نعتمد على أسس علمية ونفسية موثوقة في كل محتوى نقدمه",
    color: "from-lavender-400/20 to-lavender-500/10",
    iconBg: "bg-lavender-500/20 text-lavender-600",
  },
];

const timeline = [
  {
    year: "٢٠٢٣ - البداية",
    event: "فكرة المنصة تولد من رغبة صادقة في تقديم محتوى نفسي عربي موثوق",
    icon: Sparkles,
  },
  {
    year: "٢٠٢٤ - البناء",
    event: "أشهر من العمل المتواصل، كل سطر برمجة، كل تصميم، كل كلمة بجهد شخصي",
    icon: Code2,
  },
  {
    year: "٢٠٢٥ - الإطلاق",
    event: "انطلقت المنصة لتكون مساحة آمنة لكل من يبحث عن فهم ذاته",
    icon: Calendar,
  },
  {
    year: "المستقبل",
    event: "نسعى لتوسيع المحتوى والخدمات ليشمل أكبر عدد ممكن من المستفيدين",
    icon: Target,
  },
];

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const timelineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="glass-badge mb-4 inline-flex items-center gap-2 text-xs">
            <Heart className="h-3.5 w-3.5" /> من نحن
          </span>
          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-sage-400 text-4xl font-bold text-white shadow-glow-primary">
            ع.ا
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            عادل الخالدي
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-lg text-muted-foreground">
            مؤسس ومطور منصة Edel
          </p>
        </motion.div>

        {/* القصة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">
            القصة
          </h2>
          <div className="glass-strong rounded-3xl p-8 sm:p-10">
            <Quote className="mx-auto mb-6 h-10 w-10 text-primary/60" />
            <p className="text-xl leading-relaxed text-foreground sm:text-2xl">
              &ldquo;بنيت هذا الموقع بجهدي وتعبي ليكون ملاذاً آمناً لكل من يبحث
              عن فهم ذاته. كل سطر في هذه المنصة كتبته شخصياً، كل تصميم رسمته
              بيدي، كل وظيفة برمجتها بتفانٍ.&rdquo;
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              — عادل الخالدي
            </p>
          </div>
        </motion.div>

        {/* الرسالة */}
        <div className="mx-auto mb-16 grid max-w-5xl gap-6 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-8"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Heart className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground">
              الرسالة
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              مساعدة الآخرين على فهم أنفسهم بشكل أعمق، وتقديم أدوات عملية
              للتعامل مع التحديات النفسية اليومية، في بيئة آمنة ومحترمة تحافظ
              على خصوصيتك.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-8"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-500/15 text-sage-600">
              <Eye className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground">
              الرؤية
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              عالم تكون فيه الصحة النفسية في متناول كل متحدث بالعربية. منصة
            شاملة تقدم دعماً نفسياً موثوقاً، مجاناً، دون أحكام أو حواجز.
            </p>
          </motion.div>
        </div>

        {/* القيم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-foreground">
            القيم التي نؤمن بها
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border-glass bg-glass-white/60 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-glass-hover hover:-translate-y-1"
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    val.color
                  )}
                />
                <div className="relative">
                  <div
                    className={cn(
                      "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
                      val.iconBg
                    )}
                  >
                    <val.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-foreground">
            رحلة البناء
          </h2>

          <div className="relative mx-auto max-w-2xl">
            <div className="pointer-events-none absolute right-4 top-0 h-full w-0.5 bg-border-glass">
              <motion.div
                style={{ height: timelineProgress }}
                className="w-full rounded-full bg-gradient-to-b from-primary to-sage-400"
              />
            </div>

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative pr-12"
                >
                  <div className="absolute right-2 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="glass-strong rounded-xl p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border-glass bg-gradient-to-br from-primary/10 via-transparent to-sage-400/10 p-8 text-center sm:p-12">
            <Quote className="mx-auto mb-4 h-12 w-12 text-primary/30" />
            <blockquote className="font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">
              &ldquo;بنيت هذا الموقع بجهدي وتعبي ليكون ملاذاً آمناً&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">
              — عادل الخالدي
            </p>
          </div>
        </motion.div>

        {/* Developer Credit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-subtle inline-flex items-center gap-3 rounded-2xl px-6 py-4">
            <Code2 className="h-6 w-6 text-primary" />
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                طُورت بجهد وتفانٍ
              </p>
              <p className="text-xs text-muted-foreground">
                عادل الخالدي — كل الحقوق محفوظة © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
