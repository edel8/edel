"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Brain, Heart, Sparkles, ArrowLeft, ArrowRight, BookOpen,
  MessageSquare, Gamepad2, AlertTriangle, Compass, Wind,
  Flower2, Feather, Waves, Check, Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, ease: EASE },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const FEATURES = [
  { icon: BookOpen, title: "مكتبة التعلم", desc: "افهم مشاعرك من خلال أدلة خبراء. محتوى نفسي عربي أصيل، ليس ترجمة حرفية." },
  { icon: Heart, title: "تتبع المزاج", desc: "تتبع مشاعرك الداخلية، تعرف أنماطك العاطفية، وتعلم كيف تتعامل مع نفسك بلطف." },
  { icon: Brain, title: "تمارين CBT", desc: "تمارين علاج سلوكي معرفي مصممة خصيصاً للثقافة العربية. غيرت حياة الآلاف." },
  { icon: MessageSquare, title: "فضفضة", desc: "مساحة آمنة للتنفيس. شارك ما بداخلك دون خوف من الأحكام." },
  { icon: Gamepad2, title: "ألعاب العقل", desc: "تدريب معرفي ممتع يساعدك على تحسين الذاكرة والتركيز والمرونة العقلية." },
  { icon: AlertTriangle, title: "دعم الأزمات", desc: "خطوط نجاة وأدوات فورية للتعامل مع اللحظات الصعبة. أنت لست وحدك." },
  { icon: Waves, title: "تمارين التنفس", desc: "تقنيات تنفس مهدئة مبنية على أبحاث علمية، تساعدك على استعادة هدوءك في دقائق." },
  { icon: Feather, title: "قصص ملهمة", desc: "قصص حقيقية لأناس مروا بتجارب صعبة وخرجوا أقوى. الأمل ممكن." },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#FFFCF5]">
      {/* === HERO: Full-bleed image, bottom-left text anchor, editorial === */}
      <section ref={heroRef} className="relative flex min-h-[90svh] items-end overflow-hidden">
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2400&auto=format&fit=crop')",
              filter: "grayscale(0.4) brightness(0.55) contrast(1.1)",
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-[#111]/20 to-transparent" />
        <motion.div style={{ opacity }} className="absolute inset-0 bg-[#111]/10" />

        <div className="relative z-10 w-full px-6 pb-16 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 mb-5 text-xs uppercase tracking-[0.2em] text-white/60">
              <span className="h-px w-6 bg-white/40" /> Edel
            </span>
            <h1 className="font-serif text-[3.5rem] leading-[0.92] tracking-tight text-white sm:text-[5rem] lg:text-[6rem]">
              {"عقلك\nبين أيدٍ أمينة.".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.025, duration: 0.7, ease: EASE }}
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
              className="mt-5 max-w-md text-lg font-light leading-relaxed text-white/80"
            >
              Edel is a quiet sanctuary for your mental wellness — therapy tools,
              mood tracking, and a community that holds you without judgment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/auth"
                className="paper-btn group text-sm"
              >
                ابدأ رحلتك
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <button className="group flex items-center gap-3 px-5 py-3 text-sm text-white/80 transition hover:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30">
                  <Play className="h-3.5 w-3.5" />
                </span>
                شاهد الجولة
              </button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.7 }}
              className="mt-8 flex items-center gap-2 text-xs text-white/50"
            >
              <Feather className="h-3 w-3" /> خطة مجانية للأبد · بدون بطاقة ائتمان
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* === FEATURES: Editorial grid, varied anchors === */}
      <section className="px-6 py-28 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">
              <span className="inline-block h-px w-6 bg-[#EAEAEA] ml-2 align-middle" />
              المميزات
            </span>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              أدوات متكاملة لرحلة الشفاء الصامتة
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#6B6B6B]">
              ليس مجرد منصة. رفيق حي ينمو معك ويلتقيك حيث أنت.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: EASE }}
              >
                <div className="paper-card p-6 transition-all duration-300 hover:bg-[#F8F5F0]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F5F0] border border-[#EAEAEA]">
                    <f.icon className="h-5 w-5 text-[#111]" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS: Side image 60/40 editorial === */}
      <section className="border-t border-[#EAEAEA] bg-[#F8F5F0]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">
                <span className="inline-block h-px w-6 bg-[#EAEAEA] ml-2 align-middle" />
                الطريق
              </span>
              <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                الشفاء ليس سباقًا
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#6B6B6B]">
                أربع حركات هادئة. لا ضغط، لا كمال — فقط إيقاع يمكنك الاستمرار عليه.
              </p>
            </motion.div>

            <div className="mt-10 space-y-6">
              {[
                { n: "01", title: "احضر", desc: "أخبرنا قليلاً عن مشاعرك. لا تشخيص، لا ضغط — مجرد نقطة بداية.", icon: Compass },
                { n: "02", title: "تنفس", desc: "نصوغ لك طقوسًا يومية من الممارسات الدقيقة المتناغمة مع طاقتك.", icon: Wind },
                { n: "03", title: "تعاف", desc: "من خلال العلاج السلوكي المعرفي واليوميات والمجتمع، تتراكم التحولات الصغيرة.", icon: Flower2 },
                { n: "04", title: "انمُ", desc: "شاهد مناظرك الداخلية تنعم. عُد إلى نفسك مرارًا وتكرارًا.", icon: Feather },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                  className="flex items-start gap-5"
                >
                  <span className="font-serif text-3xl text-[#6B6B6B]/40">{step.n}</span>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EAEAEA]">
                        <step.icon className="h-4 w-4" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop')",
                filter: "grayscale(0.5) brightness(0.7)",
              }}
            />
          </div>
        </div>
      </section>

      {/* === BRAIN SECTION: Minimal black line drawing on cream paper === */}
      <section className="px-6 py-28 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">
              <span className="inline-block h-px w-6 bg-[#EAEAEA] ml-2 align-middle" />
              اعرف دماغك
            </span>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              رحلة في خريطة العقل
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-lg leading-relaxed text-[#6B6B6B]">
              حرّك المؤشر فوق مناطق الدماغ لتعرف وظائفها
            </p>
          </motion.div>

          <div className="mx-auto mt-14 max-w-md">
            <svg viewBox="0 0 400 400" className="w-full h-auto">
              <motion.path
                d="M200 70 C130 70 80 120 80 190 C80 250 110 290 140 320 C160 345 180 350 200 350 C220 350 240 345 260 320 C290 290 320 250 320 190 C320 120 270 70 200 70Z"
                fill="none"
                stroke="#111"
                strokeWidth="1.5"
                strokeDasharray="6 3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: EASE }}
              />
              <motion.path
                d="M140 190 C170 170 230 170 260 190"
                fill="none"
                stroke="#111"
                strokeWidth="1"
                strokeDasharray="3 2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.5 }}
              />
              <circle cx="185" cy="140" r="4" fill="#111" />
              <circle cx="175" cy="270" r="4" fill="#111" />
              <circle cx="240" cy="260" r="4" fill="#111" />
              <text x="160" y="135" fontSize="10" fill="#6B6B6B" textAnchor="middle">الفص الجبهي</text>
              <text x="155" y="285" fontSize="10" fill="#6B6B6B" textAnchor="middle">اللوزة</text>
              <text x="258" y="265" fontSize="10" fill="#6B6B6B" textAnchor="middle">الحصين</text>
            </svg>
          </div>
        </div>
      </section>

      {/* === CTA: Full-width, editorial offset === */}
      <section className="relative overflow-hidden bg-[#111]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2">
          <div className="p-10 sm:p-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-4xl leading-[1.05] text-[#FFFCF5] sm:text-5xl">
                ابدأ من حيث أنت
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-[#FFFCF5]/70">
                لا ضغط. لا صباح مثالي مطلوب.只需 خطوة لطيفة واحدة اليوم.
              </p>
              <Link
                href="/auth"
                className="mt-8 inline-flex items-center gap-3 bg-[#FFFCF5] text-[#111] rounded-full px-7 py-3.5 text-sm font-medium transition-all hover:opacity-90 group"
              >
                أنشئ حساب مجاني
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="p-10 sm:p-16 border-t lg:border-t-0 lg:border-r border-[#333]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h3 className="font-serif text-2xl text-[#FFFCF5]">ما تحصل عليه مجانًا</h3>
              <ul className="mt-6 space-y-3">
                {[
                  "تتبع يومي للمزاج والطاقة",
                  "مكتبة تعلم شاملة عن الصحة النفسية",
                  "موسوعة الأمراض النفسية",
                  "تمارين التنفس والتأمل",
                  "دعم المجتمع والمساعدة في الأزمات",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#FFFCF5]/70">
                    <Check className="h-4 w-4 text-[#FFFCF5]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-[#FFFCF5]/50">
                يمكنك الترقية في أي وقت · إلغاء في أي وقت · بياناتك تبقى ملكك
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
